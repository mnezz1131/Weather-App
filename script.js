//Creating the fetch request for getting data from OpenWeather API 
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
//creating the HTML elements and rendering them on the page
const renderList = (resJSON) => {
  let searchResults = resJSON;
  // console.log(searchResults)
  //Selecting location class adding Location and country
  const locationDiv = document.querySelector(".location");
  //empties the div for next search
  locationDiv.innerHTML = "";

  const nameTag = document.createElement("p")
  nameTag.innerText = `${searchResults.name}, ${searchResults.sys.country}`
  nameTag.style.backgroundColor = "gold"
  nameTag.style.borderBlockStyle = "solid"
  nameTag.style.fontSize = "20px"
locationDiv.appendChild(nameTag)
  

 

  //################ Array and For Loop for Temps #################################################################
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
      tempTag.appendChild(tempElem)
    }
  }
  tempConvert()
  const clouds = document.createElement("p")
  clouds.innerText = `Clouds: ${searchResults.weather[0].description}`
  locationDiv.appendChild(clouds)

  const otherTag = document.createElement("p")
  otherTag.innerText = `Humidity: ${searchResults.main.humidity}%, `
  locationDiv.appendChild(otherTag)

  const windTag = document.createElement('p');
  locationDiv.appendChild(windTag)
  windTag.innerText = `Wind Speed: ${Math.round(searchResults.wind.speed*2.23694)} mph`
  locationDiv.appendChild(windTag)
}


// !################################################ WEEKLY FORECAST SECTION ################################################################################
//Getting the City Longitude and Latitude from first fetch to  get the Extended Forecast 
const getCoord = (resJSON) => {
  let lat = resJSON.coord.lat
  let lon = resJSON.coord.lon
  lat = Number(lat.toFixed(2).value)
  lon = Number(lon.toFixed(2).value)

  // console.log(typeof lat, lat, typeof lon, lon)

  const fetchForecast = (lat, lon) => {

    const forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=59.91&lon=10.75&units=imperial&exclude=minutely.hourly,current&appid=b0ae55b6c429d2b3beee108ecdbd660e`
    // console.log("making our request")

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
  //Rendering the Extended Daily forecast
  const renderDaily = (resJSON) => {
    
  const foreCastDiv = document.querySelector(".forecast");
    // todo foreCastDiv.innerHTML = "";

  const extendP = document.createElement("p")
  extendP.innerText = `Extended ForeCast Yo`
  document.querySelector(".forecast").appendChild(extendP)
  
  //Setting search results to a varialbe 
  const dailySearch = resJSON.daily

  // const unixTime = dailySearch[7].dt
  // const date = new Date(unixTime*1000);
  // console.log(date.toLocaleDateString("en-US"));
  //https://www.codegrepper.com/code-examples/javascript/convert+date+to+unix+timestamp+javascript

  for (i = 0; i < dailySearch.length; i++) {
    console.log(dailySearch[i])

    const day = new Date(dailySearch[i].dt * 1000).toLocaleDateString("en-us")
    const temp = dailySearch[i].temp.day
    const feels = dailySearch[i].feels_like.day
    const min = dailySearch[i].temp.min
    const max = dailySearch[i].temp.max
    const clouds = dailySearch[i].clouds
    const dew = dailySearch[i].dew_point
    const humid = dailySearch[i].humidity
    const main = dailySearch[i].weather[0].main
    const desc = dailySearch[i].weather[0].description
    const icon = dailySearch[i].weather[0].icon
    const uvi = dailySearch[i].uvi
   
    if (i !== 0) {
      // ?Creating a DIV for each day in the weekly forecast

      const newForeCastDiv = document.createElement("DIV")

      newForeCastDiv.classList.add("newForeCastDiv")

      foreCastDiv.appendChild(newForeCastDiv)

      const foreP = document.createElement("p")
      foreP.innerText = `${day}`
      newForeCastDiv.appendChild(foreP)

      const forecastUL = document.createElement('UL')
      forecastUL.classList.add("foreCastUl")
      newForeCastDiv.appendChild(forecastUL)
      const foreCastElem = document.createElement("li")
      foreCastElem.innerText = `Temp is: ${temp},    Feels Like: ${feels},    Min: ${min},   Max: ${max} `
      forecastUL.appendChild(foreCastElem)

      const forecastUL2 = document.createElement('UL')

      newForeCastDiv.appendChild(forecastUL2)
      const foreCastElem2 = document.createElement("li")
      foreCastElem2.innerText = `Outlook: ${main} - ${desc}  ${icon}`
      forecastUL2.appendChild(foreCastElem2)


      const forecastUL3 = document.createElement('UL')

      newForeCastDiv.appendChild(forecastUL3)
      const foreCastElem3 = document.createElement("li")
      foreCastElem3.innerText = `Dewpoint: ${dew} - Humidity: ${humid} UVI: ${uvi}`
      forecastUL3.appendChild(foreCastElem3)
    }

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