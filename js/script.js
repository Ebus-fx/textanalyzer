// UTILITY FUNCTIONS

function textArea() {
    return document.getElementById("message").value.trim();
}

function textAreaToLowercase(text) {
    return text.toLowerCase()
}

function textAreaToArray(text) {
    return text.split(" ")
}
function inputWord() {
    return document.getElementById("input").value.trim();
}
function badWordsArray() {
    let bad = ["mad", "crazy", "stupid", "fool", "fuck", "fucking", "idiot", "bitch", "foolish", "stupidity", "stupider", "idiotic", "foolishness", "stupidness", "madness", "mumu", "ode", "mugu", 'zoinks', 'loopdaloop', 'biffaroni', 'muppeteer'];
    return bad;
}
function noInputtedWord() {
    for (let i = 0; i < arguments.length; i++) {
        if (arguments[i].trim().length === 0) {
            return true;
        }
    }
    return false;
}

// BUSINESS LOGIC

function countWords() {
    let array = textAreaToArray(textAreaToLowercase(textArea()))
    let counter = 0

    array.forEach(function (text) {
        if (textArea() !== "" && text !== "" && !Number(text)) {
            counter++
        }
    })
    return counter
}
function countOffensiveWords() {
    let array = textAreaToArray(textAreaToLowercase(textArea()))
    let badWords = badWordsArray()
    let counter = 0

    badWords.forEach(function (badtext) {
        array.forEach(function (text) {
            if (textArea() !== "" && text !== "" && !Number(text) && text === badtext) {
                counter++
            }
        });
    });
    return counter
};
function OffensiveWords() {
    let words = textAreaToArray(textAreaToLowercase(textArea()));
    let badWords = badWordsArray()


    for (let i = 0; i < words.length; i++) {
        if (badWords.includes(words[i].toLowerCase())) {
            let maskedWord = words[i][0] + '-'.repeat(words[i].length - 2) + words[i][words[i].length - 1];
            words[i] = maskedWord;
        };
    };
    return words.join(' ');
};
function topThreeWords() {
    if (noInputtedWord(textArea())) {
        return "No WORDs yet"
    }
    let array = textAreaToArray(textAreaToLowercase(textArea()));
    let topUniqueWords = [...new Set(array)];
    let topWords = [];


    topUniqueWords.forEach(function (Uword) {
        let count = 0
        array.forEach(function (words) {
            if (Uword === words)
                count++

        });
        if (Uword !== "" && !Number(Uword)) {
            topWords.push([Uword, count])
        }
    });
    topWords.sort((a, b) => b[1] - a[1]);
    let top3Words = topWords.slice(0, 3)
    let new2 = "<ul>";

    top3Words.forEach(function (Twords) {

        new2 += "<li>" + Twords[0] + " : " + "<b style='color:#14213d;'>" + Twords[1] + "</b>" + "</li>";

    });
    new2 += "</ul>"

    return new2


};
function findLongestWord() {
    let words = textAreaToArray(textAreaToLowercase(textArea()))

    if (words.length === 0) {
        let longest = "No words yet"
        return longest;
    }

    let longestWord = "";

    for (let i = 0; i < words.length; i++) {
        if (words[i].length > longestWord.length && !Number(words[i])) {
            longestWord = words[i];
        }

    }
    if (textArea() !== "") {
        let change = "<p style='font-size:18px; color:rgb(177, 177, 240);'>"
        change += "Lenght of longest word : " + "<b style='font-size:20px; color: aqua;'>" + longestWord.length; + "</b>"
        change += "</p>"
        let result = longestWord + "<br>" + change

        return result
    } else if (textArea() === "") {
        longestWord = "No word yet"
        return longestWord
    }

}



function countWordsOccurence() {
    let words = textAreaToLowercase(inputWord())
    let array = textAreaToArray(textAreaToLowercase(textArea()))
    let counter = 0

    array.forEach(function (text) {
        if (textArea() !== "" && text !== "" && !Number(text) && text === words) {
            counter++
        }
    })
    return counter
}

function colorWordsOccurence() {
    if (noInputtedWord(textArea())) {
        return "";
    }
    let words = textAreaToLowercase(inputWord())
    let array = textAreaToArray(textAreaToLowercase(OffensiveWords()))
    let returnWords = "<p class='textal'>"

    array.forEach(function (text, index) {
        if (text !== "" && !Number(text) && words === text) {
            returnWords += "<b style='background-color:transparent ; border:3px solid red; padding: 1px;'>" +
                text +
                "</b>"
        } else if (text !== "" && words !== "" && !Number(text) && text.includes(words)) {
            const regex = new RegExp(words, "gi");
            let matchArray = text.match(regex);
            text = text.replace(matchArray[0], "<b style='background-color:transparent ; border:1px solid blue; padding: 1px;'>" +
                matchArray[0] +
                "</b>")
            returnWords = returnWords.concat(text);
        } else {
            returnWords = returnWords.concat(text);
        }
        if (index !== array.length - 1) {
            returnWords += " "

        }


    })

    returnWords += "</p>"
    return returnWords

}

function numberToBinary() {
    if (noInputtedWord(textArea())) {
        return "No Numbers yet"
    }
    let array = textAreaToArray(textAreaToLowercase(textArea()));
    let topUniqueWords = [...new Set(array)];
    let binaryNumber = [];


    topUniqueWords.forEach(function (Uword) {
        let binary = null
        let number = null;

        array.forEach(function (words) {
            if (Uword === words) {
                number = Number(words)
                binary = number.toString(2);
            }



        });
        if (Uword !== "" && Number(Uword) && Uword.length <= 2) {
            binaryNumber.push([Uword, binary])
        }

    });
    binaryNumber.sort((a, b) => a[1] - b[1]);
    let NewbinaryNumber = binaryNumber.slice(0, 4)
    let new2 = "<ul>";

    NewbinaryNumber.forEach(function (Twords) {

        new2 += "<li>" + Twords[0] + " : " + "<b style='color:#14213d; font-size:18px;'>" + Twords[1] + "</b>" + "</li>";

    });
    new2 += "</ul>"

    return new2


};


window.onload = function () {
    $("#message").on("input", function () {
        let area = textAreaToLowercase(textArea());
        let textarea = colorWordsOccurence();
        let countOfMessages = countWords();
        let countOfBadWords = countOffensiveWords();
        let topThreeWordsList = topThreeWords();
        let longestWord = findLongestWord();
        // let shortestWord = findShortestWord();
        let countWordsOccurrences = countWordsOccurence();
        let numberToBinaryList = numberToBinary();

        $(".tcount").text(countOfMessages);
        $(".fcount").text(countOfBadWords);
        $(".top").html(topThreeWordsList);
        $(".long").html(longestWord);
        // $(".short").html(shortestWord);
        $(".acount").text(countWordsOccurrences);
        $(".num2").html(numberToBinaryList);
        $("#occur").html(textarea);
    });

    $("#input").on("input", function () {
        let textarea = colorWordsOccurence();
        let countWordsOccurences = countWordsOccurence();
        $(".acount").text(countWordsOccurences);
        $("#occur").html(textarea);
    })
   
}

