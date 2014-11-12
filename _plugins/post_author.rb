require 'rubygems'
require 'pry'

module Jekyll
  class PostAuthor < Liquid::Tag
    def render(context)
      post = context["post"] || context["page"] || {}

      if post["author"] && post["user"]
        uri = build_uri(context, post["user"])
        uri ? "<a href='#{uri}'>#{post["author"]}</a>" : post["author"]
      else
        return nil
      end
    end

    def build_uri(context, user)
      uri = []
      permalink = user["permalink"] || "/users/#{user['login']}"
      uri << context["site"]["baseurl"].split("/").reject!{|x| x.empty?}
      uri << permalink.split("/").reject!{|x| x.empty?}
      uri.flatten.join("/").insert(0, "/").gsub("//","/")
    end
  end
end

Liquid::Template.register_tag('post_author', Jekyll::PostAuthor)
