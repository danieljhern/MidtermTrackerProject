var express = require('express');
var router = express.Router();

candidateArray = [
    { district: 1, name: "Suzan DelBene", party: "D", site: "https://delbene.house.gov/" },
    { district: 1, name: "Vincent Cavaleri", party: "R", site: "https://www.cavaleriforcongress.com/" },
    { district: 1, name: "Derek Chartrand", party: "R", site: "https://www.chartrandforcongress.com/"},
    { district: 1, name: "Matthew Heines", party: "R", site: "https://ballotpedia.org/Matthew_Heines"},
    { district: 2, name: "RickLarsen", party: "D", site: "https://larsen.house.gov/"},
    { district: 2, name: "JasonCall", party: "D", site: "https://www.callforcongress.com/"},
    { district: 2, name: "CodyHart", party: "R", site: "https://codyhart.org/"},
    { district: 2, name: "LeifJohnson", party: "R", site: "https://www.leifjohnsonforcongress.com/"},
    { district: 2, name: "CarrieKennedy", party: "R", site: "http://www.carriekennedy2022.com/"},
    { district: 2, name: "DanMatthews", party: "R", site: "https://ballotpedia.org/Dan_Mathews"},
    { district: 2, name: "BrandonStalnaker", party: "R", site: "https://vote-usa.org/Intro.aspx?State=WA&Id=WAStalnakerBrandonLee"},
    { district: 2, name: "BillWheeler", party: "R", site: "https://ballotpedia.org/Bill_Wheeler"},


    { district: 3, name: "Jaime Herrera Beutler", party: "R", site: "https://jhb.house.gov/"},
    { district: 3, name: "Leslie French", party: "R", site: "http://frenchforcongress.org/"},
    { district: 3, name: "Marie Gluesenkamp Perez", party: "D", site: "https://marieforcongress.com/"},
    { district: 3, name: "Chris Jenkins", party: "D", site: "https://ballotpedia.org/Chris_Jenkins"},
    { district: 3, name: "Joe Kent", party: "R", site: "https://joekentforcongress.com/"},
    { district: 3, name: "Vicki Kraft", party: "R", site: "https://vickikraft.com/"},
    { district: 3, name: "Lucy Lauser", party: "D", site: "https://ballotpedia.org/Lucy_Lauser"},
    { district: 3, name: "Matthew Overton", party: "R", site: "https://ballotpedia.org/Matthew_Overton"},
    { district: 3, name: "Davy Ray", party: "D", site: "https://www.facebook.com/davyrayforcongress"},
    { district: 3, name: "Heidi St. John", party: "R", site: "https://friendsofnatalie.com/"},



    { district: 4, name: "Dan Newhouse", party: "R", site: "https://ballotpedia.org/Ted_Cummings"},
    { district: 4, name: "Loren Culp", party: "R", site: "https://culpforcongress.com/"},
    { district: 3, name: "Benancio Garicia III", party: "R", site: "https://www.votebengarcia.com/"},
    { district: 4, name: "Corey Gibson", party: "R", site: "https://www.sendcorey2022.com/" },
    { district: 4, name: "Brad Klippert", party: "R", site: "https://bradklippert.houserepublicans.wa.gov/"},    
    { district: 4, name: "Jerrod Sessler", party: "R", site: "https://www.jerrodforcongress.com/"},    
    { district: 4, name: "Doug White", party: "D", site: "https://www.dougwhite4congress.us/"},


    { district: 5, name: "Cathy McMorris Rodgers", party: "R", site: "https://mcmorris.house.gov/"},
    { district: 5, name: "Sean Clynch", party: "R", site: "https://www.clynchforcongress.com/"},
    { district: 5, name: "Ann Marie Danimus", party: "D", site: "https://ballotpedia.org/United_States_House_of_Representatives_elections_in_Washington,_2022"},
    { district: 5, name: "Natasha Hill", party: "D", site: "https://www.natashaforcongress.com/"},




    { district: 6, name: "Derek Kilmer", party: "D", site: "https://kilmer.house.gov/"},
    { district: 6, name: "Chris Binns", party: "R", site: "https://binnsforthe6th.com/"},
    { district: 6, name: "Todd Bloom", party: "R", site: "https://www.electtoddbloom.net/"},
    { district: 6, name: "Elizabeth Kreiselmaier", party: "R", site: "https://cleanupthehouse.com/"},
    { district: 6, name: "Rebecca Parson", party: "D", site: "https://www.rebeccaparson.com/"},



    { district: 7, name: "Pramila Jayapal", party: "D", site: "https://jayapal.house.gov/"},
    { district: 7, name: "Paul Glumaz", party: "R", site: "https://www.glumaz4congress.org/index.html"},
    { district: 7, name: "Cliff Moon", party: "R", site: "https://vote-usa.org/Intro.aspx?State=WA&Id=WAMoonCliff"},



    { district: 8, name: "Kim Schrier", party: "D", site: "https://schrier.house.gov/"},
    { district: 8, name: "Dave Chapman", party: "R", site: "https://ballotpedia.org/Dave_Chapman"},
    { district: 8, name: "Reagan Dunn", party: "R", site: "https://reagandunn.com/"},
    { district: 8, name: "Jesse Jensen", party: "R", site: "https://jessejensen4congress.com/"},
    { district: 8, name: "Matt Larkin", party: "R", site: "https://larkin4congress.com/"},
    { district: 8, name: "Scott Stephenson", party: "R", site: "https://www.scott4wa8.com/"},
    { district: 8, name: "Emet Ward", party: "D", site: "https://ballotpedia.org/Washington%27s_8th_Congressional_District_election,_2022"},



    { district: 9, name: "Adam Smith", party: "D", site: "https://adamsmith.house.gov/"},
    { district: 9, name: "Douglas Michael Basler", party: "R", site: "https://ballotpedia.org/Doug_Basler"},
    { district: 9, name: "Sea Chan", party: "R", site: "https://www.chanforcongress.com/"},
    { district: 9, name: "Stephanie Gallardo", party: "D", site: "https://www.electgallardo.com/"},
    { district: 9, name: "Seth Pedersen", party: "D", site: "https://ballotpedia.org/Washington%27s_9th_Congressional_District"},



    { district: 10, name: "Marilyn Strickland", party: "D", site: "https://strickland.house.gov/"},
    { district: 10, name: "Dan Gordon", party: "R", site: "https://ballotpedia.org/Dan_Gordon_(Washington)"},
    { district: 10, name: "Eric Mahaffy", party: "D", site: "https://ericmahaffy.com/"},
    { district: 10, name: "Keith Swank", party: "R", site: "https://keithswank.com/index.html"},
]


