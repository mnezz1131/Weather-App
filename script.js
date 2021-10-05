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
  //create Div & add class location and append to main
    // const otherDiv = document.querySelector(".other")
  //Selecting location class adding Location and country
  const locationDiv = document.querySelector(".location");
  locationDiv.innerHTML = "";

  const nameTag = document.createElement("p")
  const countryTag = document.createElement("p")

  nameTag.innerText = searchResults.name
  countryTag.innerText = searchResults.sys.country

  locationDiv.append(nameTag, countryTag)

  const tempDiv = document.querySelector(".temp")



  const tempConvert = (resJSON) => {
    const mainTemp = searchResults.main.temp
    const feelsLike = searchResults.main.feels_like
    const tempMin = searchResults.main.temp_min
    const tempMax = searchResults.main.temp_max

    const tempArr = [mainTemp, feelsLike, tempMin, tempMax]

    for (let i = 0; i < tempArr.length; i++) {
      const kelvin = Math.round(tempArr[i])
      const celsius = Math.round(tempArr[i] - 273.15)
      const faren = Math.round((tempArr[i] - 273.15) * 9 / 5) + 32
      console.log(`kelvin ${kelvin}&#176`)
      console.log(`celsius ${celsius}&#176`)
      console.log(`farenheit ${faren}&#176`)
      console.log(`kelvin - ${kelvin}`, `celsius - ${celsius}`, (`farenheit - ${faren}`))
    }

  }

  tempConvert()

  // console.log(searchResults.main.pressure) //Pressure in Pascal = need mb
  // console.log(searchResults.main.humidity)
  // console.log(searchResults.wind)
  // console.log(searchResults.wind.speed)
  // console.log(searchResults.wind.deg)
  // console.log(searchResults.wind.gust)

  // console.log(searchResults.sys.sunset) //Need to convert timestamp
  // console.log(searchResults.sys.sunrise) //Need to convert timestamp
  // console.log(searchResults.timezone) //Need to convert timezone
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