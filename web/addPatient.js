var num_comorbidity = 0;
var num_symptom = 0;

function add_comorbidity() {
    function remove_comorbidity(child) {
        var container = document.getElementById("comorbidityList");
        container.removeChild(child);
    }

    function comorbiditySlot() {
        var items = document.createElement("div");
        items.className = 'col input-group mb-3';
        // item.setAttribute("id", "comorbidity" + num_comorbidity);

        var comor_span = document.createElement("span");
        comor_span.className = "input-group-text";
        comor_span.innerHTML = "Comorbidity";

        var inputfield = document.createElement("input");
        inputfield.className = "form-control";
        inputfield.type = "text";
        inputfield.name = "comorbidity";

        var remove_btn = document.createElement("span");
        remove_btn.className = "input-group-text btn btn-outline-danger";
        remove_btn.onclick = function () { remove_comorbidity(items); }
        remove_btn.innerHTML = "Remove";

        items.appendChild(comor_span);
        items.appendChild(inputfield);
        items.appendChild(remove_btn);

        return items;
    }

    var container = document.getElementById("comorbidityList");
    container.appendChild(comorbiditySlot());
}

function add_symptom() {
    function remove_symptom(child) {
        var container = document.getElementById("symptomsList");
        container.removeChild(child);
    }

    function symptomSlot() {
        var items = document.createElement("div");
        items.className = 'col input-group mb-3';

        var comor_span = document.createElement("span");
        comor_span.className = "input-group-text";
        comor_span.innerHTML = "Symptom";

        var inputfield = document.createElement("input");
        inputfield.className = "form-control";
        inputfield.type = "text";
        inputfield.name = "symptoms";

        var remove_btn = document.createElement("span");
        remove_btn.className = "input-group-text btn btn-outline-danger";
        remove_btn.onclick = function () { remove_symptom(items); }
        remove_btn.innerHTML = "Remove";

        items.appendChild(comor_span);
        items.appendChild(inputfield);
        items.appendChild(remove_btn);

        return items;
    }

    var container = document.getElementById("symptomsList");
    container.appendChild(symptomSlot());
}

function add_testing(typeTest) {
    function remove_test(child) {
        var container = document.getElementById("testingList");
        container.removeChild(child);
    }

    function TestSlot(labels, id) {
        var divElement = document.createElement("div");
        divElement.classList.add("input-group", "mb-3");
        divElement.id = id;

        for (var i = 0; i < labels.length; i++) {
            var labelSpan = document.createElement("span");
            labelSpan.classList.add("input-group-text");
            labelSpan.textContent = labels[i];
            divElement.appendChild(labelSpan);

            // Create input elements
            var inputElement = document.createElement("input");
            inputElement.classList.add("form-control");
            inputElement.type = "text";
            // inputElement.name = labels[i].toLowerCase().replace(/\s+/g, '');
            divElement.appendChild(inputElement);
        }

        // Create span element for Remove button
        var removeButton = document.createElement("span");
        removeButton.classList.add("input-group-text", "btn", "btn-outline-danger");
        removeButton.textContent = "Remove";
        removeButton.onclick = function () { remove_test(divElement); }
        divElement.appendChild(removeButton);

        return divElement;
    }

    var container = document.getElementById("testingList");
    if (typeTest === 'QuickTest')
        container.appendChild(TestSlot(['Quick Test', 'CT Value', 'Result'], 'quicktest'));
    else if (typeTest === 'PCRTest')
        container.appendChild(TestSlot(['PCR Test', 'CT Value', 'Result'], 'pcrtest'));
    else if (typeTest === 'RespiratoryRate')
        container.appendChild(TestSlot(['Respiratory Rate', 'Breath/Min'], 'respiratoryrate'));
    else if (typeTest === 'SPO2')
        container.appendChild(TestSlot(['SPO2', 'Blood Oxygen Level'], 'spo2'));
}



// --------------------------------------------------------------------------------------------------------------------------------

