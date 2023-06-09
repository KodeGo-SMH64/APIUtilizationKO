function getWeatherForecast() {
    const apiKey = '1b0d4e056d91c25a4fe8658fd55f3f06';
    const cityInput = document.getElementById('cityInput');
    const cityName = cityInput.value;
  

    if (cityName === '') {
      alert('Please enter a city name!');
    }
  
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;

  //   const spinner = document.getElementById('spinner');
  // spinner.style.display = 'block'; 

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
      const barChart = document.getElementById('barChart');

      forecastContainer.innerHTML = '';
      // barChart.innerHTML = '<canvas id="chart"></canvas>';
      barChart.innerHTML = '';

      
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

        forecastContainer.appendChild(card);
      }
      const labels = data.list.slice(0, 7).map((weatherData) => {
        const date = new Date(weatherData.dt_txt);
        return date.toLocaleTimeString(undefined, { hour: 'numeric' });
      });
    
      const temperatures = data.list.slice(0, 7).map((weatherData) => weatherData.main.temp);
    
      barChart.innerHTML = '<canvas id="chart"></canvas>';
    
      new Chart(document.getElementById('chart'), {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Temperature',
              data: temperatures,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 3,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
      document.getElementById('hourlyForecastTitle').style.display = 'block';
  document.getElementById('weeklyForecastTitle').style.display = 'block';
    }