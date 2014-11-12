require 'pry'

module Jekyll
  class PaginationLinksTag < Liquid::Tag
    include Jekyll::Filters

    def render(context)
      @context = context

      path = to_baseurl(context["page"]["dir_name"])

      current_page = context["paginator"]["page"]
      last_page = context["paginator"]["total_pages"]

      start_point = current_page
      finish_point = start_point

      while (start_point..finish_point).to_a.length != 5
        start_point -= 1 unless start_point == 1
        finish_point += 1 unless finish_point == last_page
        break if start_point == 1 && finish_point == last_page
      end

      (start_point..finish_point).to_a.inject([]) do |array, i|
        if i == current_page
          array << "<li class='pager-current'>#{i}</li>"
        else
          href = i == 1 ? path : "#{path}/page#{i}"
          array << "<li class='pager-item'><a title='Go to page #{i}' href='#{href}'>#{i}</a></li>"
        end
      end.join(" ")
    end
  end
end

Liquid::Template.register_tag('pagination_links', Jekyll::PaginationLinksTag)
