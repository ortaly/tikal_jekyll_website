require 'pry'

module Jekyll
  module SectionFilter
    def find_section(url)
      url = url.split("/")
      %w{js android java ruby devops}.each do |group|
        return group if url.include?(group)
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::SectionFilter)
