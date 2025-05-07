
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
              `Reduce Rear Camber <small style=\"color: ${sidenote_color}\">(close to 0)</small>`
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


function createSelectElement(categoryKey, selectId = "secondary_selections") {
    const categoryData = categories[categoryKey];
    if (!categoryData || !categoryData.options) {
        console.error(`No options found for category: ${categoryKey}`);
        return '<p class="text-red-400">Error: Configuration issue for this selection.</p>';
    }

    // Capitalize the first letter of categoryKey for display
    const displayName = categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1).replace(/_/g, ' ');

    let selectHTML = `<select id="${selectId}" class="bg-gray-700 border border-gray-600 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 mt-2">
        <option value="null" selected disabled hidden>Choose from ${valuetotext(categoryKey)}...</option>`;

    categoryData.options.forEach((option) => {
        selectHTML += `<option value="${option.value}">${option.text}</option>`;
    });

    selectHTML += `</select>`;
    return selectHTML;
}

/**
 * Handles changes in the primary selection dropdown.
 * Populates the secondary selection container based on the primary choice.
 */
primaryslct.addEventListener('change', function () {
    let value = primaryslct.value;
    second_container.innerHTML = ''; // Clear previous content
    solution_container.innerHTML = ''; // Clear solutions
    solution_container.hidden = true;
    flowchart = []; // Reset flowchart

    if (value === "null") {
        second_container.hidden = true;
        resetbtn.hidden = true;
        primaryslct.hidden = false;
        return;
    }

    flowchart.push(valuetotext(primaryslct.options[primaryslct.selectedIndex].text)); // Use selected option's text

    if (categories[value] && categories[value].options) {
        second_container.innerHTML = createSelectElement(value, "secondary_selection_1");
        second_container.hidden = false;
        second_container.style.animation = "fadeIn 0.5s ease-in-out";
        primaryslct.hidden = true;
        resetbtn.hidden = false;
    } else if (categories[value] && categories[value].solutions) { // Direct to solution from primary
        solution_container.innerHTML = `<p class="flowchart-path">${createflow(flowchart)}</p>`;
        solution_container.innerHTML += printSolutions(value);
        solution_container.hidden = false;
        solution_container.style.animation = "fadeIn 0.5s ease-in-out";
        primaryslct.hidden = true;
        second_container.hidden = true;
        resetbtn.hidden = false;
    } else {
        second_container.innerHTML = '<p class="text-red-400">No further options or solutions for this category.</p>';
        second_container.hidden = false;
        second_container.style.animation = "fadeIn 0.5s ease-in-out";
        primaryslct.hidden = true;
        resetbtn.hidden = false;
    }
});

/**
 * Handles changes in dynamically created select elements within the second_container.
 * This function is delegated to the second_container.
 */
second_container.addEventListener('change', function (event) {
    // Check if the event target is a select element we're interested in
    if (event.target && event.target.tagName === 'SELECT') {
        let value = event.target.value;
        solution_container.innerHTML = ''; // Clear previous solution content

        if (value === "null") return; // Do nothing if the placeholder is selected

        // Add current selection to flowchart using the option's display text
        const selectedOptionText = event.target.options[event.target.selectedIndex].text;
        flowchart.push(selectedOptionText);


        if (categories[value] && categories[value].solutions) {
            // Display solutions
            solution_container.innerHTML = `<p class="flowchart-path">${createflow(flowchart)}</p>`;
            solution_container.innerHTML += printSolutions(value);
            solution_container.hidden = false;
            solution_container.style.animation = "fadeIn 0.5s ease-in-out";
            second_container.hidden = true; // Hide current select container
            resetbtn.hidden = false; // Ensure reset button is visible
        } else if (categories[value] && categories[value].options) {
            // Create and display the next select element
            // To allow for multiple levels of selects, we generate a unique ID for the next select
            const nextSelectId = `secondary_selection_${flowchart.length}`;
            second_container.innerHTML = createSelectElement(value, nextSelectId); // Replace current select with new one
            second_container.hidden = false;
            second_container.style.animation = "fadeIn 0.5s ease-in-out";
            resetbtn.hidden = false;
        } else {
            // No further options or solutions
            solution_container.innerHTML = `<p class="flowchart-path">${createflow(flowchart)}</p><p class="text-yellow-400">No specific solutions defined for this path yet.</p>`;
            solution_container.hidden = false;
            solution_container.style.animation = "fadeIn 0.5s ease-in-out";
            second_container.hidden = true;
            resetbtn.hidden = false;
        }
    }
});


