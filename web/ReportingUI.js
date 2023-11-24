function titleReport() {
    // Create the main container div
    var mainContainer = document.createElement("div");
    mainContainer.className = "border border-3 bg-warning d-flex justify-content-center rounded-3 mb-4 mt-2";
    mainContainer.style.height = "10%";
    mainContainer.style.width = "70%";

    // Create the h2 element within the main container
    var h2Element = document.createElement("h2");
    h2Element.textContent = "Patient Information";

    // Append the h2 element to the main container
    mainContainer.appendChild(h2Element);

    return mainContainer;
}

function patientInfoUI(patientInfo) 
{
    var divElement = document.createElement("div");
    divElement.className = "border border-3 border-gray rounded-3";
    divElement.style.width = "80%";

    fetch("Test/patientInfo.php")
        .then(response => response.text())
        .then(htmlContent => {
            divElement.innerHTML += htmlContent;
        });

    return divElement;
}

function tableSymptomUI(SymptomList) {

    function SymptomRow(SymptomInfo) {
        var row = document.createElement("tr");

        var col1 = document.createElement("td");
        col1.innerHTML = "Headache";

        var col2 = document.createElement("td");
        col2.innerHTML = "23-11-2023";

        row.appendChild(col1);
        row.appendChild(col2);

        return row;
    }

    function createSymptomTable(SymptomList) {
        var tableElement = document.createElement("table");
        tableElement.className = "table table-hover text-center";

        // Create the table header (thead)
        var theadElement = document.createElement("thead");
        var headerRow = document.createElement("tr");

        // Add th elements to the header row
        var thSymptom = document.createElement("th");
        thSymptom.textContent = "Symptom";
        headerRow.appendChild(thSymptom);

        var thTime = document.createElement("th");
        thTime.textContent = "Time";
        headerRow.appendChild(thTime);

        // Append the header row to the thead
        theadElement.appendChild(headerRow);

        // Create the table body (tbody)
        var tbodyElement = document.createElement("tbody");

        for (var i = 0; i < 2; i++) {
            tbodyElement.appendChild(SymptomRow());
        }

        tableElement.appendChild(theadElement);
        tableElement.appendChild(tbodyElement);
        return tableElement;
    }

    var div1 = document.createElement("div");
    div1.style.margin = "10px 0 10px 0";

    // Create the anchor element within the first div (The button for collapse)
    var anchorElement = document.createElement("a");
    anchorElement.style.height = "30px"; anchorElement.style.width = "200px";
    anchorElement.className = "btn btn-outline-primary text-lg";
    anchorElement.href = "#tableSymptoms";
    anchorElement.setAttribute("data-bs-toggle", "collapse");
    anchorElement.textContent = "Table Symptoms";

    // Append the anchor element to the first div (The collapse area)
    div1.appendChild(anchorElement);

    // Create the second div
    var div2 = document.createElement("div");
    div2.id = "tableSymptoms";
    div2.className = "collapse";

    const centerDiv = document.createElement("div");
    centerDiv.className = "d-flex flex-column align-items-center";
    div2.appendChild(centerDiv);

    // Create the Table (The table in the collapse area)
    centerDiv.appendChild(createSymptomTable(SymptomList));

    return [div1, div2];
}

