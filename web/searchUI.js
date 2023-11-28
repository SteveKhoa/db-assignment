function createPatientSlot(patientInfo, order) {

    function createCard(headerText, bodyText) {
        var cardDiv = document.createElement("div");
        cardDiv.classList.add("card", "rounded-3", "mb-2");

        var cardHeader = document.createElement("div");
        cardHeader.classList.add("card-header");
        cardHeader.textContent = headerText;

        var cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        cardBody.textContent = bodyText;

        cardDiv.appendChild(cardHeader);
        cardDiv.appendChild(cardBody);

        return cardDiv;
    }

    // Create a new div element
    var mainDiv = document.createElement("div");
    mainDiv.classList.add("border", "border-primary", "rounded-3", "mb-2");
    mainDiv.style.width = "80%";

    // Create a button element
    var button = document.createElement("button");
    button.classList.add("btn", "w-100");
    button.setAttribute("data-bs-toggle", "collapse");
    button.setAttribute("data-bs-target", "#patient" + order);

    // Create a ul element
    var ul = document.createElement("ul");
    ul.classList.add("navbar-nav", "mb-2", "mb-lg-0", "d-flex", "flex-row");

    // Create li elements
    var li1 = document.createElement("li");
    li1.classList.add("nav-item");
    var span1 = document.createElement("span");
    span1.classList.add("label", "label-primary", "h5");
    span1.textContent = "Patient: " + patientInfo['name'];
    li1.appendChild(span1);

    var li2 = document.createElement("li");
    li2.classList.add("nav-item", "ms-auto");
    var span2 = document.createElement("span");
    span2.classList.add("label", "label-primary", "h5");
    span2.textContent = "ID: " + patientInfo['patientID'];
    li2.appendChild(span2);

    // Append li elements to ul
    ul.appendChild(li1);
    ul.appendChild(li2);

    // Append ul to button
    button.appendChild(ul);

    // Append button to mainDiv
    mainDiv.appendChild(button);

    // Create a div element for patient information
    var patientInfoDiv = document.createElement("div");
    patientInfoDiv.id = "patient" + order;
    patientInfoDiv.classList.add("collapse");
    patientInfoDiv.style.margin = "5px";

    // Create card elements for patient information (If want to create more information => Add to here).
    var card1 = createCard("Name", patientInfo['name']);
    var card2 = createCard("Phone number", patientInfo['patientPhone']);
    var card3 = createCard("Comorbidity", patientInfo['patientComorbidities'].join(' '));

    // Append card elements to patientInfoDiv
    patientInfoDiv.appendChild(card1);
    patientInfoDiv.appendChild(card2);
    patientInfoDiv.appendChild(card3);

    // Append patientInfoDiv to mainDiv
    mainDiv.appendChild(patientInfoDiv);

    return mainDiv;
}

function patientInformationUI(itemList) {
    // Create Topic Div
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

    for (var i = 0; i < itemList.length; i++)
    {
        var itemUI = createPatientSlot(itemList[i], i);
        mainContainer.appendChild(itemUI);
    }

    return mainContainer;
}

function searchBarUI() {
    var mainContainer = document.createElement("div");
    mainContainer.className = "form-floating mb-3 mt-3 rounded-1 border";
    mainContainer.style.width = "50%";
    mainContainer.style.marginLeft = "10px";

    // Create the input element
    var inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.className = "form-control";
    inputElement.id = "name";
    inputElement.placeholder = "Enter email";
    inputElement.name = "name";
    inputElement.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            retrievePatientData(this.value).then(text_data => {
                var json_data = JSON.parse(text_data);
                var ui_node = patientInformationUI(json_data);

                var content = document.getElementById("content");
                content.innerHTML = "";
                content.appendChild(ui_node);
            });
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

function retrievePatientData(name) {
    return fetch('./Model/patientInformation.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'name=' + encodeURIComponent(name),
    })
        .then(response => response.text())
        .then(data => {
            return data;
        })
        .catch(error => console.error('Error:', error));
}