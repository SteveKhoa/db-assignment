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

function patientInfoUI(patientInfo) {
    var divElement = document.createElement("div");
    divElement.className = "border border-3 border-gray rounded-3";
    divElement.style.width = "80%";

    fetch("Test/model-patientInfo.php")
        .then(response => response.text())
        .then(htmlContent => {
            divElement.innerHTML += htmlContent;
        });

    return divElement;
}

function tableSymptomUI(SymptomList, order) {

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
    anchorElement.className = "btn btn-outline-primary text-start d-flex align-items-center collapsed";
    anchorElement.href = "#tableSymptoms" + order;
    anchorElement.setAttribute("data-bs-toggle", "collapse");
    anchorElement.textContent = "Table Symptoms";

    // Append the anchor element to the first div (The collapse area)
    div1.appendChild(anchorElement);

    // Create the second div
    var div2 = document.createElement("div");
    div2.id = "tableSymptoms" + order;
    div2.className = "collapse";

    const centerDiv = document.createElement("div");
    centerDiv.className = "d-flex flex-column align-items-center";
    div2.appendChild(centerDiv);

    // Create the Table (The table in the collapse area)
    centerDiv.appendChild(createSymptomTable(SymptomList));

    return [div1, div2];
}

// function listTestingUI(testingList) {
//     function testingCardUI(order, testingInfo) {
//         const centerDiv = document.createElement("div");
//         centerDiv.className = "d-flex flex-column align-items-center";

//         const cardDiv = document.createElement('div');
//         cardDiv.className = 'card mb-3';
//         cardDiv.style.width = "80%";

//         centerDiv.appendChild(cardDiv);

//         // Create the card header
//         const cardHeaderDiv = document.createElement('div');
//         cardHeaderDiv.className = 'card-header';

//         // Create the anchor tag within the card header
//         const anchorTag = document.createElement('a');
//         anchorTag.className = 'btn';
//         anchorTag.setAttribute('data-bs-toggle', 'collapse');
//         anchorTag.setAttribute('href', '#collapse' + order);
//         anchorTag.textContent = 'Quick Test';

//         // Append the anchor tag to the card header
//         cardHeaderDiv.appendChild(anchorTag);

//         // Create the collapse div
//         const collapseDiv = document.createElement('div');
//         collapseDiv.id = 'collapse' + order;
//         collapseDiv.className = 'collapse';
//         collapseDiv.setAttribute('data-bs-parent', '#accordion');

//         // Create the card body
//         const cardBodyDiv = document.createElement('div');
//         cardBodyDiv.className = 'card-body';

//         // Add paragraphs to the card body
//         const resultParagraph = document.createElement('p');
//         resultParagraph.textContent = 'Result: ';

//         const ctValueParagraph = document.createElement('p');
//         ctValueParagraph.textContent = 'CT Value: ';

//         // Append paragraphs to the card body
//         cardBodyDiv.appendChild(resultParagraph);
//         cardBodyDiv.appendChild(ctValueParagraph);

//         // Append the card body to the collapse div
//         collapseDiv.appendChild(cardBodyDiv);

//         // Append the card header and collapse div to the card div
//         cardDiv.appendChild(cardHeaderDiv);
//         cardDiv.appendChild(collapseDiv);

//         return centerDiv;
//     }

//     var div1 = document.createElement("div");
//     div1.style.margin = "10px 0 10px 0";

//     // Create the anchor element within the first div
//     var anchorElement = document.createElement("a");
//     anchorElement.style.height = "30px"; anchorElement.style.width = "200px";
//     anchorElement.className = "btn btn-outline-primary text-start d-flex align-items-center collapsed";
//     anchorElement.href = "#listTesting";
//     anchorElement.setAttribute("data-bs-toggle", "collapse");
//     anchorElement.textContent = "List of Testing Detail";

//     // Append the anchor element to the first div
//     div1.appendChild(anchorElement);

//     // Create the second div
//     var div2 = document.createElement("div");
//     div2.id = "listTesting";
//     div2.className = "collapse";

//     for (var i = 0; i < 2; i++) {
//         div2.appendChild(testingCardUI(i, null));
//     }

//     return [div1, div2];
// }

