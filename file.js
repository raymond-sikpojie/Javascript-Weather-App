const showDate = document.querySelector(".date");
const showLocation = document.querySelector(".location");
const showDescription = document.querySelector(".summary");
const showTemperature = document.querySelector(".temperature");
const showIcon = document.querySelector("img");

// Getting the date
const theDate = new Date();
console.log(theDate.toDateString());
showDate.innerHTML = theDate.toDateString();

// Getting the location
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;

    const proxy = "https://cors-anywhere.herokuapp.com/";
    const api = `${proxy}https://api.darksky.net/forecast/fa144bd6e9773c400c8d9149c42a1e5a/${lat},${long}`;

    fetch(api)
      .then(response => {
        return response.json();
      })
      .then(data => {
        //Below is a destructuring instead of defining showLocaton, showTemperature...etc individually
        const { temperature, summary, icon } = data.currently;
        showDescription.innerHTML = summary;

        showLocation.innerHTML = data.timezone;

        // Convert the temperature to celsius
        let tempFarenheit;
        const toCelsius = temp => {
          return (tempFarenheit = Math.floor((temp - 32) * 0.55555555));
        };
        toCelsius(temperature);
        showTemperature.innerHTML = `${tempFarenheit} &#8451`;

        // Setting the icons to respoond to change in weather
        if (icon === "partly-cloudy-day") {
          showIcon.setAttribute("src", "animated/cloudy-day-1.svg");
        } else if (icon === "partly-cloudy-night") {
          showIcon.setAttribute("src", "animated/cloudy-night-1.svg");
        } else if (icon === "clear-day") {
          showIcon.setAttribute("src", "animated/day.svg");
        } else if (icon === "clear-night") {
          showIcon.setAttribute("src", "animated/night.svg");
        } else if (icon === "cloudy") {
          showIcon.setAttribute("src", "animated/cloudy.svg");
        } else if (icon === "rain") {
          showIcon.setAttribute("src", "animated/rainy-2.svg");
        } else {
          showIcon.setAttribute("src", "animated/cloudy-day-3.svg");
        }

        //Coverting the temperature to Farenheit when clicked

        // showTemperature.addEventListener("click", e => {
        //   toCelsius(temperature);
        //   if (e.target.innerHTML === `${temperature} &#8451`) {
        //     console.log("hey");
        //     e.target.innerHTML = `${toFarenheit} &#8457`;
        //   } else {
        //     e.target.innerHTML == `${temperature} &#8451`;
        //   }
        // });
      });
  });
} else {
  console.log("Geolocation is not supported");
}
