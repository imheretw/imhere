set :branch, ENV["CI_BRANCH"]
set :user, ENV["STAGING_USER"]

role :app, ENV['STAGING_HOST']
role :web, ENV['STAGING_HOST']

set :deploy_to, ENV['STAGING_DEPLOY_TO']

set :ssh_options, {
  user: fetch(:user),
  auth_methods: %w(publickey),
  keys: [
    File.join(ENV['HOME'], '.ssh', 'id_rsa'),
    File.join(ENV['HOME'], '.ssh', ENV['STAGING_PEM'])
  ],
}
