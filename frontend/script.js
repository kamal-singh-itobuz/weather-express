const input = document.querySelector('.input');
const searchButton = document.querySelector('.search');

const mainContainer = document.querySelector('.main');
const notFoundCase = document.querySelector('.not-found');

const weatherDetails = document.querySelector('.weather-details');
const weatherText = document.querySelector('.weather-text');
const temprature = document.querySelector('.temprature');
const dayDate = document.querySelector('.day-date');
const cityName = document.querySelector('.city-name');

const rainy = new Set(['Partly cloudy', 'Patchy rain nearby', 'Overcast']);
const sunny = new Set(['Sunny', 'Clear']);
const night = new Set(['Mist']);

searchButton.addEventListener('click', () => {
    const place = input.value;
    input.value = "";
    const fetchData = async function(){
        try {
            let url = `http://localhost:5000/${place}`;
            const res = await fetch(url);
            const data = await res.json();
            const details = JSON.parse(data.data);
            // const condition = data.current.condition.text;
            const condition = "Sunny";
            weatherText.innerText = condition;
            temprature.innerHTML = `${details.temp_c}&deg`;
            dayDate.innerText = (new Date()).toDateString().substring(0, 15);
            cityName.innerText = place;
            
            notFoundCase.style.display = "none";
            const classToRemove = weatherDetails.classList.item(1);
            weatherDetails.classList.remove(classToRemove);
            if(rainy.has(condition)) weatherDetails.classList.add('weather-rainy');
            else if(sunny.has(condition)) weatherDetails.classList.add('weather-sunny');
            else weatherDetails.classList.add('weather-night');

        } catch (error) {
            notFoundCase.style.display = "flex";
            weatherText.innerText = 'condition';
            temprature.innerHTML = `00.0&deg`;
            dayDate.innerText = 'yyyy-mm-dd 00:00';
            cityName.innerText = 'location';
        }
    }
    fetchData();
});

window.addEventListener('keypress', (e) => {
    if(e.key === "Enter"){
        searchButton.click();
    }
})

