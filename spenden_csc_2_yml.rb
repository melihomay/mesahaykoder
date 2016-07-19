require 'fileutils'
require 'yaml'
require 'csv'

if ARGV.empty?
  puts 'Kann nicht ohne parameter funktionieren'
  puts 'Was macht dieses script?'
  puts 'es wandelt eine csv datei so um das es ein yml format wird'
  abort
end

# parse comandos
commandos = {}
ARGV.each do|a|
  coammnd = a.split '='
  commandos[coammnd.first] = coammnd[1]
end

validate_commandos = %w(file)
path = ''
validate_commandos.each do |command|
  path = value = commandos[command]
  if command == 'file' && value.to_s.strip.length > 0

  elsif
    abort "command #{command} not found or value ist empty, script end here"
  end
end

spenden_array = []
base_row = {
  'datum' => 'EMPTY',
  'gesamt' => 'EMPTY',
  'spender' => []
}

spenden_array << base_row
spenden_row = spenden_array.first['spender']
puts "test #{Dir.pwd}/#{path}"
CSV.foreach(path, col_sep: ';') do |row|
  name         = row[0]
  vorname      = row[1]
  strasse      = row[2]
  ort          = row[3]
  email        = row[4]
  art          = row[5]
  betrag       = row[6]
  lastschrift  = row[6]
  ueberweisung = row[8]
  dauerauftrag = row[9]
  paypal       = row[10]
  bezahlt      = row[11]

  if (name || vorname) && betrag
    yaml_row = {
      'betrag' => betrag,
      'name' => "#{vorname} #{name}",
      'spende' => art
    }
    spenden_row << yaml_row
  end
end

File.open(File.join('tmp/', 'spenden_liste.yml'), 'w') do |f|
  f.write spenden_array.to_yaml
end
