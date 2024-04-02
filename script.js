import { apiKey } from "./api-key.js";

let urlBase = "https://api.openweathermap.org/data/2.5/weather";
let language = "es";

//funcion para convertir de Kelvin(unidad que nos devuelve la Api)a Grados Celsius
function kelvinToCelsius(kelvinTemp) {
  return Math.round(kelvinTemp - 273.15);
}
//añadimos evento click al boton de busqueda y le asignamos que coja el texto recogido en el input
document.getElementById("botonBusqueda").addEventListener("click", () => {
  const city = document.getElementById("ciudadEntrada").value;
  if (city) {
    fetchDatosClima(city);
  }
});
function fetchDatosClima(city) {
  fetch(`${urlBase}?q=${city}&appid=${apiKey}&lang=${language}`)
    .then((response) => response.json())
    .then((response) => mostrarDatosClima(response));
}
function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}
function mostrarDatosClima(response) {
  const divDatosClima = document.getElementById("datosClima"); //cogemos el div datosClima del html
  divDatosClima.innerHTML = ""; //reseteamos
  const cityName = response.name;
  const cityTemp = kelvinToCelsius(response.main.temp);
  const cityTempMin = kelvinToCelsius(response.main.temp_min);
  const cityTempMax = kelvinToCelsius(response.main.temp_max);
  const cityDesc = response.weather[0].description;
  const cityWeatherIcon = response.weather[0].icon;
  const cityTempTitulo = document.createElement("h2");
  cityTempTitulo.setAttribute("id", "tituloTemp");
  cityTempTitulo.textContent = `${cityTemp} ºC`;
  const ciudadTitulo = document.createElement("h2");
  ciudadTitulo.setAttribute("id", "ciudadTitulo");
  ciudadTitulo.textContent = cityName;
  const ciudadTempInfo = document.createElement("h3");
  ciudadTempInfo.setAttribute("id", "ciudadTempInfo");
  ciudadTempInfo.textContent = `La temperatura maxima del dia en ${cityName} será de ${cityTempMax} ºC y la minima de ${cityTempMin} ºC`;
  const ciudadDescInfo = document.createElement("p");
  ciudadDescInfo.setAttribute("id", "ciudadDescInfo");
  ciudadDescInfo.textContent = capitalize(cityDesc);
  const iconCiudadInfo = document.createElement("img");
  iconCiudadInfo.setAttribute("id", "iconCiudadInfo");
  iconCiudadInfo.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${cityWeatherIcon}@4x.png`
  );
  divDatosClima.appendChild(iconCiudadInfo);
  divDatosClima.appendChild(cityTempTitulo);
  divDatosClima.appendChild(ciudadDescInfo);
  divDatosClima.appendChild(ciudadTitulo);
  divDatosClima.appendChild(ciudadTempInfo);
}
