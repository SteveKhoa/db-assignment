function patientInformationUI(itemList) {
    function patientInfoCard(headerValue, contentValue) {
        var cardDiv = document.createElement("div");
        cardDiv.className = "card rounded-3 mb-2";
        cardDiv.style.height = "20%";
        cardDiv.style.width = "80%";

        var cardHeader = document.createElement("div");
        cardHeader.className = "card-header";
        cardHeader.style.size = "20%";
        cardHeader.textContent = headerValue;

        var cardBody = document.createElement("div");
        cardBody.className = "card-body";
        cardBody.textContent = contentValue;

        cardDiv.appendChild(cardHeader);
        cardDiv.appendChild(cardBody);

        return cardDiv;
    }

    var mainContainer = document.createElement("div");
    mainContainer.className = "border border-3 border-warning rounded-3 d-flex flex-column align-items-center";
    mainContainer.style.margin = "10px 20%";

    // Create the first child div
    var patientInfoDiv = document.createElement("div");
    patientInfoDiv.className = "border border-3 bg-warning d-flex justify-content-center rounded-3 mb-4 mt-2";
    patientInfoDiv.style.height = "10%";
    patientInfoDiv.style.width = "70%";
    patientInfoDiv.innerHTML = "<h2>Patient Information</h2>";
    mainContainer.appendChild(patientInfoDiv);

    // Create the card divs dynamically
    for (var i = 0; i < 4; i++) {
        mainContainer.appendChild(patientInfoCard("Header", "Content"));
    }

    return mainContainer;
}

function searchBarUI() 
{
    var mainContainer = document.createElement("div");
    mainContainer.className = "form-floating mb-3 mt-3 rounded-1 border border-3 border-success";
    mainContainer.style.width = "50%";
    mainContainer.style.marginLeft = "10px";

    // Create the input element
    var inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.className = "form-control";
    inputElement.id = "name";
    inputElement.placeholder = "Enter email";
    inputElement.name = "name";
    inputElement.addEventListener("keypress", function(event) {
        if (event.key === "Enter")
        {
            var content = document.getElementById("content");
            content.innerHTML = "";
            content.appendChild(patientInformationUI());
        }
    });

    // Create the label element
    var labelElement = document.createElement("label");
    labelElement.htmlFor = "name";
    labelElement.textContent = "Name";

    // Append input and label to the main container
    mainContainer.appendChild(inputElement);
    mainContainer.appendChild(labelElement);

    return mainContainer;
}