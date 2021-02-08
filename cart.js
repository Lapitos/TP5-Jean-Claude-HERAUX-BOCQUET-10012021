// Constante pour récupérer le panier
const cart = document.querySelector("#cart"); 
// Constante pour le prixtotal du panier
const cartTotal = document.getElementById("cart-total");
// Constante pour les éléments du formulaire
const form = document.querySelector("form");

// Mise en forme pour l'envoi à l'API sous la forme qu'il désire
const cartInformation = {
  contact: {},
  products: [],
};

// Prix total initial remis à 0
let totalPrice = 0;

// On récupère les produits du panier.
const displayCart = async () => {
  const cartItems = JSON.parse(localStorage.getItem("panier"));
  if (Object.keys(cartItems).length > 0) {
	  // Pour chaque article du panier
    for (let i = 0; i < Object.keys(cartItems).length; i++) {
      const itemId = Object.keys(cartItems)[i];
	  // On récupère les informations du produit
      const product = await getItem(itemId); 
	  // Stockage de l'id du produit
      const tedId = product._id; 
	  // Stockage du nom du produit
      const tedName = product.name; 
	  // Stockage du prix du produit en euros
      const tedPrice = product.price / 100; 
	  // Stockage de l'image du produit
      const tedImg = product.imageUrl; 
      const tedQuantity = cartItems[itemId].quantity;
	  // Envoi de l'id au tableau products de cartInformation
      cartInformation.products.push(tedId); 
	  // Rendu des produits du panier
      renderCart(tedName, tedPrice, tedImg, tedQuantity); 
	  // Constante pour l'enlèvement d'un produit et le changement de quantité
      const remove = document.querySelectorAll(".remove")[i];
      const article = document.querySelectorAll("article")[i];
      const iconLeft = document.querySelectorAll(".fa-minus")[i];
      const iconRight = document.querySelectorAll(".fa-plus")[i];

      deleteCart(remove, article, itemId);
	  // appel de la fonction décrémentation symbole -
      decrementItem(iconLeft, article, itemId); 
	  // appel de la fonction incrémentation symbole +
      incrementItem(iconRight, article, itemId); 
    }
  } else {
    cart.textContent = "Votre panier est vide.";
    form.classList.add("invisible");
  }
};
// On récupère les infos avec l'ID produit
const getItem = async (productId) => {
  const response = await fetch(
    "http://localhost:3000/api/teddies/" + productId
  );
  return await response.json();
};

// Constante pour affichage du/des produits du panier
const renderCart = (productName, productPrice, imgUrl, productQuantity) => {
// Création des éléments pour affichage des articles
  const article = document.createElement("article");
  article.innerHTML = `
    <img src="${imgUrl}">
    <div class="product-information>
        <p class="product-title">Modèle : ${productName}</p>
        <p class="price">${productPrice}</p>
    </div>
    <p class="quantity"><i class="fas fa-minus">&nbsp;&nbsp;${productQuantity}&nbsp;&nbsp;</i><i class="fas fa-plus"></i></p>
    <p class="remove "><i class="fas fa-times"></i> &nbsp;&nbsp;&nbsp;&nbsp;</p>`;
// On insère article avant cartTotal	
  cart.insertBefore(article, cartTotal); 
// On insère le prix
  totalPrice += productPrice * productQuantity; 
// On insère le prix total
  cartTotal.textContent = `Net à payer : ${totalPrice}€`; 
};
// Si clic sur suppression, on enlève le produit
const deleteCart = (removeElt, container, productId) => {
  removeElt.addEventListener("click", async () => {
    const panier = JSON.parse(localStorage.getItem("panier"));
    if (panier === null) return;
    if (panier[productId] === undefined) return;
    else {
      delete panier[productId];
    }
    localStorage.setItem("panier", JSON.stringify(panier));
    container.remove(); 
// on réactualise la page avec reload
    location.reload(true); 
  });
};

// décrémentation et enlève un produit au panier avec l'icone -

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
    // ); 
    container.remove(); 
// on réactualise la page
    location.reload(true);
  });
};

// incrémentation avec l'icone +

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
    // ); 
    container.remove(); 
// on réactualise la page
    location.reload(true);
  });
};

displayCart();

// partie pour le formulaire et la vérification des éléments saisis

const containNumber = /[0-9]/;
const regexEmail = /.+@.+\..+/;
const specialCharacter = /[$&+,:;=?@#|'<>.^*()%!"{}_"]/;

// on vérifie que la valeur n'est pas vide
const isNotEmpty = (value) => (value !== "" ? true : false); 
// on vérifié qu'il y a plus de 2 caractères
const isLongEnough = (value) => (value.length >= 2 ? true : false); 
// pas de chiffre pour cette valeur
const doNotContainNumber = (value) =>
  !value.match(containNumber) ? true : false; 
// pas de symbole pour cette valeur
const doNotContainSpecialCharacter = (value) =>
  !value.match(specialCharacter) ? true : false; 
// format email pour cette valeur
const isValidEmail = (value) => (value.match(regexEmail) ? true : false); 

// renvoie true si toutes les conditions sont vérifiées
const isValidInput = (value) =>
  isNotEmpty(value) &&
  isLongEnough(value) &&
  doNotContainNumber(value) &&
  doNotContainSpecialCharacter(value); 

// On récupère les éléments du formulaire
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
			
 // si valide, on renvoie l'objet contact à cartInformation
            return (cartInformation.contact = {
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
// On envoie les données à l'api
const postData = async (method, url, dataElt) => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    body: JSON.stringify(dataElt),
  });
  return await response.json();
  console.log("Données" + posData + "envoyées à l'API")
};

// On écoute le clic
btn.addEventListener("click", async (e) => {
  e.preventDefault();
// On valide le formulaire
  const validForm = formValidate(); 
  if (validForm !== false) {
// On envoie les données à l'API
    const response = await postData(
      "POST",
      "http://localhost:3000/api/teddies/order",
      cartInformation
    ); 
// On redirige vers la page de confirmation de commande avec les paramètres da
    window.location = `./confirmation.html?id=${response.orderId}&price=${totalPrice}&user=${firstName.value}`; 
	
// On vide le localStorage
    localStorage.removeItem("panier");
  }
});

if (!localStorage.getItem("panier")) {
// vérifie que le localStorage est vide, on cache le formulaire et on insère le texte
  cart.textContent = "Votre panier est vide.";
  form.classList.add("invisible");
}
