# Generates tag pages showing the tag's posts with pagination
require 'pry'

module Jekyll

  class TagPageGenerator < Generator
    include Jekyll::ParameterizeFilter

    safe true
    
    def generate(site)
      if site.layouts.key? 'tag'
        site.tags.keys.each do |tag|
          paginate(site, tag)
        end
      end
    end

    def paginate(site, tag)
      tag_posts = site.posts.find_all {|post| post.tags.include?(tag)}.sort_by {|post| -post.date.to_f}
      num_pages = Pager.calculate_pages(tag_posts, site.config['paginate'].to_i)
      slug = parameterize(tag)
      dir_name = "/tags/#{slug}"

      (1..num_pages).each do |page|
        # pager = TagPager.new(site, page, tag_posts, parameterize(tag), num_pages)
        pager = Pager.new(site, page, tag_posts, num_pages)
        dir = File.join('tags', slug, page > 1 ? "page#{page}" : '')
        page = TagPage.new(site, site.source, dir, tag, dir_name)
        page.pager = pager
        site.pages << page
      end
    end
  end

  class TagPage < Page
    def initialize(site, base, dir, tag, dir_name)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'

      self.process(@name)

      # use the tag layout
      self.read_yaml(File.join(base, '_layouts'), 'tag.html')

      self.data["dir_name"] = dir_name
      self.data["title"] = tag
    end
  end
end
