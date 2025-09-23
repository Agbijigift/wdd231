const forecast = document.querySelector("#forecast");
const wIcon = document.querySelector("#w-icon");
const otherInfo = document.querySelector("#other-info");

const weatherIcon = document.createElement('img');
const description = document.createElement('p');
const high = document.createElement('p');
const low = document.createElement('p');
const currentTemp = document.createElement('p');
const humidity = document.createElement('p');
const sunrise = document.createElement('p');
const sunset = document.createElement('p');

const myKey = "635a0e2d96dda22d73d94abae42e3006";
const lat = "5.596423640464173";
const lon = "8.746954107336279";

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${myKey}&units=imperial`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${myKey}&units=imperial`;

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log("Current weather:", data);
      displayResults(data);
    } else {
      throw Error(await response.text());
    }

    
    const forecastResponse = await fetch(forecastUrl);
    if (forecastResponse.ok) {
      const forecastData = await forecastResponse.json();
      console.log("Forecast:", forecastData);
      displayForecast(forecastData);
    } else {
      throw Error(await forecastResponse.text());
    }

  } catch (error) {
    console.log(error);
  }
}

apiFetch();

function displayResults(data) {
  currentTemp.innerHTML = `${data.main.temp}&deg;F`;
  const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  let desc = data.weather[0].description;
  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);
  description.textContent = `${desc}`;
  high.innerHTML = `High: ${data.main.temp_max}&deg;`;
  low.innerHTML = `Low: ${data.main.temp_min}&deg;`;
  humidity.innerHTML = `Humidity: ${data.main.humidity}%`;
  sunrise.innerHTML = `Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`;
  sunset.innerHTML = `Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`;

  wIcon.appendChild(weatherIcon);
  otherInfo.appendChild(currentTemp);
  otherInfo.appendChild(description);
  otherInfo.appendChild(high);
  otherInfo.appendChild(low);
  otherInfo.appendChild(humidity);
  otherInfo.appendChild(sunrise);
  otherInfo.appendChild(sunset);
}

function displayForecast(data) {
  const days = {};
  data.list.forEach(item => {
    const date = new Date(item.dt_txt).toLocaleDateString();
    if (!days[date]) {
      days[date] = item; 
    }
  });

  Object.keys(days).slice(0, 3).forEach((date, index) => {
    const f = days[date];
    const temp = Math.round(f.main.temp);

    const forecastLine = document.createElement("p");
    let dayName;

    if (index === 0) {
      dayName = "Today";
    } else {
    
      dayName = new Date(f.dt_txt).toLocaleDateString("en-US", { weekday: "long" });
    }

    forecastLine.innerHTML = `${dayName}: <strong>${temp}&deg;F</strong>`;

    forecast.appendChild(forecastLine);
  });
}