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

//sets typed sybols, from input field, for getRequest() as prop
buttonElem.addEventListener('click', ()=>{getRequest(inputField.value)})

const loadingMessage = document.getElementById("loadingMessage")
const articleElem = document.getElementById("displayContent")
const articleElem2 = document.getElementById("displayContent2")

//Up here is all imports of html elements by their ID

//Function that hides loading message
function hideLoadTheMessage(){
  loadingMessage.classList.add("elementIsNotVisible")
  console.log("message is removed");
}

//Function that opens loading message
function loadTheMessage(){
  loadingMessage.classList.remove("elementIsNotVisible")
  console.log("message is added");
}

//Hides country containers during loading
function hideElement(){
  articleElem.classList.add("elementIsNotVisible")
  articleElem2.classList.add("elementIsNotVisible")
  console.log("hidden");
}

//Open country containers when loading is finished
function showElemnt(){
  articleElem.classList.remove("elementIsNotVisible")
  articleElem2.classList.remove("elementIsNotVisible")
  console.log("visible");
}

//The main function and which accepts requesta
function getRequest(prop){
  //Takes prop from input field and sets a name to get a requested country info
  const link = `https://restcountries.eu/rest/v2/name/${prop}`
  hideElement()
  loadTheMessage()

  fetch(link)
    .then((res)=>{return res.json()})
    .then((data)=>{ 
      //sets data to the correct places
      console.log(data[0]);
      imageFlag.src = data[0].flag
      countryName.textContent = data[0].name
      populationSection.textContent = `Population: ${data[0].population}`
      capitalSection.textContent = `Capital City: ${data[0].capital}`

      //declares a neighbour of the requested country
      const neighbour = data[0].borders[0]

      return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`)
    })
    .then((res)=>{return res.json()})
    .then((data)=>{ 
      //if country does not have neighbour it hides description and returns "Neighbour not found"
      if(data.status == 400){
        console.log("Neighbour not found")
        countryName2.textContent = "This country does not have a neighbour"
        imageFlag2.classList.add("elementIsNotVisible")
        populationSection2.classList.add("elementIsNotVisible")
        capitalSection2.classList.add("elementIsNotVisible")
        hideLoadTheMessage()
        showElemnt()
      }else{

        console.log(data);
        imageFlag2.src = data.flag
        imageFlag2.classList.remove("elementIsNotVisible")

        countryName2.textContent = data.name
        countryName2.classList.remove("elementIsNotVisible")

        populationSection2.textContent = `Population: ${data.population}`
        populationSection2.classList.remove("elementIsNotVisible")

        capitalSection2.textContent = `Capital City: ${data.capital}`
        capitalSection2.classList.remove("elementIsNotVisible")
        hideLoadTheMessage()
        showElemnt()
      }
    }).catch(err=>reload())
}

//Message to reload if error had occurred by hiding load message and showing current results
function reload(){
  alert("An error has occurred!!")
          hideLoadTheMessage()
          showElemnt()
}

hideLoadTheMessage()
getRequest("USA")