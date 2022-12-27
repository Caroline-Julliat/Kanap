const resultContainer = document.getElementById("items")
let allProducts = []

// Récuppération des données de l'API
async function fetchProducts() {
  await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => (allProducts = data))

  console.log(allProducts)
}
