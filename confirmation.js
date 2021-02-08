// on récupère les infos contenues dans l'URL

const orderInformation = window.location.search.substr(1).split("&");
const orderId = orderInformation[0].replace("id=", "");
const totalPrice = orderInformation[1].replace("price=", "");
const userName = orderInformation[2].replace("user=", "");

// on replace les éléments dans le corps de la confirmation

console.log((document.querySelector(".user").textContent += " " + userName));
document.querySelector(".order-id").textContent += " " + orderId;
document.querySelector(".price").textContent += " " + totalPrice;
