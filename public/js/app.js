document.addEventListener("DOMContentLoaded", e => {

  /* Global Variables */
  const 
    OPEN_WEATHER_API_URL = 'https://api.openweathermap.org',
    OPEN_WEATHER_API_KEY = 'aa8234745b091ee3bb02c21e583fcc34'
  ;
  // Cors for cross origin allowance
  // Create a new date instance dynamically with JS
  let d = new Date();
  let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

  const 
    
    getData = async url => {
      const response = await fetch(url);
      
      try {
        const result = await response.json();
        return result;
      } catch (ex) {
        console.error("Error", ex);
      }
    },

    postData = async (url, data={}) => {
      const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        body: JSON.stringify(data),
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
    
    getWeatherDataFromCity = async (city, country) => {
      const result = await  getData(`${OPEN_WEATHER_API_URL}/data/2.5/weather?q=${city},${country}&APPID=${OPEN_WEATHER_API_KEY}`);
      console.log(result);
    }
  ;

  getWeatherDataFromCity("Brasilia", "BR");

});
