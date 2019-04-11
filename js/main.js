window.onload = () => {
  'use strict';

    /*  register service worker */
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js');
    }



     fetch('quotes.json').then(function(response){
                 return response.json();
              }).then(function(data){
                  setInterval(function(){
                        var quote = data[Math.floor(Math.random()*data.length)];
                        var container = document.querySelector("#quote-container");
                        document.querySelector("#the-quote").innerHTML = quote.quote;
                        document.querySelector("#the-author").innerHTML =  quote.author;
                    } , 10000);
              }).catch(function(error){
                    alert('error : '+ error);
              })


}


