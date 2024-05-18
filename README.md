# Weather Dashboard App

This is a pixel-perfect Weather Dashboard App built using modern front-end technologies. The app provides a comprehensive view of current weather conditions, forecasts, and other weather-related details for any location. This app is meticulously designed to be pixel-perfect and responsive mobile-friendly leveraging modern front-end technologies, ensuring a seamless and visually appealing user experience.

## Features
1. **Real-time Weather Updates:**
Get up-to-date weather information for any location, including the current date and time.
2. **Current Weather Details:** 
Displays the current temperature, sunrise and sunset times, humidity, wind speed, atmospheric pressure, and visibility.
3. **Sunrise and Sunset Details**: Provides information on the sunrise and sunset times.
4. **5-Day Forecast:**
View the forecasted weather conditions for the next five days, including the date.
5. **Hourly Forecast:**
Access the hourly forecast for the current day, including real-time updates, temperature, wind direction, and wind speed.
6.  **Current Location Feature**:
 Fetches and displays weather data based on the user's current location.
7. **Dark Mode and Light Mode**:
 Supports dark and light mode themes for better user experience and accessibility.

## Technologies Used

- **HTML5**: Hypertext Markup language for structuring the web pages.
- **CSS3**: Styling language for enhancing the app's visual appearance.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Tailwind CSS Components**: Pre-built UI components for faster development.
- **Advanced CSS3 Grid**: Used for creating responsive and flexible layouts.
- **Vanilla JavaScript**: Core language for adding interactivity and functionality to the app.
- **ES6 (ECMAScript 6)**: Modern JavaScript syntax and features.
- **JavaScript Modules**: Modular programming approach for better code organization and maintainability.
- **Async/Await and Fetch API**: Asynchronous JavaScript techniques for making API calls and handling responses

## API Integrations
- **OpenWeather**: For fetching weather data.
- **WorldTimeAPI**: For getting the real-time date and time.
- **Geolocation API**: For determining the user's current location.

* [OpenWeatherMap API documentation](https://openweathermap.org/api) for more information.
* [World Time API documentation](https://worldtimeapi.org/api) for details.

## Design
The design for the Weather Dashboard App was sourced from an open-source Figma template. It has been carefully implemented to ensure a pixel-perfect representation.
**Open Source Figma Design**: The app's user interface is based on an open-source Figma design.
[Figma Design]([weather Dashboad App](https://www.figma.com/design/7aWA4f1MiooSemq7KvTHbK/Weather-Dashboard-(Community)?node-id=1-3) for details.


## Installation

To set up the Weather Dashboard App locally, follow these steps:

1. **Clone the Repository**
    ```bash
    git clone https://github.com/Abdull121/weather-dashboard-app.git
    cd weather-dashboard-app
    ```

2. **Open `index.html`**
   Simply open the `index.html` file in your preferred web browser to view the app.

## Usage

Once you have the app running, you can perform the following actions:
- Search for weather updates by entering a city name.
- View real-time weather updates and detailed forecasts.
- Switch between dark mode and light mode using the toggle button.
- Allow the app to access your location for current weather updates based on your geographical location.

## Code Structure

The project follows a modular programming approach with the following structure:


## Code Structure
│
├── -  `index.html` # Main HTML file
├── - `tailwind.config.js` # TailwindCSS configuration file
├──- ` styles/`
│ └── `app.css` # Main stylesheet with TailwindCSS integration
├── `scripts/`
│ ├── -  `app.js` # Main JavaScript file handling core functionality
│ ├── - `api.js` # Handles all API calls and data fetching
│ ├── - `currentlocation.js` # Handles fetching and displaying the user's current location
│ ├── - `fetchTime.js` # Fetches the real-time date and time
│ ├── - `fetchWeather.js` # Fetches the weather data from OpenWeather API
│ ├── - `hourlyForecast.js` # Manages the hourly weather forecast data
│ ├── - `weatherIcons.js` # Handles displaying weather icons
│ 
├── - `assets/`
│ └── [images, icons, etc] # Folder containing assets like images and icons#



## Contribution

Contributions to this project are welcome. If you wish to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
    ```bash
    git checkout -b feature-name
    ```
3. Make your changes and commit them.
    ```bash
    git commit -m "Add feature-name"
    ```
4. Push your changes to your forked repository.
    ```bash
    git push origin feature-name
    ```
5. Open a Pull Request detailing the changes you have made.

## License

This project is licensed under the MIT License. You are free to use, modify, and distribute this software as long as proper credit is given. However**, please do not use this code for commercial purposes.**

## Contact

For any queries or issues, please open an issue on the repository or contact me directly at [Muhmmmad Abdullah](mailto:abdullahiman8875@gmail.com).

## ScreenShots
![image](https://github.com/Abdull121/Weather-Dashboard-App/assets/93944428/598dbafe-07f7-438d-829b-bb5af0678800)

![image](https://github.com/Abdull121/Weather-Dashboard-App/assets/93944428/5be0104b-be3c-43c8-8608-12d09d13f8ca)