//User Array which will hold Candidate class objects
let serverArray = []

var fs = require("fs");

let fileManager  = {
  x: 33,
  read: function() {
    var rawdata = fs.readFileSync('objectdata.json');
    let goodData = JSON.parse(rawdata);
    serverArray = goodData;
  },

  write: function() {
    let data = JSON.stringify(serverArray);
    fs.writeFileSync('objectdata.json', data);
  },

  validData: function() {
    var rawdata = fs.readFileSync('objectdata.json');
    console.log(rawdata.length);
    if(rawdata.length < 1) {
      return false;
    }
    else {
      return true;
    }
  }
};






/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    res.sendFile('index.html');
});

router.get('/getDistrictCandidates', function (req, res) {
    res.status(200).json(candidateArray);

})

router.get('/getCandidates', function (req, res) {
    fileManager.read();
    res.status(200).json(serverArray);
    console.log("after file read: " + serverArray)
})




router.post('/addCandidate', function (req, res) {
    const newCandidate = req.body;
    serverArray.push(newCandidate);
    fileManager.write();
    res.status(200).json(newCandidate);
})

router.delete('/deleteCandidate/:testID', function (req, res) {

    const delID = req.params.testID;
    console.log(delID);
    let index = serverArray.findIndex(
        element => element.testID === delID
    );
    serverArray.splice(index, 1);
    fileManager.write();    
   // console.log("After splice: "+ serverArray);
    res.status(200).json(serverArray)


})

router.put('/updateCandidate/:testID', function (req, res)
{   
    const updateID = req.params.testID;
    const updateNotes = req.body.testNotes;
  
    let found = false



    for (u in serverArray){
        if (updateID == serverArray[u].testID){
            serverArray[u].testNotes = updateNotes;
        }

    }
    fileManager.write();
    res.status(200).json(updateNotes);  

    }
)




module.exports = router;
