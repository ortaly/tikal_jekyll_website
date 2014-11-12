require 'rubygems'
require 'pry'

module Jekyll
  class PostDate < Liquid::Tag
    def render(context)
      date = context["page"]["date"] || context["post"]["date"]
      %Q{<time pubdate="" datetime="#{date.to_s}">
        <div class="day">#{date.strftime("%d")}</div>
        #{date.strftime("%b. %Y")}
      </time>}
    end
  end

  module PostDateFilter
    def post_date(date)
      %Q{<time pubdate="" datetime="#{date.to_s}">
        <div class="day">#{date.strftime("%d")}</div>
        #{date.strftime("%b. %Y")}
      </time>}
    end
  end
end

Liquid::Template.register_tag('post_date', Jekyll::PostDate)
Liquid::Template.register_filter(Jekyll::PostDateFilter)