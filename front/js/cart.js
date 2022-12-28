let allProducts = []

// Récuppération des données de l'API
async function fetchProducts() {
  await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => (allProducts = data))

  console.log(allProducts)
}

//Fonction pour la récupération du panier à partir du Local Storage
function getBasket() {
  basket = localStorage.getItem("basket")

  if (basket == null) {
    return []
  } else {
    return JSON.parse(basket)
  }
}

basket = getBasket()


// Affichage du panier


