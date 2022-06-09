
let clientCandidateArray = []
let clientUserArray = []

let candidateObject = function (cName, cNotes, cID, cParty) {
    this.testName = cName;
    this.testNotes = cNotes;
    this.testID = cID;
    this.testParty = cParty
}





function getSelectedValue(){
    $.get("/getDistrictCandidates", function (data, status) {
        clientCandidateArray = data
    });


    var selectedValue = document.getElementById('select-district').value;
    document.getElementById('display-current-district').innerHTML=('District ' + selectedValue + " candidates are:");
    outputCandidateCheckbox();

}

function outputCandidateCheckbox() {
var selectedValue = document.getElementById('select-district').value;
var myul = document.getElementById("myList");
myul.innerHTML = '';

//Creates the list items for Candidates by District for the user to pick


for(sv in clientCandidateArray) {
    if (selectedValue == clientCandidateArray[sv].district){
    
    
            cname = clientCandidateArray[sv].name;
            cParty = clientCandidateArray[sv].party;
            candidateId = "D"+selectedValue+"-" + clientCandidateArray[sv].name;
            candidateInfo = clientCandidateArray[sv].name + "     " + "Party Affiliation:  " + clientCandidateArray[sv].party;
            //Creating input elements
            var li = document.createElement('input');
            li.type = 'checkbox';
            li.id = candidateId;
            li.value = clientCandidateArray[sv].name
            li.name = "checkbox-item"
            //creating label elements
            var liLabel = document.createElement('label')
            liLabel.htmlFor = candidateId;
            liLabel.appendChild(document.createTextNode('Name: ' + cname + ', Party: ' + cParty));
    
    
            var br = document.createElement('br');
            myul.appendChild(liLabel);
            liLabel.appendChild(li);
            myul.appendChild(br);
            

    }
}};


const element = document.getElementById("myBtn");





// Allows user to add Candidates from selected checkboxes
function addToList() {
    demo = document.getElementById("demo");


    $.get("/getCandidates", function (data, status) {
        clientUserArray = data
    });


    let checkboxes = document.querySelectorAll('input[name="checkbox-item"]:checked');

 

//check selected checkboxes to see if they are in the "clientIncludesArray" and pushes new object to 
//"userArray" if not
    checkboxes.forEach((checkbox) => {        

        const check = clientUserArray.some(e => e.testID === checkbox.id);
    //var duplicate = clienUserArray.includes(checkbox.id);
        //if (duplicate == false) {
        if (check == false) {
            tCandidate = "Added - "+ checkbox.parentElement.textContent;
            tNotes = "";
            var tID = checkbox.id;
            var tVal = checkbox.value
            var list = document.createElement('li');
            list.id = tCandidate;
            list.innerHTML = tCandidate;
            tParty = tID.charAt(0)

            demo.appendChild(list);
    
    //add back tCandidate if name doesnt work
         //userArray.push(new candidateObject(tVal, tNotes, tID, tParty));
            let newCandidate = (new candidateObject(tVal, tNotes, tID, tParty));
            $.ajax({
                url: '/addCandidate',
                type: "POST",
                data: JSON.stringify(newCandidate),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    console.log(result);
                    //document.location.href = "index.html#ListAll"
                }
            });
            $.get("/getCandidates", function (data, status) {
                clientUserArray = data
            });
        

 
    }
    else {alert(checkbox.value + " " + "is already in your list")}

   });

}



document.addEventListener('DOMContentLoaded', () => {
    
    //not sure if this is best for DOMContentLoaded

    $(document).on("pagebeforeshow","#list",function(){
        
    //  });

    var myCandidateList = document.getElementById('myCandidates');
    let btn = document.getElementById('btn');
    
  //Diplays list from User Array with buttons to add notes or remove candidates from array  
  // btn.addEventListener('click', ()=>
    //{


        var theList = document.getElementById("myCandidates");
        theList.innerHTML = "";

        $.get("/getCandidates", function (data, status) {
            clientUserArray = data
        });
    

    clientUserArray.forEach(function (element, i) {
    var listItem = document.createElement('li');
    listItem.id = element.testID + "-li-id";
    listItem.innerHTML = element.testName  + "     Party: " + element.testParty;
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
    })//})
});
    

    //ADDS CUSTOM CANDIDATE TO USER ARRAY
    document.getElementById("buttonAdd1").addEventListener("click", function () {
       


        cCandName = document.getElementById("custom-candidate-name").value;
        cCandNotes = document.getElementById("custom-candidate-notes").value;
        selectedParty = document.getElementById("select-party").value;
        cCandDistrict = document.getElementById("custom-candidate-district").value
        

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

        let newCandidate = (new candidateObject(cCandName,cCandNotes,cCandID,cCandParty));
        $.ajax({
            url: '/addCandidate',
            type: "POST",
            data: JSON.stringify(newCandidate),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                console.log(result);
            }
        });

        alert(cCandName + " has been added"); 

        

        
     });
     
     document.getElementById("buttonClear").addEventListener("click", function () {
         document.getElementById("custom-candidate-name").value = "";
         document.getElementById("custom-candidate-notes").value = "";
     });

})

//ADDNOTE FUNCTION 
    function addNote(){

$.get("/getCandidates", function (data, status) {
            clientUserArray = data
        });
        bID = this.id;
        slicebID = bID.slice(11);
        textboxNotes = document.getElementById(bID+"-notes").value;

        for (y in clientUserArray){

 
            if (slicebID == clientUserArray[y].testID){

                clientUserArray[y].testNotes = textboxNotes;


                passID = clientUserArray[y].testID;
                repNotes = clientUserArray[y].testNotes;
                repName = clientUserArray[y].testName;
                repID = clientUserArray[y].testID;
                repParty = clientUserArray[y].testParty;


                let updatedCandidate = (new candidateObject(repName, repNotes, repID, repParty))

   
                    $.ajax({
                        url : "/UpdateCandidate/"+ updatedCandidate.testID,
                        type: "PUT",
                        data: JSON.stringify(updatedCandidate),
                        contentType: "application/json; charset=utf-8",
                            
                    
                    });
                                          

                    
                

                alert("'Add Notes' is currently down");
        


            }
        }

        $.get("/getCandidates", function (data, status) {
            clientUserArray = data
        });






    }

//REMOVE CANDIDATE FUNCTION 

    function removeCandidate(){
        rID = this.id
        slicerID = rID.slice(18)
        
        const parent = document.getElementById("myCandidates")
        var listID=document.getElementById(slicerID + "-li-id")        
        var btnID = document.getElementById("button-for-"+slicerID)


        var dbtnid = document.getElementById(this.id)
        var txtID = document.getElementById("button-for-"+slicerID+"-notes")

        $.get("/getCandidates", function (data, status) {
            clientUserArray = data
        });
        

    


      

        for (p in clientUserArray){
            if (slicerID == clientUserArray[p].testID){

                passID = clientUserArray[p].testID;
 
                //const index = clientUserArray.indexOf(clientUserArray[p]);
                //userArray.splice(index, 1);
                parent.removeChild(listID);
                parent.removeChild(btnID);
                parent.removeChild(txtID);
                parent.removeChild(dbtnid);

                $.ajax({
                    type: "DELETE",
                    url: '/deleteCandidate/' + passID,
                    success: function(result){
                        console.log(result)
                    },
                });

            }

        }
      
    }
