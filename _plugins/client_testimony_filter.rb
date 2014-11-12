require 'pry'

module Jekyll
  module ClientTestimonyFilter
    def client_testimony(name)
      if testimony = @context["site"]["data"]["testimonies"].detect{|t| t["name"] == name}
        if client = @context["site"]["data"]["clients"].detect{ |client| client["name"] == name }
          %Q{
            <div class="views-field views-field-body">
              <div class="field-content">
                <div class="testimonies-user">
                  <img typeof="foaf:Image" src="#{ asset_path(client["image_path"]) }" alt="">
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

Liquid::Template.register_filter(Jekyll::ClientTestimonyFilter)