function create_DoctorMenu() {
    // Create the main div element
    var mainDiv = document.createElement('div');
    mainDiv.className = 'w-100';

    // Create the ul element with classes and inline style
    var ulElement = document.createElement('ul');
    ulElement.className = 'navbar-nav d-flex flex-row';
    ulElement.style.margin = '5px 15px 5px 15px';

    // Create the first li element with class 'nav-item'
    var liElement1 = document.createElement('li');
    liElement1.className = 'nav-item';

    // Create the p element with classes and inline style
    var pElement = document.createElement('p');
    pElement.className = 'h5';
    pElement.style.marginRight = '5px';
    pElement.innerText = 'Doctors';

    // Append p element to the first li element
    liElement1.appendChild(pElement);

    // Create the second li element with class 'nav-item'
    var liElement2 = document.createElement('li');
    liElement2.className = 'nav-item';

    // Create the div element for the doctor list
    var doctorListDiv = document.createElement('div');
    doctorListDiv.id = 'doctorList';
    doctorListDiv.className = 'container d-flex flex-wrap';

    // Create the button element with classes, type, and onclick attribute
    var buttonElement = document.createElement('button');
    buttonElement.type = 'button';
    buttonElement.className = 'btn btn-primary';
    buttonElement.onclick = function () { add_doctor(doctorListDiv); };
    buttonElement.innerText = '+';

    // Append button element to the second li element
    liElement2.appendChild(buttonElement);

    // Append both li elements to the ul element
    ulElement.appendChild(liElement1);
    ulElement.appendChild(liElement2);

    // Append ul element and doctorListDiv to the main div
    mainDiv.appendChild(ulElement);
    mainDiv.appendChild(doctorListDiv);

    return mainDiv;
}

function create_MedicationMenu() {
    var mainDiv = document.createElement('div');
    mainDiv.className = 'w-100';

    // Create the ul element with classes and inline style
    var ulElement = document.createElement('ul');
    ulElement.className = 'navbar-nav d-flex flex-row';
    ulElement.style.margin = '5px 15px 5px 15px';

    // Create the li element with class 'nav-item'
    var liElement = document.createElement('li');
    liElement.className = 'nav-item';

    // Create the p element with classes and inline style
    var pElement = document.createElement('p');
    pElement.className = 'h5';
    pElement.style.marginRight = '5px';
    pElement.innerText = 'Medication';

    // Append p element to the li element
    liElement.appendChild(pElement);

    // Create the second li element with class 'nav-item'
    var liElement2 = document.createElement('li');
    liElement2.className = 'nav-item';

    // Create the div element for the medication list
    var medicationListDiv = document.createElement('div');
    medicationListDiv.id = 'medicationList';
    medicationListDiv.className = 'container';

    // Create the button element with classes, type, and onclick attribute
    var buttonElement = document.createElement('button');
    buttonElement.type = 'button';
    buttonElement.className = 'btn btn-primary';
    buttonElement.onclick = function () { add_medication(medicationListDiv); };
    buttonElement.innerText = '+';

    // Append button element to the second li element
    liElement2.appendChild(buttonElement);

    // Append both li elements to the ul element
    ulElement.appendChild(liElement);
    ulElement.appendChild(liElement2);

    // Append ul element and medicationListDiv to the main div
    mainDiv.appendChild(ulElement);
    mainDiv.appendChild(medicationListDiv);

    return mainDiv;
}

function add_treatment() {

    function remove_treatment(child)
    {
        var treatmentList = document.getElementById('treatmentList');
        treatmentList.removeChild(child);
    }

    function treatmentSlot() {

        function createInputGroup(labelText, inputType, inputClass, inputName) {
            var inputGroupDiv = document.createElement('div');
            inputGroupDiv.className = 'col input-group';

            var label = document.createElement('span');
            label.className = 'input-group-text';
            label.innerText = labelText;

            var input = document.createElement('input');
            input.type = inputType;
            input.className = inputClass;
            input.name = inputName;

            inputGroupDiv.appendChild(label);
            inputGroupDiv.appendChild(input);

            return inputGroupDiv;
        }

        // Create a div element
        var divElement = document.createElement('div');
        divElement.className = 'border border-warning rounded-3 mb-2';
        divElement.style.margin = '0px 5px';

        // Create the inner div with the input group
        var innerDivElement = document.createElement('div');
        innerDivElement.className = 'input-group mt-2';

        // Create the treatment information section
        var treatmentInfoDiv = document.createElement('div');
        treatmentInfoDiv.className = 'row mb-2 w-100';
        treatmentInfoDiv.style.margin = '0px 2px';

        // Create Treatment ID input field
        var treatmentIdDiv = createInputGroup('Treatment ID', 'text', 'form-control', 'treatmentID');

        // Create Start Date input field
        var startDateDiv = createInputGroup('Start date', 'date', 'form-control', 'startDate');

        // Create End Date input field
        var endDateDiv = createInputGroup('End date', 'date', 'form-control', 'endDate');

        // Append Treatment ID, Start Date, and End Date to Treatment Info div
        treatmentInfoDiv.appendChild(treatmentIdDiv);
        treatmentInfoDiv.appendChild(startDateDiv);
        treatmentInfoDiv.appendChild(endDateDiv);

        // Create Doctor Area
        var doctorArea = create_DoctorMenu();

        // Create Medication Area
        var medicationArea = create_MedicationMenu();

        // Create Remove Treatment button
        var removeButtonDiv = document.createElement('div');
        removeButtonDiv.className = 'row mb-2 w-100';
        removeButtonDiv.style.margin = '0px 15px';

        var removeButton = document.createElement('button');
        removeButton.type = 'button';
        removeButton.className = 'btn btn-outline-danger';
        removeButton.innerText = 'Remove Treatment';
        removeButton.onclick = function() { remove_treatment(divElement); };

        removeButtonDiv.appendChild(removeButton);

        // Append all sections to the inner div
        innerDivElement.appendChild(treatmentInfoDiv);
        innerDivElement.appendChild(doctorArea);
        innerDivElement.appendChild(medicationArea);
        innerDivElement.appendChild(removeButtonDiv);

        // Append the inner div to the main div
        divElement.appendChild(innerDivElement);

        return divElement;
    }

    var treatmentList = document.getElementById('treatmentList');
    treatmentList.appendChild(treatmentSlot());
}

