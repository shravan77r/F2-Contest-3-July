
const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en';

function fetchData(type) {
    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
            console.log('Data received:', data);
            if (type === 'list') {
                displayListView(data);
            } else {
                displayGridView(data);
            }
        })
        .catch(error => {
            alert('Error fetching data:', error);
        });
}

fetchData("grid");

function displayGridView(data) {
    let divcontainer = document.getElementById("grid-view");
    
    let generatedhtml = '';

    data.forEach(item => {
    generatedhtml +=`<div class="col-md-3" style="margin-bottom: 15px;">
    <div class="card">
        <div class="image-and-heading">
            <img id="Crimage"
                src="${item.image}"
                alt="img">
            <h3 id="CrId">${item.symbol}</h3>
        </div>
        <p id="CrName">${item.name}</p>
        <span id="Crprice_change_percentage_24h">${item.price_change_percentage_24h}</span>
        <span id="Crcurrent_price">${item.current_price}</span>
        <span id="total_volume"><span>Total Volume:</span> ${item.total_volume}</span>
        <span id="market_cap"><span>Market Cap:</span> ${item.market_cap}</span>
    </div>
</div>`;
    });

    divcontainer.innerHTML = generatedhtml;

}

function displayListView(data) {
    let divcontainer = document.getElementById("tbody");
    
    let generatedhtml = '';
  data.forEach(item => {
    generatedhtml += `
      <tr>
        <td>
        <div class="image-and-heading">
        <img id="Crimage"
            src="${item.image}"
            alt="img">
        <h3 id="CrId">${item.symbol}</h3>
    </div>
    <p id="CrName">${item.name}</p>
    </td>
        <td><span id="Crprice_change_percentage_24h">${item.price_change_percentage_24h}</span></td>
        <td><span id="Crcurrent_price">${item.current_price}</span></td>
        <td><span id="total_volume"><span>Total Volume:</span> ${item.total_volume}</span></td>
        <td><span id="market_cap"><span>Market Cap:</span> ${item.market_cap}</span></td>
     </tr>
    `;
  });
  
  divcontainer.innerHTML = generatedhtml;
}

setTimeout(addevents,200);

function addevents() {

const myUl = document.querySelector('#myTab');
const listItems = myUl.getElementsByTagName('li');

for (let i = 0; i < listItems.length; i++) {
    listItems[i].addEventListener('click', listItemClicked);
  }
}
function listItemClicked(event) {
    const target = event.target;
    if (target.classList.contains('nav-link')) {
      const viewType = target.getAttribute('aria-controls');
      fetchData(viewType);
    }
  }
