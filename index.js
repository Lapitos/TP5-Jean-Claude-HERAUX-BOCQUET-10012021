// URL de l'api
const url = "http://localhost:3000/api/teddies";

// Affiche tous les produits
const displayProducts = async () => {
  const products = await getAllTeddies(url);
  products.forEach((product) => {
    renderProduct(product.name, product._id, product.imageUrl, product.price);
  });
};
// Récupère toutes les peluches
const getAllTeddies = async (url) => {
  const response = await fetch(url);
  return await response.json();
};

// Affichage des produits
function renderProduct(productName, productId, productImg, productPrice) {
// div qui contiendra les différents articles
  const products = document.querySelector("#products"); 
  const article = document.createElement("article");
  article.innerHTML = `<img alt="${productName}" src="${productImg}">
    <button class="product-link" type="button"><a href="product.html?id=${productId}">Voir ce produit</a></button>
    <p class="product-title">Modèle : ${productName}</p>
    <p class="price">Prix : ${productPrice / 100}</p>
    `;
  products.appendChild(article);
}

displayProducts();
