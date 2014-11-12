# Generates group pages with relevant posts + pagination

module Jekyll

  class GroupPageGenerator < Generator
    safe true
    
    # The generate method is called whenever jekyll generates the site
    #
    # site is an instance of Jekyll::Site, containing information +
    # configuration settings from _config.yml, including groups data
    def generate(site)
      site.data["groups"].each do |g| 
        paginate(site, g["group"])
      end
    end

    def paginate(site, group)
      # Find all the posts tagged with the group's tag
      # For example: the java group page will display posts tagged
      # with the 'java' tag
      tag = group["tag"]
      tag_posts = site.posts.find_all {|post| post.tags.map(&:downcase).include?(tag)}.sort_by {|post| -post.date.to_f}
      dir_name = "/#{group['name']}"

      # calculate_pages - a method belonging to the Jekyl::Pager class, which takes 
      # the posts and the default number of posts per page, and returns the number 
      # of pages.
      num_pages = Pager.calculate_pages(tag_posts, site.config['paginate'].to_i)

      (1..num_pages).each do |page|
        # create a pagination object containing page number,
        # previous page, next page etc
        pager = Pager.new(site, page, tag_posts, num_pages)
        
        # setup the page directory. If this is the first page it will
        # be saved inside the group's folder (for example
        # "/java/index.html"). Otherwise, it will be saved inside a
        # numbered subfolder ("java/page2/index.html")
        dir = File.join(group["name"], page > 1 ? "page#{page}" : '')

        # creates the page (index.html)
        page = GroupPage.new(site, site.source, dir, group, dir_name)

        # adds pagination data to page
        page.pager = pager

        site.pages << page
      end
    end
  end

  # creates the group's index.html page
  #
  # site - the Jekyll::Site object
  # base -  root directory path
  # dir - path of the directory where the page will be saved
  # group - a hash containing the group's data (name, title,
  # subtitle etc)
  class GroupPage < Page
    def initialize(site, base, dir, group, dir_name)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'

      self.process(@name)

      # use the group layout
      self.read_yaml(File.join(base, '_layouts'), 'group.html')

      # add the group's data to the page data, so we can access it in
      # views using {{ page.title }} etc
      group.each do |k, v|
        self.data[k] = v
      end

      # the dir_name will be used by for pagination in the template
      self.data["dir_name"] = dir_name
    end
  end
end
