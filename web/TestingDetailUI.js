
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
        linkElement.href = "#collapse" + order;
        linkElement.textContent = "Quick Test";

        // Append the link to the card header
        cardHeader.appendChild(linkElement);

        // Create the card Collapse
        var cardCollapse = document.createElement("div");
        cardCollapse.id = "collapse" + order;
        cardCollapse.className = "collapse";
        cardCollapse.setAttribute("data-bs-parent", "#accordion");

        // Create the card body
        var cardBody = document.createElement("div");
        cardBody.className = "card-body";

        // Append card body into card Collapse
        cardCollapse.appendChild(cardBody);

        // Create paragraphs within the card body (Fix into FOR LOOP)
        var resultParagraph = document.createElement("p");
        resultParagraph.textContent = "Result: Positive";

        var ctValueParagraph = document.createElement("p");
        ctValueParagraph.textContent = "CT Value: 10";

        var patientInfo = document.createElement("p");
        patientInfo.textContent = "Patient: Patient 1";

        cardBody.appendChild(patientInfo);
        cardBody.appendChild(resultParagraph);
        cardBody.appendChild(ctValueParagraph);

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
    var span1 = document.createElement("span"); span1.classList.add("label", "label-primary", "h5"); span1.textContent = "Nguyen Van A";
    li1.appendChild(span1);

    var li2 = document.createElement("li"); li2.classList.add("nav-item", "ms-auto");
    var span2 = document.createElement("span"); span2.classList.add("label", "label-primary", "h5"); span2.textContent = "ID: 1";
    li2.appendChild(span2);

    // Append li elements to ul
    ul.appendChild(li1);
    ul.appendChild(li2);

    // Append ul to button
    button.appendChild(ul);

    // patient's Testing Table Div
    var tableDiv = document.createElement("div");
    tableDiv.className = "collapse"; tableDiv.id = "patient" + order; tableDiv.style = "margin:5px;";

    for (var i = 0; i < 3; i++) {
        tableDiv.appendChild(TestingCard(null, i));
    }

    mainDiv.appendChild(button);
    mainDiv.appendChild(tableDiv);

    return mainDiv;
}

function TestingListUI() {
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
    for (var i = 0; i < 3; i++) {
        secondNestedDiv.appendChild(TestingSlot(null, i));
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
            var content = document.getElementById("content");
            content.innerHTML = "";
            content.appendChild(TestingListUI());
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