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
      getCoord(resJSON)
    })
    .catch((err) => {

      console.error(`ERROR: ${err}`)
    });
}

const renderList = (resJSON) => {
  let searchResults = resJSON;
  console.log(searchResults)
  //Selecting location class adding Location and country
  const locationDiv = document.querySelector(".location");
  //empties the div for next search
  locationDiv.innerHTML = "";

  const nameTag = document.createElement("p")
  nameTag.innerText = `${searchResults.name}, ${searchResults.sys.country}`
  nameTag.style.backgroundColor = "gold"
  nameTag.style.borderBlockStyle = "solid"
  nameTag.style.fontSize = "20px"
  const clouds = document.createElement("p")
  clouds.innerText = `Clouds: ${searchResults.weather[0].description}`
  const otherTag = document.createElement("p")
  otherTag.innerText = `Humidity: ${searchResults.main.humidity}%, Pressure: ${searchResults.main.pressure}`

  locationDiv.append(nameTag)
  locationDiv.appendChild(clouds)
  locationDiv.appendChild(otherTag)

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
      if (i === 0) {
        tempElem.innerText = `Main Temp: ${faren},  ${celsius},  ${kelvin}`
      } else if (i === 1) {
        tempElem.innerText = `Feels Like: ${faren},  ${celsius},  ${kelvin}`
      } else if (i === 2) {
        tempElem.innerText = `Temp Low: ${faren},  ${celsius},  ${kelvin}`
      } else if (i === 3) {
        tempElem.innerText = `Temp High: ${faren},  ${celsius},  ${kelvin}`
      }
      // tempElem.innerText = `${faren}, ${celsius}, ${kelvin}`
      tempTag.appendChild(tempElem)
    }
  }
  tempConvert()
  const windTag = document.createElement('p');
  locationDiv.appendChild(windTag)
  windTag.innerText = `Wind Speed: ${Math.round(searchResults.wind.speed*2.23694)} mph`
  locationDiv.appendChild(windTag)
}
// !################################################ WEEKLY FORECAST SECTION ################################################################################

const getCoord = (resJSON) => {
  let lat = resJSON.coord.lat
  let lon = resJSON.coord.lon
  lat = Number(lat.toFixed(2).value)
  lon = Number(lon.toFixed(2).value)

  console.log(typeof lat, lat, typeof lon, lon)

  const fetchForecast = (lat, lon) => {

    const forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=59.91&lon=10.75&units=imperial&exclude=minutely.hourly,current&appid=b0ae55b6c429d2b3beee108ecdbd660e`
    console.log("making our request")

    fetch(forecastUrl)
      .then((res) => {
        return res.json()
      })
      .then((resJSON) => {
       // console.log(resJSON);
        renderDaily(resJSON)
      })
      .catch((err) => {
        console.error(`ERROR: ${err}`)
      });
  }
  fetchForecast();
}

const renderDaily = (resJSON) => {
  const dailySearch = resJSON.daily
  console.log(dailySearch[7].dt)

  // const unixTime = dailySearch[7].dt
  // const date = new Date(unixTime*1000);
  // console.log(date.toLocaleDateString("en-US"));
  //https://www.codegrepper.com/code-examples/javascript/convert+date+to+unix+timestamp+javascript

  
  // const foreCastDiv = document.querySelector(".forecast");
  // const forecastUL = document.createElement('UL')
  // forecastUL.classList.add("foreCastUl")
  // foreCastDiv.appendChild(forecastUL)

  for (i = 0; i < dailySearch.length; i++) {
    console.log(dailySearch[i])

    console.log(new Date(dailySearch[i].dt * 1000).toLocaleDateString("en-us"))
    console.log(dailySearch[i].temp.day)
    console.log(dailySearch[i].feels_like.day)
    console.log(dailySearch[i].temp.min)
    console.log(dailySearch[i].temp.max)
    console.log(dailySearch[i].clouds)
    console.log(dailySearch[i].dew_point)
    console.log(dailySearch[i].humidity)
    console.log(dailySearch[i].uvi)
    console.log(dailySearch[i].weather[0].main)
    console.log(dailySearch[i].weather[0].description)
// ?Creating a DIV for each day in the weekly forecast
    const foreCastDiv = document.querySelector(".forecast");
    const newForeCastDiv = document.createElement("DIV")
    newForeCastDiv.classList.add("newForeCastDiv")
    foreCastDiv.appendChild(newForeCastDiv)
    const forecastUL = document.createElement('UL')
    forecastUL.classList.add("foreCastUl")
    newForeCastDiv.appendChild(forecastUL)
    const day = new Date(dailySearch[i].dt * 1000).toLocaleDateString("en-us")
    const temp = dailySearch[i].temp.day
    const feels = dailySearch[i].feels_like.day
    const min = dailySearch[i].temp.min
    const max = dailySearch[i].temp.max
    
        const foreCastElem = document.createElement("li")
       



    foreCastElem.innerText = `${temp}, ${feels}, ${min}, ${max} `

    forecastUL.appendChild(foreCastElem)
    
  }





}


//********************************************************************************************* */

const button = document.querySelector("button");

button.addEventListener("click", (evObj) => {
  evObj.preventDefault();
  console.log("clicked yo")
  const dataInput = document.querySelector("#LctnInpt").value
  console.log(`My data Input = ${dataInput}`)
  fetchWeather(dataInput);
})