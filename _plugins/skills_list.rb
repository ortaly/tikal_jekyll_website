require 'rubygems'
require 'pry'

module Jekyll
  class SkillsList < Liquid::Tag
    def render(context)
      output = []
      context["page"]["user_skills"].to_a.each do |k, v|
        output << <<-EOF
          <div class="views-field views-field-field-skills">
            <span class="views-label views-label-field-skills">#{k.gsub('_skills','').capitalize}</span>    
            <div class="field-content">
              #{ skill_tags(v) }
            </div>
          </div>
        EOF
      end
      output.join(" ")
    end

    def skill_tags(skill_hash)
      output = []
      skill_hash.each do |skill_name, skill_score|
        output << <<-EOF
          <div class="clearfix">
            <div class="double-field-first">#{skill_name}</div>
            <div class="double-field-second #{skill_name}">#{skill_score}</div>
          </div>
        EOF
      end
      output.join(" ")
    end
  end
end

Liquid::Template.register_tag('skills_list', Jekyll::SkillsList)
