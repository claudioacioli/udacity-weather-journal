document.addEventListener("DOMContentLoaded", e => {

  /* Global Variables */
  const 
    OPEN_WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather",
    OPEN_WEATHER_API_KEY = "aa8234745b091ee3bb02c21e583fcc34",
    WEATHER_JOURNAL_API_URL = "/data",
  /* DOM Elements */
    zipElement = byId("zip"),
    feelingsElement = byId("feelings"),
    buttonElement = byId("generate"),
    holderElement = byId("entryHolder"),
    dateElement = byId("date"),
    tempElement = byId("temp"),
    contentElement = byId("content")
  ;

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
      return `${OPEN_WEATHER_API_URL}?q=${zip},${country}&APPID=${OPEN_WEATHER_API_KEY}`;
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
      return await postData(WEATHER_JOURNAL_API_URL, data);
    },

    getDataFromServer = async () => {
      return await getData(WEATHER_JOURNAL_API_URL)
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
