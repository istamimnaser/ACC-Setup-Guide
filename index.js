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

    
    <script src="index.js"></script>
</body>
</html>*/



let resetbtn = document.getElementById('resetbutton');
let primaryslct = document.getElementById('primary_selection');
let second_container = document.getElementById('second_container');
let solution_container = document.getElementById('solution_container');



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
            {value: "r_fuel", text: "Fuel: High Fuel Consumption"},
            {value: "r_tyres", text: "Tyres"},
            {value: "r_breaks", text: "Breaks"},
        ]
    },
    other:{
        options:[
            {value: "generally_unstable", text: "Generally Unstable"},
            {value: "excessive_scraping/bottoming_out", text: "Excessive Scraping/Bottoming Out"},
            {value: "uncomfortable_taking_kerbs", text: "Uncomfortable Taking Kerbs"},
        ]
    }, 


    //Corners
    corner_entry: {
        options:[
            {value: "corner_entry_understeer", text: "Understeer"},
            {value: "corner_entry_oversteer", text: "Oversteer"},
            {value: "corner_entry_unstable", text: "Unstable"},
        ]
    },
    corner_mid: {
        options:[
            {value: "corner_mid_understeer", text: "Understeer"},
            {value: "corner_mid_oversteer", text: "Oversteer"},
            {value: "corner_mid_unstable", text: "Unstable"},
        ]
    },
    corner_exit: {
        options:[
            {value: "corner_exit_understeer", text: "Understeer"},
            {value: "corner_exit_oversteer", text: "Oversteer"},
            {value: "corner_exit_unstable", text: "Unstable"},
        ]
    },

    //Straights

    low_end: {
        options:[
            {value: "slow_acceleration", text: "Slow Acceleration"},
            {value: "wheelspin_at_low_speed", text: "Wheelspin at Low Speed"},
        ]
    },
    top_end: {
        options:[
            {value: "slow_top_speed", text: "Slow Top Speed"},
            {value: "overly_sensitive_steering", text: "Overly Sensitive Steering"},
        ]
    },

    //Tyres

    overheating:{
        solutions: {
            tyres: [
                "Increase Tyre Pressures",
                "Less Toe <b>(closer to 0)</b>",
                "Less Caster"
            ], 
            mechanical_grip: [
                "Move Brake Bias Front or Back"
            ],
            electronics: [
                "Increase Traction Control"
            ],
            aero:[
                "Increase Brake Ducts"
            ]
        }
    }, 
    overcooling:{
        solutions: []
    },
    overheating_on_inside_edge:{
        solutions: []
    },
    overheating_on_outside_edge:{
        solutions: []
    },

    //Breaks
    locking:{
        solutions: []
    },

    unstable:{
        solutions: []
    },
    improve_breaking_performance:{
        solutions: []
    },

    //RaceConditions
    r_fuel:{
        solutions: []
    },
    r_tyres:{
        options: [
            {value: "tempatures_rising", text: "Tyre Temperatures Rising"},
            {value: "tempatures_falling", text: "Tyre Temperatures Falling"},
            {value: "excessive_tyre_degradation", text: "Excessive Tyre Degradation"},
        ]
    },
    r_breaks:{
        options:[
            {value: "excessive_break_wear", text: "Excessive Break Wear"},
            {value: "excessive_break_temperature", text: "Excessive Break Temperature"},
        ]
    },

    //Other
    generally_unstable:{
        solutions: []
    },
    excessive_scraping_bottoming_out:{
        solutions: []
    },
    uncomfortable_taking_kerbs:{
        solutions: []
    },

    //corner_entry
    corner_entry_understeer: {
        solutions: []
    },
    corner_entry_oversteer: {
        solutions: []
    },
    corner_entry_unstable: {
        solutions: []
    },

    //corner_mid
    corner_mid_understeer: {
        solutions: []
    },
    corner_mid_oversteer: {
        solutions: []
    },
    corner_mid_unstable: {
        solutions: []
    },

    //corner_exit
    corner_exit_understeer: {
        solutions: []
    },
    corner_exit_oversteer: {
        solutions: []
    },
    corner_exit_unstable: {
        solutions: []
    },

    //low_end
    slow_acceleration: {
        solutions: []
    },
    wheelspin_at_low_speed: {
        solutions: []
    },

    //top_end
    slow_top_speed: {
        solutions: []
    },
    overly_sensitive_steering: {
        solutions: []
    },

    //r_tyres
    tempatures_rising: {
        solutions: []
    },
    tempatures_falling: {
        solutions: []
    },
    excessive_tyre_degradation: {
        solutions: []
    },

    //r_breaks
    excessive_break_wear: {
        solutions: []
    },
    excessive_break_temperature: {
        solutions: []
    },
};


function createSelectElement(category) {
    const categoryData = categories[category];
    if (!categoryData) return '';

    let selectHTML = `<select id="secondery_selections">
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

let secondery_selections = document.getElementById('secondery_selections');

second_container.addEventListener('change', function (event) {
    if (event.target && event.target.id === 'secondery_selections') {
        let value = event.target.value;
        solution_container.innerHTML = ''; // Clear previous content

        if (categories[value]['solutions']) {
            solution_container.innerHTML = "There is a solution for this issue";
            solution_container.hidden = false;
            console.log("Solution found!");
        } else if (categories[value]['options']) {
            second_container.innerHTML = createSelectElement(value);
            second_container.hidden = false;
            resetbtn.hidden = false;
        } else {
            solution_container.hidden = true;
        }
    }
});



function resetpage() {
    primaryslct.hidden = false;
    second_container.hidden = true;
    resetbtn.hidden = true;
    primaryslct.value = "null";
    second_container.innerHTML = '';
    solution_container.innerHTML = '';
    solution_container.hidden = true;
}