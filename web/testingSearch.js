
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
    inputElement.placeholder = "Enter name";
    inputElement.name = "name";
    inputElement.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            // Call the PHP file to retrieve patient information
            retrievePatientInformation(inputElement.value);

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

function retrievePatientInformation(name) {
    fetch('./Model/patientInformation.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'name=' + encodeURIComponent(name),
    })
        .then(response => response.text())
        .then(data => {
            // the console.log is not easy to read so i format it to be easy to read
            // Display the result in the content area
            const jsonData = JSON.parse(data);

            // Display the result in the content area
            console.log(JSON.stringify(jsonData, null, 2));
        })
        .catch(error => console.error('Error:', error));
}

