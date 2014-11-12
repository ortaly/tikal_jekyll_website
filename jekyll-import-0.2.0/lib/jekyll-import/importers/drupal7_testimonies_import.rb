# NOTE: This converter requires Sequel and the MySQL gems.
# The MySQL gem can be difficult to install on OS X. Once you have MySQL
# installed, running the following commands should work:
# $ sudo gem install sequel
# $ sudo gem install mysql -- --with-mysql-config=/usr/local/mysql/bin/mysql_config

module JekyllImport
  module Importers
    class Drupal7TestimoniesImport < Importer
      # Reads a MySQL database via Sequel and creates a post file for each testimonie
      QUERY = <<-EOF
        SELECT node.*, body.body_value, f.uri, n.title as 'client'
        FROM drupal.node 
        left join field_data_body as body on body.entity_id = node.nid AND body.bundle = 'testimonies'
        left join file_managed as f on f.fid = node.nid
        left join node as n on n.type="client" AND n.title = node.title 
        where node.type='testimonies';
      EOF

      def self.validate(options)
        %w[dbname user].each do |option|
          if options[option].nil?
            abort "Missing mandatory option --#{option}."
          end
        end
      end

      def self.specify_options(c)
        c.option 'dbname', '--dbname DB', 'Database name'
        c.option 'user', '--user USER', 'Database user name'
        c.option 'password', '--password PW', 'Database user\'s password (default: "")'
        c.option 'host', '--host HOST', 'Database host name (default: "localhost")'
        c.option 'prefix', '--prefix PREFIX', 'Table prefix name'
      end

      def self.require_deps
        JekyllImport.require_with_fallback(%w[
          rubygems
          sequel
          fileutils
          safe_yaml
        ])
      end

      def self.process(options)
        dbname = options.fetch('dbname')
        dbuser = options.fetch('user')
        pass   = options.fetch('password', "")
        host   = options.fetch('host', "localhost")
        prefix = options.fetch('prefix', "")

        db = Sequel.mysql(dbname, adapter: 'mysql2', :user => dbuser, :password => pass, :host => host, :encoding => 'utf8')

        unless prefix.empty?
          QUERY[" node "] = " " + prefix + "node "
          QUERY[" field_data_body "] = " " + prefix + "field_data_body "
        end

        dir = "testimonies"
        FileUtils.mkdir_p "_data/#{dir}"
        # FileUtils.rm "_data/#{dir}/*", force: true

        db[QUERY].each do |testimony|
          # Get required fields and construct Jekyll compatible name
          testimony_data = {}
          testimony_data["name"] = testimony[:title]
          testimony_data["type"] = testimony[:client] ? "client" : "user"
          testimony_data["text"] = testimony[:body_value]

          file_name = testimony_data["name"].downcase.strip.gsub(/\s+/,'_')

          File.open("_data/#{dir}/#{file_name}.yml", "w") do |f|
            f.puts testimony_data.to_yaml
          end
        end
      end
    end
  end
end
