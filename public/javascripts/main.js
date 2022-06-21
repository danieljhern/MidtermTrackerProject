//ARRAYS FOR PRESET CANDIDATES AND THE USER'S ARRAY
let clientCandidateArray = []
let clientUserArray = []

//CANDIDATE OBJECT CONSTRUCTOR
let candidateObject = function (cName, cNotes, cID, cParty, cDistrict, cSite) {
    this.testName = cName;
    this.testNotes = cNotes;
    this.testID = cID;
    this.testParty = cParty
    this.testDistrict =cDistrict
    this.testSite = cSite
}



//LOADING EVENT LISTENERS AND FUNCTIONS FOR PAGES
$(document).on("pagebeforeshow","#districts",function(){
    $.get('/getDistrictCandidates', function (data, status) {
        clientCandidateArray = data;
        document.getElementById('select-district').addEventListener('click', getSelectedValue);
        document.getElementById('myBtn').addEventListener('click', addToList);
    
})});

$(document).on("pagebeforeshow","#add-candidate",function(){
    document.getElementById("custom-add").addEventListener('click', customCandidateAdd);
    document.getElementById("buttonClear").addEventListener("click", clearCustomData); 
        });

$(document).on("pagebeforeshow","#list", (myLIst));


//FUNCTION TO GRAB SELECTED DISTRICT
function getSelectedValue(){

    var selectedValue = document.getElementById('select-district').value;
    document.getElementById('display-current-district').innerHTML=('District ' + selectedValue + " candidates are:");

    var selectedValue = document.getElementById('select-district').value;
    var myul = document.getElementById("myList");
    myul.innerHTML = '';

    //Creates the list items for Candidates by District for the user to pick
    for(sv in clientCandidateArray) {
        if (selectedValue == clientCandidateArray[sv].district){
    
    
            cName = clientCandidateArray[sv].name;
            cParty = clientCandidateArray[sv].party;
            cDistrict = clientCandidateArray[sv].district
            cSite = clientCandidateArray[sv].site
            candidateId = "D"+selectedValue+"-" + clientCandidateArray[sv].name;
            //Creating input elements
            var li = document.createElement('input');
            li.type = 'checkbox';
            li.id = candidateId;
            li.value = clientCandidateArray[sv].name
            li.name = "checkbox-item"
            li.innerHTML = cSite
            //creating label elements
            var liLabel = document.createElement('li')//*(label)
            liLabel.htmlFor = candidateId;
            liLabel.id = cSite
            liLabel.appendChild(document.createTextNode('Name: ' + cName + ',' +'\xa0\xa0'+ 'Party: ' + cParty + ',' + '\xa0\xa0' + 'Website: '+ cSite))
   
    
            var br = document.createElement('br');
            myul.appendChild(liLabel);
            liLabel.appendChild(li);
            myul.appendChild(br);
            

    }
}};


//const element = document.getElementById("myBtn");





//FUNCTION  TO ADD SELECTED CANDIDATES TO LIST
function addToList() {
    $.get('/getCandidates', function (data, status) {
        clientUserArray = data;
        console.log(clientUserArray);
        demo = document.getElementById("demo");
        let checkboxes = document.querySelectorAll('input[name="checkbox-item"]:checked');
        checkboxes.forEach((checkbox) => {        

        const check = clientUserArray.some(e => e.testID === checkbox.id);

        if (check == false) {
            tCandidate = "Added - "+ checkbox.parentElement.textContent;
            tNotes = "";
            var tID = checkbox.id;
            var tVal = checkbox.value;
            var tSite = checkbox.parentElement.id
            var list = document.createElement('li');
            list.id = tCandidate;
            tParty = tID.charAt(0)
            tDistrict = tID.charAt(1)

            let newCandidate = (new candidateObject(tVal, tNotes, tID, tParty, tDistrict, tSite));
            $.ajax({
                url: '/addCandidate',
                type: "POST",
                data: JSON.stringify(newCandidate),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    console.log(result);
                },
                error: function(xhr, textStatus, errorThrown){
                    console.log(textStatus)
            }});
            alert(tVal + " has been added");

 
    }
    else {alert(checkbox.value + " " + "is already in your list")}

   })

});

}



    

