const global = document.querySelector('.global-dados');
const brasil = document.querySelector('.brasil-dados');
const searchByCountry = document.getElementById('s-country');
const form = document.querySelector('form');
const showCountry = document.querySelector('.pais-reporte h3');
const searchedCountry = document.querySelector('.search-data');
const exibInfo = document.querySelector('.pais-reporte');

//Get data
let today = new Date();
let yesterday = new Date();
today.setDate(today.getDate() - 1);
yesterday.setDate(yesterday.getDate() - 2);

today = today.toISOString().slice(0, 10);
yesterday = yesterday.toISOString().slice(0, 10);

//request
let requestOptions = {
  method: 'GET',
  redirect: 'follow',
};

//request data from world
function fetchData() {
  fetch('https://api.covid19api.com/summary', requestOptions)
    .then((response) => response.json())
    .then((result) => {
      global.innerHTML = `
    <li><span class ="info" >Casos Confirmados:</span>${result.Global.TotalConfirmed} </li>
    <li><span class ="info verde" >Pacientes recuperados:</span>${result.Global.TotalRecovered}</li>
    <li><span class ="info vermelho" >Mortes:</span>${result.Global.TotalDeaths}</li>
    </ul>
    `;
    })
    .catch((error) => console.log('error', error));
}

function fetchCustomData(country, element) {
  fetch(
    `https://api.covid19api.com/country/${country}?from=${yesterday}T00:00:00Z&to=${today}T00:00:00Z`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      const r = result[0];

      element.innerHTML = `
    <li><span class ="info" >Casos Confirmados:</span>${r.Confirmed}</li>
    <li><span class ="info verde" >Pacientes recuperados:</span>${r.Recovered}</li>
    <li><span class ="info vermelho" >Mortes:</span>${r.Deaths}</li>
    </ul>
    `;
    })
    .catch((error) => {
      console.log('error', error);
      searchedCountry.classList.add('oculto');
      showCountry.innerHTML = `País não Encontrado`;
    });
}

//call the API

fetchData(); //call the request
fetchCustomData('brazil', brasil);

//submit form event listner
form.addEventListener('submit', function (e) {
  e.preventDefault();
  exibInfo.classList.remove('oculto');

  if (searchByCountry.value.length <= 3) {
    showCountry.innerHTML = `Entrada Inválida`;
    searchedCountry.classList.add('oculto');
  } else {
    searchedCountry.classList.remove('oculto');
    showCountry.innerHTML = `${searchByCountry.value}`;
    fetchCustomData(searchByCountry.value, searchedCountry);
  }
});
