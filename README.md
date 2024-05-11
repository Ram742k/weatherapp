# 🌍 Restcountries & Weather using fetch API

This project implements the Restcountries and OpenWeatherMap APIs using the `fetch()` API. It fetches data about countries and their corresponding weather using only the `fetch()` method. The data is then displayed on the screen using Bootstrap cards.

## 📝 Project Description

This project fulfills the following constraints:

- All HTML elements are created using the DOM.
- Only the `fetch()` API is used to get data from both the Restcountries API and OpenWeatherMap API.
- Necessary values from the Restcountries API are passed to OpenWeatherMap to get the current weather data of the selected country.
- Bootstrap cards are used to display the necessary data on the screen.
- All JavaScript code is placed in a script file named `script.js`, which is imported inside the body element of the HTML file.

### Files
- [index.html](index.html)
- [style.css](css/style.css)
- [script.js](js/script.js)

## 🛠 Implementation Details

### HTML Structure

All HTML elements are created dynamically using JavaScript's DOM manipulation.

### JavaScript

The `script.js` file contains the JavaScript code responsible for fetching data from the Restcountries and OpenWeatherMap APIs. It then processes this data and updates the HTML elements accordingly.

### Bootstrap Cards

Bootstrap cards are used to display the necessary data retrieved from the APIs. Each card represents a country and includes details such as capital, region, country code, flag, and current weather information.




## 💻 Technologies Used

- HTML
- CSS (Bootstrap for styling)
- JavaScript

## 🌐 APIs Used

- [Restcountries API](https://restcountries.com/)
- [OpenWeatherMap API](https://openweathermap.org/api)

