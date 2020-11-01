var newCol=$("<div>");
var myObj=[];
var today = new Date();
var weekDay = today.getDay();
var month = today.getMonth();

//Get the current date and time
//translate day into string
switch(weekDay){
    case 0:
        weekDay = "Sunday";
        break;
    case 1:
        weekDay = "Monday";
        break;
    case 2:
        weekDay = "Tuesday";
        break;
    case 3:
        weekDay = "Wednesday";
        break;
    case 4:
        weekDay = "thursday";
        break;
    case 5:
        weekDay = "Friday";
        break;
    case 6:
        weekDay = "Saturday";
        break;
    default:
        break;
};

//translate month into string
switch(month){
    case 0:
        month = "January";
        break;
    case 1:
        month = "February";
        break;
    case 2:
        month = "March";
        break;
    case 3:
        month = "April";
        break;
    case 4:
        month = "May";
        break;
    case 5:
        month = "June";
        break;
    case 6:
        month = "July";
        break;
    case 7:
        month = "August";
        break;
    case 8:
        month = "September";
        break;
    case 9:
        month = "October";
        break;
    case 10:
        month = "November";
        break;
    case 11:
        month = "December";
        break;
    default:
        break;
};

//display the current date
$("#currentDay").text(weekDay + ", " + month + " " + today.getDate());


//create rows for the hours in the day
for (var i=0; i<10; i++){
    //append row to container
    $(".container").append("<time class=\"row\" style=\"background-color: purple;\" id=\"row" + i + "\"></time>");
    //append divs to rows
    $("#row" + i).append("<p class=\"col-1 time\">" + calcTime(i+7) + ":00 " + getAMPM(i+7) + "</p>");
    $("#row" + i).append("<div class=\"col-10\" style=\"background-color: teal;\"><textarea class=\"form-control\" id=\"textArea" + i + "\"></textarea></div>");
    $("#row" + i).append("<button type=\"button\" class=\"btn btn-light col-1\" id=\"button" + i + "\"><img src=\"./Assets/arrow.png\"></button>");

    //12 hour clock
    function calcTime(n){
        if (n>1 && n<=12){
            return n;
        }else if (n>12){
            return n-12;
        };
    };

    //AM PM
    function getAMPM(n){
        if (n>1 && n<=12){
            return "AM";
        }else if (n>12){
            return "PM";
        };
    };
};

//css for new rows
$(".time").css({"color":"white","font-weight":"bold","padding":"10px","border-radius":"10px"});
$(".col-10").css({"padding":"7px"});
$("button").css({"padding":"7px"});

//look for local storage and populate areas if present in opbject
if(localStorage.getItem("schedule")){
    console.log("calling fromStorage");
    fromStorage();
}

//button click event
$(".btn").on("click", function(event){
    
    //path to the user input value
    var input = this.parentElement.children[1].firstChild.value;

    //get the number to use as index from the last character in the id
    var index = this.id
    index = index.substring(index.length - 1, index.length)

    //create a JSON object with userinput and index number
    var scheduleObj={value : input, ind : index};

    //append input to local storage
    toStorage(scheduleObj, index);
});

//store items
function toStorage(item, j){
    //check for exisitng local storage
    console.log("Begin to Storage -------------------------------------------");

    //if there is something in local storage
    if(localStorage.getItem("schedule")){
        var flag = false;
        //parse the string into an object
        myObj=JSON.parse(localStorage.getItem("schedule"));
        
        //loop through the object 
        for (var i=0; i<myObj.length; i++){
            //check for matched indexes
            if(j === myObj[i]["ind"]){
                console.log("In the replace value loop")
                //replace value if found
                myObj[i]["value"] = item["value"];
                flag = true;
                break;
            };    
        }; 
        if (flag === false){
            //append new value to end of object
            console.log("no values to replace, push to end of object")
            myObj.push(item);
        };            
    }else{
        //if the storage is empty then populate it
        console.log("local storage was empty so intialize the object")
        myObj.push(item);
    };
    console.log("send the modified object to storeage")
    localStorage.setItem("schedule", JSON.stringify(myObj));
};

//retrieve items
function fromStorage(){
    console.log("Begin fromStorage -------------------------------------------");
    myObj = JSON.parse(localStorage.getItem("schedule"));
    console.log(myObj);

    for(var i=0; i<myObj.length; i++){
        $("#textArea" + i).text(myObj[i].value)
        
    }
};
