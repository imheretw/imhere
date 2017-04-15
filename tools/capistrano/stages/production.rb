set :branch, ENV["CI_BRANCH"]
set :user, ENV["PRODUCTION_USER"]

role :app, ENV['PRODUCTION_HOST']
role :web, ENV['PRODUCTION_HOST']

set :deploy_to, ENV['PRODUCTION_DEPLOY_TO']

set :ssh_options, {
  user: fetch(:user),
  auth_methods: %w(publickey),
  keys: [
    File.join(ENV['HOME'], '.ssh', 'id_rsa'),
    File.join(ENV['HOME'], '.ssh', ENV['PRODUCTION_PEM'])
  ],
}
