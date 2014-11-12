require 'pry'

module Jekyll
  module ClientImagePathFilter
    def client_image_path(name)
      clients = @context["site"]["data"]["clients"]
      client = clients.detect{|c| c["name"].downcase == name.downcase }
      asset_path(client["image_path"])
    end
    def client_bw_image_path(name)
      clients = @context["site"]["data"]["clients"]
      client = clients.detect{|c| c["name"].downcase == name.downcase }
      asset_path(client["bw_image_path"])
    end
  end
end

Liquid::Template.register_filter(Jekyll::ClientImagePathFilter)
