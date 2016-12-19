set :branch, ENV["CI_BRANCH"]
set :user, :work1

role :app, %w{test.com}
role :web, %w{test.com}
role :db,  %w{test.com}

set :ssh_options, {
  user: fetch(:user),
  auth_methods: %w(publickey),
  keys: [
    File.join(ENV['HOME'], '.ssh', 'id_rsa'),
    File.join(ENV['HOME'], '.ssh', 'production.pem')
  ],
}
