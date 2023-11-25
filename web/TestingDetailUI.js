function TestingListUI() {
    function TestingSlotUI(order, testInfo) {
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

    // Create the second nested div
    var secondNestedDiv = document.createElement("div");
    secondNestedDiv.style.width = "60%";

    for (var i = 0; i < 3; i++) {
        secondNestedDiv.appendChild(TestingSlotUI(i));
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