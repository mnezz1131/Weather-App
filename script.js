// 1. Setup the fetch request to get data DONE
// 2. Add button and search input add eventlistener
// 3. Create function to fetch the data from API and pass in value
// 4. Add elements to the page

const fetchWeather = (dataInput) => {
  const ApiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${dataInput}&appid=b0ae55b6c429d2b3beee108ecdbd660e`
  console.log("making our request")

  fetch(ApiUrl)
    .then((res) => {
      return res.json()
    })
    .then((resJSON) => {
      // console.log(resJSON);
      renderList(resJSON)

    })
    .catch((err) => {

      console.error(`ERROR: ${err}`)
    });
}

const renderList = (resJSON) => {
    let searchResults = resJSON;
    //Selecting location class adding Location and country
    const locationDiv = document.querySelector(".location");
    //empties the div for next search
    locationDiv.innerHTML = "";

    const nameTag = document.createElement("p")
    const countryTag = document.createElement("p")

    nameTag.innerText = `${searchResults.name}, ${searchResults.sys.country}`

    locationDiv.append(nameTag, countryTag)
    //#################################################################################

    const tempTag = document.createElement('UL');
    locationDiv.appendChild(tempTag)

    const tempConvert = (resJSON) => {

        const mainTemp = searchResults.main.temp
        const feelsLike = searchResults.main.feels_like
        const tempMin = searchResults.main.temp_min
        const tempMax = searchResults.main.temp_max

        const tempArr = [mainTemp, feelsLike, tempMin, tempMax]

        for (let i = 0; i < tempArr.length; i++) {
          const kelvin = `${Math.round(tempArr[i])}\u00B0K`
          const celsius = `${Math.round(tempArr[i] - 273.15)}\u00B0C`
          const faren = `${Math.round((tempArr[i] - 273.15) * 9 / 5) + 32}\u00B0F`
        
          const tempElem = document.createElement("li")
          if(i===0){
            tempElem.innerText = `Main Temp: ${faren}, ${celsius}, ${kelvin}`
          } else if (i===1) {
            tempElem.innerText = `Feels Like: ${faren}, ${celsius}, ${kelvin}`
          } else if (i===2) {
            tempElem.innerText = `Temp Min: ${faren}, ${celsius}, ${kelvin}`
          } else if (i === 3) {
            tempElem.innerText = `Temp Max: ${faren}, ${celsius}, ${kelvin}`
          }
      // tempElem.innerText = `${faren}, ${celsius}, ${kelvin}`
      tempTag.appendChild(tempElem)
    }
  }
  tempConvert()
    //#################################################################################
  const otherTag= document.createElement("p")
  otherTag.innerText = `Humidity: ${searchResults.main.humidity}, Pressure: ${searchResults.main.pressure} `
  locationDiv.appendChild(otherTag)
  // console.log(searchResults.main.pressure) //Pressure in Pascal = need mb
  // console.log(searchResults.main.humidity)
  // console.log(searchResults.wind)
  // console.log(searchResults.wind.speed)
  // console.log(searchResults.wind.deg)
  // console.log(searchResults.wind.gust)

  
  // console.log(searchResults.visibility)



















}


const button = document.querySelector("button");

button.addEventListener("click", (evObj) => {
  evObj.preventDefault();
  console.log("clicked yo")
  const dataInput = document.querySelector("#LctnInpt").value
  console.log(`My data Input = ${dataInput}`)
  fetchWeather(dataInput);
})