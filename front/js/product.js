//Récuppération de l'Id du produit
const pageUrl = window.location.href
const url = new URL(pageUrl)
const productId = url.searchParams.get("id")

let allProducts = []
let pageProduct = []

//Fonction de récuppération des données
async function fetchProducts() {
  await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => (allProducts = data))

  pageProduct = allProducts.filter((product) => product._id == productId)
  console.log("pageProduct =")
  console.log(pageProduct)
}

// Fonction d'affichage des données
async function displayProduct() {
  await fetchProducts()

  const itemImgContainer = document.querySelector(".item__img")
  const itemImg = document.createElement("img")
  const itemName = document.getElementById("title")
  const itemPrice = document.getElementById("price")
  const itemDescription = document.getElementById("description")
  const itemColors = document.getElementById("colors")

  itemImg.src = pageProduct[0].imageUrl
  itemImg.alt = pageProduct[0].altTxt
  itemImgContainer.appendChild(itemImg)
  itemName.textContent = pageProduct[0].name
  itemPrice.textContent = pageProduct[0].price
  itemDescription.textContent = pageProduct[0].description

  for (const color of pageProduct[0].colors) {
    let colorOption = document.createElement("option")
    colorOption.setAttribute("value", color)
    colorOption.textContent = color
    itemColors.appendChild(colorOption)
  }
}

displayProduct()

//Récuppération des données dans le panier (Local Storage)

let basket = []

//Fonction pour le stockage du panier dans le Local Storage
function saveBasket() {
  localStorage.setItem("basket", JSON.stringify(basket))
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

//Fonction d'ajout des produits dans le panier
function addBasket(product) {
  basket = getBasket()

  let foundSameProduct = basket.find(
    (p) => (p.id && p.color) === (product.id && product.color)
  )
  console.log(foundSameProduct)

  if (foundSameProduct !== undefined) {
    foundSameProduct.quantity = foundSameProduct.quantity + product.quantity
    saveBasket(basket)
  } else {
    basket.push(product)
    saveBasket(basket)
  }
}

// Evenement au clic : récupération des données séléctionnées et enregistrement dans le panier
addToCart.addEventListener("click", () => {
  let productData = {
    id: productId,
    quantity: parseInt(quantity.value),
    color: colors.value,
  }

  console.log(productData);

  if (productData.color === "") {
    alert("Veuillez séléctionner une couleur")
  } else if (productData.quantity === 0) {
    alert("Veuillez séléctionner une quantité")
  } else {
      addBasket(productData)
  }
})
