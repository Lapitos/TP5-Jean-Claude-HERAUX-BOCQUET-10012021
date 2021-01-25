const afficheProduit = (idArticle) => {
	
    /* récupère les produits stocké dans le localStorage et affiche sur la page celui sélectionné depuis l'index*/
	
    var elements;
	
    /* vérifie l'existence de l'article dans le localStorage et on récupère le contenu */
	
    if (localStorage.getItem("teddies")) {
        elements = JSON.parse(localStorage.getItem("teddies"));
    } else {
        console.error("Récupérations des articles impossible");
        return;
    }
    /* On vérifie que le contenu du localStorage n'est pas null */
	
    if (elements != null && Array.isArray(elements)) {
		
        /* On compare l'idArticle avec l'id des articles */
		
        for (var article of elements) {
            if (article._id == idArticle) {
				
                /* Détails de l'article et variable html */
				
                let html = "";
                let image = article.imageUrl;
                let nom = article.name;
                let colors = article.colors;
                let prix = article.price;
                prix /= 100;
                let description = article.description;
                let id = article._id;

                html += "<div class=\"objet\"  id=\"" + id + "\">";
                html += "<img class=\"img-produit img-article\" src=\"" + image + "\">";
                html += "<div class=\"detail-article\" ><h3>" + nom + "</h3>";
                html += "<label for=\"couleurs\">Couleurs : </label>";
                html += "<select name=\"couleurs\" id=\"couleurs\">";
				
                /* création d'une ligne d'options pour les couleurs */
				
                for (let option of colors) {
                    html += "<option value=\"" + option + "\">" + option + "</option>";
                }
                html += "</select>";
                html += "<p>" + description + "</p>";
                html += "<div class=\"prix\">Prix : " + prix + "€</div>";
				
				/* Création d'un bouton pour la commande */
				
                html += "<button class=\"bouton\" id=\"bouton\" type=\"button\"";
                html += ">Ajouter au panier</button><span id=\"deja-panier\"></span>";
                html += "</div></div>";
				
                /* ajoute le contenu de la variable html au DOM */
				
                document.getElementById("article").innerHTML = html;
				
                /* contrôle la présence de l'article dans le panier */
                controlPresencePanier(id);
            }
        }
    } else {
        console.error("Attention : Extraction impossible du localStorage");
    }
}

/* On vérifie si le panier existe et si l'article est déjà dedans */

const controlPresencePanier = (id) => {
    if (localStorage.getItem("panier")) {
        var panier = JSON.parse(localStorage.getItem("panier"));
        if (panier != null && Array.isArray(panier)) {
            if (panier.includes(id)) {
                document.getElementById("bouton").disabled = true;
                document.getElementById("deja-panier").innerHTML = "Cet article est déjà dans votre panier";
            }
        } else {
            console.error("Lecture du contenu du panier impossible");
        }

    }
}

/* On récupère l'article cliqué sur la page d'index */

const urlParams = new URLSearchParams(window.location.search);
const idArticleSelectionne = urlParams.get('id');

/* affiche la fiche de l'article */

afficheProduit(idArticleSelectionne);

/* surveillance du clic sur le bouton ajouté au panier et gestion du cas ou il y est déjà présent */

document.getElementById("bouton").addEventListener("click", function(event) {
    event.stopPropagation;
    let identifiant;
	
    /* On récupère l'id de l'article */
	
    if (document.getElementById("bouton").parentElement.parentElement.getAttribute('id')) {
        identifiant = document.getElementById("bouton").parentElement.parentElement.getAttribute('id');
    } else {
        console.error("Attention : Récupération de l'id impossible");
        return;
    }
    var panier = [];
	
    /* On désactive le bouton "ajouter au panier" */
	
    document.getElementById("bouton").disabled = true;
	
    /* On ajoute l'id au panier avec gestion de présence */
	
    if (localStorage.panier) {
        panier = JSON.parse(localStorage.getItem("panier"));
        if (Array.isArray(panier)) {
            if (panier.find(element => element == identifiant)) {
                document.getElementById("deja-panier").innerHTML = "Cet article est déjà dans votre panier.";
                return 0;
            } else {
                panier.push(identifiant);
            }
        } else {
            console.error("Contenu du panier invalide");
            return;
        }
    } else {
        panier = [identifiant];
    }
    localStorage.setItem("panier", JSON.stringify(panier));
    document.getElementById("deja-panier").innerHTML = "Cet article a été ajouté à votre panier.";
});