// Configurazione
const API_URL = "https://striveschool-api.herokuapp.com/api/product/"
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYjhlODc4Y2RkZjAwMTU1ZDY3OTciLCJpYXQiOjE3NTIyMTc4MzIsImV4cCI6MTc1MzQyNzQzMn0.j-h1SIJVWMQp4YNvgs8OeJtsXCHkP9DghAGLEikAiT0"

const loader = document.getElementById("loader")
const productsList = document.getElementById("products-list")
const alertContainer = document.getElementById("alert-container")

// Mostra loader
function showLoader() {
  loader.classList.remove("d-none")
}
function hideLoader() {
  loader.classList.add("d-none")
}

// Mostra alert Bootstrap
function showAlert(message, type = "danger") {
  alertContainer.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`
}

// Crea una card prodotto
function createProductCard(product) {
  return `<div class="col-md-4">
    <div class="card h-100 d-flex flex-column justify-content-between">
      <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
      <div class="card-body d-flex flex-column justify-content-end p-3" style="flex:1 1 auto;">
        <div class="mt-auto card-info-min">
          <h5 class="card-title mb-0">${product.name}</h5>
          <span class="card-text brand mb-0">${product.brand}</span>
          <span class="badge-prezzo">€ ${Number(product.price).toFixed(
            2
          )}</span>
        </div>
        <div class="d-flex gap-2 w-100 justify-content-end mt-2">
          <button class="btn" title="Dettaglio" onclick="window.location.href='dettaglio.html?id=${
            product._id
          }'">
            <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='currentColor' class='bi bi-eye' viewBox='0 0 16 16'><path d='M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.12 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.133 13.133 0 0 1 1.172 8z'/><path d='M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm0 1a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z'/></svg>
          </button>
          <button class="btn" title="Modifica" onclick="window.location.href='backoffice.html?id=${
            product._id
          }'">
            <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='currentColor' class='bi bi-pencil' viewBox='0 0 16 16'><path d='M12.146.854a.5.5 0 0 1 .708 0l2.292 2.292a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 12.207 6.086 9.914 3.793 11.207 2.5zm1.586 3.207L10.5 3.414 3 10.914V13h2.086l7.707-7.707z'/></svg>
          </button>
        </div>
      </div>
    </div>
  </div>`
}

// Carica prodotti dall'API
async function loadProducts() {
  showLoader()
  alertContainer.innerHTML = ""
  try {
    const res = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
    if (!res.ok) {
      throw new Error(`Errore nel caricamento prodotti: ${res.status}`)
    }
    const products = await res.json()
    if (!Array.isArray(products) || products.length === 0) {
      productsList.innerHTML =
        '<div class="col-12"><div class="alert alert-info">Nessun prodotto disponibile.</div></div>'
      hideLoader()
      return
    }
    productsList.innerHTML = products.map(createProductCard).join("")
  } catch (err) {
    showAlert(err.message, "danger")
    productsList.innerHTML = ""
  } finally {
    hideLoader()
  }
}

// Avvio
window.addEventListener("DOMContentLoaded", loadProducts)
