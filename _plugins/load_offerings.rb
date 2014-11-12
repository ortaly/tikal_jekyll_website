require "pry"

module Jekyll
  class OfferingParser < Post
    def containing_dir(source, dir)
      File.join(source, dir)
    end
  end

  class LoadOfferingsGenerator < Generator
    safe true

    def generate(site)
      dir = "_offerings"
      Dir.foreach(dir) do |file|
        if file =~ /.+\.md$/
          offering = OfferingParser.new(site, site.source, "/#{dir}", file)
          site.posts << offering
          site.data["offerings"] ||= []
          site.data["offerings"] << offering
        end
      end
    end
  end
end
