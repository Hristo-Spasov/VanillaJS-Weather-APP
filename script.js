const API = "YOUR_KEY_HERE";

window.addEventListener("load", () => {
  let long, lat;

  // Selectors
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let location = document.querySelector(".location-timezone");
  const temperatureSection = document.querySelector(".temperature");
  const temperatureSpan = document.querySelector(".temperature span");

  //Fetch code
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API}&units=imperial`;
      fetch(URL)
        .then((resp) => resp.json())
        .then((data) => {
          const { temp } = data.main;
          const { description, icon } = data.weather[0];
          //Set DOM Elements from the API

          temperatureDegree.textContent = temp;
          temperatureDescription.textContent = description;
          location.textContent = data.name;

          if (data) {
            const img = document.createElement("img");
            img.id = "weather_icon";
            img.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            img.alt = "weather icon";
            location.after(img);
          }

          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor((5 / 9) * (temp - 32));
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = temp;
            }
          });
        });
    });
  }
});
