/*
<!DOCTYPE html>
<html lang=`en`>
<head>
    <meta charset=`UTF-8`>
    <meta name=`viewport` content=`width=device-width, initial-scale=1.0`>
    <title>Document</title>
    <link rel = `stylesheet` href=`style.css`>
</head>
<body>
    
    <div id = `first_container`>

        <button id = `resetbutton` onclick = `resetpage()` hidden>Look for a new Issue</button>

        <select id = `primary_selection`>
            <option value = `null` selected disabled hidden>Choose a Category</option>
            <option value = `corners`>Corners</option>
            <option value = `straights`>Straights</option>
            <option value = `tyres`>Tyres</option>
            <option value = `breaks`>Breaks</option>
            <option value = `race_conditions`>Race Conditions</option>
            <option value = `other`>Other</option>
        </select>
    </div>

    <div id = `second_container` hidden>
    </div>

    <div id = `solution_container` hidden>

    </div>

    
    <script src=`index.js`></script>
</body>
</html>*/



let resetbtn = document.getElementById('resetbutton');
let primaryslct = document.getElementById('primary_selection');
let second_container = document.getElementById('second_container');
let solution_container = document.getElementById('solution_container');
let flowchart = [];
const sidenote_color = `tomato`;


const categories = {
    corners:{
        options: [
            {value: `corner_entry`, text: `Corner Entry`},
            {value: `corner_mid`, text : `Mid Corner`},
            {value: `corner_exit`, text : `Corner Exit`},
        ],
    },
    straights:{
        options: [
            {value: `low_end`, text: `Low End`},
            {value: `top_end`, text : `Top End`},
        ],
    },
    tyres:{
        options: [
            {value: `overheating`, text: `Tyre Overheating`},
            {value: `overcooling`, text: `Tyre Overcooling`},
            {value: `overheating_on_inside_edge`, text: `Tyre Overheating on Inside Edge`},
            {value: `overheating_on_outside_edge`, text: `Tyre Overheating on Outside Edge`},
        ]
    },
    breaks:{
        options: [
            {value: `locking`, text: `Break Locking`},
            {value: `unstable`, text: `Break Unstable`},
            {value: `improve_breaking_performance`, text: `Improve Breaking Performance`},
        ]
    },
    race_conditions:{
        options:[
            {value: `race_condition_fuel`, text: `Fuel: High Fuel Consumption`},
            {value: `race_condition_tyres`, text: `Tyres`},
            {value: `race_condition_breaks`, text: `Breaks`},
        ]
    },
    other:{
        options:[
            {value: `generally_unstable`, text: `Generally Unstable`},
            {value: `excessive_scraping/bottoming_out`, text: `Excessive Scraping/Bottoming Out`},
            {value: `uncomfortable_taking_kerbs`, text: `Uncomfortable Taking Kerbs`},
        ]
    }, 


    //Corners
    corner_entry: {
        options:[
            {value: `corner_entry_understeer`, text: `Understeer`},
            {value: `corner_entry_oversteer`, text: `Oversteer`},
            {value: `corner_entry_unstable`, text: `Unstable`},
        ]
    },
    corner_mid: {
        options:[
            {value: `corner_mid_understeer`, text: `Understeer`},
            {value: `corner_mid_oversteer`, text: `Oversteer`},
            {value: `corner_mid_unstable`, text: `Unstable`},
        ]
    },
    corner_exit: {
        options:[
            {value: `corner_exit_understeer`, text: `Understeer`},
            {value: `corner_exit_oversteer`, text: `Oversteer`},
            {value: `corner_exit_unstable`, text: `Unstable`},
        ]
    },

    //Straights

    low_end: {
        options:[
            {value: `slow_acceleration`, text: `Slow Acceleration`},
            {value: `wheelspin_at_low_speed`, text: `Wheelspin at Low Speed`},
        ]
    },
    top_end: {
        options:[
            {value: `slow_top_speed`, text: `Slow Top Speed`},
            {value: `overly_sensitive_steering`, text: `Overly Sensitive Steering`},
        ]
    },

    //Tyres

    overheating:{
        solutions: {
            tyres: [
                `Increase Tyre Pressures`,
                `Less Toe <small style=\"color: ${sidenote_color}\">(closer to 0)</small>`,
                `Less Caster`
            ], 
            mechanical_grip: [
                `Move Brake Bias Front or Back`
            ],
            electronics: [
                `Increase Traction Control`
            ],
            aero:[
                `Increase Brake Ducts`
            ]
        }
    }, 
    overcooling:{
        solutions: {
            tyres: [
                `Reduce Tyre Pressures`,
                `More Toe`                
            ], 
            electronics: [
                `Decrease Traction Control`
            ],
            mechanical_grip: [
                `Move Brake Bias Front or Back`
            ],
            aero:[
                `Reduce Brake Ducts`
            ]
        }
    },
    overheating_on_inside_edge:{
        solutions: {
            tyres: [
                `Reduce Tyre Pressures`,
                `Less Toe <small style=\"color: ${sidenote_color}\">(closer to 0)</small>`
            ]
        }
    },
    overheating_on_outside_edge:{
        solutions: {
            tyres: [
                `Increase Tyre Pressures`,
                `Less Toe <small style=\"color: ${sidenote_color}\">(closer to 0)</small>`,
                `More Camber`
            ]
        }
    },

    //Breaks
    locking:{
        solutions: {
            electronics: [
                `Increase ABS`
            ],
            mechanical_grip: [
                `Reduce Braking Power <small style=\"color: ${sidenote_color}\">(not advised)</small>`,
                `Move Brake Bias Away from locking wheels`
            ],
        }
    },

    unstable:{
        solutions: {
            tyres: [
                `Less Toe <small style=\"color: ${sidenote_color}\">(closer to 0)</small>`,
            ], 
            dampers:[
                `Reduce Bump`
            ],
            electronics: [
                `Increase ABS`,
            ],
            mechanical_grip: [
                `Reduce Braking Power <small style=\"color: ${sidenote_color}\">(not advised)</small>`,
                `Move Brake Bias Front`
            ],
            aero:[
                `Increase Rear Wing`,
                `Increase Front Splitter`
            ]
        }
    },
    improve_breaking_performance:{
        solutions: {
            electronics: [
                `Decrease ABS`,
                `Use \`Pads 4\``
            ],
            mechanical_grip: [
                `Increase Braking Power to Maximum`
            ],
            aero:[
                `Increase Rear Wing`,
                `Increase Front Splitter`
            ]
        }
    },

    //RaceConditions
    race_condition_fuel:{
        solutions: {
            tyres: [
                `Increase Tyre Pressure`
            ], 
            electronics: [
                `Decrease ECU Mapping`
            ],
            aero:[
                `Decrease Wing`
            ]
        }
    },
    race_condition_tyres:{
        options: [
            {value: `tempatures_rising`, text: `Tyre Temperatures Rising`},
            {value: `tempatures_falling`, text: `Tyre Temperatures Falling`},
            {value: `excessive_tyre_degradation`, text: `Excessive Tyre Degradation`},
        ]
    },
    race_condition_breaks:{
        options:[
            {value: `excessive_break_wear`, text: `Excessive Break Wear`},
            {value: `excessive_break_temperature`, text: `Excessive Break Temperature`},
        ]
    },

    //Other
    generally_unstable:{
        solutions: {
            tyres: [
                `Reduce Tyre Pressures`
            ], 
            dampers:[
                `Reduce Fast Bump`,
                `Reduce Fast Rebound`
            ],
            electronics: [
                `Increase Traction Control`
            ],
            mechanical_grip: [
                `Decrease Bumpstop Rate`,
                `Increase Bumpstop Range`
            ],
            aero:[
              `Reduce Ride Height`,
              `Increase Rear Wing`,
              `Increase Front Splitter`  
            ]
        }
    },
    excessive_scraping_bottoming_out:{
        solutions: {
            mechanical_grip: [
                `Increase Wheel Rate`,
                `Increase Bumpstop Rate`,
                `Increase Bumbstop Range`
            ],
            aero:[
                `Increase Ride Height`
            ]
        }
    },
    uncomfortable_taking_kerbs:{
        solutions: {
            mechanical_grip: [
                `Reduce Wheel Rate`,
                `Decrease Bumpstop Rate`,
                `Increase Bumpstop Range`
            ],
            dampers:[
                `Reduce Fast Bump`,
                `Reduce Fast Rebound`
            ]
        }
    },

    //corner_entry
    corner_entry_understeer: {
        solutions: {
            tyres: [
                `Reduce Front Tyre Pressures`,
                `More Tow Out <small style=\"color: ${sidenote_color}\">(negative decrease)</small>`,
                `More Front Camber <small style=\"color: ${sidenote_color}\">(negative increase)</small>`,
                `More Caster`
            ],
            mechanical_grip: [
                `Less Front Antiroll bar <small style=\"color: ${sidenote_color}\">OR</small> more Rear Antiroll bar`,
                `Move Brake Bias Rearward`,
                `Reduce Wheel Rate Front`,
                `Increase Differential Preload`
            ],
            dampers:[
                `Increase Front Bump`,
                `Increase Front Rebound`
            ],
            aero: [
                `Reduce Front Ride Height <small style=\"color: ${sidenote_color}\">OR</small> Increased Rear Ride Height`
            ]
        }
    },
    corner_entry_oversteer: {
        solutions: {
            tyres:[
                `Reduce Rear Tyre Pressures`,
                `Less Front Toe Out <small style=\"color: ${sidenote_color}\">(positive increase)</small>`,
                `More Rear Camber <small style=\"color: ${sidenote_color}\">(negative increase)</small>`,
                `Less Front ANtiroll bar <small style=\"color: ${sidenote_color}\">OR</small> more Rear Antiroll bar`
            ],
            electronics:[
                `Increased Traction Control`
            ],
            mechanical_grip:[
                `Reduce Wheel Rate Rear <small style=\"color: ${sidenote_color}\">OR</small> Increase Wheel Rate Front`,
                `Move Brake Bias Forward`,
                `Decrease Preload Differential`
            ],
            dampers:[
                `Reduce Rear Bump`,
                `Reduce Rear Rebound`
            ],
            aero:[
                `Reduce Front Ride Height <small style=\"color: ${sidenote_color}\">OR</small> Increased Rear Ride Height`
            ]
        }
    },
    corner_entry_unstable: {
        solutions: {
            tyres: [
                `Reduce Rear Tyres Pressures`,
                `Less Toe <small style=\"color: ${sidenote_color}\">(negative decrease)</small>`,
                `More Camber <small style=\"color: ${sidenote_color}\">(negative increase)</small>`,
                `More Caster`
            ],
            mechanical_grip:[
                `Move Brake Bias Front`,
                `Increase Bumpstop Range`,
                `Decrease Wheel Rate`
            ],
            aero:[
                `Redice Ride Height`
            ]
        }
    },

    //corner_mid
    corner_mid_understeer: {
        solutions: {
            tyres:[
                `Reduce Front Tyre Pressures`,
                `More Tow Out <small style=\"color: ${sidenote_color}\">(negative decrease)</small>`,
                `Move Front Camber <small style=\"color: ${sidenote_color}\">(negative increase)</small>`,
                `More Caster`
            ],
            mechanical_grip: [
                `Less Front Antiroll bar <small style=\"color: ${sidenote_color}\">OR</small> more Rear Antiroll bar`,
                `Reduce Wheel Rate Front`
            ],
            dampers: [
                `Increase Front Bump`,
                `Increase Front Rebound`
            ],
            aero: [
                `Reduce Front Ride Height <small style=\"color: ${sidenote_color}\">OR</small> Increased Rear Ride Height`,
                `Increase Front Splitter`
            ]
        }
    },
    corner_mid_oversteer: {
        solutions: {
            tyres:[
                `Reduce Rear Tyre Pressures`,
                `Less Front Toe Out <small style=\"color: ${sidenote_color}\">(positive increase)</small>`,
                `More Rear Camber <small style=\"color: ${sidenote_color}\">(negative increase)</small>`,
                `Less Front ANtiroll bar <small style=\"color: ${sidenote_color}\">OR</small> more Rear Antiroll bar`
            ],
            electronics:[
                `Increased Traction Control`
            ],
            mechanical_grip:[
                `Reduce Wheel Rate Rear <small style=\"color: ${sidenote_color}\">OR</small> Increase Wheel Rate Front`,
                `Less Rear Antiroll bar`,
                `Reduce Bumpstop Rate`,
                `Increase Rear Bumpstop Range`,
                `Decrease Preload Differential`
            ],
            dampers:[
                `Reduce Rear Bump`,
                `Reduce Rear Rebound`
            ],
            aero:[
                `Reduce Front Ride Height <small style=\"color: ${sidenote_color}\">OR</small> Increased Rear Ride Height`,
                `Increased Rear Wing`
            ]
        }
    },
    corner_mid_unstable: {
        solutions: {
            tyres: [
                `Reduce Rear Tyres Pressures`,
                `Less Toe <small style=\"color: ${sidenote_color}\">(negative decrease)</small>`,
                `More Camber <small style=\"color: ${sidenote_color}\">(negative increase)</small>`,
                `More Caster`
            ],
            mechanical_grip:[
                `Reduce Bumpstop Rate`,
                `Increase Bumpstop Range`,
                `Decrease Wheel Rate`
            ],
            aero:[
                `Redice Ride Height`
            ]
        }
    },

    //corner_exit
    corner_exit_understeer: {
        solutions: {
            tyres:[
                "Reduce Front Tyre Pressures",
                "More Caster"
            ],
            mechanical_grip: [
                `Less Front Antiroll bar <small style=\"color: ${sidenote_color}\">OR</small> more Rear Antiroll bar`
            ],
            dampers: [
                `Increase Front Bump`,
                `Increase Front Rebound`
            ],
            aero: [
                `Reduce Front Ride Height <small style=\"color: ${sidenote_color}\">OR</small> Increased Rear Ride Height`,
                `Increase Front Splitter`
            ]
        }
    },
    corner_exit_oversteer: {
        solutions: {
            tyres: [
                `Reduce Rear Tyre Pressures`,
                `More Rear Camber <small style=\"color: ${sidenote_color}\">(negative increase)</small>`,
                `Less Front Antiroll Bar <small style=\"color: ${sidenote_color}\">OR</small> more Rear Antiroll bar`
            ],
            electronics:[
                `Increased Traction Control`
            ],
            mechanical_grip:[
                `Reduce Wheel Rate Rear <small style=\"color: ${sidenote_color}\">OR</small> Increase Wheel Rate Front`,
                `Less Rear Antiroll bar`,
                `Reduce Bumpstop Rate`,
                `Decrease Preload Differential`
            ],
            aero: [
                `Reduce Front Ride Height <small style=\"color: ${sidenote_color}\">OR</small> Increased Rear Ride Height`,
                `Increased Rear Wing`
            ]
        }
    },
    corner_exit_unstable: {
        solutions: {
            tyres: [
                `Reduce Rear Tyre Pressures`,
                `Less Toe <small style=\"color: ${sidenote_color}\">(negative decrease)</small>`,
                `More Chamber <small style=\"color: ${sidenote_color}\">(negative increase)</small>`,
                `More Caster`
            ],
            electronics: [
                `Increased Traction Control`
            ],
            mechanical_grip: [
                `Increase Bumbstop Range`,
                `Decrease Wheel Rate`
            ],
            aero: [
                `Reduce Ride Height`,
                `Increase Rear Wing, Increase Front Splitter`
            ]
        }
    },

    //low_end
    slow_acceleration: {
        solutions: {
            electronics: [
              `Decrease Traction Control`,
              `Increase ECU Mapping`
            ],
            mechanical_grip: [
              `Decrease Preload Differential`
            ],
            dampers: [
              `Increase Rear Bump`
            ],
            aero: [
              `Decrease Rear Wing`,
              `Decrease Front Wing`,
              `Reduce Brake Ducts`
            ]
          }
    },
    wheelspin_at_low_speed: {
        solutions: {
            tyres: [
              `Reduce Rear Tyre Pressures`,
              `Reduce Rear Camber (close to 0)`
            ],
            electronics: [
              `Increase Traction Control`
            ],
            mechanical_grip: [
              `Less Rear Antiroll Bar`,
              `Decrease Preload Differential`
            ]
          }
    },

    //top_end
    slow_top_speed: {
        solutions: {
            tyres: [
              `Increase Tyre Pressures`,
              `Less Toe <small style=\"color: ${sidenote_color}\">(closer to 0)</small>`,
              `More Camber <small style=\"color: ${sidenote_color}\">(negative decrease)</small>`
            ],
            electronics: [
              `Increase ECU Mapping`
            ],
            aero: [
              `Decrease Rear Wing`,
              `Decrease Front Wing`,
              `Reduce Brake Ducts`
            ]
          }
    },
    overly_sensitive_steering: {
        solutions: {
            tyres: [
              `Less Toe Front and Rear`,
              `Less Front Camber <small style=\"color: ${sidenote_color}\">(closer to 0)</small>`,
              `More Caster`
            ],
            mechanical: [
              `Reduce Steering Ratio`
            ]
          }
    },

    //r_tyres
    tempatures_rising: {
        solutions: {
            tyres: [
              `Increase Tyre Pressures`
            ],
            electronics: [
              `Increase Traction Control`
            ]
          }
    },
    tempatures_falling: {
        solutions: {
            tyres: [
              `Reduce Tyre Pressures`
            ],
            electronics: [
              `Decrease Traction Control`
            ]
          }
    },
    excessive_tyre_degradation: {
        solutions: {
            tyres: [
              `Less Toe <small style=\"color: ${sidenote_color}\">(closer to 0)</small>`,
              `Less Caster`,
              `Reduce Tyre Pressures`
            ],
            electronics: [
              `Decrease Traction Control`
            ]
          }
    },

    //race_condition_breaks
    excessive_break_wear: {
        solutions: {
            electronics: [
              `Increase ABS`,
              `Use "Pads 2" or "Pads 3"`
            ],
            aero: [
              `Reduce Brake Ducts`
            ],
            mechanical_grip: [
              `Reduce Braking Power <small style=\"color: ${sidenote_color}\">(not advised)</small>`,
              `Move Brake Bias away from locking wheels`
            ]
          }
    },
    excessive_break_temperature: {
        solutions: {
            electronics: [
              `Increase ABS`,
              `Use "Pads 2" or "Pads 3"`
            ],
            aero: [
              `Increase Brake Ducts`
            ],
            mechanical_grip: [
              `Reduce Braking Power <small style=\"color: ${sidenote_color}\">(not advised)</small>`,
              `Move Brake Bias away from hot wheels`
            ]
          }
    },
};