function listTestingUI(testingList, order) {
    function TestRow(testingInfo) {
        var row = document.createElement("tr");

        var col1 = document.createElement("td");
        col1.innerHTML = "SPO2";

        row.appendChild(col1);

        return row;
    }

    function createTestTable(testingList) {
        var tableElement = document.createElement("table");
        tableElement.className = "table table-hover text-center";

        // Create the table header (thead)
        var theadElement = document.createElement("thead");
        var headerRow = document.createElement("tr");

        // Add th elements to the header row
        var thSymptom = document.createElement("th");
        thSymptom.textContent = "Test";
        headerRow.appendChild(thSymptom);

        // Append the header row to the thead
        theadElement.appendChild(headerRow);

        // Create the table body (tbody)
        var tbodyElement = document.createElement("tbody");

        for (var i = 0; i < 2; i++) {
            tbodyElement.appendChild(TestRow());
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
    anchorElement.className = "btn btn-outline-primary text-start d-flex align-items-center collapsed";
    anchorElement.href = "#tableTests" + order;
    anchorElement.setAttribute("data-bs-toggle", "collapse");
    anchorElement.textContent = "Table Tests";

    // Append the anchor element to the first div (The collapse area)
    div1.appendChild(anchorElement);

    // Create the second div
    var div2 = document.createElement("div");
    div2.id = "tableTests" + order;
    div2.className = "collapse";

    const centerDiv = document.createElement("div");
    centerDiv.className = "d-flex flex-column align-items-center";
    div2.appendChild(centerDiv);

    // Create the Table (The table in the collapse area)
    centerDiv.appendChild(createTestTable(testingList));

    return [div1, div2];
}

function listTreatmentUI(treatmentList, order) {
    var div1 = document.createElement("div");
    div1.style.margin = "10px 0 10px 0";

    // Create the anchor element within the first div
    var anchorElement = document.createElement("a");
    anchorElement.className = "btn btn-outline-primary text-start d-flex align-items-center collapsed";
    anchorElement.style.height = "30px"; anchorElement.style.width = "200px";
    anchorElement.href = "#listTreatment" + order;
    anchorElement.setAttribute("data-bs-toggle", "collapse");
    anchorElement.textContent = "List of Treatment";

    // Append the anchor element to the first div
    div1.appendChild(anchorElement);

    // Create the second div
    var div2 = document.createElement("div");
    div2.id = "listTreatment" + order;
    div2.className = "collapse";

    const centerDiv = document.createElement("div");
    centerDiv.className = "d-flex flex-column align-items-center";
    div2.appendChild(centerDiv);


    fetch("Test/model-listTreatment.php")
        .then(response => response.text())
        .then(htmlContent => {
            centerDiv.innerHTML += htmlContent;
        });

    return [div1, div2];
}

function reportUI(patientList) {
    function createReportPatient(patient, order) {
        var patientDiv = document.createElement("div");
        patientDiv.className = "d-flex flex-column align-items-center w-100";

        var patientInformation = patientInfoUI(patient);
        var symptomComponents = tableSymptomUI(patient, order);
        var testingDetailComponent = listTestingUI(patient, order);
        var treatmentComponent = listTreatmentUI(patient, order);

        var listArea = document.createElement("div");
        listArea.style.width = "80%";
        border.appendChild(listArea);

        listArea.appendChild(symptomComponents[0]);
        listArea.appendChild(symptomComponents[1]);

        listArea.appendChild(testingDetailComponent[0]);
        listArea.appendChild(testingDetailComponent[1]);

        listArea.appendChild(treatmentComponent[0]);
        listArea.appendChild(treatmentComponent[1]);

        patientDiv.appendChild(patientInformation);
        patientDiv.appendChild(listArea);

        return patientDiv;
    }

    var border = document.createElement("div");
    border.setAttribute("class", "border border-primary rounded-3 d-flex flex-column align-items-center");
    border.setAttribute("style", "margin:30px 20% 30px 20%;");

    var title = titleReport();

    // Create the main container div
    var reportInfoDiv = document.createElement("div");
    reportInfoDiv.id = "reportInfo";
    reportInfoDiv.className = "carousel slide w-100";

    // Create the carousel inner container div
    var carouselInnerDiv = document.createElement("div");
    carouselInnerDiv.className = "carousel-inner w-100";

    for (var i = 0; i < 3; i++) {
        // Create the first carousel item (active)
        var CarouselItemDiv = document.createElement("div");
        CarouselItemDiv.className = "carousel-item" + (i === 0 ? " active" : "");
        CarouselItemDiv.appendChild(createReportPatient(null, i)); // TODO: CHANGE WHEN HAVE DATA

        carouselInnerDiv.appendChild(CarouselItemDiv);
    }

    // Append the carousel inner container to the main container
    reportInfoDiv.appendChild(carouselInnerDiv);
    border.appendChild(title);
    border.appendChild(reportInfoDiv);

    return border;
}

function ReportslideBarUI(ItemList) {

    function infoArea(Item, order) {
        var carouselItemDiv = document.createElement("div");
        carouselItemDiv.className = "carousel-item h-100" + (order === 0 ? " active" : "");

        var innerContentDiv = document.createElement("div");
        innerContentDiv.className = "d-flex justify-content-center w-100 h-100";

        var contentDiv = document.createElement("div");
        contentDiv.className = "d-flex flex-row align-items-center";
        contentDiv.style.width = "70%";

        var img = document.createElement("img");
        img.className = "navbar-brand rounded-3";
        img.src = "Test/img_avatar3.png";
        img.alt = "HCMUT logo";
        img.width = "50";
        img.height = "50";
        img.style.padding = "3px";
        img.style.margin = "3px";

        var h2 = document.createElement("h2");
        h2.className = "col d-flex justify-content-center";
        h2.textContent = "Nguyen Van A";       // TODO: CHANGE WHEN HAVE INFORMATION

        contentDiv.appendChild(img);
        contentDiv.appendChild(h2);
        innerContentDiv.appendChild(contentDiv);
        carouselItemDiv.appendChild(innerContentDiv);

        return carouselItemDiv;
    }

    // Create the main container div
    var containerDiv = document.createElement("div");
    containerDiv.id = "carousel_info";
    containerDiv.className = "col-6 d-flex flex-row align-items-center";

    // Create the inner container div with form-floating style
    var innerDiv = document.createElement("div");
    innerDiv.className = "form-floating";
    innerDiv.style.width = "100%";
    innerDiv.style.height = "65%";
    innerDiv.style.margin = "0px 20%";

    // Create the previous button
    var prevButton = document.createElement("button");
    prevButton.className = "carousel-control-prev";
    prevButton.type = "button";
    prevButton.setAttribute("data-bs-target", "#infoArea");
    prevButton.setAttribute("data-bs-slide", "prev");
    prevButton.onclick = function () { $('#reportInfo').carousel('prev'); };

    // Create the previous icon span
    var prevIcon = document.createElement("span");
    prevIcon.className = "carousel-control-prev-icon";
    prevButton.appendChild(prevIcon);

    // Create the next button
    var nextButton = document.createElement("button");
    nextButton.className = "carousel-control-next";
    nextButton.type = "button";
    nextButton.setAttribute("data-bs-target", "#infoArea");
    nextButton.setAttribute("data-bs-slide", "next");
    nextButton.onclick = function () { $('#reportInfo').carousel('next'); };

    // Create the next icon span
    var nextIcon = document.createElement("span");
    nextIcon.className = "carousel-control-next-icon";
    nextButton.appendChild(nextIcon);

    // Create the carousel container div
    var carouselDiv = document.createElement("div");
    carouselDiv.id = "infoArea";
    carouselDiv.className = "carousel slide h-100 border border-3 border-warning rounded-3";

    // Create the carousel inner container div
    var carouselInnerDiv = document.createElement("div");
    carouselInnerDiv.className = "carousel-inner h-100";

    // Create carousel items
    var names = ["Nguyen Van A", "Nguyen Van B", "Nguyen Van C"];

    for (var i = 0; i < names.length; i++) {
        var itemUI = infoArea(null, i);
        carouselInnerDiv.appendChild(itemUI);
    }

    // Append elements to the document
    containerDiv.appendChild(innerDiv);
    innerDiv.appendChild(prevButton);
    innerDiv.appendChild(nextButton);
    innerDiv.appendChild(carouselDiv);
    carouselDiv.appendChild(carouselInnerDiv);

    return containerDiv;
}

function ReportsearchBarUI() {
    var mainContainer = document.createElement("div"); mainContainer.className = "row";
    var colDiv = document.createElement("div"); colDiv.className = "col-6";

    var searchBar = document.createElement("div");
    searchBar.className = "form-floating mb-3 mt-3 rounded-1 border";
    searchBar.style.width = "100%";
    searchBar.style.marginLeft = "10px";

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

            var slidingBar = document.getElementById("carousel_info");
            if (slidingBar !== null) { mainContainer.removeChild(slidingBar); }

            mainContainer.appendChild(ReportslideBarUI());
        }
    });

    // Create the label element
    var labelElement = document.createElement("label");
    labelElement.htmlFor = "name";
    labelElement.textContent = "Name";

    // Append input and label to the main container
    searchBar.appendChild(inputElement);
    searchBar.appendChild(labelElement);

    colDiv.append(searchBar);
    mainContainer.append(colDiv);

    return mainContainer;
}