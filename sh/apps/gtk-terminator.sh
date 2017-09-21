# Apparently GTK themes save their resources in a binary file
# From the extracted CSS file you can copy all classes that are related to .notebook

gresource extract /usr/share/themes/Adapta/gtk-3.0/gtk.gresource /org/adapta-project/gtk-3.18/gtk-contained-dark.css > gtk-contained-dark.css
