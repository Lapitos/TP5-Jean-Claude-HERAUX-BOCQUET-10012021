/*
fetch("http://localhost:3000/api/teddies")
.then(response => response.json())
.then(response => alert(JSON.stringify(response)))
.catch(error => alert("Erreur : " + error));
*/

/*Constantes & variables pour les produits et l'URL
***************************************************/

const produitSell = "teddies"  //Au choix "cameras" - "furniture" ou "teddies"
const APIURL = "http://localhost:3000/api/" + produitSell + "/";

let idProduit = "";

/*Initialisation du panier
**************************/

if(localStorage.getItem("userPanier")){
	console.log("Info : Le client a déjà un panier en cours");
}else{
	console.log("Info : Création du panier");
  	//Initialisation du panier sous forme de tableau
  	let panierInit = [];
  	localStorage.setItem("userPanier", JSON.stringify(panierInit));
  };

  	//Variables tableau et objet demandé par l'API pour la commande
  	let contact;
  	let products = [];

	//Le client a désormais son panier
	let userPanier = JSON.parse(localStorage.getItem("userPanier"));
	
/* On se connecte à l'API
**************************/

getProduits = () =>{
	return new Promise((resolve) =>{
		let request = new XMLHttpRequest();
		request.onreadystatechange = function() {
			if(this.readyState == XMLHttpRequest.DONE && this.status == 200) 
			{
				resolve(JSON.parse(this.responseText));
				console.log("Info : Connection ok");
				
			if(error){
					error.remove();
				}

			}else{
				console.log("Info : Erreur de connection à l'API");
			}
		}
		request.open("GET", APIURL + idProduit);
		request.send();
	});
};

/* Mise en forme de la page HTML Principale
**********************************************/

		//Listing des produits sur index.html
		async function allProductsList(){
		const produits = await getProduits();

		//Création de la section accueillant la liste des produits
		let listProduct = document.createElement("section")
		listProduct.setAttribute("class", "list-product");
		//Ajout de la section dans le HTML
		let main = document.getElementById("main");
		main.appendChild(listProduct);

		//Pour chaque produit rencontrée ...
		produits.forEach((produit) =>
		{ 
      	//création des élements de la structure
      	//Une div avec 2 bloc(gauche et droit) avec image/nom(h2)/prix(p)/lien(a)
      	let produitBlock = document.createElement("div");
      	let produitLeft = document.createElement("div");
      	let produitRight = document.createElement("div");
      	let produitImage = document.createElement("img");
      	let produitNom = document.createElement("h2");
      	let produitPrix = document.createElement("p");
      	let produitLink = document.createElement("a");

      	//Ajout des attributs au balise pour la création du style via le css
      	produitBlock.setAttribute("class", "list-product__block");
      	produitLeft.setAttribute("class", "list-product__block--left");
      	produitRight.setAttribute("class", "list-product__block--right");
      	produitImage.setAttribute("src", produit.imageUrl);
      	produitImage.setAttribute("alt", "image du produit"); 
      	produitLink.setAttribute("href", "product.html?id=" + produit._id);

     	//Bloc flex
      	//Bloc gauche >> image
     	//Bloc droit >> nom/prix/lien du produit
     	listProduct.appendChild(produitBlock);
     	produitBlock.appendChild(produitLeft);
     	produitLeft.appendChild(produitImage);
     	produitBlock.appendChild(produitRight);
     	produitRight.appendChild(produitNom);
     	produitRight.appendChild(produitPrix);
     	produitRight.appendChild(produitLink);

      	//Contenu - calcul du prix en euros
      	produitNom.textContent = produit.name;
      	produitPrix.textContent = produit.price / 100 + " €";
      	produitLink.textContent = "Visualisation de l'article";
      });
	};