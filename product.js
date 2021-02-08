// URL de l'api
const url = "http://localhost:3000/api/teddies/";
// Recupere les paramètres de l'url
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const article = document.querySelector("article");

// Affiche le produit
const displayProduct = async () => {
  const data = await getOneCams(url, id);
  renderCams(data);
  customizeTeddy(article, data.colors);
  addToCart(article, data);
};
// Récupère une caméra
const getOneCams = async (productUrl, productId) => {
  const response = await fetch(productUrl + productId);
  return await response.json();
};
// Fourni l'affichage selon les données du produit
const renderCams = (productData) => {
  article.innerHTML = `
    <div class="product">
        <img src="${productData.imageUrl}" alt="${productData.name}">
        <div class="product-information">
            <h2 class="product-title">${productData.name}</h2>
            <p class="price">${productData.price / 100}</p>
			<p class="description">${productData.description}</p>
            <p class="description">Fait main près de chez vous !</p>
			<p class="description">Personnalisez votre peluche</p>
        </div>
    </div>`;
};

// Personnalise le produit
const customizeTeddy = (parentElt, productColorss) => {
  // Crée liste déroulante
  const label = document.createElement("label");
  const select = document.createElement("select");

  label.setAttribute("for", "colors-list");
  label.textContent = "Couleurs disponibles : ";
  select.id = "colors-list";

  parentElt.appendChild(label).appendChild(select);
  // Crée une balise option pour chaque couleur
  productColorss.forEach((productColors) => {
    const option = document.createElement("option");
    option.value = productColors;
    option.textContent = productColors.toUpperCase();
    select.appendChild(option);
  });
  // Récupère la couleur choisie dans la console
  select.addEventListener("change", (e) => {
    colorChosen = e.target.value.toLowerCase();
  });
};
	// Ajoute le produit au panier
	const addToCart = (parentElt, productData) => {
  // Crée le bouton d'envoie du produit
  const btn = document.createElement("button");
  const div = document.createElement("div");
  btn.textContent = "Ajouter au panier";
  div.classList.add("add-to-cart");
  parentElt.appendChild(div).appendChild(btn);

  // Assigne valeur à envoyer à localStorage
  const product = {
    id: productData._id,
    name: productData.name,
    price: productData.price,
    imageUrl: productData.imageUrl,
    quantity: 1,
  };

  // Envoie valeur à localStorage après un clique
  btn.addEventListener("click", () => {
    // récupérer panier localstorage
    let panier = JSON.parse(localStorage.getItem("panier"));
    if (panier === null) {
      panier = {};
    }
    // ajouter le produit au panier
    if (panier[product.id] !== undefined) {
      panier[product.id].quantity += 1;
    } else {
      panier[product.id] = product;
    }
    // update panier localstorage
    localStorage.setItem("panier", JSON.stringify(panier));
    btn.classList.add("invisible");
    div.textContent = "Le produit a été ajouté au panier !";
	console.log("Produit ajouté au panier " + productData.name);
	console.log("Produit ajouté au panier " + productData.price);
  });
};

displayProduct();