function add_medication(medicationList) {
    function remove_medication(child) {
        medicationList.removeChild(child);
    }

    function medicationSlot() {

        function createInputCol(labelText, inputType, inputName) {
            var col = document.createElement('div');
            col.className = 'col input-group';

            var span = document.createElement('span');
            span.className = 'input-group-text';
            span.textContent = labelText;

            var input = document.createElement('input');
            input.type = inputType;
            input.className = 'form-control';
            input.id = inputName;

            col.appendChild(span);
            col.appendChild(input);

            return col;
        }

        var parentDiv = document.createElement('div');
        parentDiv.id = 'medication';
        parentDiv.className = 'container';

        // First row
        var row1 = document.createElement('div');
        row1.className = 'row mb-2 w-100';

        var col1 = createInputCol('Medication Code', 'text', 'medicationCode');
        var col2 = createInputCol('Medication Name', 'text', 'medicationName');

        row1.appendChild(col1);
        row1.appendChild(col2);

        // Second row
        var row2 = document.createElement('div');
        row2.className = 'row mb-2 w-100';

        var col3 = createInputCol('Medication Price', 'text', 'medicationPrice');
        var col4 = createInputCol('Expiration Date', 'date', 'expirationDate');

        row2.appendChild(col3);
        row2.appendChild(col4);

        // Third row
        var row3 = document.createElement('div');
        row3.className = 'row mb-2 w-100';

        var col5 = createInputCol('Effect', 'text', 'medicationEffect');

        var col6 = document.createElement('div');
        col6.className = 'col';
        var removeButton = document.createElement('button');
        removeButton.className = 'btn btn-outline-danger';
        removeButton.type = "button";
        removeButton.textContent = 'Remove';
        removeButton.onclick = function () { remove_medication(parentDiv); };
        col6.appendChild(removeButton);

        row3.appendChild(col5);
        row3.appendChild(col6);

        // Append rows to parent div
        parentDiv.appendChild(row1);
        parentDiv.appendChild(row2);
        parentDiv.appendChild(row3);

        return parentDiv;
    }

    medicationList.appendChild(medicationSlot());
}

function add_doctor(doctorList) {
    function remove_doctor(child) {
        doctorList.removeChild(child);
    }

    function doctorIDSlot() {
        var parentDiv = document.createElement('div');
        parentDiv.className = 'input-group';
        parentDiv.style.width = '25%';
        parentDiv.style.margin = '5px 5px';

        // Create input element
        var inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.className = 'form-control';
        inputElement.placeholder = 'Doctor ID';
        inputElement.id = 'doctorID';

        // Create button element (Remove button)
        var removeButton = document.createElement('button');
        removeButton.type = "button";
        removeButton.className = 'btn btn-outline-danger';
        removeButton.textContent = 'Remove';
        removeButton.onclick = function () { remove_doctor(parentDiv); };

        // Append input and button to parent div
        parentDiv.appendChild(inputElement);
        parentDiv.appendChild(removeButton);

        return parentDiv;
    }

    doctorList.appendChild(doctorIDSlot());
}