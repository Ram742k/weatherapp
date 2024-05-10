document.addEventListener("DOMContentLoaded", function () {
    const cardsRow = document.getElementById("cardsRow");

    function createCard(countryData) {
        const grid = document.createElement("div");
        grid.classList.add("col-md-4", "col-lg-4", "col-xl-4", "col-sm-6");

        const card = document.createElement("div");
        card.classList.add("card", "h-100", "mb-3");

        const cardHeader = document.createElement("div");
        cardHeader.classList.add("card-header");
        cardHeader.textContent = countryData.name.common;
        card.appendChild(cardHeader);

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const cardtext = document.createElement("div");
        cardtext.classList.add("card-text"); 
        cardBody.appendChild(cardtext);

        const capital = document.createElement("p");
        capital.textContent = "Capital: " + countryData.capital;
        cardtext.appendChild(capital);

        const latLng = document.createElement("p");
        latLng.textContent = "Lat/Lng: " + countryData.latlng.join(", ");
        cardtext.appendChild(latLng);

        const region = document.createElement("p");
        region.textContent = "Region: " + countryData.region;
        cardtext.appendChild(region);

        const countryCode = document.createElement("p");
        countryCode.textContent = "Country Code: " + countryData.cca3;
        cardtext.appendChild(countryCode);

        const flag = document.createElement("img");
        flag.alt = countryData.name.common;
        flag.src = countryData.flags.png;
        flag.classList.add("card-img-top", "img-fluid", "mt-2");
        flag.style.width = "100%";
        flag.style.height = "150px";
        cardtext.appendChild(flag);

        const weatherButton = document.createElement("button");
        weatherButton.classList.add("btn", "btn-primary", "mt-3");
        weatherButton.textContent = "Get Weather";
        weatherButton.addEventListener("click", function () {
            getWeather(countryData.latlng[0], countryData.latlng[1]);
        });
        cardtext.appendChild(weatherButton);

        card.appendChild(cardBody);
        grid.appendChild(card); // Append card to grid
        cardsRow.appendChild(grid);
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
        const apiKey = "f66f7168b1bd7e70e06e14f7f0655785";
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

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

                modal.addEventListener('hidden.bs.modal', function () {
                    modal.remove(); // Remove modal from DOM after it's closed
                });

                document.body.appendChild(modal);
                $(modal).modal('show');
            })
            .catch(error => console.error("Error fetching weather data:", error));
    }
});
