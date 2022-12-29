let allProducts = []
let basket = []

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

// Fonction d'affichage des produits

async function displayCartProducts() {
  await fetchProducts()
  basket = getBasket()

  for (let i = 0; i < basket.length; i++) {
    selectedProduct = allProducts.filter(
      (product) => product._id == basket[i].id
    )

    const cartItemsContainer = document.getElementById("cart__items")

    const article = document.createElement("article")
    article.classList.add("cart__item")
    article.dataset.id = basket[i].id
    article.dataset.color = basket[i].color

    const divImg = document.createElement("div")
    divImg.classList.add("cart__item__img")

    const img = document.createElement("img")
    img.src = selectedProduct[0].imageUrl
    img.alt = selectedProduct[0].altTxt

    const divContent = document.createElement("div")
    divContent.classList.add("cart__item__content")

    const divContentDescription = document.createElement("div")
    divContentDescription.classList.add("cart__item__content__description")

    const h2Name = document.createElement("h2")
    h2Name.textContent = selectedProduct[0].name

    const pColor = document.createElement("p")
    pColor.textContent = basket[i].color

    const pPrice = document.createElement("p")
    pPrice.textContent = selectedProduct[0].price + " €"

    const divContentSetting = document.createElement("div")
    divContentSetting.classList.add("cart__item__content__settings")

    const divQuantity = document.createElement("div")
    divQuantity.classList.add("cart__item__content__settings__quantity")

    const pQuantity = document.createElement("p")
    pQuantity.textContent = "Qté : "

    const inputQuantity = document.createElement("input")
    inputQuantity.type = "number"
    inputQuantity.classList.add("itemQuantity")
    inputQuantity.name = "itemQuantity"
    inputQuantity.min = "1"
    inputQuantity.max = "100"
    inputQuantity.setAttribute("value", "0")
    inputQuantity.value = basket[i].quantity

    const divDelete = document.createElement("div")
    divDelete.classList.add("cart__item__content__settings__delete")

    const pDelete = document.createElement("p")
    pDelete.classList.add("deleteItem")
    pDelete.textContent = "Supprimer"

    cartItemsContainer.appendChild(article)

    article.appendChild(divImg)
    article.appendChild(divContent)

    divImg.appendChild(img)

    divContent.appendChild(divContentDescription)
    divContent.appendChild(divContentSetting)

    divContentDescription.appendChild(h2Name)
    divContentDescription.appendChild(pColor)
    divContentDescription.appendChild(pPrice)

    divContentSetting.appendChild(divQuantity)
    divContentSetting.appendChild(divDelete)

    divQuantity.appendChild(pQuantity)
    divQuantity.appendChild(inputQuantity)

    divDelete.appendChild(pDelete)
  }
}

//Fonction pour lier les paramètre du panier au local Storage

async function linkBasketToLS() {
  await displayCartProducts()
  const itemInputsQuantity = document.querySelectorAll(".itemQuantity")
  const itemButtonsDelete = document.querySelectorAll(".deleteItem")
  
  basket = getBasket()

  itemInputsQuantity.forEach((itemInput) => {
    itemInput.addEventListener("change", (e) => {
      let getIdForChange = e.path[4].dataset.id
      let getColorForChange = e.path[4].dataset.color
      let getValueForChange = parseInt(e.target.value)
      let foundProductToChange = basket.find(
        (p) => (p.id && p.color) === (getIdForChange && getColorForChange)
      )

      foundProductToChange.quantity = getValueForChange
      localStorage.setItem("basket", JSON.stringify(basket))
    })
  })

  itemButtonsDelete.forEach((itemButton) => {
    itemButton.addEventListener("click", (e) => {
      let getIdForDelete = e.path[4].dataset.id
      let getColorForDelete = e.path[4].dataset.color
      
      basket = basket.filter(
        (p) => (p.id && p.color) !== (getIdForDelete && getColorForDelete)
      )

      localStorage.setItem("basket", JSON.stringify(basket))

      location.reload()
    })
  })


}

linkBasketToLS()

