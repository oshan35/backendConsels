var personalityDetails = require("./data/details.data");
var pathWays = require("./data/pathways.data")

// personality details filtering function
exports.getPersonalityDetails=function(id){
    return personalityDetails.find(item => item.id === id.toString());
    
}
// personality pathways filtering function
exports.getPathways = function (id) {
    console.log(pathWays.length)
    return pathWays.filter(item => item.id === id)
    
    
}