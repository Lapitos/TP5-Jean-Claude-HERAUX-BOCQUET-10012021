
// Connexion et obtention des objets

async function getTeddies() {
    let url = 'http://localhost:3000/api/teddies';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

// affichage dans la page HTML

async function renderTeddies() {
    let Teddies = await getTeddies();
    let html = '';
	
    Teddies.forEach(teddy => {
        let htmlSegment = `<div class="teddy">
                            <img src="${teddy.imageUrl}" >
                            <h1>${teddy.name}</h1>
							<h1>Au prix exceptionnel de ${teddy.price/100}€</h1>
                            <a href="produit.html?id=${teddy._id}">Commander maintenant votre exemplaire</a>
							
                        </div>`;

        html += htmlSegment;
    });
	
	

    let container = document.querySelector('.container');
    container.innerHTML = html;
}

renderTeddies();