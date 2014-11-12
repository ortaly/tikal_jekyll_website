# NOTE: This converter requires Sequel and the MySQL gems.
# The MySQL gem can be difficult to install on OS X. Once you have MySQL
# installed, running the following commands should work:
# $ sudo gem install sequel
# $ sudo gem install mysql -- --with-mysql-config=/usr/local/mysql/bin/mysql_config

require "rubygems"
require "sanitize"

module JekyllImport
  module Importers
    class Drupal7UsersImport < Importer
      # Reads a MySQL database via Sequel and creates a post file for each user
      QUERY = <<-EOF
        SELECT users.uid, users.name, users.status, users.picture,
        first_name.field_first_name_value as 'first_name', 
        last_name.field_last_name_value as 'last_name',
        about.field_about_value as 'about',
        f.uri as 'image_path',
        user_desc.field_description_value as 'description',
        GROUP_CONCAT(DISTINCT follow.field_follow_on_url) as 'follow_me_urls',
        GROUP_CONCAT(DISTINCT exp_skill.field_skills_first) as 'expert_skills', GROUP_CONCAT(exp_skill.field_skills_second) as 'expert_scores',
        GROUP_CONCAT(DISTINCT dev_skill.field_skills_developer_first) as 'developer_skills', GROUP_CONCAT(dev_skill.field_skills_developer_second) as 'developer_scores',
        GROUP_CONCAT(DISTINCT fam_skill.field_skills_familiar_first) as 'familiar_skills', GROUP_CONCAT(fam_skill.field_skills_familiar_second) as 'familiar_scores'
        FROM users 
        left join field_data_field_skills_developer as dev_skill on dev_skill.entity_id = users.uid
        left join field_data_field_skills_familiar as fam_skill on fam_skill.entity_id = users.uid 
        left join field_data_field_skills as exp_skill on exp_skill.entity_id = users.uid
        inner join field_data_field_first_name as first_name on first_name.entity_id = users.uid
        inner join field_data_field_last_name as last_name on last_name.entity_id = users.uid
        left join field_data_field_description as user_desc on user_desc.entity_id = users.uid
        left join field_data_field_follow_on as follow on follow.entity_id = users.uid
        left join file_managed as f on f.fid = users.picture
        left join field_data_field_about as about on about.entity_id = users.uid
        where users.status = 1
        group by users.uid;
      EOF

      def self.professional_experience_query(id)
        <<-EOF
         select users.name, des.field_description_experience_value as 'desc', title.field_title_value as 'title', years.field_years_value as 'years' from users 
         inner join field_data_field_professional_experience as ex on ex.bundle = 'user' AND ex.entity_id = users.uid
         inner join field_data_field_description_experience as des on des.bundle = 'field_professional_experience' AND des.entity_id = ex.field_professional_experience_value
         inner join field_data_field_title as title on title.bundle = 'field_professional_experience' AND title.entity_id = des.entity_id
         inner join field_data_field_years as years on years.bundle = 'field_professional_experience' AND years.entity_id = des.entity_id
         where users.uid=#{id};
        EOF
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

      def self.parse_skill(category, user)
        return nil unless user["#{category}_skills".to_sym]
        user["#{category}_skills".to_sym].split(",").each_with_index.inject({}) do |hash, pair|
          element, index = pair
          hash.merge!(element => user["#{category}_scores".to_sym].split(",")[index])
        end
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

        dir = "users"
        FileUtils.mkdir_p "_data/#{dir}"
        # FileUtils.rm "_data/#{dir}/*", force: true

        db[QUERY].each do |user|
          # Get required fields and construct Jekyll compatible name
          user_data = {}
          user_data["id"] = user[:uid]
          user_data["login"] = user[:name]
          user_data["first_name"] = user[:first_name]
          user_data["last_name"] = user[:last_name]
          user_data["description"] = user[:description]
          user_data["about"] = Sanitize.clean(user[:about]).to_s.strip.gsub(/\s+/,' ')
          user_data["follow_me_urls"] = user[:follow_me_urls].to_s.split(",")
          user_data["image_path"] = user[:image_path].gsub(/^public\:\/\//,'') if user[:image_path]

          user_data["permalink"] = db["SELECT alias as 'permalink' FROM drupal.url_alias where source = 'user/#{user_data['id']}'"].first[:permalink]
          user_data["permalink"] = "/" + user_data["permalink"] unless user_data["permalink"].to_s.empty?

          [:expert, :developer, :familiar].each do |skill|
            if list_of_skills = parse_skill(skill, user) 
              user_data["skills"] ||= {}
              user_data["skills"]["#{skill}_skills"] = list_of_skills
            end
          end

          db[professional_experience_query(user_data["id"])].each_with_index do |exp, i|
            user_data["experience"] ||= []
            user_data["experience"][i] = { "title" => exp[:title], "years" => exp[:years], "description" => exp[:desc] }
          end

          File.open("_data/#{dir}/#{user_data['login']}.yml", "w") do |f|
            f.puts user_data.to_yaml
          end
        end

      end
    end
  end
end
