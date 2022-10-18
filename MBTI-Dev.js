// base weights for each answers confident level
let weights = {
	1: 0,
	2: 0.5,
	3: 1,
	4: 1.5,
	5: 2
};

// temperment prob levels extracted from data
// we can use this when the answers are in neurtral state
let temperment_probabilities = {
	IE: { I: 0.43, E: 0.56 },
	NS: { N: 0.59, S: 0.4 },
	FT: { F: 0.63, T: 0.37 },
	JP: { J: 0.46, P: 0.54 }
};

// final personality type string 
let personalityType = "";

// braking all answers based on 4 catogeries I vs E AND N vs S AND F vs T AND J vs P
let IEAnswerSet = {};
let NSAnswerSet = {};
let FTAnswerSet = {};
let JPAnswerSet = {};

// function to find if the person is introvert or extrovert
function setIEType (answerDictForIE){
    let weightedTotalForIntrovert = 0;

    // get weigted avg for introvert
    for(var i=1;i<4;i++){
        weightedTotalForIntrovert = weightedTotalForIntrovert + weights[answerDictForIE[i]]*temperment_probabilities["IE"]['I'];
    }

    let weightedAverageForIntrovert = weightedTotalForIntrovert/3;

    let weightedTotalForExtrovert=0;

    // get weighted avg for extrovert
    for(var i=4;i<7;i++){
        weightedTotalForExtrovert = weightedTotalForExtrovert + weights[answerDictForIE[i]]*temperment_probabilities["IE"]['E'];
    }

    let weightedAverageForExtrovert = weightedTotalForExtrovert/3;

    console.log(weightedTotalForIntrovert,weightedTotalForExtrovert)

    // return a string representing whether the person is an introvrt or extrovert based on weighted avg
    if (weightedAverageForIntrovert>weightedAverageForExtrovert){
        return "I";
    }else{

        return "E";
    }

};

// sensors and intutivs 
function setNSType(answerDictForSN){
    let weightedTotalForIntuitives = 0;

    // same procedure as above method 
    for(var i=7;i<10;i++){
        weightedTotalForIntuitives = weightedTotalForIntuitives + weights[answerDictForSN[i]]*temperment_probabilities["NS"]['N'];
    }

    let weightedAverageForIntuitives = weightedTotalForIntuitives /3;

    let weightedTotalForSensors = 0;

    for(var i=10;i<13;i++){
        weightedTotalForSensors = weightedTotalForSensors + weights[answerDictForSN[i]]*temperment_probabilities["NS"]['S'];
    }

    let weightedAverageForSensors = weightedTotalForSensors/3;

    console.log(weightedAverageForIntuitives,weightedAverageForSensors)

    if (weightedAverageForIntuitives>weightedAverageForSensors){

        return "N";
    }else{

        return "S";
    }

};

// Thinkers vs Feelers
function setFTType(answerDictForTF){
    let weightedTotalForThink = 0;
     // same procedure as above method 
    for(var i=13;i<16;i++){
        weightedTotalForThink = weightedTotalForThink  + weights[answerDictForTF[i]]*temperment_probabilities["FT"]['F'];
    }

    let weightedAverageForThink= weightedTotalForThink /3;

    let weightedTotalForFeel=0;

    for(var i=16;i<19;i++){
        weightedTotalForFeel = weightedTotalForFeel + weights[answerDictForTF[i]]*temperment_probabilities["FT"]['T'];
    }

    let weightedAverageForFeel = weightedTotalForFeel /3;

    console.log(weightedAverageForThink,weightedAverageForFeel)

    if (weightedAverageForThink > weightedAverageForFeel){

        return "F";
    }else{

        return "T";
    }
};

// Judgers vs perceivers

function setJPType(answerDictForJP){
    let weightedTotalForJudge = 0;
     // same procedure as above method 
    for(var i=19;i<22;i++){
        weightedTotalForJudge = weightedTotalForJudge  + weights[answerDictForJP[i]]*temperment_probabilities["JP"]['J'];
        // console.log("total",answerDictForJP[i])
    }

    let weightedAverageForJudge= weightedTotalForJudge /3;

    let weightedTotalForPerceiver=0;

    for(var i=22;i<25;i++){
        weightedTotalForPerceiver = weightedTotalForPerceiver + weights[answerDictForJP[i]]*temperment_probabilities["JP"]['P'];
    }

    let weightedAverageForPerceiver = weightedTotalForPerceiver /3;
    console.log(weightedAverageForJudge,weightedAverageForPerceiver)

    if (weightedAverageForJudge > weightedAverageForPerceiver){
        
        return "J";
    }else{

        return "P";
    }

};

// process answers from the above functions an get the final MBTI personality type
exports.processAnswerData = function (answersList) {
	for (var questionNo = 0; questionNo < 25; questionNo++) {
		if (questionNo < 6) {
			IEAnswerSet[questionNo + 1] =
				answersList[questionNo];
		} else if (questionNo < 12) {
			NSAnswerSet[questionNo + 1] =
				answersList[questionNo];
		} else if (questionNo < 18) {
			FTAnswerSet[questionNo + 1] =
				answersList[questionNo];
		} else {
			JPAnswerSet[questionNo + 1] =
				answersList[questionNo];
		}
	}

	personalityType = personalityType + setIEType(IEAnswerSet);
	personalityType = personalityType + setNSType(NSAnswerSet);
	personalityType = personalityType + setFTType(FTAnswerSet);
	personalityType = personalityType + setJPType(JPAnswerSet);
    console.log(personalityType)
	return personalityType;
};

exports.setDefault=function(){
    personalityType = "";
     IEAnswerSet = {};
     NSAnswerSet = {};
     FTAnswerSet = {};
     JPAnswerSet = {};
}