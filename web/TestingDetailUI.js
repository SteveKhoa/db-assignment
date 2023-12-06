// Adapter:
function testAdapter(testingInfo, patientName) {
    console.log(testingInfo);
    if (testingInfo['type'] === 'quickTest') {
        return { 'type': 'Quick Test', 'value': { 'Patient Name': patientName, 'Result': testingInfo['result'], 'CT Value': testingInfo['ctValue'] } };
    }
    else if (testingInfo['type'] === 'respiratoryRate') {
        return { 'type': 'Respiratory Rate', 'value': { 'Patient Name': patientName, 'Breath/Min': testingInfo['breathpermin'] } };
    }
    else if (testingInfo['type'] === 'SPO2') {
        return { 'type': 'SPO2', 'value': { 'Patient Name': patientName, 'Blood Oxygen Level': testingInfo['oxylevel'] } };
    }
    else if (testingInfo['type'] === 'PCRTest') {
        return { 'type': 'PCR Test', 'value': { 'Patient Name': patientName, 'Date': testingInfo['testDate'], 'Result': testingInfo['result'], 'CT Value': testingInfo['ctValue'] } };
    }
}

// This will generate the slot for each patients with the specific name
function TestingSlot(patientInfo, order) {

    // This will generate the card for each testing of a specific patient.
    function TestingCard(testInfo, order) {

        var mainContainer = document.createElement("div");
        mainContainer.className = "card mb-3";

        // Create the card header
        var cardHeader = document.createElement("div");
        cardHeader.className = "card-header";

        // Create the link within the card header
        var linkElement = document.createElement("a");
        linkElement.className = "btn";
        linkElement.setAttribute("data-bs-toggle", "collapse");
        linkElement.href = "#collapse" + patientInfo['patientID'] + order;

        // Append the link to the card header
        cardHeader.appendChild(linkElement);

        // Create the card Collapse
        var cardCollapse = document.createElement("div");
        cardCollapse.id = "collapse" + patientInfo['patientID'] + order;
        cardCollapse.className = "collapse";
        cardCollapse.setAttribute("data-bs-parent", "#accordion");

        // Create the card body
        var cardBody = document.createElement("div");
        cardBody.className = "card-body";

        // Append card body into card Collapse
        cardCollapse.appendChild(cardBody);

        // Append Item Data into Each Field
        console.log(testInfo);
        var standardItem = testAdapter(testInfo, patientInfo['name']);
        linkElement.textContent = standardItem['type'];     // TODO: NEED CHANGE

        for (const key in standardItem['value']) {
            var cardContent = document.createElement("p");
            cardContent.textContent = key + ": " + standardItem['value'][key];
            cardBody.appendChild(cardContent);
        }

        // Append card header and card body to the main container
        mainContainer.appendChild(cardHeader);
        mainContainer.appendChild(cardCollapse);

        return mainContainer;
    }

    // Main div for containing the button and the collapse area
    var mainDiv = document.createElement("div");
    mainDiv.className = "border border-primary rounded-3 mb-2";

    // Create a button element
    var button = document.createElement("button");
    button.classList.add("btn", "w-100");
    button.setAttribute("data-bs-toggle", "collapse");
    button.setAttribute("data-bs-target", "#patient" + order);

    // Create a ul element
    var ul = document.createElement("ul");
    ul.classList.add("navbar-nav", "mb-2", "mb-lg-0", "d-flex", "flex-row");

    // Create li elements
    var li1 = document.createElement("li"); li1.classList.add("nav-item");
    var span1 = document.createElement("span"); span1.classList.add("label", "label-primary", "h5");
    span1.textContent = "Name: " + patientInfo['name'];
    li1.appendChild(span1);

    var li2 = document.createElement("li"); li2.classList.add("nav-item", "ms-auto");
    var span2 = document.createElement("span"); span2.classList.add("label", "label-primary", "h5");
    span2.textContent = "ID: " + patientInfo['patientID'];
    li2.appendChild(span2);

    // Append li elements to ul
    ul.appendChild(li1);
    ul.appendChild(li2);

    // Append ul to button
    button.appendChild(ul);

    // patient's Testing Table Div
    var tableDiv = document.createElement("div");
    tableDiv.className = "collapse"; tableDiv.id = "patient" + order; tableDiv.style = "margin:5px;";

    for (var i = 0; i < patientInfo['Testing'].length; i++) {
        var testingCardUI = TestingCard(patientInfo['Testing'][i], i);
        tableDiv.appendChild(testingCardUI);
    }

    mainDiv.appendChild(button);
    mainDiv.appendChild(tableDiv);

    return mainDiv;
}

function TestingListUI(itemList) {
    var mainContainer = document.createElement("div");
    mainContainer.className = "border border-primary rounded-3 d-flex flex-column align-items-center";
    mainContainer.style.margin = "30px 20% 30px 20%";

    // Create the first nested div
    var firstNestedDiv = document.createElement("div");
    firstNestedDiv.className = "border border-3 bg-warning d-flex justify-content-center rounded-3 mb-4 mt-2";
    firstNestedDiv.style.height = "10%";
    firstNestedDiv.style.width = "70%";

    // Create an h2 element within the first nested div
    var h2Element = document.createElement("h2");
    h2Element.textContent = "Testing Table";

    // Append the h2 element to the first nested div
    firstNestedDiv.appendChild(h2Element);

    // Create the patient div
    secondNestedDiv = document.createElement("div");
    secondNestedDiv.style.width = "60%";
    for (var i = 0; i < itemList.length; i++) {
        secondNestedDiv.appendChild(TestingSlot(itemList[i], i));
    }

    // Append the first and second nested divs to the main container
    mainContainer.appendChild(firstNestedDiv);
    mainContainer.appendChild(secondNestedDiv);

    return mainContainer;
}

function TestsearchBarUI() {
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

            retrievePatientTesting(this.value).then(json_data => {
                //     var new_json_data = [{
                //         "name": "Le Thu Thuy", "patientID": 100001, "Testing": [
                //             { "type": "respiratoryRate", "breathpermin": 31 },
                //             { "type": "SPO2", "oxylevel": 12 }
                //         ]
                //     },
                //     { 'name': 'Le Trung Trinh', 'patientID': 100002, "Testing": [
                //         {'type': 'quickTest', 'ctValue': 14, 'result': 'positive'}
                //     ]}
                // ];

                var testingUI = TestingListUI(json_data);

                var content = document.getElementById("content");
                content.innerHTML = "";
                content.appendChild(testingUI);
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

function retrievePatientTesting(name) {
    return fetch('./Model/TestingDetail.php',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'name=' + encodeURIComponent(name),
        })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => console.error('Error:', error));
}