namespace :generate do

  desc "Creates a static page"
  task :page do
    raise "Please specify a name for the page. For example: rake generate:page name='my_page'" unless ENV["name"]
    root_path = Rake.application.original_dir
    page_name = ENV["name"].downcase
    page_title = page_name.gsub(/\_/,' ').split.map(&:capitalize).join(' ')

    system "mkdir #{root_path}/_pages/#{page_name}"
    system "touch #{root_path}/_pages/#{page_name}/index.html"

    open("#{root_path}/_pages/#{page_name}/index.html", "a") { |f|
      f.puts <<-EOF
---
layout: default
name: #{page_name}
title: #{page_title} | Tikal
header_title: #{page_title}
header_subtitle: Add some text here
---
      EOF
    }

    puts "Page index.html has been created at #{root_path}/_pages/#{page_name}/index.html"

    system "touch #{root_path}/_assets/stylesheets/pages/#{page_name}.scss"

    open("#{root_path}/_assets/stylesheets/application.scss", "a") { |f|
      f.puts "@import 'pages/#{page_name}';"
    }

    puts "Page stylesheet has been created at #{root_path}/_assets/stylesheet/pages/#{page_name}/#{page_name}.scss"

    system "mkdir #{root_path}/_assets/images/pages/#{page_name}"
    puts "Image folder has been created at #{root_path}/_assets/images/pages/#{page_name}"
  end

end

namespace :jekyll do

  desc "start the jekyll server with limites posts to make it faster"
  task :server, :num_posts do |t, args|
    num_posts = args[:num_posts]
    cmd = "jekyll serve --watch"
    cmd += " --limit_posts #{num_posts}" if num_posts
    puts "running #{cmd}"
    exec(cmd)
  end

end
