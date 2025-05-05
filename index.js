/*
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel = "stylesheet" href="style.css">
</head>
<body>
    
    <div id = "first_container">

        <button id = "resetbutton" onclick = "resetpage()" hidden>Look for a new Issue</button>

        <select id = "primary_selection">
            <option value = "null" selected disabled hidden>Choose a Category</option>
            <option value = "corners">Corners</option>
            <option value = "straights">Straights</option>
            <option value = "tyres">Tyres</option>
            <option value = "breaks">Breaks</option>
            <option value = "race_conditions">Race Conditions</option>
            <option value = "other">Other</option>
        </select>
    </div>

    <div id = "second_container" hidden>

    </div>

    <div id = "solution_container" hidden>

    </div>

    
    <script src="script.js"></script>
</body>
</html>*/



let resetbtn = document.getElementById('resetbutton');
let primaryslct = document.getElementById('primary_selection');
let second_container = document.getElementById('second_container');

const categories = {
    corners:{
        options: [
            {value: "corner_entry", text: "Corner Entry"},
            {value: "corner_mid", text : "Mid Corner"},
            {value: "corner_exit", text : "Corner Exit"},
        ],
    },
    straights:{
        options: [
            {value: "low_end", text: "Low End"},
            {value: "top_end", text : "Top End"},
        ],
    },
    tyres:{
        options: [
            {value: "overheating", text: "Tyre Overheating"},
            {value: "overcooling", text: "Tyre Overcooling"},
            {value: "overheating_on_inside_edge", text: "Tyre Overheating on Inside Edge"},
            {value: "overheating_on_outside_edge", text: "Tyre Overheating on Outside Edge"},
        ]
    },
    breaks:{
        options: [
            {value: "locking", text: "Break Locking"},
            {value: "unstable", text: "Break Unstable"},
            {value: "improve_breaking_performance", text: "Improve Breaking Performance"},
        ]
    },
    race_conditions:{
        options:[
            {value: "fuel", text: "Fuel: High Fuel Consumption"},
            {value: "tyres", text: "Tyres"},
            {value: "breaks", text: "Breaks"},
        ]
    },
    other:{
        options:[
            {value: "generally_unstable", text: "Generally Unstable"},
            {value: "excessive_scraping/bottoming_out", text: "Excessive Scraping/Bottoming Out"},
            {value: "uncomfortable_taking_kerbs", text: "Uncomfortable Taking Kerbs"},
        ]
    }
};


function createSelectElement(category) {
    const categoryData = categories[category];
    if (!categoryData) return '';

    let selectHTML = `<select id="selected_${category}_value">
        <option value="null" selected disabled hidden>Choose a Category</option>`; //The null option is a placeholder for the user to select a category.

    categoryData.options.forEach((option) => {
        selectHTML += `<option value="${option.value}">${option.text}</option>`;
    });

    selectHTML += `</select>`;
    return selectHTML;
}

primaryslct.addEventListener('change', function () {
    let value = primaryslct.value;
    second_container.innerHTML = ''; // Clear previous content

    if (categories[value]) {
        second_container.innerHTML = createSelectElement(value);
        second_container.hidden = false;
        primaryslct.hidden = true;
        resetbtn.hidden = false;
    } else {
        second_container.hidden = true;
    }
});

function resetpage() {
    primaryslct.hidden = false;
    second_container.hidden = true;
    resetbtn.hidden = true;
    primaryslct.value = "null";
    second_container.innerHTML = '';
}