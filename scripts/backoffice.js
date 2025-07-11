// Configurazione
const API_URL = "https://striveschool-api.herokuapp.com/api/product/"
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYjhlODc4Y2RkZjAwMTU1ZDY3OTciLCJpYXQiOjE3NTIyMjM2MTEsImV4cCI6MTc1MzQzMzIxMX0.ngERzKuWIR1qVtC5gBhSwDM0p5aM9nd3d06lMeXgwAM"

const form = document.getElementById("product-form")
const alertContainer = document.getElementById("alert-container")
const productsList = document.getElementById("products-list")
const resetBtn = document.getElementById("reset-btn")
const submitBtn = document.getElementById("submit-btn")

let editId = null // Se diverso da null, stiamo modificando

// Utility
function showAlert(message, type = "danger") {
  alertContainer.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`
}

function clearAlert() {
  alertContainer.innerHTML = ""
}

function getFormData() {
  return {
    name: form.name.value.trim(),
    brand: form.brand.value.trim(),
    imageUrl: form.imageUrl.value.trim(),
    price: form.price.value.trim(),
    description: form.description.value.trim(),
  }
}

function setFormData(product) {
  form.name.value = product.name || ""
  form.brand.value = product.brand || ""
  form.imageUrl.value = product.imageUrl || ""
  form.price.value = product.price || ""
  form.description.value = product.description || ""
}

function resetForm() {
  form.reset()
  editId = null
  submitBtn.textContent = "Salva"
}

// Validazione base
function validateForm(data) {
  return data.name && data.brand && data.imageUrl && data.price
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
          <span class="badge bg-primary">€ ${Number(product.price).toFixed(
            2
          )}</span>
        </div>
        <div class="d-flex gap-2 w-100 justify-content-end mt-2">
          <button class="btn" title="Modifica" onclick="editProduct('${
            product._id
          }')">
            <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='currentColor' class='bi bi-pencil' viewBox='0 0 16 16'><path d='M12.146.854a.5.5 0 0 1 .708 0l2.292 2.292a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 12.207 6.086 9.914 3.793 11.207 2.5zm1.586 3.207L10.5 3.414 3 10.914V13h2.086l7.707-7.707z'/></svg>
          </button>
          <button class="btn" title="Elimina" onclick="deleteProduct('${
            product._id
          }')">
            <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='currentColor' class='bi bi-trash' viewBox='0 0 16 16'><path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5.5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6zm3 .5a.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6z'/><path fill-rule='evenodd' d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1 0-2h3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3a.5.5 0 0 0-.5.5V4a.5.5 0 0 0 .5.5H3v9a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3V4.5h.5a.5.5 0 0 0 .5-.5v-.5a.5.5 0 0 0-.5-.5h-11z'/></svg>
          </button>
        </div>
      </div>
    </div>
  </div>`
}

// Carica prodotti
async function loadProducts() {
  productsList.innerHTML =
    '<div class="text-center py-4"><div class="spinner-border text-primary" role="status"></div></div>'
  clearAlert()
  try {
    const res = await fetch(API_URL, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    })
    if (!res.ok) throw new Error("Errore nel caricamento prodotti")
    const products = await res.json()
    if (!Array.isArray(products) || products.length === 0) {
      productsList.innerHTML =
        '<div class="col-12"><div class="alert alert-info">Nessun prodotto disponibile.</div></div>'
      return
    }
    productsList.innerHTML = products.map(createProductCard).join("")
  } catch (err) {
    showAlert(err.message)
    productsList.innerHTML = ""
  }
}

// Aggiungi o modifica prodotto
form.addEventListener("submit", async function (e) {
  e.preventDefault()
  clearAlert()
  const data = getFormData()
  if (!validateForm(data)) {
    showAlert("Compila tutti i campi obbligatori (*)", "warning")
    return
  }
  try {
    let res
    if (editId) {
      // Modifica
      res = await fetch(API_URL + editId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        showAlert("Errore nella modifica del prodotto")
        return
      }
      showAlert("Prodotto modificato con successo!", "success")
    } else {
      // Crea
      res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        showAlert("Errore nella creazione del prodotto")
        return
      }
      showAlert("Prodotto creato con successo!", "success")
    }
    resetForm()
    loadProducts()
  } catch (err) {
    showAlert(err.message)
  }
})

// Ripristino elimina prodotto con conferma alert
window.deleteProduct = async function (id) {
  if (!confirm("Sei sicuro di voler eliminare questo prodotto?")) return
  clearAlert()
  try {
    const res = await fetch(API_URL + id, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${TOKEN}` },
    })
    if (!res.ok) throw new Error("Errore nell'eliminazione del prodotto")
    showAlert("Prodotto eliminato con successo!", "success")
    loadProducts()
    resetForm()
  } catch (err) {
    showAlert(err.message)
  }
}

// Modifica prodotto (carica dati nel form)
window.editProduct = async function (id) {
  clearAlert()
  try {
    const res = await fetch(API_URL + id, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    })
    if (!res.ok) throw new Error("Errore nel recupero del prodotto")
    const product = await res.json()
    setFormData(product)
    editId = id
    submitBtn.textContent = "Modifica"
    window.scrollTo({ top: 0, behavior: "smooth" })
  } catch (err) {
    showAlert(err.message)
  }
}

// Se arrivo da homepage con ?id=... carico il prodotto da modificare
window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search)
  const id = params.get("id")
  loadProducts()
  if (id) {
    window.editProduct(id)
  }

  // Modale reset
  const resetBtn = document.getElementById("reset-btn")
  const resetModal = new bootstrap.Modal(document.getElementById("resetModal"))
  const confirmResetBtn = document.getElementById("confirmResetBtn")
  resetBtn.addEventListener("click", function (e) {
    e.preventDefault()
    resetModal.show()
  })
  confirmResetBtn.addEventListener("click", function () {
    resetForm()
    resetModal.hide()
  })

  // Modale elimina
  let deleteId = null
  const deleteModal = new bootstrap.Modal(
    document.getElementById("deleteModal")
  )
  const confirmDeleteBtn = document.getElementById("confirmDeleteBtn")
  window.deleteProduct = function (id) {
    deleteId = id
    deleteModal.show()
  }
  confirmDeleteBtn.addEventListener("click", async function () {
    if (!deleteId) return
    clearAlert()
    try {
      const res = await fetch(API_URL + deleteId, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${TOKEN}` },
      })
      if (!res.ok) throw new Error("Errore nell'eliminazione del prodotto")
      showAlert("Prodotto eliminato con successo!", "success")
      loadProducts()
      resetForm()
    } catch (err) {
      showAlert(err.message)
    }
    deleteId = null
    deleteModal.hide()
  })
})
