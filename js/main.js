

function createDB(quotesList){
  let db;
  let request = window.indexedDB.open("MyQuotesDB", 1);
  request.onerror = function(event) {
    console.log('Error loading database.');
  };
  request.onsuccess = function(event) {
    db = event.target.result;
    getAllQuotes(db);
  };

  request.onupgradeneeded = function(event){
    let db= event.target.result;
    db.onerror = function(event) {
        console.log('Error loading database.');
    };
    let objectStore = db.createObjectStore("quotesList",{ autoIncrement : true });
    objectStore.transaction.oncomplete = function(event) {
      // Store values in the newly created objectStore.
      var quotesObjectStore = db.transaction(["quotesList"], "readwrite").objectStore("quotesList");
      quotesList.forEach(function(quote) {
        quotesObjectStore.add(quote);
      });
    };
  }
}

function getAllQuotes(db){
  let savedQuotes = [];
  let objectStore = db.transaction("quotesList").objectStore("quotesList");
  objectStore.openCursor().onsuccess = function(event){
    let cursor = event.target.result;
    if(cursor){
      savedQuotes.push(cursor.value);
      cursor.continue();
    } else {
      showQuotes(savedQuotes);
    }
  }
}

function loadQuotes(){
  fetch('quotes.json')
    .then( (response) => response)
    .then( (response) => response.json())
    .then( (data) => {
       createDB(data);
    })
    .catch( (error) =>{
      alert('error : '+ error);
  });
}

function showQuotes(data){
  setInterval( (data) => {
    var quote = data[Math.floor(Math.random()*data.length)];
    var container = document.querySelector("#quote-container");
    document.querySelector("#the-quote").innerHTML = quote.quote;
    document.querySelector("#the-author").innerHTML =  quote.author;
  }, 10000, data);
}

window.onload = () => {
'use strict';
/*  register service worker */
  if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js');
  }
  loadQuotes();

}
