#!/usr/bin/env ruby
require 'nokogiri'
require 'json'

MAX_ARTICLE_SIZE = 9000

path, output_file = ARGV[0], ARGV[1] || "output.json"

if ARGV.length == 0
    puts "Please specify a path!"
    exit
end

files = Dir.glob(File.join(path, '**', '*.html'))
puts "Found #{files.length} files."

items, skipped_files = [], 0


files.each do |f|
    begin
        page = Nokogiri::HTML(File.open(f))

        # Remove GH link:
        gh_link = page.css('.container-github')
        if gh_link.length > 0
            gh_link[0].remove
        end

        h1_tag = page.css('h1')
        if h1_tag.length > 0
          h1_tag.remove
        end

        item_path = f.gsub(path, "").chomp("index.html")
        item_section = item_path.split("/")[1]
          .split("-").map(&:capitalize).join(" ")

        title = page.css('title').text.strip().chomp(' - Tyk Documentation')
        article = page.css('#main-content').text.strip.gsub("\n", " ")
        if article.length > MAX_ARTICLE_SIZE
            puts "Article '#{title}' (#{item_path}) has #{article.length} bytes, cropping!"
            article = article[0, MAX_ARTICLE_SIZE]
        end
        item = {
          title: title,
          article: article,
          path: item_path,
          section: item_section
        }
        items << item
    rescue
        puts "Skipping: #{f}"
        skipped_files+=1
    end
end

puts "Skipped files: #{skipped_files} of #{files.length}"
puts "Writing output to #{output_file}..."

output_json = JSON.dump(items)
File.write(output_file, output_json)
