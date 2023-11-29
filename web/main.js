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


function AddBtnClickOn() {
    navBtnClickon(document.getElementById("addBtn"));

    var searchArea = document.getElementById("searchArea");
    searchArea.innerHTML = "";

    var contentArea = document.getElementById("content");
    fetch("./model-addPatient.php")
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

function LogoutBtnClickOn()
{
    fetch("Model/logoutProcessing.php");
}