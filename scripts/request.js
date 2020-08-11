const global = document.querySelector('.global-dados');
const brasil = document.querySelector('.brasil-dados');
const searchByCountry = document.getElementById('s-country');
const form = document.querySelector('form');

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
};

function fetchData() {
  fetch('https://api.covid19api.com/summary', requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
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
});

/*
fetch(
  'https://api.covid19api.com/total/country/brazil/status/confirmed',
  requestOptions
)
  .then((response) => response.json())
  .then((result) => {
    console.log(result);
    const r = result[2];
    brasil.innerHTML = `
    <li><span class ="info" >Casos Confirmados:</span>${r.Confirmed}</li>
    <li><span class ="info" >Pacientes recuperados:</span>${r.Recovered}</li>
    <li><span class ="info" >Mortes:</span>${r.Deaths}</li>
    </ul>
    `;
  })
  .catch((error) => console.log('error', error));*/
