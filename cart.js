const cart = document.querySelector("#cart"); // Récupère la section du panier
const cartTotal = document.getElementById("cart-total"); //Récupère le h3 pour le prix total
const form = document.querySelector("form"); // Récupère le formulaire

const cartInformation = {
  contact: {},
  products: [],
};
/* Stock le prix total */
let totalPrice = 0;

// Affiche les produits du panier.
const displayCart = async () => {
  const cartItems = JSON.parse(localStorage.getItem("panier"));
  if (Object.keys(cartItems).length > 0) {
    for (let i = 0; i < Object.keys(cartItems).length; i++) {
      // Pour chaque article du panier
      const itemId = Object.keys(cartItems)[i];
	  // Récupère les informations du produit
      const product = await getItem(itemId); 
	  // Stockage de l'id du produit
      const tedId = product._id; 
	  // Stockage du nom du produit
      const tedName = product.name; 
	  // Stockage du prix du produit
      const tedPrice = product.price / 100; 
	  // Stockage de l'image du produit
      const tedImg = product.imageUrl; 
      const tedQuantity = cartItems[itemId].quantity;
	  // Envoie de l'id au tableau products de cartInformation
      cartInformation.products.push(tedId); 
	  // Rendu des produits du panier
      renderCart(tedName, tedPrice, tedImg, tedQuantity); 

      const remove = document.querySelectorAll(".remove")[i];
      const article = document.querySelectorAll("article")[i];
      const iconLeft = document.querySelectorAll(".fa-minus")[i];
      const iconRight = document.querySelectorAll(".fa-plus")[i];

      deleteCart(remove, article, itemId);
      decrementItem(iconLeft, article, itemId); // appel de la fonction décrémentation avec la flèche de gauche
      incrementItem(iconRight, article, itemId); // appel de la fonction incrémentation avec la flèche de droite
    }
  } else {
    cart.textContent = "Votre panier est vide.";
    form.classList.add("invisible");
  }
};
// Récupère élément dans localStorage
const getItem = async (productId) => {
  const response = await fetch(
    "http://localhost:3000/api/teddies/" + productId
  );
  return await response.json();
};
// Fourni l'affichage du/des produits du panier
const renderCart = (productName, productPrice, imgUrl, productQuantity) => {
  /* Affiche article(s) du panier */
  const article = document.createElement("article");
  article.innerHTML = `
    <img src="${imgUrl}">
    <div class="product-information>
        <p class="product-title">Modèle : ${productName}</p>
        <p class="price">${productPrice}</p>
    </div>
    <p class="quantity"><i class="fas fa-minus">&nbsp;&nbsp;${productQuantity}&nbsp;&nbsp;</i><i class="fas fa-plus"></i></p>
    <p class="remove "><i class="fas fa-times"></i> &nbsp;&nbsp;&nbsp;&nbsp;</p>`;
  cart.insertBefore(article, cartTotal); // Insère article avant cartTotal
  totalPrice += productPrice * productQuantity; /* Implémente prix */
  cartTotal.textContent = `Net à payer : ${totalPrice}€`; /* Affiche le prix total */
};
/* Supprime élément du panier sur un clique*/
const deleteCart = (removeElt, container, productId) => {
  removeElt.addEventListener("click", async () => {
    const panier = JSON.parse(localStorage.getItem("panier"));
    if (panier === null) return;
    if (panier[productId] === undefined) return;
    else {
      delete panier[productId];
    }
    localStorage.setItem("panier", JSON.stringify(panier));
    // ); /* Supprime item du localStorage */
    container.remove(); /* Supprime item du DOM */
    location.reload(true); /* Actualise la page dynamiquement */
  });
};

// décrémente et enlève un produit au panier avec la flèche de gauche

const decrementItem = (iconLeft, container, productId) => {
  iconLeft.addEventListener("click", () => {
    const panier = JSON.parse(localStorage.getItem("panier"));
    if (panier === null) return;
    if (panier[productId] === undefined) return;
    if (panier[productId].quantity > 1) {
      panier[productId].quantity--;
    } else {
      delete panier[productId];
    }
    localStorage.setItem("panier", JSON.stringify(panier));
    // ); /* Supprime item du localStorage */
    container.remove(); /* Supprime item du DOM */
    location.reload(true);
  });
};

// incremente et rajoute un produit au panier avec la flèche de droite

