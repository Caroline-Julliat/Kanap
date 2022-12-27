//Récuppération de l'Id du produit
const pageUrl = window.location.href
const url = new URL(pageUrl)
const productId = url.searchParams.get("id")

let allProducts = []
let pageProduct = []