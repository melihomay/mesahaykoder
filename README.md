# mesahaykoder
# Added gallery mode **http://unitegallery.net/index.php?page=documentation#documenter_cover**.

# wie verkleinert man die bilder schnell <br>
manuell mit folgenden
`cd img/sachspenden_02/`<br>
`mdkdir small` einen folder anlegen.<br>
und mit<br>
`sips --setProperty formatOptions 30 -Z 250 *.JPG --out small`
werden die bilder in verkleinert und mit 30% verkleinert, die zahl kann angepasst werden 50 oder mit **normal** ausgetauscht werden.


# Galarie generator
- zweck ist es nahezu automatisch eine galarie aufzubauen
  - maruft ruft den generator auf mit <br/>
    `ruby gallery.rb images=img/bilder` <br/>
    es wird im pfad **"img/bilder"** ein ordner mit small erstellt da werden die bilder für die thumb ansicht erstellt <br>
    zudem wird ein file names **"gallery_snippet.yml"** erstellt, die man öffnen kann und dann die einträge kopiert und in die richtige markdown einfügt.

  - default parameter wenn man sie nicht angibt sind:
    - **width=400**
    - **q=35**
  - beispiel:
  - `ruby gallery.rb images=img/bilder q=50 width=450`

- starten von jekyll im developmet `jekyll serve  --watch`
https://www.facebook.com/794854883980129/videos/vb.794854883980129/869566303175653/?type=2&theater
