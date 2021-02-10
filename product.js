// Constante de l'URL de l'api
const url = "http://localhost:3000/api/teddies/";
// On récupère l'ID du produit
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
console.log("ID récupéré : " + id);

const article = document.querySelector("article");

// Mise en place de l'affiche le produit
const displayProduct = async () => {
  const data = await getTeddy(url, id);
  renderTeddy(data);
  customizeTeddy(article, data.colors);
  addToCart(article, data);
};

// Récupère une peluche
const getTeddy = async (productUrl, productId) => {
  const response = await fetch(productUrl + productId);
  return await response.json();
};

// Constitution des éléments pour l'insertion via innerHTML
const renderTeddy = (productData) => {
  article.innerHTML = `
    <div class="product">
        <img src="${productData.imageUrl}" alt="${productData.name}">
        <div class="product-information">
            <h2 class="product-title">${productData.name}</h2>
            <p class="price">${productData.price / 100}</p>
			<p class="description">${productData.description}</p>
            <p class="description">Fait main près de chez vous !</p>
			<p class="description">Choisissez votre couleur.</p>
			<p class="description">La quantité peut-être modifiée au panier.</p>
        </div>
    </div>`;
};

// Personnalisation du produit avec les options
const customizeTeddy = (parentElt, productColors) => {
  // Création de la liste déroulante
  const label = document.createElement("label");
  const select = document.createElement("select");

  label.setAttribute("for", "colors-list");
  label.textContent = "Couleurs disponibles : ";
  select.id = "colors-list";

  parentElt.appendChild(label).appendChild(select);
  // Création d'une balise option pour chaque couleur
  productColors.forEach((productColors) => {
    const option = document.createElement("option");
    option.value = productColors;
    option.textContent = productColors.toUpperCase();
    select.appendChild(option);
  });
  // Récupère la couleur choisie
  select.addEventListener("change", (e) => {
    colorChosen = e.target.value.toLowerCase();
  });
};
	// On ajoute le produit au panier
	const addToCart = (parentElt, productData) => {
  // Création d'un bouton d'envoi
  const btn = document.createElement("button");
  const div = document.createElement("div");
  btn.textContent = "Ajouter au panier";
  div.classList.add("add-to-cart");
  parentElt.appendChild(div).appendChild(btn);

  // Constante Produit pour envoi dans le localStorage
  const product = {
    id: productData._id,
    name: productData.name,
    price: productData.price,
    imageUrl: productData.imageUrl,
    quantity: 1,
  };

  // On écoute le clic pour envoyer le tout au LocalStorage
  btn.addEventListener("click", () => {
    // On récupére le panier localstorage
    let panier = JSON.parse(localStorage.getItem("panier"));
    if (panier === null) {
      panier = {};
    }
    // On ajoute le produit au panier
    if (panier[product.id] !== undefined) {
      panier[product.id].quantity += 1;
    } else {
      panier[product.id] = product;
    }
    // On met à jour le panier localstorage
    localStorage.setItem("panier", JSON.stringify(panier));
    btn.classList.add("invisible");
    div.textContent = "Le produit a été ajouté au panier !";
	console.log("Produit ajouté au panier " + productData.name);
	console.log("Produit ajouté au panier " + productData.price);
  });
};

displayProduct();
