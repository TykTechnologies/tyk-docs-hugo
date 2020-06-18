require "json"
require "algoliasearch"

Algolia.init :application_id => ENV["ALGOLIA_APP_ID"], :api_key => ENV["ALGOLIA_ADMIN_KEY"]

index = Algolia::Index.new("tyk-docs")
index.clear_index

data = JSON.parse(File.read(ARGV[0]))

data.each_slice(1000) do |batch|
  puts index.add_objects(batch)
end