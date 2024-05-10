document.addEventListener("DOMContentLoaded", function () {
    const cardsRow = document.getElementById("cardsRow");

    function createCard(countryData) {
        const card = document.createElement("div");
        card.classList.add("col-lg-4", "col-md-6", "col-sm-12", "mb-3"); // Added "mb-3" for margin bottom
    
        const cards = document.createElement("div");
        cards.classList.add("card");
        

        const cardHeader = document.createElement("div");
        // cardHeader.classList.add("card-header");
        cardHeader.setAttribute('class', 'card-header')
        cardHeader.setAttribute('claass', 'card-header');
        cardHeader.textContent = countryData.name.common;
        card.appendChild(cardHeader);
        

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const capital = document.createElement("p");
        
        capital.textContent = "Capital: " + countryData.capital;
        cardBody.appendChild(capital);

        const latLng = document.createElement("p");
        latLng.textContent = "Lat/Lng: " + countryData.latlng.join(", ");
        cardBody.appendChild(latLng);

        const region = document.createElement("p");
        region.textContent = "Region: " + countryData.region;
        cardBody.appendChild(region);

        const countryCode = document.createElement("p");
        countryCode.textContent = "Country Code: " + countryData.area;
        cardBody.appendChild(countryCode);

        const flag = document.createElement("img");
        flag.alt = countryData.name.common;
        flag.src = countryData.flags.png;
        flag.classList.add("img-fluid", "mt-2");
        flag.style.width = "100%";
        flag.style.height = "150px";
        cardBody.appendChild(flag);

        const weatherButton = document.createElement("button");
        weatherButton.classList.add("btn", "btn-primary", "mt-3");
        weatherButton.textContent = "Get Weather";
        weatherButton.addEventListener("click", function () {
            getWeather(countryData.latlng[0], countryData.latlng[1]);
        });
        cardBody.appendChild(weatherButton);

        card.appendChild(cardBody);
        cardsRow.appendChild(card);
    }

    
    fetch("https://restcountries.com/v3.1/all")
        .then(response => response.json())
        .then(data => {
            data.forEach(country => {
                createCard(country);
            });
        })
        .catch(error => console.error("Error fetching country data:", error));

    
    function getWeather(latitude, longitude) {
        const apiKey = "f0d4b421ba218802bc329bf84298cf1e";
        
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=f66f7168b1bd7e70e06e14f7f0655785`;
        

        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const cname = data.name;
            const humidity = data.main.humidity;
            const pressure = data.main.pressure;
            const temperature = data.main.temp;

            
            const modalContent = `
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${cname}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <p>Current Humidity: ${humidity}</p>
                            <p>Current Pressure: ${pressure}</p>
                            <p>Current Temperature: ${temperature}</p>
                        </div>
                        
                    </div>
                </div>
            `;

            
            const modal = document.createElement('div');
            modal.classList.add('modal', 'fade');
            modal.innerHTML = modalContent;

            document.body.appendChild(modal);
            $(modal).modal('show');
        })
        .catch(error => console.error("Error fetching weather data:", error));
}
});
