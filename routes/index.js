var express = require('express');
var router = express.Router();

testCandidateArray = [
    { district: 1, name: "Davina Duerr", party: "D" },
    { district: 1, name: "Shelley Kloba", party: "D" },
    { district: 1, name: "John Peeples", party: "R" },
    { district: 1, name: "Jerry Zeiger-Buccola", party: "R" },
    { district: 2, name: "Andrew Barkis", party: "R" },
    { district: 2, name: "JT Wilcox", party: "R" },
    { district: 3, name: "Marcus Riccelli", party: "D" },
    { district: 3, name: "Timm Ormsby ", party: "D" },
    { district: 3, name: "Scotty Nicol", party: "R" },
    { district: 3, name: "Natalie Poulson", party: "R" },
    { district: 4, name: "Ted Cummings", party: "D" },
    { district: 4, name: "MJ Bolt", party: "R" },
    { district: 3, name: "Suzanne Schmidt", party: "R" },
    { district: 4, name: "Rob Chase ", party: "R" },
    { district: 4, name: "Leonard Christian", party: "R" },

]


//User Array which will hold Candidate class objects
let userArray = []
//needed to make a seperate array to hold checkbox ids as strings not object properties
//I'm pretty sure there is a way to use include() for object properties but I could
//not get that to work just yet

let candidateObject = function (cName, cNotes, cID, cParty) {
    this.testName = cName;
    this.testNotes = cNotes;
    this.testID = cID;
    this.testParty = cParty
}


/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    res.sendFile('index.html');
});

router.get('/getDistrictCandidates', function (req, res) {
    res.status(200).json(testCandidateArray)
})

router.get('/getCandidates', function (req, res) {
    res.status(200).json(userArray)
})




router.post('/addCandidate', function (req, res) {
    const newCandidate = req.body;
    userArray.push(newCandidate);
    res.status(200).json(newCandidate);
})


router.delete('/deleteCandidate/:testID', function (req, res) {
    const delID = req.params.testID;
    let found = false;
    for (p in userArray){
        if (delID == userArray[p].testID){
            const index = userArray.indexOf(userArray[p]);
            userArray.splice(index, 1)
        }
        console.log(delID);
        console.log(userArray);
    }

   // userArray.splice(testID, 1)


})

router.put('/updateCandidate/:testID', function (req, res)
{   
    const updateID = req.params.testID;
    const updateNotes = req.params.testNotes;
    let found = false

    for (u in userArray){
        if (updateID == userArray[u].testID){
            userArray[u].testNotes = updateNotes
        }

    }

    console.log("testNotes: "+ req.params.testNotes)
    console.log("testID: "+ req.params.testID);
    

    }
)




module.exports = router;
