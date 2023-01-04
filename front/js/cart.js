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

function displayCartProducts() {
  basket = getBasket()
  const totalQuantityContainer = document.getElementById("totalQuantity")
  const totalPriceContainer = document.getElementById("totalPrice")
  let totalQuantity = 0
  let totalPrice = 0

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

    //Calcul et affichage total quantité
    totalQuantity += basket[i].quantity
    totalQuantityContainer.textContent = totalQuantity

    //Calcul et affichage total prix
    totalPrice += basket[i].quantity * selectedProduct[0].price
    totalPriceContainer.textContent = totalPrice
  }
}

// Changer la quantité d'un produit
function quantityChange() {
  const itemInputsQuantity = document.querySelectorAll(".itemQuantity")
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

      location.reload()
    })
  })
}

// Supprimer un produit du panier
function deleteProduct() {
  const itemButtonsDelete = document.querySelectorAll(".deleteItem")
  basket = getBasket()
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

async function displayAndSettingProducts() {
  await fetchProducts()
  await displayCartProducts()
  quantityChange()
  deleteProduct()
}

displayAndSettingProducts()

//Controle du formulaire

const formDiv = document.querySelectorAll(".cart__order__form__question")
const regexText = /^[a-z àâäçéèêëîïôöùûüÿ'-]+$/i
const regexAddress = /^[0-9a-z àâäçéèêëîïôöùûüÿ'-]+$/i
const regexEmail = /^[\w_.-]+@[\w-]+\.[a-z]{2,4}$/i

let firstName, lastName, address, city, email

function firstNameChecker(value) {
  const firstNameErrorMsg = document.getElementById("firstNameErrorMsg")
  if (!value.match(regexText)) {
    firstNameErrorMsg.textContent = "Veuillez rentrer un prénom valide"
  } else {
    firstNameErrorMsg.textContent = ""
    firstName = value
  }
}

function lastNameChecker(value) {
  const lastNameErrorMsg = document.getElementById("lastNameErrorMsg")
  if (!value.match(regexText)) {
    lastNameErrorMsg.textContent = "Veuillez rentrer un nom valide"
  } else {
    lastNameErrorMsg.textContent = ""
    lastName = value
  }
}

function adressChecker(value) {
  const addressErrorMsg = document.getElementById("addressErrorMsg")
  if (!value.match(regexAddress)) {
    addressErrorMsg.textContent = "Veuillez rentrer une adresse valide"
  } else {
    addressErrorMsg.textContent = ""
    address = value
  }
}

function cityChecker(value) {
  const cityErrorMsg = document.getElementById("cityErrorMsg")
  if (!value.match(regexText)) {
    cityErrorMsg.textContent = "Veuillez rentrer un nom de ville valide"
  } else {
    cityErrorMsg.textContent = ""
    city = value
  }
}

function emailChecker(value) {
  const emailErrorMsg = document.getElementById("emailErrorMsg")
  if (!value.match(regexEmail)) {
    emailErrorMsg.textContent = "Veuillez rentrer un email valide"
  } else {
    emailErrorMsg.textContent = ""
    email = value
  }
}

formDiv.forEach((input) => {
  input.addEventListener("input", (e) => {
    if (e.target.id === "firstName") {
      firstNameChecker(e.target.value)
    } else if (e.target.id === "lastName") {
      lastNameChecker(e.target.value)
    } else if (e.target.id === "address") {
      adressChecker(e.target.value)
    } else if (e.target.id === "city") {
      cityChecker(e.target.value)
    } else if (e.target.id === "email") {
      emailChecker(e.target.value)
    }
  })
})

const form = document.querySelector(".cart__order__form")
let orderPostRequest = []

form.addEventListener("submit", (e) => {
  e.preventDefault()
  if (firstName && lastName && address && city && email) {
    let arrayIdProducts = []
    for (let i = 0; i < basket.length; i++) {
      arrayIdProducts.push(basket[i].id)
    }
    let bodyRequest = {
      contact: {
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        email: email,
      },
      products: arrayIdProducts,
    }

    // async function FetchPostRequest () {

    async function FetchPostRequest() {
      await fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify(bodyRequest),
        headers: {
          Accept: "application/json; charset=UTF-8",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => orderId = data.orderId)

        console.log(orderId);

        // firstName.value = ""
        // lastName.value = ""
        // address.value = ""
        // city.value = ""
        // email.value = ""


        alert("Votre commande à bien été enregistré")

        window.location.href =`./confirmation.html?orderId=${orderId}`
    }

    FetchPostRequest()


  }
})
