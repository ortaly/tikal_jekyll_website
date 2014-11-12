require 'pry'

module Jekyll
  module ExpertWidgetFilter
    def expert_widget(expert_name)

      if user = @context["site"]["data"]["users"].detect{|user| [ user["first_name"].strip, user["last_name"].strip ].join(" ") == expert_name }
        %Q{
          <a href="..#{ to_baseurl(user["permalink"] || "/users/#{user.login}") }">
            <div class="front">
              <div class="views-field views-field-picture">
                <div class="field-content">
                  <img typeof="foaf:Image" src="#{asset_path(user['image_path'])}" alt="">
                </div>
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
                  <div class="about">
                    <div>#{truncatewords(user['about'], 22)}</div>
                  </div>
                  <div class="name">#{expert_name}</div>
                  <div class="description">#{user['description']}</div>
                </span>
              </div>
            </div>
          </a>
        }
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::ExpertWidgetFilter)