//FUNCTION TO LIST OUT USERS ARRAY WITH BUTTONS TO ADD NOTES AND REMOVE OBJECT
 function myLIst(){
    $.get('/getCandidates', function (data, status) {
        clientUserArray = data;


    var myCandidateList = document.getElementById('myCandidates');
    var theList = document.getElementById("myCandidates");
    theList.innerHTML = "";

    
    //builds li items with buttons for adding notes and deleting candidates
    clientUserArray.forEach(function (element, i) {
    var listItem = document.createElement('li');
    listItem.id = element.testID + "-li-id";
    listItem.innerHTML = element.testName + ",\xa0\xa0Party: " + element.testParty  + ",\xa0\xa0Site: " + element.testSite ;
    //text fields, will play around with bigger text areas later
    var InputItem = document.createElement("input");
    InputItem.id = "button-for-"+element.testID+"-notes";
    InputItem.type = "text";
    InputItem.value = element.testNotes;


    var inputBtn = document.createElement("button");

    
    inputBtn.id = "button-for-"+element.testID;
    inputBtn.type = "button";
    inputBtn.name = "input-button"
    inputBtn.innerText = "Add Note";

    var dltBtn = document.createElement("button");
    dltBtn.id = "delete-button-for-"+element.testID;    
    dltBtn.type = "button";
    dltBtn.name = "input-button";
    dltBtn.innerText = "Remove";


    // create list text fields and buttons
    myCandidateList.appendChild(listItem);
    myCandidateList.appendChild(InputItem);
    myCandidateList.appendChild(inputBtn);
    myCandidateList.appendChild(dltBtn);


    buttonid = inputBtn.id;
    dbuttonid = dltBtn.id;
    document.getElementById(buttonid).addEventListener('click', addNote);
    document.getElementById(dbuttonid).addEventListener('click', removeCandidate);
    })})}; 

    
    
//ADDS CUSTOM CANDIDATE TO USER ARRAY
function customCandidateAdd() {
       
    $.get('/getCandidates', function (data, status) {
        clientUserArray = data

        cCandName = document.getElementById("custom-candidate-name").value;
        cCandNotes = document.getElementById("custom-candidate-notes").value;
        selectedParty = document.getElementById("select-party").value;
        cCandDistrict = document.getElementById("add-select-district").value;
        cCandSite = document.getElementById("custom-candidate-site").value;
        

        if (selectedParty.value = "Democrat"){
            cCandParty = "D"
        }
        else if (selectedParty.value = "Republican"){
            cCandParty = "R"
        }
        else if (selectedParty.value = "independent"){
            cCandParty = "I"
            
        }

        cCandID = cCandParty + cCandDistrict + "-"+cCandName;

        let newCandidate = (new candidateObject(cCandName,cCandNotes,cCandID,cCandParty, cCandDistrict, cCandSite));
        $.ajax({
            url: '/addCandidate',
            type: "POST",
            data: JSON.stringify(newCandidate),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                console.log(result)
                },
                error: function(xhr, textStatus, errorThrown){
                    console.log(textStatus)
                
            }
        });

        alert(cCandName + " has been added");
        clearCustomData(); 
        });

        

        
     };
     
//CLEARS THE DATA FIELDS FOR CUSTOM ADD
function clearCustomData()     
     {
         document.getElementById("custom-candidate-name").value = "";
         document.getElementById("custom-candidate-notes").value = "";
         document.getElementById("custom-candidate-district").value = "";
     };

//ADDNOTE FUNCTION 
function addNote(){

   

        bID = this.id;
        slicebID = bID.slice(11);
        let textboxNotes = document.getElementById(this.id + "-notes").value;
        $.get('/getCandidates', function (data, status) {
            clientUserArray = data
      

        for (y in clientUserArray){ 
            if (slicebID == clientUserArray[y].testID){

                clientUserArray[y].testNotes = textboxNotes    
                passID = clientUserArray[y].testID
                repNotes = clientUserArray[y].testNotes
                repName = clientUserArray[y].testName
                repID = clientUserArray[y].testID
                repParty = clientUserArray[y].testParty
                repDistrict = clientUserArray[y].testDistrict
                repSite = clientUserArray[y].testSite



                let updatedCandidate = (new candidateObject(repName, repNotes, repID, repParty, repDistrict, repSite))
   
                    $.ajax({
                        url : "/updateCandidate/"+ updatedCandidate.testID,
                        type: "PUT",
                        data: JSON.stringify(updatedCandidate),
                        contentType: "application/json; charset=utf-8",

                        success: function(result){ 
                            console.log(result);
                            myLIst();     
    
                                },
                        error:    function (xhr, textStatus, errorThrown) {
                            console.log("unable to add note: "+ result)
                             }   
                            
                    
                    });
    
                }
        }       });

    };

//REMOVE CANDIDATE FUNCTION 
    function removeCandidate(){
        

        console.log("before remove: " + clientUserArray);
  

        rID = this.id;
        slicerID = rID.slice(18);
        
        const parent = document.getElementById("myCandidates");
        var listID=document.getElementById(slicerID + "-li-id");        
        var btnID = document.getElementById("button-for-"+slicerID);


        var dbtnid = document.getElementById(this.id);
        var txtID = document.getElementById("button-for-"+slicerID+"-notes"); 
        $.get('/getCandidates', function (data, status) {
            clientUserArray = data;                 
            console.log("delete called with pass: " + slicerID);

                $.ajax({
                    type: "DELETE",
                    url: '/deleteCandidate/' + slicerID,
                    
                    success: function(result){ 
                        console.log(result);
                        parent.removeChild(listID);
                        parent.removeChild(btnID);
                        parent.removeChild(txtID);
                        parent.removeChild(dbtnid);           

                            },      
                    error: function (xhr, textStatus, errorThrown) {
                                console.log("unable to delete: " + slicerID)
                                 }
                                  
                    }); 
                
                
            })
        
        }
