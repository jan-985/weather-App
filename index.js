/* algoritmo
1- Digite o nome da cidade
2- Pressione o botão
3 - Descubra o clima (openweathermap.org)
4- Insira as informações meteorológicas nas seções
5- Adicione o ícone do clima
6- Insira os detalhes do clima
*/

const apiKey = "f9bdef25ed2fa3aaacb49442933a29f0";

const weatherDataEl = document.getElementById('weather-data');

const cityInput = document.getElementById('city');

const butGet = document.getElementById('button-addon1')

butGet.addEventListener('submit', (event) => {
  event.preventDefault();
  const cityValue = cityInput.value;
  getWeatherData(cityValue)
});


async function getWeatherData(cityValue) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`)

    if (!response.ok) {
      throw new Error("Network responde was not ok")
    }

    const data = await response.json()

    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon
    const details = [
      `Feels like: ${Math.round(data.main.feels_like)}°C`,
      `Humidity: ${data.main.humidity}% `,
      `wind speed: ${data.wind.speed} m/s`
    ]

    weatherDataEl.querySelector(".icon-link").innerHTML = `<img class="figure-img" src="http://openweathermap.org/img/wn/${icon}.png" alt="wheather icon">`

    weatherDataEl.querySelector(".display-5").textContent = `${temperature}°C`;

    weatherDataEl.querySelector(".description").textContent = description;

    weatherDataEl.querySelector(".details").innerHTML = details.map((details) => `<div class="h2 col-md bg-orn-4 m-2 rounded-2 shadow-sm font-width-5 p-5" id="feels-like">${details}</div>`).join("");
  } catch (error) {
    weatherDataEl.querySelector(".icon-link").innerHTML = " ";

    weatherDataEl.querySelector(".display-5").textContent = "";
    weatherDataEl.querySelector(".description").textContent = 'An error happened, Please type the correct city name';
    weatherDataEl.querySelector(".details").innerHTML = "";
  }
}