/**
 * Resets the page to its initial state.
 * Hides secondary and solution containers, shows primary selection.
 */
function resetpage() {
    primaryslct.hidden = false;
    second_container.hidden = true;
    solution_container.hidden = true;
    resetbtn.hidden = true;
    primaryslct.value = `null`; // Reset dropdown to default
    second_container.innerHTML = ''; // Clear dynamic content
    solution_container.innerHTML = ''; // Clear solutions
    flowchart = []; // Clear the flowchart path
}

/**
 * Converts a snake_case string to Title Case Text.
 * @param {string} value - The string to convert.
 * @returns {string} The converted Title Case string.
 */
function valuetotext(value) {
    if (typeof value !== 'string') return '';
    const capitalizedWords = value.split(`_`).map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
    return capitalizedWords.join(` `);
}

/**
 * Creates a string representing the flowchart path.
 * @param {Array<string>} flowchartArray - Array of selected steps.
 * @returns {string} A string like "Step 1 🡪 Step 2 🡪 Step 3".
 */
function createflow(flowchartArray) {
    // Use a more distinct arrow and ensure proper spacing for readability
    return flowchartArray.join(` <span class="text-blue-400 font-semibold mx-1">&raquo;</span> `);
}

/**
 * Generates HTML string for displaying solutions for a given category value.
 * @param {string} value - The key of the category in the `categories` object that has solutions.
 * @returns {string} HTML string of categorized solutions.
 */
function printSolutions(value) {
    const categorySolutions = categories[value]['solutions'];
    if (!categorySolutions) return '<p class="text-yellow-400">No solutions available for this selection.</p>';

    // Defines the mapping of solution category keys to their respective icon image paths.
    // Ensure these paths are correct and the 'icons' folder is in the same directory as your HTML file.
    // The key for mechanical_grip assumes the image file is named mechanical_grip.png
    const iconMap = {
        'tyres': 'icons/tyres.png',
        'mechanical_grip': 'icons/mechanical_grip.png',
        'aero': 'icons/aero.png',
        'electronics': 'icons/electronics.png',
        'dampers': 'icons/damper.png',
        'fuel': 'icons/fuel.png'
        // Categories without a direct icon in the provided image (e.g., 'gearing', 'driving_style') will not display an icon.
    };

    let output = `<div class="solutions-grid grid gap-4 md:grid-cols-2 lg:grid-cols-1">`; // Changed to lg:grid-cols-1 for better display with icons

    for (let categoryNameKey in categorySolutions) {
        const iconSrc = iconMap[categoryNameKey]; // Direct lookup using the key
        // Conditionally create the image tag if an icon source exists for the category
        // Icon size changed from h-6 w-6 to h-5 w-5
        const iconHTML = iconSrc? `<img src="${iconSrc}" alt="${valuetotext(categoryNameKey)} icon" style="width: 20px; height: 20px;" class="solution-category-icon mr-1 inline-block">`: '';

        output += `<div class="solution-category-item bg-gray-700 p-4 rounded-lg shadow"> 
                    <h3 class="text-lg font-semibold text-green-400 mb-2 border-b border-gray-600 pb-1 flex items-center">
                        ${iconHTML}
                        <span class="flex-grow">${valuetotext(categoryNameKey)}</span>
                    </h3>
                    <ul class="list-disc list-inside space-y-1 text-gray-300 pl-2">`; // Added pl-2 for better alignment of list items
        categorySolutions[categoryNameKey].forEach(solution => {
            output += `<li class="text-sm">${solution}</li>`; 
        });
        output += `</ul></div>`;
    }
    output += `</div>`;
    return output;
}
