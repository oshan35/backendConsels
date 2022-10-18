const express = require("express");
const PORT = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const app = express();
var personalityType = require("./MBTI-Dev");
var getData = require("./getData");
const cors = require("cors");
const corsOptions = {
	origin: "*",
	credentials: true, //access-control-allow-credentials:true
	optionSuccessStatus: 200
};

app.use(bodyParser.json());

app.get("/hi", (req, res) => {
	res.send("deployed");
});

app.use(cors(corsOptions)); // Use this after the variable declaration
//  details api endpoint
app.get("/details/:id", (req, res) => {
	let data = getData.getPersonalityDetails(req.params.id.toUpperCase());
	res.send(data);
});
//   degrees  api endpoint
app.get("/degrees/:id", (req, res) => {
	let data = getData.getPathways(req.params.id.toUpperCase());
	res.send(data);
});

app.use(express.static('public')); 

// egt image  api endpoint
app.use('/images', express.static('images'));

// personality type post Api endpoint
app.post("/", (req, res) => {
	console.log("req", req.body);
	const answers = req.body.answers;
	// let personalityId = personalityType.processAnswerData(answers)
	console.log("answers", req.body.answers);
	var personalityData = personalityType.processAnswerData(answers);
	console.log("Personality Type: ", personalityData);
	res.send({ Id: personalityData });
	personalityType.setDefault();
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
