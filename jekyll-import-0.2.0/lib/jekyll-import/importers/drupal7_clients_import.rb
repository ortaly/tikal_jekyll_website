# NOTE: This converter requires Sequel and the MySQL gems.
# The MySQL gem can be difficult to install on OS X. Once you have MySQL
# installed, running the following commands should work:
# $ sudo gem install sequel
# $ sudo gem install mysql -- --with-mysql-config=/usr/local/mysql/bin/mysql_config

module JekyllImport
  module Importers
    class Drupal7ClientsImport < Importer
      # Reads a MySQL database via Sequel and creates a data file for each client
      QUERY = <<-EOF
        select node.*, file_managed.* from node
        left join file_managed on file_managed.uid = node.uid AND file_managed.filename LIKE CONCAT('%', node.title, '%')
        where type="client";
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

        dir = "clients"
        FileUtils.mkdir_p "_data/#{dir}"
        FileUtils.rm "_data/#{dir}/*", force: true

        db[QUERY].each do |client|
          # Get required fields and construct Jekyll compatible name
          client_data = {}
          client_data["name"] = client[:title]
          client_data["image_path"] = "clients/"+client[:uri].gsub(/^public\:\/\//,'') if client[:uri]

          file_name = client_data["name"].downcase.strip.gsub(/\s+|\-/,'_')

          File.open("_data/#{dir}/#{file_name}.yml", "w") do |f|
            f.puts client_data.to_yaml
          end
        end
      end
    end
  end
end
