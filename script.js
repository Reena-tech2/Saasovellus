const form = document.querySelector('form');
const cityInput = document.querySelector('#city');
const weatherDiv = document.querySelector('#weather');
const weatherIcon = document.querySelector('.weather_icon img');
const submitBtn = form.querySelector('button');
const apiKey = '';

form.addEventListener('submit', async(e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if(!city) return;

    submitBtn.disabled =  true;
    weatherDiv.textContent = "Fetching weather..."
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    

    try {
        const response = await fetch (url);
        const data = await response.json();
        if (!response.ok){
            throw new Error (data.message || 'Something went awfully wrong.');

        }
        const{temp} = data.main ;
        const { description,icon,main} = data.weather[0];

        weatherDiv.textContent = `The temprature in ${city} is ${temp} C with ${description}`;
        weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        weatherIcon.alt= main;
    } catch(error){

    weatherDiv.textContent =`Coulnot fetch weather data for  ${city}: ${error.message}`;
    }finally{
        submitBtn.disabled = false;
    }
})
