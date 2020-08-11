const global = document.querySelector('.global-dados');
const brasil = document.querySelector('.brasil-dados');
const searchByCountry = document.getElementById('s-country');
const form = document.querySelector('form');
const showCountry = document.querySelector('.pais-reporte h3');

var requestOptions = {
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

form.addEventListener('submit', function (e) {
  e.preventDefault();
  console.log(searchByCountry.value);

  showCountry.innerHTML = `${searchByCountry.value}`;
  fetch(
    `https://api.covid19api.com/country/${searchByCountry.value}?from=2020-08-09T00:00:00Z&to=2020-08-10T00:00:00Z`,
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
});

fetch(
  'https://api.covid19api.com/country/brazil?from=2020-08-09T00:00:00Z&to=2020-08-10T00:00:00Z',
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
