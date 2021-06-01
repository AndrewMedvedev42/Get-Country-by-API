const buttonElem = document.getElementById("button")
const inputField = document.getElementById("input")
const countryContainer = document.getElementById("country")

buttonElem.addEventListener('click', ()=>{getRequest(inputField.value)})

function getRequest(countryName){
  var request = new XMLHttpRequest()
  request.open('GET',`https://restcountries.eu/rest/v2/name/${countryName}`)
  request.send()

  request.addEventListener('load', function(){
    const [data] = JSON.parse(this.responseText)
    console.log(data);
  
    const html = `
      <article>
        <img src="${data.flag}"/>
        <h1>${data.name}</h1>
        <h2>Capital city: ${data.capital}</h2>
        <p>Population: ${data.population}</p>
      </article>
    `;
    countryContainer.insertAdjacentHTML('beforeend', html)
  })
}



