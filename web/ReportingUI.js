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

    var patientContent = `
    <div class="row d-flex justify-content-center mt-2 mb-2" style="height:50px;">
        <div class="col-md-5 d-flex align-items-center h-100">
            <div class="input-group d-flex justify-content-center h-100" style="margin:0;">
                <span class="input-group-text h-100 d-flex align-items-center justify-content-center">Fullname</span>
                <p class="form-control h-100 d-flex align-items-center justify-content-center" style="overflow-y:auto;">${patientInfo['Name']}</p>
            </div>
        </div>
        <div class="col-md-5 d-flex align-items-center h-100">
            <div class="input-group d-flex justify-content-center h-100" style="margin:0;">
                <span class="input-group-text h-100 d-flex align-items-center justify-content-center">Patient ID</span>
                <p class="form-control h-100 d-flex align-items-center justify-content-center" style="overflow-y:auto;">${patientInfo['PatientID']}</p>
            </div>
        </div>
    </div>

    <div class="row d-flex justify-content-center mt-2 mb-2" style="height:50px;">
        <div class="col-md-5 d-flex align-items-center h-100">
            <div class="input-group d-flex justify-content-center h-100" style="margin:0;">
                <span class="input-group-text h-100 d-flex align-items-center justify-content-center">Address</span>
                <p class="form-control h-100 text-center align-items-center" style="overflow-y:auto;">${patientInfo['Address']}</p>
            </div>
        </div>

        <div class="col-md-5 d-flex align-items-center h-100">
            <div class="input-group d-flex justify-content-center h-100" style="margin:0;">
                <span class="input-group-text h-100 d-flex align-items-center justify-content-center">Phone number</span>
                <p class="form-control h-100 d-flex align-items-center justify-content-center" style="overflow-y:auto;">${patientInfo['patientPhone']}</p>
            </div>
        </div>
    </div>

    <div class="row d-flex justify-content-center mt-2 mb-2" style="height:50px;">
        <div class="col-md-5 d-flex align-items-center h-100">
            <div class="input-group d-flex justify-content-center h-100" style="margin:0;">
                <span class="input-group-text d-flex justify-content-center h-100">Gender</span>
                <p class="form-control h-100 d-flex align-items-center justify-content-center">${patientInfo['Gender'] === 'M' ? 'Male' : 'Female'}</p>
            </div>
        </div>
        <div class="col-md-5 d-flex align-items-center h-100">
            <div class="input-group d-flex justify-content-center h-100" style="margin:0;">
                <span class="input-group-text d-flex justify-content-center h-100">Comordities</span>
                <p class="form-control h-100 text-center align-items-center" style="overflow-y:auto;">${patientInfo['Comorbidity'].join(', ')}</p>
            </div>
        </div>
    </div>`;

    divElement.innerHTML += patientContent;
    return divElement;
}

