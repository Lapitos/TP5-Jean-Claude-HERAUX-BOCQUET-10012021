
// Récupération de la commande du LocalStorage
// mise en place des variables
var cdeClient = localStorage.getItem("Numéro de commande");
var proClient = localStorage.getItem("Article");
var refClient = localStorage.getItem("Référence");
var imgClient = localStorage.getItem("Image");
var qteClient = localStorage.getItem("Quantité");
var puClient = localStorage.getItem("Prix unitaire");
var totClient = localStorage.getItem("Total à payer");

// On vérifie que cela s'est correctement déroulé
console.log("Commande enregistrée N° = " + cdeClient);
console.log("ID article = " + refClient);



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

<FORM NAME="formulaire" class="row-formulaire"> 
<legend>Vos coordonnées</legend>

<label class="label"><i class="fas fa-user"></i>&nbsp; Nom <span class="text-danger">*</span></label>
<INPUT class="controle" TYPE="text" NAME="name" VALUE="" placeholder="exemple : DUPONT" required pattern="[a-zA-Z-\.]{3,30}"><BR>
<span class="resultat"></span>

<label class="label"><i class="fas fa-user"></i>&nbsp; Prénom <span class="text-danger">*</span></label>
<INPUT class="controle" TYPE="text" NAME="prenom" VALUE="" placeholder="exemple : Alfred" required><BR>
<span class="resultat"></span>

<label class="label"><i class="fas fa-hotel"></i>&nbsp; Adresse <span class="text-danger">*</span></label>
<INPUT class="controle" TYPE="text" NAME="adresse" VALUE="" placeholder="exemple : 10 rue de la Haute Montée" required><BR>
<span class="resultat"></span>

<label class="label"><i class="fas fa-home"></i>&nbsp; Ville <span class="text-danger">*</span></label>
<INPUT class="controle" TYPE="text" NAME="ville" VALUE="" placeholder="exemple : STRASBOURG" required><BR>
<span class="resultat"></span>

<label class="label"><i class="fas fa-at"></i>&nbsp; Email <span class="text-danger">*</span></label>
<INPUT class="controle" TYPE="email" NAME="email" VALUE="" placeholder="exemple : mail@serveur.com" required><BR>
<span class="resultat"></span>

* tous les champs sont obligatoires

<INPUT class="styled" TYPE="button" NAME="bouton" VALUE="Valider" onClick="controle(formulaire)">
</FORM>							

                            </div>`;


}

// On collecte les données saisies
function controle(formulaire) {
var name = document.formulaire.name.value;
var prenom = document.formulaire.prenom.value;
var adresse = document.formulaire.adresse.value;
var ville = document.formulaire.ville.value;
var email = document.formulaire.email.value;

// On sauvegarde les différentes lignes dans le localStorage
localStorage.setItem("Nom", name);
localStorage.setItem("Prénom", prenom);
localStorage.setItem("Adresse", adresse);
localStorage.setItem("Ville", ville);
localStorage.setItem("Email", email);

 // On vérifie que cela s'est correctement déroulé
console.log("Commande pour " + localStorage.getItem("Nom") + "OK");

// On envoie vers l'API

var contact = [{nom:localStorage.getItem("Nom"), prenom:localStorage.getItem("Prénom"), adresse:localStorage.getItem("Adresse"), ville:localStorage.getItem("Ville"), email:localStorage.getItem("Email")}];
var order = [{Commande:localStorage.getItem("Référence")}];
// Vérification des infos du tableau
console.log(contact); 
console.log(order); 

// On l'envoie avec fetch sur contact

var orderDatas = JSON.stringify({contact, order});
console.log("Info:" + orderDatas);

commande = async function (orderDatas) {
        let commande = await fetch("http://localhost:3000/api/teddies/order/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charser=UTF-8'
            },
            body: commande
        })

        if (commande.ok) {
            return commande.json();
        } else {
            console.log("Error : ", commande.json());
        }
    }



alert("Vos coordonnées ont bien été enregistrées.");
window.open("confirmation.html"); 

}

renderCommande();