function createSelectElement(category) {
    const categoryData = categories[category];
    if (!categoryData) return '';
    
    let selectHTML = `<select id="secondery_selections">
        <option value="null" selected disabled hidden>Choose a Category from ${valuetotext(category)}</option>`; //The null option is a placeholder for the user to select a category.

    categoryData.options.forEach((option) => {
        selectHTML += `<option value="${option.value}">${option.text}</option>`;
    });

    selectHTML += `</select>`;
    return selectHTML;
}

primaryslct.addEventListener('change', function () {
    let value = primaryslct.value;
    second_container.innerHTML = ''; // Clear previous content

    flowchart.push(valuetotext(value));

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
        flowchart.push(valuetotext(value));

        if (categories[value]['solutions']) {
            solution_container.innerHTML = `<p>${createflow(flowchart)}</p>`;
            solution_container.hidden = false;
            resetbtn.hidden = false;
            second_container.hidden = true;
            solution_container.innerHTML += printSolutions(value);

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
    primaryslct.value = `null`;
    second_container.innerHTML = '';
    solution_container.innerHTML = '';
    solution_container.hidden = true;
    flowchart = [];
}

function valuetotext(value){
    const capitalizedWords = value.split(`_`).map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      });
      
    const text = capitalizedWords.join(` `);
    return text;
}

function createflow(flowchart){
    let output = ``;
    for (let i = 0; i < flowchart.length; i++) {
        if (i != 0) output += ` 🡪 `;
        output += `${flowchart[i]}`
    }

    return output;
}

function printSolutions(value){
    let solutions = categories[value]['solutions'];
    let output = ``;
    //print different solution category in different div element
    for (let category in solutions) {
        output += `<div class="solution-category"><h3>${valuetotext(category)}</h3><ul>`;
        solutions[category].forEach(solution => {
            output += `<li>${solution}</li>`;
        });
        output += `</ul></div>`;
    }
    return output;
}