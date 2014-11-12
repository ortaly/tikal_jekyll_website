require 'pry'

module Jekyll
  module StaffTestimonyFilter
    def staff_testimony(name)
      if testimony = @context["site"]["data"]["testimonies"].detect{|t| t["name"] == name}
        if user = @context["site"]["data"]["users"].detect{ |u| [u["first_name"].strip, u["last_name"].strip].join(" ") == name }
          %Q{
            <div class="views-field views-field-body">        
              <div class="field-content">
                <div class="testimonies-user">
                  <div class="user-picture">
                    <img typeof="foaf:Image" src="#{ asset_path(user["image_path"]) }" alt="">
                  </div>
                  <div class="name">#{ user["first_name"] } #{ user["last_name"] }</div>
                  <div class="description">#{ user["description"] }</div>
                </div>

                <div class="testimonies-body">
                    <div class="testimonies-arrow"></div>
                    <div class="quote-open"></div>
                    <div class="testimonies-text">
                      #{ testimony["text"] }
                      <div class="quote-close"></div>
                    </div>
                </div>
              </div>
            </div>
          }
        end
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::StaffTestimonyFilter)
