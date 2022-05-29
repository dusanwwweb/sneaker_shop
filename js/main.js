'use strick'

// RANDOM CLIENT ________________________________________________________________________

fetch('https://jsonplaceholder.typicode.com/users')
.then( response => {
    return response.json();
})
.then( data => {
    randomData(data);
})
.catch(err => {
    console.log('error: ' + err);
});


function randomData(data) {
    //Function qui génére un numero aléatoire de 0 à 10
    function getRandomInt(clientsLength) {
        return Math.floor(Math.random() * Math.floor(clientsLength));
    }
    let randomNum = getRandomInt(data.length);
    // console.log(randomNum);

    let client = document.getElementById('addClient');
    
    for (let i = 0; i < data.length; i++) {
        client.innerText = `${data[randomNum].name}`
    }
}


// BURGER ________________________________________________________________________

//
document.getElementById('menu').onclick = function onClickMenu() {
  document.getElementById("menu").classList.toggle("change");
  document.getElementById("lang-nav").classList.toggle("change");
}


//NAVBAR________________________________________________________________________

//Get access to DOM elements
const headerShrink = document.querySelector(".head--container");
const logoShrink = document.querySelector(".head__logo__img");


//Add event listener
window.addEventListener("scroll", () => {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    headerShrink.classList.add("head--container--shrink");
    logoShrink.classList.add("head__logo__img__shrink");
    
  } else {
    headerShrink.classList.remove("head--container--shrink");
    logoShrink.classList.remove("head__logo__img__shrink");
  }
});


// ACHAT________________________________________________________________

import {myArray} from './dataBase.js';

let prodCtn = document.querySelector('.prodCtn');
let prodBuy = document.querySelector('.prodBuy');

let cardDeck =  document.getElementsByClassName('card-deck')[0];
let cardHtml = "";

for (let i = 0; i < myArray.length; i++) {
cardHtml +=  `<div class="col-lg-3 col-md-4 col-sm-6 my-3">
                <div class="card border shadow-lg p-4 m-2 bg-white rounded h-100">
                  <img
                    id="img"
                    src="${myArray[i].url}"
                    class="card-img-top img-fluid zoom"
                    alt="baskets"
                  />
                  <div class="card-body text-center">
                    <h5 class="card-title" style="font-weight: 600;" id="model">${myArray[i].model}</h5>
                    <p class="card-text" id="brand">${myArray[i].brand}</p>
                    <p class="card-text" id="price">${myArray[i].price}&#8364;</p>
                    <form action="">
                      <label for="">Quantité</label>
                      <input
                        type="number"
                        id="qty"
                        class="form-control"
                        placeholder="0"
                        min="0"
                      />
                    </form>
                    <a href="#total" class="btn btn-primary mt-3 border border-white btnTarget" id="btn-${myArray[i].id}">Acheter</a>
                  </div>
                </div>
              </div>`
}

cardDeck.innerHTML = cardHtml;


prodCtn.addEventListener('click', sendToCart);
prodBuy.addEventListener('click', removeFromCart);
// console.log(prodBuy);


function sendToCart(e) {
    if (e.target.classList.contains('btnTarget')) {
        const myCart = e.target.parentElement.parentElement;
        getInfo(myCart);
    }
}

function getInfo(myCart) {
    const cartInfo = {
        img: myCart.querySelector('#img').src,
        brand: myCart.querySelector('#brand').textContent,
        model: myCart.querySelector('#model').textContent,
        qty: myCart.querySelector('#qty').value,
        price: myCart.querySelector('#price').textContent,
    }

   
    if (myCart.querySelector('#qty').value <= 0 || myCart.querySelector('#qty').value == "") {
        alert(`Veuillez choisir le nombre d'articles s'il vous plaît`);
        return;
    } else {
        addToCart(cartInfo)
    }
}

function addToCart(cartInfo) {
    let price = parseInt(cartInfo.price);

    let div = document.createElement('tr');
    div.setAttribute('class', 'line');

    div.innerHTML = `
                    <td><img src="${cartInfo.img}" class="img-fluid baskets" alt="baskets"></td>
                    <td>${cartInfo.brand}</td>
                    <td>${cartInfo.model}</td>
                    <td>${cartInfo.qty}</td>
                    <td>${cartInfo.qty * price}&#8364;</td>
                    <td class="remove" style="cursor: pointer; color: tomato; font-weight: 600;">&#x2716;</td>          
                    `
    prodBuy.appendChild(div);
    
    let allPrix = document.getElementsByClassName('line');
    
    allPrix = Array.from(allPrix);
    console.log(allPrix);
    getTotal(allPrix);
    
}

function getTotal(allPrix) {
    let sum = 0;
    let euro = `&#8364;`
    
    allPrix.forEach(item => {
      sum += parseInt(item.children[4].innerHTML)
    });
    document.getElementById('total').innerHTML = sum + euro;
  }
  
  function removeFromCart(e) {
    let euro = `&#8364;`
    let total = document.getElementById('total').innerHTML;
    let totalParsed = parseInt(total);

    if (e.target.classList.contains('remove')) {
        e.target.parentElement.remove();
        let myPrice = parseInt(e.target.parentElement.children[4].innerHTML);
        document.getElementById('total').innerHTML = (totalParsed - myPrice) + euro;
    }
}