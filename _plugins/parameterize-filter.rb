module Jekyll
  module ParameterizeFilter
    def parameterize(input)
      input = input.dup
      input.strip!
      input.gsub!(/\./, '-dot-')
      input.gsub!(/\./, '-dot-')
      input.gsub!('@', '-at-')
      input.gsub!('&', '-and-')
      input.gsub!(/(c\#|C\#)/, '-c-sharp-')
      input.gsub!(/\s*[^A-Za-z0-9\.]\s*/, '-')
      input.gsub!(/\-+/,'-')
      input.gsub!(/^\-|\-$/,'')
      input
    end
  end
end

Liquid::Template.register_filter(Jekyll::ParameterizeFilter)
