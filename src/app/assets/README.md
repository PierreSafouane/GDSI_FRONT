# Dossier assets

Ce dossier permet de regrouper tous les assets du projets, que ce soit des images, des fichiers audios, des documents, ainsi que les CSS du projet.

----------------------------

## **Dossier styles**

Ce dossier permet de regrouper tout les **CSS** du projet.

Cela utilse **SCSS**, qui est une variante de **CSS** mais la synthaxe est la même.

Tout les SCSS des composants seront regroupés dans le dossier **./component**.
Les SCSS de views/pages seront dans un dossier **./views**.

Le dossier **./variable** permet de regrouper des variables utilisées globalement dans les SCSS, par exemple les couleurs du site sont dans un fichier de variables, ce qui permet de les modifier facilement.

Pour les utiliser, faire comme ci-dessous:

```css
    .maClasse {
        color: $app-my-color;
    }
```

Tout fichier **scss** créés devra être importé dans le fichier index.scss, et il s'agit du **SEUL** endroit où les importer.
