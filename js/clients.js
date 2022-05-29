'use strict'

fetch('https://jsonplaceholder.typicode.com/users')
.then( response => {
    return response.json();
})
.then( data => {
    appendData(data);
})
.catch(err => {
    console.log('error: ' + err);
});

function appendData(data) {
  let mainContainer = document.getElementById("myData");
    
  for (let i = 0; i < data.length; i++) {
      let div = document.createElement("li");
      div.innerHTML = `${data[i].name} - ${data[i].email}`
      mainContainer.appendChild(div);

      div.className = 'client list-group-item'
  }
  
}



