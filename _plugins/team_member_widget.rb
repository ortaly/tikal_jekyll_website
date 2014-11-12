require 'pry'

module Jekyll
  module TeamMemberWidgetFilter
    def self.team_member_skill_tags(skills)
      output = []
      skills.to_a.each do |skill_level, skills_hash|
        skills_hash.each do |skill_name, skill_score|
          output << %Q{
            <div class="container-inline">
              <div class="double-field-first">#{skill_name}</div>
              <div class="double-field-second">#{skill_score}</div>
            </div>
          }
        end
      end
      output.join(" ")
    end

    def team_member_widget(team_member_name)
      if user = @context["site"]["data"]["users"].detect{|user| [ user["first_name"].strip, user["last_name"].strip ].join(" ") == team_member_name }
        %Q{
          <div class="front">
            <div class="views-field views-field-picture">
              <img typeof="foaf:Image" src="#{asset_path(user['image_path'])}" alt="">
            </div>
            <div class="views-field views-field-field-first-name">
              <div class="field-content">#{user['first_name']}</div>
            </div>
            <div class="views-field views-field-field-last-name">
              <div class="field-content">#{user['last_name']}</div>
            </div>
            <div class="views-field views-field-field-description">
              <div class="field-content">#{user['description']}</div>
            </div>
          </div>
          <div class="back">
            <div class="views-field views-field-nothing">
              <span class="field-content">
                <div class="skills">
                  #{ TeamMemberWidgetFilter.team_member_skill_tags(user["skills"]) }
                </div>
                <a href="#{to_baseurl(user["permalink"])}">More »</a>
              </span>
            </div>
          </div>
        }
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::TeamMemberWidgetFilter)
