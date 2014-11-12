# Generates group pages with relevant posts + pagination

module Jekyll

  class JobPageGenerator < Generator
    safe true
    
    def generate(site)
      site.data["jobs"].each do |job| 
        page = JobPage.new(site, site.source, job["permalink"], job)
        site.pages << page
      end
    end
  end

  class JobPage < Page
    def initialize(site, base, dir, job)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'

      self.process(@name)

      # use the group layout
      self.read_yaml(File.join(base, '_layouts'), 'job.html')

      # add the job's data to the page data, so we can access it in
      # views using {{ page.job_title }} etc
      job.each do |k, v|
        self.data["job_#{k}"] = v
      end

      self.data["name"] = "careers"
    end
  end
end
