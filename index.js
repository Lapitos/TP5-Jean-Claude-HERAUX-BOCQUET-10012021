// déclaration de la variable format tableau

let listeIdArticles = [];

// connexion à l'API 

let xhr = (data) => {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest()
        xhr.open("GET", data.url);

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {

                if (xhr.status == 200 || xhr.status == 201) {
                    resolve(xhr.responseText);
                } else {
                    reject(new TypeError(xhr.statusText))
                }
            }
        }
        xhr.onerror = function() {
            setTimeout(function() {
                reject(new TypeError('Erreur Réseau'))
            }, 0)
        }
        xhr.send();
    })
}

/* On importe les articles depuis l'api vers le localStorage */

const importProduit = () => {
	
    /* On récupère de l'API le tableau des articles et le copie dans le localStorage */
	
    xhr({ url: "http://localhost:3000/api/teddies" })
        .then(response => {
            localStorage.setItem("teddies", response);
            affichage();
        })
        .catch(error => {
            console.error(error);
        })

}

const afficheProduits = () => {
	
        /* On récupère les produits stockés dans le localStorage et les affichent sur la page*/
		
        let html = "";
        var elements;
		
        /* On test l’existence des articles dans le localStorage et récupère le tableau  */
		
        if (localStorage.getItem("teddies")) {
            elements = JSON.parse(localStorage.getItem("teddies"));
        } else {
            console.error("Attention : chargement impossible");
            return;
        }
        /* On vérifie que le tableau n'est pas null et mise en place du html */
		
        if (elements != null) {
            html += "<div class=\"categorie\"><span class=\"titre-cate\">";
            html += "Catégorie : Ours en peluche 100% fait main";
            html += "</span>";
            for (var article of elements) {
                let image = article.imageUrl;
                let nom = article.name;
                let prix = article.price;
                prix /= 100;
                let id = article._id;
                listeIdArticles.push(id);

                html += "<a href=\"#\" id=\"" + id + "\"><div class=\"objet\">";
                html += "<img class=\"img-produit\" src=\"" + image + "\">";
                html += "<h3>" + nom + "</h3>";
				html += "Tarif : <h3>" + prix + "€</h3>";
                html += "</div></a>";
            }
            html += "</div>";
        } else {
            console.error("Attention : Extraction impossible du localStorage");
        }
        document.getElementById("produits").innerHTML = html;
    }
    /* On vérifie le clic avec les ID  */
	
const actionsClick = (event) => {
    if (event.target.parentElement.parentElement.getAttribute('id') || event.target.parentElement.getAttribute('id')) {
        if (event.target.parentElement.parentElement.getAttribute('id')) {
            var identifiant = event.target.parentElement.parentElement.getAttribute('id');
        } else {
            var identifiant = event.target.parentElement.getAttribute('id');
        }
		
		//Évite que l'évènement courant ne se propage plus loin
        event.stopPropagation();
		//Indique si l'événement n'est pas traité explicitement
        event.preventDefault();
		
        /* On définie la clé article du localStorage avec l'id */
		
        if (listeIdArticles.includes(identifiant)) {
            localStorage.setItem("article", identifiant);
			
            /* On redirige l'utilisateur vers la page produit */
			
            window.location.href = "article_teddy.html?id=" + identifiant;
        } else {
            console.error("Attention : ID incorrect ! ");
        }
    } else {
        console.error("Attention : Echec lors de la récupération de l'ID");
    }

}

const affichage = () => {

    /* On affiche les articles sous formes de liste */
	
    afficheProduits();

    /* On écoute le clic sur les différents articles */
	
    for (var id of listeIdArticles) {
        document.getElementById(id).addEventListener("click", actionsClick.bind(event));
    }
}

/* On importe les articles et lancement de l'affichage */

importProduit();