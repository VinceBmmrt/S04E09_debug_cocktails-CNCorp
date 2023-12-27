const cocktailsList = require('./data');

/** Cette fonction est apelée en callback d'un filter et sert à retourner les cocktails dont le nom, un ingrédient ou un tag match la queryString
 * Retourne true si la queryString match un des élements, et false le cas contraire
* @param {string} name
* @param {string[]} ingredients
* @param {string[]} tags
* @param {string} queryString
**/

const searchCocktails = (name, ingredients, tags, queryString) => {
    if (!queryString) {
        return true;
    }

    if (name.toLowerCase().includes(queryString)) {
        return true;
    }

    // 2 manières pour vérifier si un élément existe dans un tableau

    // // includes (!+ limité car pas de contrôle sur la condition de validation)
    // if (ingredients.includes(queryString)) {
    //     return true;
    // }
    // // find (+ permissif car on écrit la condition comme on veut)
    // return ingredients.find((ingredient) => ingredient.toLowerCase() === queryString)

    // on peut faire un tableau commun pour les ingrédients et les tags vu qu'on effectue les mêmes vérifications sur les 2 => on utilise le spread operator (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
    const mergedArray = [...ingredients, ...tags]

    const match = mergedArray.find((elem) => elem.toLowerCase() === queryString)
    return match;
}

const dataMapper = {
    search(queryString) {
        const filteredCocktailsList = cocktailsList.filter(cocktail => searchCocktails(cocktail.name, cocktail.ingredients, cocktail.tags, queryString));
        return filteredCocktailsList;
    },
    getCocktailById(cocktailId) {
        const cocktail = cocktailsList.find(({ id }) => id == cocktailId);
        return cocktail;
    },
};

module.exports = dataMapper;