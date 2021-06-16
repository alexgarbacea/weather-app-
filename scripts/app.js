const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

const updateUI = data => {

    const cityDets = data.cityDets;

    const weather = data.weather;

    //update details
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    //update day night images
    const iconSrc = `icons/${data.weather.WeatherIcon}.svg`;
    icon.setAttribute('src',iconSrc);

    let timeSrc = null;

    if(data.weather.IsDayTime){
        timeSrc = 'icons/day.svg';
    }
    else{
        timeSrc = 'icons/night.svg'
    }
    time.setAttribute('src',timeSrc);

    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

}

cityForm.addEventListener('submit', e => {
    e.preventDefault();

    const city = cityForm.city.value.trim();

    cityForm.reset();

    forecast.updateCity(city)
        .then(data => updateUI(data))
        .catch(e => console.log(e));

    //set local storage
    localStorage.setItem('city',city);
})

//check local storage
if(localStorage.getItem('city')){
    forecast.updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(e => console.log(e));
}