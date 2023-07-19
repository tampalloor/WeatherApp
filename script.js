let weather = {
    "apiKey" : "a8133db680c2fd72bfa54cc3a11c7b57",
    fetchWeather: function(city){
        fetch(
            "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + this.apiKey
        ).then((response) => response.json()).then((data)=> this.displayWeather(data)); 
    },
    displayWeather: function(data){
        const {lat} = data[0];
        const{lon} = data[0]; 
        this.convertWeather(lat,lon); 
    },
    convertWeather: function(lat, lon){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?lat=" + lat+ "&lon=" + lon + "&units=metric&appid=" + this.apiKey
        ).then((response) => response.json()).then((data)=>this.displayAll(data));
    },
    displayAll: function(data){
        const{name} = data; 
        const{icon, description} = data.weather[0];
        const{temp,humidity} = data.main;
        const{speed} = data.wind;
        console.log(name, icon, description, temp, humidity, speed); 
        document.querySelector(".city").innerText = "Weather in " + name; 
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description; 
        document.querySelector(".temp").innerText = temp + "°C"; 
        document.querySelector(".humidity").innerText= "Humidity: " + humidity + "%"; 
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + "km/h"; 
        document.querySelector(".weather").classList.remove("loading"); 
        document.body.style.backgroundImage = "url('https://source.unsplash.com/random/1600x900/?" + name + " ')"

    },
    search:function(){
        this.fetchWeather(document.querySelector(".searchbar").value); 
    }
};
document.querySelector(".search button").addEventListener("click", function(){
    weather.search(); 
});

document.querySelector(".searchbar").addEventListener("keyup", function(event){
    if(event.key == "Enter"){
        weather.search(); 
    }
});

weather.fetchWeather("Denver"); 