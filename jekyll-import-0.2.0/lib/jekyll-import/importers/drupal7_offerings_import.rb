# NOTE: This converter requires Sequel and the MySQL gems.
# The MySQL gem can be difficult to install on OS X. Once you have MySQL
# installed, running the following commands should work:
# $ sudo gem install sequel
# $ sudo gem install mysql -- --with-mysql-config=/usr/local/mysql/bin/mysql_config

module JekyllImport
  module Importers
    class Drupal7OfferingsImport < Importer
      # Reads a MySQL database via Sequel and creates a post file for each story
      # and blog node.
      QUERY = "SELECT n.nid, n.title, fdb.body_value, n.created, n.status
      FROM node AS n 
      left join drupal.field_data_body AS fdb on n.nid = fdb.entity_id AND n.vid = fdb.revision_id
      WHERE n.type = 'offering'"

      def self.find_content(id)
        "SELECT title_content.field_title_content_value as 'title', body_content.field_body_content_value as 'body' 
        FROM field_data_field_title_and_body as f
        inner join field_data_field_body_content as body_content on body_content.entity_id = f.field_title_and_body_value
        inner join field_data_field_title_content as title_content on title_content.entity_id = f.field_title_and_body_value
        where f.entity_id = #{id};"
      end

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
        user   = options.fetch('user')
        pass   = options.fetch('password', "")
        host   = options.fetch('host', "localhost")
        prefix = options.fetch('prefix', "")

        # db = Sequel.mysql(dbname, :user => user, :password => pass, :host => host, :encoding => 'utf8')
        db = Sequel.mysql(dbname, adapter: 'mysql2', :user => user, :password => pass, :host => host, :encoding => 'utf8')

        unless prefix.empty?
          QUERY[" node "] = " " + prefix + "node "
          QUERY[" field_data_body "] = " " + prefix + "field_data_body "
        end

        dir = "_offerings"
        FileUtils.mkdir_p(dir)

        db[QUERY].each do |offering|
          # Get required fields and construct Jekyll compatible name
          node_id = offering[:nid]
          title = offering[:title]
          content = offering[:body_value].to_s
          created = offering[:created]

          db[find_content(node_id)].each do |additional_content|
            content << "<h2>#{additional_content[:title]}</h2>" if additional_content[:title]
            content << "<div class='offering-description'>#{additional_content[:body]}</div>" if additional_content[:body]
          end

          time = Time.at(created)
          slug = title.strip.downcase.gsub(/(&|&amp;)/, ' and ').gsub(/[\s\.\/\\]/, '-').gsub(/[^\w-]/, '').gsub(/[-_]{2,}/, '-').gsub(/^[-_]/, '').gsub(/[-_]$/, '')
          name = time.strftime("%Y-%m-%d-") + slug + '.md'
          permalink ||= slug

          begin 
            permalink = db["select alias as 'permalink' from views_url_alias_node where views_url_alias_node.nid = #{node_id};"].first[:permalink]
            permalink.insert(0, "/") unless permalink =~ /^\//
          rescue NoMethodError
            permalink = "/solutions/offerings/workshop/#{slug}"
          end

          # Get the relevant fields as a hash, delete empty fields and convert
          # to YAML for the header
          data = {
             'layout' => 'offering',
             'title' => title.to_s,
             'created' => created,
             'permalink' => permalink,
             'name' => 'offerings'
           }.delete_if { |k,v| v.nil? || v == ''}.to_yaml

          # Write out the data and content to file
          File.open("#{dir}/#{name}", "w") do |f|
            f.puts data
            f.puts "---"
            f.puts content
          end

        end

        # TODO: Make dirs & files for nodes of type 'page'
          # Make refresh pages for these as well

        # TODO: Make refresh dirs & files according to entries in url_alias table
      end
    end
  end
end
