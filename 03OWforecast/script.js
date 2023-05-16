function getWeatherForecast() {
    const apiKey = '1b0d4e056d91c25a4fe8658fd55f3f06';
    const cityInput = document.getElementById('cityInput');
    const cityName = cityInput.value;
  

    if (cityName === '') {
      alert('Please enter a city name!');
    }
  
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;

    //FAILED "PRESS ENTER"
    // const cityInput = document.getElementById('cityInput');
// cityInput.addEventListener('keydown', (event) => {
//   if (event.key === 'Enter') {
//     event.preventDefault();
//     searchBtn.click();
//   }
// });
  
    axios
      .get(url)
      .then((response) => {
        const forecastData = response.data;
        displayWeatherForecast(forecastData);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
    }  
    function displayWeatherForecast(data) {
      const forecastContainer = document.getElementById('forecastContainer');
      forecastContainer.innerHTML = "";
      
      for (let i = 0; i < data.list.length; i+=7) {
        const weatherData = data.list[i]
        const date = new Date(weatherData.dt_txt);
        const time = date.toLocaleTimeString(undefined, {hour: 'numeric', minute: 'numeric'})
        // const day = date.toLocaleDateString(undefined, {weekday: "long"})

        const card = document.createElement("div")
        card.className = "card"
        card.innerHTML = 
        `
         <p><strong>${time}</strong></p>
            <p>Temperature: ${weatherData.main.temp} °C </p>
            <p>Humidity: ${weatherData.main.humidity} % </p>
            <p>Pressure: ${weatherData.main.pressure} hPa</p>
            <p>Description: ${weatherData.weather[0].description}</p>
    
            `;

        forecastContainer.appendChild(card)
   
      }

      //FAILED CHART
    //   const barChart = document.getElementById('barChart');
    //   barChart.innerHTML = '<canvas id="chart"></canvas>';
    
    //   new Chart(document.getElementById("chart"), {
    //     type: 'bar',
    //     data: {
    //       labels: labels,
    //       datasets: [{
    //         label: 'Temperature',
    //         data: temperatures,
    //         backgroundColor: 'rgba(75, 192, 192, 0.2)',
    //         borderColor: 'rgba(75, 192, 192, 1)',
    //         borderWidth: 1
    //       }]
    //     },
    //     options: {
    //       responsive: true,
    //       scales: {
    //         y: {
    //           beginAtZero: true
    //         }
    //       }
    //     }
    //   });

    }