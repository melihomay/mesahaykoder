require 'fileutils'
require 'yaml'

if ARGV.empty?
  puts 'Kann nicht ohne parameter funktionieren'
  puts 'Was macht dieses script?'
  puts 'aufgabe ist es den ordner nach images zu suchen, einen weiteren ordner mit dem name small anzulegen'
  puts 'die bilder zu konvertieren in kleinere mit nideriger kompression'
  puts 'es legt auch einen markdown file an, um tipperei zu vermeiden'
  abort
end

# parse comandos
commandos = {}
ARGV.each do|a|
  coammnd = a.split '='
  commandos[coammnd.first] = coammnd.last
end

# validate commandos

validate_commandos = %w(images)

validate_commandos.each do |command|
  value = commandos[command]

  if command == 'images' && value
    unless File.directory?(value)
      abort "folder not exist #{value}"

    end
  else
    abort "command #{command} not found, script end here"
  end
end

optional_commands = %w(q width)
optional_commands.each do |command|
  value = commandos[command]
  if command == 'q' && value.nil?
    commandos['q'] = 35
  elsif command == 'width' && value.nil?
    commandos['width'] = 400
  end
end

# create a small folder
small_path = File.join commandos['images'], 'small'

filtered_images = ''
if File.directory?(small_path)
  abort "small folder exist in #{commandos['images']}"
else
  FileUtils.mkdir_p(small_path)
  filtered_images = Dir
                    .entries("#{commandos['images']}/.")
                    .select do |file_image|
    prefix = file_image.split('.').last
    prefix && %(png jpg)[file_image.split('.').last.downcase]
  end
end

system("cd #{commandos['images']}")
filtered_images.each do |image_file|
  system("sips --setProperty formatOptions #{commandos['q']} -Z #{commandos['width']} #{File.join( commandos['images'], image_file)} --out #{File.join( commandos['images'], 'small')}")
end

test = 'www.mesahaykoder.de - Tierschutzverein - Özdere Türkei'
# build yaml file
yaml_file = {}
yaml_file['gallery'] = {}
yaml_file['gallery']['thumb_path'] = commandos['images']
yaml_file['gallery']['images'] = []
filtered_images.each do |image_file|
  yaml_file['gallery']['images'] << { 'file' => image_file, 'title' => test, 'alt' => test }
end

File.open(File.join(commandos['images'], 'gallery_snippet.yml'), 'w') do |f|
  f.write yaml_file.to_yaml
end
