/**
 * Nanodegree Weather journal project
 *
 * Dependencies: by.js, api.js
 *
 * JS Version: ES2015/ES6
 *
 * @Author: Claudio Acioli
*/

document.addEventListener("DOMContentLoaded", e => {

/*
 * Start Global Variables 
*/
  const 
    // Api Urls   
    OPEN_WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather",
    OPEN_WEATHER_API_KEY = "aa8234745b091ee3bb02c21e583fcc34",
    WEATHER_JOURNAL_API_URL = "/data",
    // DOM Elements
    zipElement = byId("zip"),
    feelingsElement = byId("feelings"),
    buttonElement = byId("generate"),
    holderElement = byId("entryHolder"),
    dateElement = byId("date"),
    tempElement = byId("temp"),
    contentElement = byId("content"),
/**
 * End Global Variables
 * Start Helper functions
*/
    buildOpenWeatherUrl = (zip, country="us") => {
      return `${OPEN_WEATHER_API_URL}?zip=${zip},${country}&units=metric&APPID=${OPEN_WEATHER_API_KEY}`;
    },

    toStringDate = time => {
      return new Date(time * 1000).toLocaleString();
    },
    
    getWeatherDataFromZip = async (zip,  country="us") => {
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

    },
/**
 * End Helper functions
 * Begin View functions
*/
    renderLastTemp = (result) => {
      
      if(!result.length)
        return;

      const data = result[result.length -1];
      dateElement.textContent = toStringDate(data.date);
      tempElement.innerHTML = `${data.temp}&deg;C`;
      contentElement.textContent = data.feelings;

    }
  ;

/**
 * End View functions
*/

  buttonElement.addEventListener("click", handlerGenerateClick);
  getDataFromServer();

});
