
// Récupération de la commande du LocalStorage
// mise en place des variables
var cdeClient = localStorage.getItem("Numéro de commande");
var proClient = localStorage.getItem("Article");
var refClient = localStorage.getItem("Référence");
var imgClient = localStorage.getItem("Image");
var qteClient = localStorage.getItem("Quantité");
var puClient = localStorage.getItem("Prix unitaire");
var totClient = localStorage.getItem("Total à payer");
var nomClient = localStorage.getItem("Nom");
var prenomClient = localStorage.getItem("Prénom");
var adresseClient = localStorage.getItem("Adresse");
var villeClient = localStorage.getItem("Ville");
var emailClient = localStorage.getItem("Email");

// On vérifie que cela s'est correctement déroulé
console.log("Commande N° " + cdeClient);
console.log("Client :" + nomClient);



// affichage dans la page HTML

async function renderCommande() {
    let html = '';
    let container = document.querySelector (".container");
    container.innerHTML = `<div class="teddy">
                            <h2>Commande N°${cdeClient}</h2>
                            <img src="${imgClient}">
							
                            <table>
                            <thead>				
                            <tr>
                            <th> Article Commandé </th>
                            <th> Total à payer</th>
                            <th> Quantité Commandé </th>
                            </tr>
                            </thead>

                            <tbody>
                            <tr>
                            <th>${proClient}</th>
                            <th>${totClient} €</th>
                            <th>${qteClient} unité(s)</th>
                            </tr>
                            
                            </tbody>
                            </table>
							
							<strong>Coordonnées :</strong><br />
							${nomClient} ${prenomClient}<br />
							${adresseClient}<br /> 
							${villeClient}<br />
							${emailClient}<br />
                            </div>`;


}


alert("Votre commande a été validée.");

renderCommande();

