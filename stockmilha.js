var PLAYER = 123;
var BOT = 321;

function checkEvaluation(good, regular){
    if (good > 4 || regular > 4){
        return false;
    }
    if ((good + regular) > 4){
        return false;
    }
    if (good == 3 & regular == 1){
        return false;
    }

    return true;
}

function getRandomIntInclusive(min, max) {
    // from https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function decideWhoGoesFirst(){
    number = getRandomIntInclusive(1, 10);
    if (number % 2 == 0){
        return PLAYER;
    }
    else{
        return BOT;
    }
}

function evaluateGuess(shot, goal){
    var bulls = 0; // good numbers
    var cows = 0; // regular numbers
    
    for (var i = 0; i < 4; i++){
        if (shot[i] == goal[i]){
            bulls++;
        }
        else if (findIn(shot[i], goal)){
            cows++;
        }
    }

    return {"bulls": bulls, "cows": cows}
}

function findIn(value, array_obj){
    for (var i = 0; i < array_obj.length; i++){
        if (array_obj[i] == value){
            return true;
        } 
    }
    return false;
}

function isNumberValid(candidate){
    if (candidate.length != 4){
        return false;
    }

    var temp_array = []

    for (var i = 0; i < 4; i++){
        if (findIn(candidate[i], temp_array)){
            return false;
        }
        else{
            temp_array.push(candidate[i]);
        }
    }

    return true;
}

class Stockmilha{
    constructor(){
        this.valid_numbers = this.generate_valid_numbers();
        this.candidateGuesses = this.generate_valid_numbers();    
        this.currentGuess = ""; 
        
        this.number = this.valid_numbers[Math.floor(Math.random() * this.valid_numbers.length)];
    }

    generate_valid_numbers(){
        var valid_numbers = [];
        for (var i = 1023; i < 9877; i++){
            if (isNumberValid(i.toString())){
                valid_numbers.push(i.toString());
            }
        }
        return valid_numbers;
    }

    makeAGuess(){
        this.currentGuess =  this.valid_numbers[Math.floor(Math.random() * this.valid_numbers.length)];
        return this.currentGuess;
    }

    updateCandidates(goods, regulars){
        var newCandidates = [];

        for (var i = 0; i < this.candidateGuesses.length; i++){
            var tempEval = evaluateGuess(this.currentGuess, this.candidateGuesses[i]);

            if (tempEval.cows == regulars && tempEval.bulls == goods){
                newCandidates.push(this.candidateGuesses[i]);
            } 
        }

        if (newCandidates.length == 0){
            return false;
        }

        this.candidateGuesses = newCandidates;
        return true;
    }
}