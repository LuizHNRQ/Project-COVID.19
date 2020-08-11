const global = document.querySelector('.global-dados');
const brasil = document.querySelector('.brasil-dados');
const searchByCountry = document.getElementById('s-country');
const form = document.querySelector('form');
const showCountry = document.querySelector('.pais-reporte h3');
const searchedCountry = document.querySelector('.search-data');
const exibInfo = document.querySelector('.pais-reporte');

//Get data
let today = new Date();
today.setDate(today.getDate() - 1);
let yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 2);

today = today.toISOString().slice(0, 10);
yesterday = yesterday.toISOString().slice(0, 10);

console.log(today);
console.log(yesterday);

//request

let requestOptions = {
  method: 'GET',
  redirect: 'follow',
};

function fetchData() {
  fetch('https://api.covid19api.com/summary', requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      console.log(result.Countries);
      global.innerHTML = `
    <li><span class ="info" >Casos Confirmados:</span>${result.Global.TotalConfirmed} </li>
    <li><span class ="info" >Pacientes recuperados:</span>${result.Global.TotalRecovered}</li>
    <li><span class ="info" >Mortes:</span>${result.Global.TotalDeaths}</li>
    </ul>
    `;
    })
    .catch((error) => console.log('error', error));
}

fetchData();

fetch(
  `https://api.covid19api.com/country/brazil?from=${yesterday}T00:00:00Z&to=${today}T00:00:00Z`,
  requestOptions
)
  .then((response) => response.json())
  .then((result) => {
    console.log(result);
    console.log('aqui->>>>', result[1]);
    const r = result[1];
    brasil.innerHTML = `
    <li><span class ="info" >Casos Confirmados:</span>${r.Confirmed}</li>
    <li><span class ="info" >Pacientes recuperados:</span>${r.Recovered}</li>
    <li><span class ="info" >Mortes:</span>${r.Deaths}</li>
    </ul>
    `;
  })
  .catch((error) => console.log('error', error));

form.addEventListener('submit', function (e) {
  e.preventDefault();
  console.log(searchByCountry.value);
  exibInfo.classList.remove('oculto');

  showCountry.innerHTML = `${searchByCountry.value}`;
  fetch(
    `https://api.covid19api.com/country/${searchByCountry.value}?from=${yesterday}T00:00:00Z&to=${today}T00:00:00Z`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      console.log('aqui->>>>', result[1]);
      const r = result[1];
      searchedCountry.innerHTML = `
    <li><span class ="info" >Casos Confirmados:</span>${r.Confirmed}</li>
    <li><span class ="info" >Pacientes recuperados:</span>${r.Recovered}</li>
    <li><span class ="info" >Mortes:</span>${r.Deaths}</li>
    </ul>
    `;
    })
    .catch((error) => console.log('error', error));
});
