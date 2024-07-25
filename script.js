let weather = {
  apikey: "ca6e860a5ea772d83712d68c5dde5adb",
  unsplashAccessKey: "1sX8BaTYy2-msL3_MKVGSudq3lF621jK-4c9W5KHyLk", // Add your Unsplash Access Key here
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" 
      + city 
      + "&units=metric&appid=" 
      + this.apikey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data))
      .then(() => this.fetchBackgroundImage(city)); // Fetch the background image after displaying weather
  },
  displayWeather: function(data){
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+ icon +".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind Speed: " + speed + " KM/Hr";
    document.querySelector(".weather").classList.remove("loading");
  },
  fetchBackgroundImage: function(city) {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let orientation = "landscape";
    
    if (width <= 768) {
      orientation = "portrait";
      width = 1080;
      height = 1920;
    } else {
      width = 1920;
      height = 1080;
    }

    fetch(
      `https://api.unsplash.com/photos/random?query=${city}&orientation=${orientation}&client_id=${this.unsplashAccessKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        const imageUrl = data.urls.raw + `&w=${width}&h=${height}&fit=crop`;
        document.body.style.backgroundImage = `url('${imageUrl}')`;
        document.body.style.backgroundSize = "cover";
      })
      .catch((error) => {
        console.error("Error fetching background image: ", error);
        document.body.style.backgroundImage = "url('default_background.jpg')"; // Fallback image
      });
  },
  search: function(){
    this.fetchWeather(document.querySelector(".search-bar").value);
  }
};

document.querySelector(".search button").addEventListener("click", function() {
  weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
  if(event.key === "Enter"){
    weather.search();
  }
});

weather.fetchWeather("Brahmapur");
