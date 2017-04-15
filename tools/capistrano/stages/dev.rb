set :branch, ENV["CI_BRANCH"]
set :user, ENV["DEV_USER"]

role :app, ENV['DEV_HOST']
role :web, ENV['DEV_HOST']

set :deploy_to, ENV['DEV_DEPLOY_TO']

set :ssh_options, {
  user: fetch(:user),
  auth_methods: %w(publickey),
  keys: [
    File.join(ENV['HOME'], '.ssh', 'id_rsa'),
    File.join(ENV['HOME'], '.ssh', ENV['DEV_PEM'])
  ],
}
