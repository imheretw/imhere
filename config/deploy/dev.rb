set :branch, ENV["CI_BRANCH"]
set :user, :ubuntu

role :app, %w{dev.test.com}
role :web, %w{dev.test.com}
role :db,  %w{dev.test.com}

set :ssh_options, {
  user: fetch(:user),
  auth_methods: %w(publickey),
  keys: [
    File.join(ENV['HOME'], '.ssh', 'id_rsa'),
    File.join(ENV['HOME'], '.ssh', 'dev.pem')
  ],
}
