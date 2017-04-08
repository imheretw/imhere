# config/deploy.rb

lock '3.8.0'

# application settings
set :application, ENV['APPLICATION']
set :repo_url, ENV['REPO']
set :deploy_to, ENV['DEPLOY_TO']
set :scm, :git

# others settings
set :format, :pretty
set :log_level, :debug
set :pty, true
set :keep_releases, 5
set :linked_dirs, %w{node_modules build/conf build/static/attachments build/logs}
set :linked_files, %w(.env)

# nvm settings
set :nvm_type, :user # or :system, depends on your nvm setup
set :nvm_node, 'v6.10.1'
set :nvm_map_bins, %w{node npm gulp bower pm2 knex}
set :nvm_node_path, -> {
  if fetch(:nvm_type, :user) == :system
    '/usr/local/nvm/'
  else
    "$HOME/.nvm/"
  end
}

# npm settings
set :npm_flags, '--silent --no-progress'

# bower settings
set :bower_flags, '--quiet --config.interactive=false --allow-root'

# gulp tasks
set :gulp_tasks, 'build'

# pm2 settings
set :pm2_config, 'build/pm2.config.js' # PM2 config path by default

namespace :knex do
  desc 'Runs knex migrate:latest if migrations are set'
  task :migrate do
    print '[knex:migrate] Run migration'
    on roles(:db) do
      within current_path do
        execute :knex, 'migrate:latest'
      end
    end
  end

  desc 'Runs knex seed:run'
  task :seed do
    print '[knex:seed] Apply seed'
    on roles(:db) do
      within current_path do
        execute :knex, 'seed:run'
      end
    end
  end
end

# hooks
namespace :deploy do
  before :updated, 'gulp'
  after :published, 'pm2:reload'
  after :published, 'pm2:dump'
  after :published, 'knex:migrate'
end
