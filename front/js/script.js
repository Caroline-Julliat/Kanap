const resultContainer = document.getElementById("items")
let allProducts = []

// Récuppération des données de l'API
async function fetchProducts() {
  await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => (allProducts = data))

  console.log(allProducts)
}

//Affichage des produits
async function displayProducts() {
  await fetchProducts()

  for (let i = 0; i < allProducts.length; i++) {
    const lien = document.createElement("a")
    resultContainer.appendChild(lien)
    lien.href = `./product.html?id=${allProducts[i]._id}`

    const article = document.createElement("article")
    lien.appendChild(article)

    const img = document.createElement("img")
    img.src = allProducts[i].imageUrl
    img.alt = allProducts[i].altTxt

    const h3 = document.createElement("h3")
    h3.classList.add("productName")
    h3.textContent = allProducts[i].name

    const p = document.createElement("p")
    p.classList.add("productDescription")
    p.textContent = allProducts[i].description

    article.appendChild(img)
    article.appendChild(h3)
    article.appendChild(p)
  }
}

displayProducts()
