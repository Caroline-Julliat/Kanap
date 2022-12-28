const resultContainer = document.getElementById("items")

let allProducts = []

async function fetchProducts() {
  await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => (allProducts = data))

  console.log(allProducts)
}


// METHODE DISPLAY INNER HTML / MAP
async function displayProducts() {
  await fetchProducts()
  resultContainer.innerHTML = allProducts
    .map((product) => {
      return `
    <a href="./product.html?id=42">
    <article>
      <img src=${product.imageUrl} alt=${product.altTxt}>
      <h3 class="productName">${product.name}</h3>
      <p class="productDescription">${product.description}</p>
    </article>
  </a>
  `
    })
    .join("")
}

displayProducts()

// METHODE DISPLAY INNER HTML / FOR OF
async function displayProducts2() {
    await fetchProducts()
    for (const product of allProducts) {
      resultContainer.innerHTML += `
              <a href="./product.html?id=42">
              <article>
                <img src=${product.imageUrl} alt=${product.altTxt}>
                <h3 class="productName">${product.name}</h3>
                <p class="productDescription">${product.description}</p>
              </article>
            </a>
            `
    }
  }