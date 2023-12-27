# DEBUG

> `Error: Cannot find module 'dotenv'` + 'node_modules' manquant
## 1 Installation des modules

Quand on clone un repo depuis Github, on ne récupère pas le dossier qui contient les modules ('node_modules') c'est à nous de les installer à partir des modules spécifiés dans le 'package.json'

```bash
npm install // npm i
```

> Possible d'avoir : `sh: 1: nodemon: not found`

Nodemon n'est pas installé comme dépendance du projet (ça arrive souvent car en géénral les devs back on nodemon installé en global sur la machine car nodemon est une dépendance de développement, pas d eproduction ! DOnc il n'est pas nécessaire qu'elle soit contenue dans le projet)

```bash
npm install -g nodemon
```

=> plus besoin d'installer nodemon au sein de chaque projet


> Lors de l'installation des modules : `5 vulnerabilities (4 high, 1 critical)`
## 2 Vulnérabilités de dépendances

Lors de l'installation des dépendances, on peut se retrouver avec des "vulnérabilités" qui peuvent provenir d'une version obsolète d'un module, ou d'une incompatibilité entre plusieurs modules.

On laisse npm corriger tout ça avec : 
```bash
npm audit fix
```


> Pas de .env.example ou d'indication dans le README
## 3 Variables d'environnement

On voit dans le code dans `app.js` que le serveur fait appel à une variable d'nevironnement PORT, il faut donc créer un fichier `.env` avec la variable


> Erreur EJS : `drink is not defined`
## 4 Erreur EJS

La vue essaie d'afficher une variable 'drink' censée se trouver dans les locals mais visiblement elle est `undefined`, on voit que c'est le middleWare 'loadCocktailMiddleware' qui est censée l'initialiser mais qu'il n'est pas appelé sur la homepage.

On en déduit qu'il y a un composant (`drink.ejs`) qui doit s'afficher sur une certaine route lorsque dans les locals, la variable `drink` est définie.

=> faire en sorte de ne pas afficher ce partial si la variable `drink` n'est pas définie


```ejs
// index.ejs

 <% if (locals.drink) { %>

          <div class="drink-list-detail">
            <%- include('partials/drink') %>
        </div>

          <% } %>
```

> Rien ne se passe lors de l'appui sur la touche ENTER dans le champ de recherche
## 5 Recherche

On jette un oeil aux devtools et on voit cette erreur :

> `Uncaught TypeError: event.currentTarget.value is not a function at HTMLInputElement.<anonymous> (script.js:13:77)`

On essaie de comprendre ce que nous dit l'erreur : visiblement le code essaye d'appeler une fonction qui n'en est pas une (TypeError)

On constate au sein du code `event.currentTarget.value()` alors que value est une propriété par une méthode ! 

On corrige

```js
if (event.code == 'Enter') {
            location.href = location.pathname + '?s=' + event.currentTarget.value.toLowerCase()
        }
```

## 6 Recherche bis

On arrive à rechercher un cocktail partiellement par son nom mais ni par ses ingrédients ni ses tags.

Le code écrit est incompréhensible, tout est trop factorisé on ne reconnait même pas les noms de variables. 

=> on réécrit la fonction de recherche dans `dataMapper.js`





