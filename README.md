<p align="center">
  <img src="https://camo.githubusercontent.com/bc746f7e4446ae41f173933d4f43c02f8febab7cdffc05a64d2aae37c63061d5/68747470733a2f2f666f6e74732e677374617469632e636f6d2f732f652f6e6f746f656d6f6a692f6c61746573742f31663661382f3531322e676966" width="100px" />
</p>

---

## ⚠️ Disclaimer

**THIS PAGE WAS MADE AS A PERSONAL EDUCATIONAL PROJECT.**  
This is **NOT** the official site of the company or brand identified on the page.  
The creator of this page is **NOT affiliated** with the company or brand in any way.  
This page is a personal project made in connection with an educational exercise.

---

## 📦 Consegna


Stai creando la parte front-end di uno shop online. In particolare sarai responsabile della creazione di un back-office, dove gli amministratori possono aggiungere e modificare i prodotti.

L’obiettivo di oggi è connettere un’interfaccia statica alle API per poter ricevere prodotti, crearne di nuovi, modificarli una volta creati e cancellarli all’occorrenza.

Obiettivi generali:
Avere una pagina back-office, in cui si potranno inserire i prodotti specificando i parametri obbligatori e facoltativi, modificare o cancellare il prodotto.
Una homepage, dove l’utente possa vedere i prodotti disponibili
Una pagina di dettaglio in cui visualizzare tutti i dettagli del prodotto.
Tasks:
In Backoffice: usa una POST su /product con un payload per creare una nuova risorsa.
In Backoffice: aggiungi un bottone per la funzionalità di modifica di un prodotto già creato in precedenza (usa una PUT su /product/[PRODUCT_ID]).
In Backoffice: aggiungi un bottone per la cancellazione di uno specifico prodotto già esistente (usa DELETE su /product/[PRODUCT_ID])
In Backoffice: aggiungi una validazione di base per la creazione/modifica del prodotto nel form (non permettere l'invio dei dati con campi vuoti)
In Backoffice: aggiungi un bottone “Reset” per resettare il form.
In Homepage: premendo un bottone “modifica” su un prodotto si dovrà poterlo modificare.
Pagina Dettaglio: A questa pagina ci si arriverà cliccando sulla card in homepage.
EXTRA:
In Backoffice: I bottoni “reset” e “delete” dovranno chiedere conferma prima di procedere con l’operazione.
In Homepage: aggiungi un indicatore di caricamento affianco al titolo principale della pagina durante il caricamento delle risorse.
Crea un sistema di gestione degli errori. Mostra all’utente un messaggio di errore specifico per le varie tipologie di problema, quando qualcosa va storto, attraverso l’utilizzo di componenti di Bootstrap appropriati.

---

