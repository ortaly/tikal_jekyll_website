require "pry"

module Jekyll

  class LoadDataSubFolders < Generator
    safe true

    def generate(site)
      Dir.glob("_data/*/").each do |sub_folder|
        key = sub_folder.split("/").last
        if site.data[key].to_a.empty?
          site.data[key] ||= []
          Dir.foreach(sub_folder) do |file|
            if file =~ /.+\.yml$/ 
              file_data = YAML.load_file("#{sub_folder}/#{file}")
              site.data[key] << file_data
            end
          end
        end
      end
    end
  end

end
