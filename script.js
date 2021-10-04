// 1. Setup the fetch request to get data DONE
// 2. Add button and search input add eventlistener
// 3. Create function to fetch the data from API and pass in value
// 4. Add elements to the page






// const locale = "London"
// const ApiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${locale}&appid=b0ae55b6c429d2b3beee108ecdbd660e`



const fetchWeather = (dataInput) => {
  const ApiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${dataInput}&appid=b0ae55b6c429d2b3beee108ecdbd660e`

fetch(ApiUrl)
    .then((res) => { return res.json() })
    .then((resJSON) => {

      console.log(resJSON);
      const locDiv = document.createElement("DIV")
      document.querySelector(".main").appendChild(locDiv).classList.add("location")
   
    })
    .catch((err) => {
      // check if they spelled the country wrong?
      console.error(`ERROR: ${err}`)
    });
}


const button = document.querySelector("button");

button.addEventListener("click", (evObj) => {
  evObj.preventDefault();
  console.log("clicked yo")
  const dataInput = document.querySelector("#LctnInpt").value
  console.log(`My data Input = ${dataInput}`)
  fetchWeather(dataInput);


})