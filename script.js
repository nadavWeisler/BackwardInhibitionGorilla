const categories = ["size", "color", "shape"]
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
    if (categories[random_index] == "color") {
        random_color = randomIntFromInterval(0, 1)
        target = colors[random_color]
        if (random_color == 0) {
            stimuli_1 = colors[1]
            stimuli_2 = colors[1]
            stimuli_3 = colors[1]
        } else {
            stimuli_1 = colors[0]
            stimuli_2 = colors[0]
            stimuli_3 = colors[0]
        }
    } else {
        random_color = randomIntFromInterval(0, 1)
        target = colors[random_color]
        random_color = randomIntFromInterval(0, 1)
        stimuli_1 = colors[random_color]
        random_color = randomIntFromInterval(0, 1)
        stimuli_2 = colors[random_color]
        random_color = randomIntFromInterval(0, 1)
        stimuli_3 = colors[random_color]
    }

    if (categories[random_index] == "shape") {
        random_shape = randomIntFromInterval(0, 1)
        target += ("_" + shapes[random_shape])
        if (random_shape == 0) {
            stimuli_1 += ("_" + shapes[1])
            stimuli_2 += ("_" + shapes[1])
            stimuli_3 += ("_" + shapes[1])
        } else {
            stimuli_1 += ("_" + shapes[0])
            stimuli_2 += ("_" + shapes[0])
            stimuli_3 += ("_" + shapes[0])
        }
    } else {
        random_shape = randomIntFromInterval(0, 1)
        target += ("_" + shapes[random_shape])
        random_shape = randomIntFromInterval(0, 1)
        stimuli_1 += ("_" + shapes[random_shape])
        random_shape = randomIntFromInterval(0, 1)
        stimuli_2 += ("_" + shapes[random_shape])
        random_shape = randomIntFromInterval(0, 1)
        stimuli_3 += ("_" + shapes[random_shape])
    }

    if (categories[random_index] == "size") {
        random_size = randomIntFromInterval(0, 1)
        target += ("_" + sizes[random_size])
        if (random_size == 0) {
            stimuli_1 += ("_" + sizes[1])
            stimuli_2 += ("_" + sizes[1])
            stimuli_3 += ("_" + sizes[1])
        } else {
            stimuli_1 += ("_" + sizes[0])
            stimuli_2 += ("_" + sizes[0])
            stimuli_3 += ("_" + sizes[0])
        }
    } else {
        random_size = randomIntFromInterval(0, 1)
        target += ("_" + sizes[random_size])
        random_size = randomIntFromInterval(0, 1)
        stimuli_1 += ("_" + sizes[random_size])
        random_size = randomIntFromInterval(0, 1)
        stimuli_2 += ("_" + sizes[random_size])
        random_size = randomIntFromInterval(0, 1)
        stimuli_3 += ("_" + sizes[random_size])
    }

    return [target, stimuli_1, stimuli_2, stimuli_3, categories[random_index], random_index]
}

function createNFouesomes(n) {
    let all = []
    for (let i = 0; i < n; i++) {
        all.push(createOneFoursome())
    }
    return all
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

allTrials = createNFouesomes(200)

count = 0

gorillaTaskBuilder.postProcessSpreadsheet((spreadsheet) => {
    modifiedSpreadsheet = []
        // iterate over all rows and append the order that they're in now
    for (var i = 0; i < spreadsheet.length; i++) {
        if (spreadsheet[i].display && (spreadsheet[i].display == "Start_Practice" || spreadsheet[i].display == "Actual_Trials")) {
            current_trial = []
            spreadsheet[i].ANSWER = stimulus[allTrials[i][0]]
            for (let j = 0; j < 4; j++) {
                current_trial.push(allTrials[i][j])
            }
            current_trial = shuffle(current_trial)
            current_trial.push(allTrials[i][4])

            spreadsheet[i].Stimulus_Left_Up = stimulus[current_trial[0]]
            spreadsheet[i].Stimulus_Right_Up = stimulus[current_trial[1]]
            spreadsheet[i].Stimulus_Left_Down = stimulus[current_trial[2]]
            spreadsheet[i].Stimulus_Right_Down = stimulus[current_trial[3]]
            spreadsheet[i].Clue = current_trial[4]

        }
        modifiedSpreadsheet.push(spreadsheet[i])
    }

    return modifiedSpreadsheet
})