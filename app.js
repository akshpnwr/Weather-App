const timezone = document.querySelector('.location-timezone');
const icon = document.querySelector('.location-icon');
const degree = document.querySelector('.temperature-degree');
const description = document.querySelector('.temperature-description');

const getLocation = function () {
  const success = function (pos) {
    const { latitude: lat, longitude: lon } = pos.coords;

    getWeather(lat, lon);
  };

  const failure = function () {
    alert('Cannot found');
  };

  navigator.geolocation.getCurrentPosition(success, failure);
};

const getWeather = async function (lat, lon) {
  const res = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=beee642417472dda459c37521388b2e1`
  );

  if (!res.ok) return;

  const data = await res.json();

  displayWeather(data);
};

const displayWeather = function (data) {
  const kelvinToCelsius = (temp) => temp - 273.15;

  timezone.innerText = `${data.name}/${data.sys.country}`;
  degree.innerText = kelvinToCelsius(data.main.temp);
  description.innerText = data.weather[0].description;
  const iconId = data.weather[0].icon;
  icon.setAttribute('src', `http://openweathermap.org/img/wn/${iconId}@2x.png`);
};

window.addEventListener('load', getLocation);
