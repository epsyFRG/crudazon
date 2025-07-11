// Configurazione
const API_URL = "https://striveschool-api.herokuapp.com/api/product/"
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYjhlODc4Y2RkZjAwMTU1ZDY3OTciLCJpYXQiOjE3NTIyMjM2MTEsImV4cCI6MTc1MzQzMzIxMX0.ngERzKuWIR1qVtC5gBhSwDM0p5aM9nd3d06lMeXgwAM"

const detailContainer = document.getElementById("product-detail")
const alertContainer = document.getElementById("alert-container")

function showAlert(message, type = "danger") {
  alertContainer.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`
}

function createDetailCard(product) {
  return `
    <div class="card h-100 shadow">
      <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
      <div class="card-body">
        <h3 class="card-title mb-2">${product.name}</h3>
        <h5 class="card-subtitle mb-2 text-muted">${product.brand}</h5>
        <p class="card-text">${
          product.description || "<em>Nessuna descrizione</em>"
        }</p>
        <div class="fw-bold fs-4 text-primary mb-2">€ ${Number(
          product.price
        ).toFixed(2)}</div>
        <a href="backoffice.html?id=${
          product._id
        }" class="btn btn-outline-primary me-2">Modifica</a>
        <a href="index.html" class="btn btn-secondary">Torna alla Home</a>
      </div>
    </div>
  `
}

async function loadProductDetail() {
  const params = new URLSearchParams(window.location.search)
  const id = params.get("id")
  if (!id) {
    showAlert("ID prodotto mancante nell'URL.")
    detailContainer.innerHTML = ""
    return
  }
  detailContainer.innerHTML =
    '<div class="text-center py-4"><div class="spinner-border text-primary" role="status"></div></div>'
  alertContainer.innerHTML = ""
  try {
    const res = await fetch(API_URL + id, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    })
    if (!res.ok) throw new Error("Prodotto non trovato o errore di rete.")
    const product = await res.json()
    detailContainer.innerHTML = createDetailCard(product)
  } catch (err) {
    showAlert(err.message)
    detailContainer.innerHTML = ""
  }
}

window.addEventListener("DOMContentLoaded", loadProductDetail)
