// Récupération de l'ID

let parms = location.search.substring(1).split("&");
let temp = parms[0].split("=");  
let variable = decodeURI(temp[0]);
let valueTeddy = decodeURI(temp[1]);
console.log(temp);
console.log(variable + " = " + valueTeddy);
let urlTeddy = ('http://localhost:3000/api/teddies/') + valueTeddy;
console.log(urlTeddy);

// Connexion et obtention des objets

async function getTeddies() {
    let url = ('http://localhost:3000/api/teddies/') + valueTeddy;
    try {
        let res = await fetch(url);
		const url1 = url;
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

// affichage dans la page HTML



async function renderTeddies() {
    let teddy = await getTeddies();
    let html = '';
	let undefined = "";
    let container = document.querySelector (".container");
	container.innerHTML = `<div class="teddy">
                            <img src="${teddy.imageUrl}" >
                            <h1>${teddy.name}</h1>
							<h2><strong>Descriptif : </strong>${teddy.description}</h2>
                            <h1>Prix : ${teddy.price/100}€</h1>
                            <h2>Choisissez votre couleur</h2>
							<select name="option" id="choix_option" required="" aria-invalid="false">
                            <option disabled="" value="" selected="">Choix couleur</option>         
                            <option>${teddy.colors[0]}</option><option>${teddy.colors[1]}</option><option>${teddy.colors[2]}</option><option>${teddy.colors[3]}</option>
                            </select><br /><br />
                            <label for="qt">Quantité: </label>
                            <select id="qt" name="qt">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            </select>
                            <br />
                            <button>Mettre au panier</button>
                            </div>`;
							
//On sélectionne le button du document
let b1 = document.querySelector('button');

// Génération du Numéro de commande
function entierAleatoire(min, max)
{
 return Math.floor(Math.random() * (max - min + 1)) + min;
}

//La variable contient un nombre aléatoire compris entre 1001 et 9999
var numeroCommande = entierAleatoire(1001, 9999);


//On utilise les propriétés gestionnaires d'évènement avec nos éléments
b1.onclick = function(){

    // mise en place des différentes variables
    var produitCommande = teddy.name;
    var produitReference = teddy._id;
    var produitQuantity = qt.value;
    var produitPrix = teddy.price/100;
    var prixTotal = (produitPrix * qt.value);

    console.log("Numéro de commande : " + numeroCommande);
    console.log("Produit commandé :" + produitCommande);
    console.log("Référence: " + produitReference);
    console.log("Quantité : " + qt.value);
    console.log("Prix unitaire :" + produitPrix);
    console.log("Total à payer : " + prixTotal);

    // On sauvegarde les différentes lignes dans le localStorage
    localStorage.setItem("Numéro de commande", numeroCommande);
    localStorage.setItem("Produit commandé", produitCommande);
    localStorage.setItem("Référence", produitReference);
    localStorage.setItem("Quantité", qt.value);
    localStorage.setItem("Prix unitaire", produitPrix);
    localStorage.setItem("Total à payer", prixTotal);

    // On vérifie que cela s'est correctement déroulé
    console.log("Commande enregistrée N° = " + localStorage.getItem("Numéro de commande"));

	// On avertit le client que son article est dans le panier
	alert('Article ajouté au panier - Commande N°' + numeroCommande);
	
};


}

renderTeddies();





    











