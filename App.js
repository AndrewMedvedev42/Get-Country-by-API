const imageFlag = document.getElementById("image")
const countryName = document.getElementById("name")
const populationSection = document.getElementById("population")
const capitalSection = document.getElementById("capital")

const imageFlag2 = document.getElementById("image2")
const countryName2 = document.getElementById("name2")
const populationSection2 = document.getElementById("population2")
const capitalSection2 = document.getElementById("capital2")

const buttonElem = document.getElementById("button")
const inputField = document.getElementById("input")
const countryContainer = document.getElementById("country")

buttonElem.addEventListener('click', ()=>{getRequest(inputField.value)})

function getRequest(prop){
  const link = `https://restcountries.eu/rest/v2/name/${prop}`

  fetch(link)
    .then((res)=>{return res.json()})
    .then((data)=>{ 
      console.log(data[0]);
      imageFlag.src = data[0].flag
      countryName.textContent = data[0].name
      populationSection.textContent = `Population: ${data[0].population}`
      capitalSection.textContent = `Capital City: ${data[0].capital}`
      const neighbour = data[0].borders[0]

      return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`)
    })
    .then((res)=>{return res.json()})
    .then((data)=>{ 
      if(data.status == 400){
        console.log("Neighbour not found")
        countryName2.textContent = "This country does not have a neighbour"
        imageFlag2.src = ""
        populationSection2.textContent = ""
        capitalSection2.textContent = ""
      }else{
        console.log(data);
        imageFlag2.src = data.flag
        countryName2.textContent = data.name
        populationSection2.textContent = `Population: ${data.population}`
        capitalSection2.textContent = `Capital City: ${data.capital}`
      }

    
    }).catch(err=>alert("Please, specify a Country name correctly!"))
}

getRequest("USA")