function listTestingUI(testingList) {
    function testingCardUI(order, testingInfo) {
        const centerDiv = document.createElement("div");
        centerDiv.className = "d-flex flex-column align-items-center";

        const cardDiv = document.createElement('div');
        cardDiv.className = 'card mb-3';
        cardDiv.style.width = "80%";

        centerDiv.appendChild(cardDiv);

        // Create the card header
        const cardHeaderDiv = document.createElement('div');
        cardHeaderDiv.className = 'card-header';

        // Create the anchor tag within the card header
        const anchorTag = document.createElement('a');
        anchorTag.className = 'btn';
        anchorTag.setAttribute('data-bs-toggle', 'collapse');
        anchorTag.setAttribute('href', '#collapse' + order);
        anchorTag.textContent = 'Quick Test';

        // Append the anchor tag to the card header
        cardHeaderDiv.appendChild(anchorTag);

        // Create the collapse div
        const collapseDiv = document.createElement('div');
        collapseDiv.id = 'collapse' + order;
        collapseDiv.className = 'collapse';
        collapseDiv.setAttribute('data-bs-parent', '#accordion');

        // Create the card body
        const cardBodyDiv = document.createElement('div');
        cardBodyDiv.className = 'card-body';

        // Add paragraphs to the card body
        const resultParagraph = document.createElement('p');
        resultParagraph.textContent = 'Result: ';

        const ctValueParagraph = document.createElement('p');
        ctValueParagraph.textContent = 'CT Value: ';

        // Append paragraphs to the card body
        cardBodyDiv.appendChild(resultParagraph);
        cardBodyDiv.appendChild(ctValueParagraph);

        // Append the card body to the collapse div
        collapseDiv.appendChild(cardBodyDiv);

        // Append the card header and collapse div to the card div
        cardDiv.appendChild(cardHeaderDiv);
        cardDiv.appendChild(collapseDiv);

        return centerDiv;
    }

    var div1 = document.createElement("div");
    div1.style.margin = "10px 0 10px 0";

    // Create the anchor element within the first div
    var anchorElement = document.createElement("a");
    anchorElement.style.height = "30px"; anchorElement.style.width = "200px";
    anchorElement.className = "btn btn-outline-primary text-lg";
    anchorElement.href = "#listTesting";
    anchorElement.setAttribute("data-bs-toggle", "collapse");
    anchorElement.textContent = "List of Testing Detail";

    // Append the anchor element to the first div
    div1.appendChild(anchorElement);

    // Create the second div
    var div2 = document.createElement("div");
    div2.id = "listTesting";
    div2.className = "collapse";

    for (var i = 0; i < 2; i++) {
        div2.appendChild(testingCardUI(i, null));
    }

    return [div1, div2];
}

function listTreatmentUI(treatmentList) {
    var div1 = document.createElement("div");
    div1.style.margin = "10px 0 10px 0";

    // Create the anchor element within the first div
    var anchorElement = document.createElement("a");
    anchorElement.className = "btn btn-outline-primary text-lg";
    anchorElement.style.height = "30px"; anchorElement.style.width = "200px";
    anchorElement.href = "#listTreatment";
    anchorElement.setAttribute("data-bs-toggle", "collapse");
    anchorElement.textContent = "List of Treatment";

    // Append the anchor element to the first div
    div1.appendChild(anchorElement);

    // Create the second div
    var div2 = document.createElement("div");
    div2.id = "listTreatment";
    div2.className = "collapse";
    
    const centerDiv = document.createElement("div");
    centerDiv.className = "d-flex flex-column align-items-center";
    div2.appendChild(centerDiv);


    fetch("Test/listTreatment.php")
        .then(response => response.text())
        .then(htmlContent => {
            centerDiv.innerHTML += htmlContent;
        });

    return [div1, div2];
}

function reportUI(patient) {
    var border = document.createElement("div");
    border.setAttribute("class", "border border-primary rounded-3 d-flex flex-column align-items-center");
    border.setAttribute("style", "margin:30px 20% 30px 20%;");

    var title = titleReport();
    var patientInformation = patientInfoUI(patient);
    var symptomComponents = tableSymptomUI(patient);
    var testingDetailComponent = listTestingUI(patient);
    var treatmentComponent = listTreatmentUI(patient);

    border.appendChild(title);

    border.appendChild(patientInformation);

    var listArea = document.createElement("div");
    listArea.style.width = "80%";
    border.appendChild(listArea);

    listArea.appendChild(symptomComponents[0]);
    listArea.appendChild(symptomComponents[1]);

    listArea.appendChild(testingDetailComponent[0]);
    listArea.appendChild(testingDetailComponent[1]);

    listArea.appendChild(treatmentComponent[0]);
    listArea.appendChild(treatmentComponent[1]);

    return border;
}


function ReportsearchBarUI() {
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
    inputElement.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            var content = document.getElementById("content");
            content.innerHTML = "";
            content.append(reportUI(null, content));
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