function tableSymptomUI(SymptomList, order) {

    function SymptomRow(SymptomInfo) {
        var row = document.createElement("tr");

        var col1 = document.createElement("td");
        col1.innerHTML = SymptomInfo['type'];

        var col2 = document.createElement("td");
        col2.innerHTML = SymptomInfo['date'];

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

        for (var i = 0; i < SymptomList.length; i++) {
            tbodyElement.appendChild(SymptomRow(SymptomList[i]));
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

// Adapter: use for standardize the test structure
function Adapter(testingInfo) {
    if (testingInfo['type'] === 'quickTest') {
        return { 'type': 'Quick Test', 'testDate': testingInfo['testDate'] };
    }
    else if (testingInfo['type'] === 'respiratoryRate') {
        return { 'type': 'Respiratory Rate', 'testDate': testingInfo['testDate']  };
    }
    else if (testingInfo['type'] === 'SPO2') {
        return { 'type': 'SPO2', 'testDate': testingInfo['testDate']  };
    }
    else if (testingInfo['type'] === 'pcrTest') {
        return { 'type': 'PCR Test', 'testDate': testingInfo['testDate']  };
    }
}

function listTestingUI(testingList, order) {
    function TestRow(testingInfo) {
        var row = document.createElement("tr");

        var col1 = document.createElement("td");
        col1.innerHTML = testingInfo['type'];

        var col2 = document.createElement("td");
        col2.innerHTML = testingInfo['testDate'];

        row.appendChild(col1);
        row.appendChild(col2);

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

        var thSymptom = document.createElement("th");
        thSymptom.textContent = "Date";
        headerRow.appendChild(thSymptom);

        // Append the header row to the thead
        theadElement.appendChild(headerRow);

        // Create the table body (tbody)
        var tbodyElement = document.createElement("tbody");

        testingList.forEach(item => {
            var standardTest = Adapter(item);
            tbodyElement.appendChild(TestRow(standardTest));
        });

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

function listTreatmentUI(treatmentList, firstIndex) {

    // Create MEDICATION INFORMATION (Start date, End date, and Doctor)
    function createMedicationInfo(treatmentItem, secondIndex) {

        // Create MEDICATION (medication name, code, price, effect, ...)
        function createMedicationUI(medicationItem, thirdIndex) {
            return `
            <div class="btn border border-primary" style="width:100%; margin-bottom:10px;">
                <a class="btn" href="#medication_first${firstIndex}_second${secondIndex}_third${thirdIndex}" data-bs-toggle="collapse" style="width:100%;">Medication ${thirdIndex}</a>
                <div id="medication_first${firstIndex}_second${secondIndex}_third${thirdIndex}" class="collapse">
                    <div class="row d-flex justify-content-center mt-1">
                        <div class="col-md">
                            <div class="input-group d-flex align-items-baseline">
                                <span class="input-group-text">Name</span>
                                <p class="form-control">${medicationItem['name']}</p>
                            </div>
                        </div>
                        <div class="col-md">
                            <div class="input-group d-flex align-items-baseline">
                                <span class="input-group-text">Expiration date</span>
                                <p class="form-control">${medicationItem['expireDate']}</p>
                            </div>
                        </div>
                    </div>

                    <div class="row d-flex justify-content-center mt-1">
                        <div class="col-md">
                            <div class="input-group d-flex align-items-baseline">
                                <span class="input-group-text">Price</span>
                                <p class="form-control">${medicationItem['price']}</p>
                            </div>
                        </div>
                        <div class="col-md">
                            <div class="input-group d-flex align-items-baseline">
                                <span class="input-group-text">Effect</span>
                                <p class="form-control">${medicationItem['effect']}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        }

        var treatmentSlotUI = `
        <div class="card mb-3" style="width:100%">
            <div class="card-body">
                <div class="input-group d-flex align-items-baseline">
                    <span class="input-group-text">Start date</span>
                    <p class="form-control">${treatmentItem['startDate']}</p>
                </div>
                <div class="input-group d-flex align-items-baseline">
                    <span class="input-group-text">End date</span>
                    <p class="form-control">${treatmentItem['endDate']}</p>
                </div>
                <div class="input-group d-flex align-items-baseline">
                    <span class="input-group-text">Doctor</span>
                    <p class="form-control">${treatmentItem['doctor'].join(', ')}</p>
                </div>`

        treatmentItem['medication'].forEach((element, index) => {
            treatmentSlotUI += createMedicationUI(element, index + 1);
        })
        treatmentSlotUI += '</div></div>';

        return treatmentSlotUI;
    }

    var div1 = document.createElement("div");
    div1.style.margin = "10px 0 10px 0";

    // Create the anchor element within the first div
    var anchorElement = document.createElement("a");
    anchorElement.className = "btn btn-outline-primary text-start d-flex align-items-center collapsed";
    anchorElement.style.height = "30px"; anchorElement.style.width = "200px";
    anchorElement.href = "#listTreatment" + firstIndex;
    anchorElement.setAttribute("data-bs-toggle", "collapse");
    anchorElement.textContent = "List of Treatments";

    // Append the anchor element to the first div
    div1.appendChild(anchorElement);

    // Create the second div
    var div2 = document.createElement("div");
    div2.id = "listTreatment" + firstIndex;
    div2.className = "collapse";

    treatmentList.forEach((treatmentItem, index) => {
        const centerDiv = document.createElement("div");
        centerDiv.className = "d-flex flex-column align-items-center";
        centerDiv.innerHTML += createMedicationInfo(treatmentItem, index + 1);

        div2.appendChild(centerDiv);
    });


    return [div1, div2];
}

function reportUI(patientList) {

    // Create each patient report UI
    function createReportPatient(patient, order) {
        var patientDiv = document.createElement("div");
        patientDiv.className = "d-flex flex-column align-items-center w-100";

        var listArea = document.createElement("div");
        listArea.style.width = "80%";

        var patientInformation = patientInfoUI(patient);
        var symptomComponents = tableSymptomUI(patient['Symptom'], order);
        listArea.appendChild(symptomComponents[0]);
        listArea.appendChild(symptomComponents[1]);

        var testingDetailComponent = listTestingUI(patient['Testing'], order);
        listArea.appendChild(testingDetailComponent[0]);
        listArea.appendChild(testingDetailComponent[1]);

        var treatmentComponent = listTreatmentUI(patient['Treatment'], order);
        listArea.appendChild(treatmentComponent[0]);
        listArea.appendChild(treatmentComponent[1]);

        border.appendChild(listArea);

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

    for (var i = 0; i < patientList.length; i++) {
        // Create the first carousel item (active)
        var CarouselItemDiv = document.createElement("div");
        CarouselItemDiv.className = "carousel-item" + (i === 0 ? " active" : "");
        CarouselItemDiv.appendChild(createReportPatient(patientList[i], i)); // TODO: CHANGE WHEN HAVE DATA

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
        img.src = "Image/img_avatar3.png";
        img.alt = "HCMUT logo";
        img.width = "50";
        img.height = "50";
        img.style.padding = "3px";
        img.style.margin = "3px";

        var h2 = document.createElement("h2");
        h2.className = "col d-flex justify-content-center";
        h2.setAttribute("style", "font-size:" + Math.max(16 - (Item['Name'].length - 15) * 0.5, 10) + "px");
        h2.textContent = Item['Name'];       // TODO: CHANGE WHEN HAVE INFORMATION

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
    prevIcon.className = "carousel-control-prev-icon bg-warning rounded-3";
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
    nextIcon.className = "carousel-control-next-icon bg-warning rounded-3";
    nextButton.appendChild(nextIcon);

    // Create the carousel container div
    var carouselDiv = document.createElement("div");
    carouselDiv.id = "infoArea";
    carouselDiv.className = "carousel slide h-100 border border-3 border-warning rounded-3";

    // Create the carousel inner container div
    var carouselInnerDiv = document.createElement("div");
    carouselInnerDiv.className = "carousel-inner h-100";

    // Create carousel items
    for (var i = 0; i < ItemList.length; i++) {
        var itemUI = infoArea(ItemList[i], i);
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

            retrievePatientReport(this.value).then(json_data => {
                
                var slidingBar = document.getElementById("carousel_info");
                if (slidingBar !== null) { mainContainer.removeChild(slidingBar); }

                var slidingBarUI = ReportslideBarUI(json_data);
                var reportContentUI = reportUI(json_data);

                var content = document.getElementById("content");
                content.innerHTML = "";
                content.appendChild(reportContentUI);

                mainContainer.appendChild(slidingBarUI);
            });
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

function retrievePatientReport(name) {
    return fetch('./Model/reportInfo.php', {
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