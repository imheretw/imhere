set :branch, ENV["CI_BRANCH"]

role :app, %w{localhost}
role :web, %w{localhost}
role :db,  %w{localhost}