const incrementItem = (iconRight, container, productId) => {
  iconRight.addEventListener("click", () => {
    const panier = JSON.parse(localStorage.getItem("panier"));
    if (panier === null) return;
    if (panier[productId] === undefined) return;
    if (panier[productId].quantity >= 1) {
      panier[productId].quantity++;
    } else {
      delete panier[productId];
    }
    localStorage.setItem("panier", JSON.stringify(panier));
    // ); /* Supprime item du localStorage */
    container.remove(); /* Supprime item du DOM */
    location.reload(true);
  });
};

displayCart();

const containNumber = /[0-9]/;
const regexEmail = /.+@.+\..+/;
const specialCharacter = /[$&+,:;=?@#|'<>.^*()%!"{}_"]/;

const isNotEmpty = (value) => (value !== "" ? true : false); // Vérifie que la valeur donnée ne soit pas vide
const isLongEnough = (value) => (value.length >= 2 ? true : false); // Vérifie que la valeur donnée ait assez de caractère
const doNotContainNumber = (value) =>
  !value.match(containNumber) ? true : false; // Vérifie que la valeur donnée ne possède pas de chiffre
const doNotContainSpecialCharacter = (value) =>
  !value.match(specialCharacter) ? true : false; // Vérifie que la valeur donnée ne possède pas de symbole
const isValidEmail = (value) => (value.match(regexEmail) ? true : false); // Vérifie que la valeur donnée soit bien dans le format email

const isValidInput = (value) =>
  isNotEmpty(value) &&
  isLongEnough(value) &&
  doNotContainNumber(value) &&
  doNotContainSpecialCharacter(value); // renvoie true si toutes les conditions sont vérifiées

// Récupère les éléments du formulaire
const firstName = form.elements.firstName;
const lastName = form.elements.lastName;
const address = form.elements.address;
const city = form.elements.city;
const email = form.elements.email;
const btn = document.getElementById("btn");

const firstNameErrorMessage = document.getElementById("firstNameErrorMessage");
const lastNameErrorMessage = document.getElementById("lastNameErrorMessage");
const addressErrorMessage = document.getElementById("addressErrorMessage");
const cityErrorMessage = document.getElementById("cityErrorMessage");
const emailErrorMessage = document.getElementById("emailErrorMessage");

//Permet de vérifier les saisies utilisateurs
const formValidate = () => {
  if (isValidInput(firstName.value)) {
    firstNameErrorMessage.textContent = "";

    if (isValidInput(lastName.value)) {
      lastNameErrorMessage.textContent = "";

      if (isNotEmpty(address.value) && isLongEnough(address.value)) {
        addressErrorMessage.textContent = "";

        if (isValidInput(city.value)) {
          cityErrorMessage.textContent = "";

          if (isValidEmail(email.value)) {
            emailErrorMessage.textContent = "";

            return (cartInformation.contact = {
              // si valide, on renvoie l'objet contact à cartInformation
              firstName: firstName.value,
              lastName: lastName.value,
              address: address.value,
              city: city.value,
              email: email.value,
            });
          } else {
            emailErrorMessage.textContent = "Adresse mail manquante ";
            email.focus();
            return false;
          }
        } else {
          cityErrorMessage.textContent = "Ville manquante";
          city.focus();
          return false;
        }
      } else {
        addressErrorMessage.textContent = "Adresse manquante";
        address.focus();
        return false;
      }
    } else {
      lastNameErrorMessage.textContent = " Nom manquant";
      lastName.focus();
      return false;
    }
  } else {
    firstNameErrorMessage.textContent = "Prénom manquant";
    firstName.focus();
    return false;
  }
};
// Envoie données à l'api
const postData = async (method, url, dataElt) => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    body: JSON.stringify(dataElt),
  });
  return await response.json();
};

btn.addEventListener("click", async (e) => {
  e.preventDefault();
  // Validation du formulaire
  const validForm = formValidate(); 
  if (validForm !== false) {
	  // Envoi des données au serveur
    const response = await postData(
      "POST",
      "http://localhost:3000/api/teddies/order",
      cartInformation
    ); 
	// Redirige vers la page de confirmation de commande
    window.location = `./confirmation.html?id=${response.orderId}&price=${totalPrice}&user=${firstName.value}`; // On vide la localStorage
    localStorage.removeItem("panier");
  }
});

if (!localStorage.getItem("panier")) {
  // vérifie que le localStorage est vide, on cache le formulaire et on insère le texte
  cart.textContent = "Votre panier est vide.";
  form.classList.add("invisible");
}
