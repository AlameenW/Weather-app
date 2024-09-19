//For dom manipulation and evet handling
const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
const forecast = new Forecast();

const updateUI = (data) => {
    // console.log(data);
    const cityDets = data.cityDets;
    const weather = data.weather;

    //Same as- 
    // const{ cityDets,weather } = data;...Destructuring.

    //update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    //update the night/day & icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`
    icon.setAttribute("src",iconSrc);

    let timeSrc = (weather.IsDayTime) ? "img/day.svg" : "img/night.svg";
    /*
    Same as above
    let timeSrc = null;
    if(weather.IsDayTime){
        timeSrc = "img/day.svg";
    }else{
        timeSrc = "img/night.svg";
    }
    */
    time.setAttribute("src", timeSrc);

    if(card.classList.contains("d-none")){
        card.classList.remove("d-none");
    }
}

// const updateCity = async(city) => {

//     // console.log(city);
//     //cityDets- city Details
//     const cityDets = await getCity(city);
//     const weather = await getWeather(cityDets.Key);

//     return {
//         cityDets: cityDets,
//         weather: weather
//         //to use object shorthand notation- cityDets,weather
//     };
// }

cityForm.addEventListener("submit",(e) => {
    //prevent default action- refreshing the page
    e.preventDefault();

    //Get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update the ui with new city
    forecast.updateCity(city)
    .then(data => updateUI(data))
      .catch(err => console.log(err));

    //set local storgage
    localStorage.setItem("city",city);
});

if(localStorage.getItem("city")){
    forecast.updateCity(localStorage.getItem("city"))
     .then(data => updateUI(data))
      .catch((err) => console.log(err));
}