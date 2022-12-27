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