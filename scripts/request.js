const global = document.querySelector('.global-dados');
const brasil = document.querySelector('.brasil-dados');

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("https://api.covid19api.com/summary", requestOptions)
  .then(response => response.json())
  .then(result => {

    global.innerHTML = `
    <li><span class ="info" >Casos Confirmados:</span>${result.Global.TotalConfirmed} </li>
    <li><span class ="info" >Pacientes recuperados:</span>${result.Global.TotalRecovered}</li>
    <li><span class ="info" >Mortes:</span>${result.Global.TotalDeaths}</li>
    </ul>
    `;
  })
  .catch(error => console.log('error', error));


fetch("https://api.covid19api.com/live/country/brazil/status/confirmed", requestOptions)
  .then(response => response.json())
  .then(result => {
    const r = result[2];
     brasil.innerHTML = `
    <li><span class ="info" >Casos Confirmados:</span>${r.Confirmed}</li>
    <li><span class ="info" >Pacientes recuperados:</span>${r.Recovered}</li>
    <li><span class ="info" >Mortes:</span>${r.Deaths}</li>
    </ul>
    `;
  })
  .catch(error => console.log('error', error));

for(let x=0; x<=200;x++){
if(x%3 == 0){
  console.log('fizz = ',x);
}if(x%5 == 0){
  console.log('buzz = ',x);
}else{
  console.log(x);
}
};