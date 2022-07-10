const size =   '<p style="text-align: center;"></p><span class="" style="font-size: 70px;">גודל</span>'
const color = '<p style="text-align: center;"></p><span class="" style="font-size: 70px;">צבע</span>'
const shape = '<p style="text-align: center;"></p><span class="" style="font-size: 70px;">צורה</span>'

const categories = [size, color, shape]

const colors = ["blue", "red"]
const shapes = ["shtrudel", "hashtag"]
const sizes = ["small", "big"]

const stimulus = {
    "blue_shtrudel_small": '<p style="text-align: center;"></p><span class="" style="font-size: 50px; color: blue;">@</span>',
    "blue_hashtag_small": '<p style="text-align: center;"></p><span class="" style="font-size: 50px; color: blue;">#</span>',
    "blue_shtrudel_big": '<p style="text-align: center;"></p><span class="" style="font-size: 100px; color: blue;">@</span>',
    "blue_hashtag_big": '<p style="text-align: center;"></p><span class="" style="font-size: 100px; color: blue;">#</span>',
    "red_shtrudel_small": '<p style="text-align: center;"></p><span class="" style="font-size: 50px; color: red;">@</span>',
    "red_hashtag_small": '<p style="text-align: center;"></p><span class="" style="font-size: 50px; color: red;">#</span>',
    "red_shtrudel_big": '<p style="text-align: center;"></p><span class="" style="font-size: 100px; color: red;">@</span>',
    "red_hashtag_big": '<p style="text-align: center;"></p><span class="" style="font-size: 100px; color: red;">#</span>',
}


function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function createOneFoursome() {
    let stimuli_1 = ""
    let target = ""
    let stimuli_2 = ""
    let stimuli_3 = ""
    random_index = randomIntFromInterval(0, 2)
    if (categories[random_index] == color) {
        random_color = randomIntFromInterval(0, 1)
        target = colors[random_color]
        stimuli_1 = colors[1 - random_color]
        stimuli_2 = colors[1 - random_color]
        stimuli_3 = colors[1 - random_color]
        
    } else {
        let one_random = randomIntFromInterval(0, 1)
        target = colors[randomIntFromInterval(0, 1)]
        stimuli_1 = colors[one_random]
        stimuli_2 = colors[randomIntFromInterval(0, 1)]
        stimuli_3 = colors[1 - one_random]
    }

    if (categories[random_index] == shape) {
        random_shape = randomIntFromInterval(0, 1)
        target += ("_" + shapes[random_shape])
        stimuli_1 += ("_" + shapes[1 - random_shape])
        stimuli_2 += ("_" + shapes[1 - random_shape])
        stimuli_3 += ("_" + shapes[1 - random_shape])
    } else {
        let one_random = randomIntFromInterval(0, 1)
        target += ("_" + shapes[randomIntFromInterval(0, 1)])
        stimuli_1 += ("_" + shapes[randomIntFromInterval(0, 1)])
        stimuli_2 += ("_" + shapes[one_random])
        stimuli_3 += ("_" + shapes[1 - one_random])
    }

    if (categories[random_index] == size) {
        random_size = randomIntFromInterval(0, 1)
        target += ("_" + sizes[random_size])
        stimuli_1 += ("_" + sizes[1 - random_size])
        stimuli_2 += ("_" + sizes[1 - random_size])
        stimuli_3 += ("_" + sizes[1 - random_size])
    } else {
        let one_random = randomIntFromInterval(0, 1)
        target += ("_" + sizes[randomIntFromInterval(0, 1)])
        stimuli_1 += ("_" + sizes[one_random])
        stimuli_2 += ("_" + sizes[1 - one_random])
        stimuli_3 += ("_" + sizes[randomIntFromInterval(0, 1)])
    }
    
    return [target, stimuli_1, stimuli_2, stimuli_3, categories[random_index], random_index]
}

function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }

    return array;
}

count = 0

gorillaTaskBuilder.postProcessSpreadsheet((spreadsheet: any[]) => {
    modifiedSpreadsheet = []
    // iterate over all rows and append the order that they're in now
    for(var i = 0; i < spreadsheet.length; i++) {
        if(spreadsheet[i].display && (spreadsheet[i].display == "Start_Practice" || spreadsheet[i].display == "Actual_Trials")) {
            let trial = createOneFoursome();
            spreadsheet[i].ANSWER = stimulus[trial[0]]
            spreadsheet[i].Clue = trial[4]

            let current_trial = []
            for (let j = 0; j < 4; j++) {
                current_trial.push(trial[j])
            }
            
            trial = shuffle(current_trial);
            spreadsheet[i].Stimulus_Left_Up	= stimulus[trial[0]]
            spreadsheet[i].Stimulus_Right_Up = stimulus[trial[1]]
            spreadsheet[i].Stimulus_Left_Down = stimulus[trial[2]]
            spreadsheet[i].Stimulus_Right_Down = stimulus[trial[3]]
            spreadsheet[i].Count = count
            count++;
            modifiedSpreadsheet.push(spreadsheet[i])
        }
        else {
            modifiedSpreadsheet.push(spreadsheet[i])
        }
    }
    
    return modifiedSpreadsheet
})