var currentBtn = null;

function navBtnClickon(btn) {
    changeBackground(btn);

    var contentArea = document.getElementById("content");
    contentArea.innerHTML = "";
}

function changeBackground(btn) {
    btn.classList.remove("btn-outline-primary");
    btn.classList.add("btn-warning");

    if (currentBtn != null) {
        currentBtn.classList.remove("btn-warning");
        currentBtn.classList.add("btn-outline-primary");
    }
    currentBtn = btn;
}

function searchProcess() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var xml_data = xmlhttp.responseXML;
            var content = document.getElementById("content");
            content.innerHTML = "";
            content.appendChild(patientInformationUI(xml_data));
        }
    }

    // xmlhttp.open("GET", "searchProcessing.php");
    // xmlhttp.send();

    var content = document.getElementById("content");
    content.innerHTML = "";
    content.appendChild(patientInformationUI());
}


function AddBtnClickOn() {
    navBtnClickon(document.getElementById("addBtn"));

    var searchArea = document.getElementById("searchArea");
    searchArea.innerHTML = "";

    var contentArea = document.getElementById("content");
    fetch("./addPatient.php")
        .then(response => response.text())
        .then(htmlContent => { contentArea.innerHTML = htmlContent });
}

function SearchBtnClickOn() {
    navBtnClickon(document.getElementById("searchBtn"));

    var searchArea = document.getElementById("searchArea");
    searchArea.innerHTML = "";

    searchArea.appendChild(searchBarUI());
}

function TestingBtnClickOn() {
    navBtnClickon(document.getElementById("testDetailBtn"));

    var searchArea = document.getElementById("searchArea");
    searchArea.innerHTML = "";

    searchArea.appendChild(TestsearchBarUI());
}

function ReportBtnClickOn() {
    navBtnClickon(document.getElementById("reportBtn"));

    var searchArea = document.getElementById("searchArea");
    searchArea.innerHTML = "";

    searchArea.appendChild(ReportsearchBarUI());
}