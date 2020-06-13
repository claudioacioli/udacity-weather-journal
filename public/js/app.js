document.addEventListener("DOMContentLoaded", e => {

  /* Global Variables */
  const 
    OPEN_WEATHER_API_URL = 'https://api.openweathermap.org',
    OPEN_WEATHER_API_KEY = 'aa8234745b091ee3bb02c21e583fcc34',
  /* DOM Elements */
    zipElement = byId("zip"),
    feelingsElement = byId("feelings"),
    buttonElement = byId("generate"),
    holderElement = byId("entryHolder"),
    dateElement = byId("date"),
    tempElement = byId("temp"),
    contentElement = byId("content")
  ;
  // Cors for cross origin allowance
  // Create a new date instance dynamically with JS
  let d = new Date();
  let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

  const 
    
    getData = async (url, mode="cors") => {
      const response = await fetch(url, {method:"GET", mode});
      
      try {
        const result = await response.json();
        return result;
      } catch (ex) {
        console.error("Error", ex);
      }
    },

    postData = async (url, data={}, mode="cors") => {
      const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        body: JSON.stringify(data),
        mode,
        headers: {
          "Content-Type": "application/json"
        }
      });

      try {
        const result = await response.json();
        return result;
      } catch (ex) {
        console.error("Error", ex);
      }
    },

    buildOpenWeatherUrl = (zip, country="BR") => {
      return `${OPEN_WEATHER_API_URL}/data/2.5/weather?q=${zip},${country}&APPID=${OPEN_WEATHER_API_KEY}`;
    },
    
    getWeatherDataFromZip = async (zip,  country="BR") => {
      return await getData(buildOpenWeatherUrl(zip, country));
    },

    postDataFromServer = async result => {
      const data = {
        temp: result.main.temp,
        date: result.dt,
        feelings: feelingsElement.value
      };
      return await postData('/data', data);
    },

    getDataFromServer = async () => {
      return await getData('/data')
        .then(renderLastTemp)
    },

    renderLastTemp = (result) => {
      
      if(!result.length)
        return;

      const data = result[result.length -1];
      dateElement.textContent = data.date
      tempElement.textContent = data.temp;
      contentElement.textContent = data.feelings;

    },

    handlerGenerateClick = e => {
      
      const zip = zipElement.value.toString().trim();

      if(!zip.length)
        return;

      getWeatherDataFromZip(zip)
        .then(postDataFromServer)
        .then(getDataFromServer)
        .catch(error => {
          console.log(error);
        })

    }
  ;

  buttonElement.addEventListener("click", handlerGenerateClick);
  getDataFromServer();

});
