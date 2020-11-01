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
for (var i=0; i<8; i++){
    //append row to container
    $(".container").append("<time class=\"row\" style=\"background-color: purple;\" id=\"row" + i + "\"></time>");
    //append divs to rows
    $("#row" + i).append("<p class=\"col-1 time\">" + calcTime(i+7) + ":00 " + getAMPM(i+7) + "</p>");
    $("#row" + i).append("<div class=\"col-10\" style=\"background-color: teal;\"><textarea class=\"form-control\" id=\"textArea" + i + "\"></textarea></div>");
    $("#row" + i).append("<button type=\"button\" class=\"btn btn-light col-1\" id=\"button" + i + "\"><img src=\"./Assets/arrow.png\"></button>");

    function calcTime(n){
        if (n>1 && n<=12){
            return n;
        }else if (n>12){
            return n-12;
        };
    };

    function getAMPM(n){
        if (n>1 && n<=12){
            return "AM";
        }else if (n>12){
            return "PM";
        };
    };
};

$(".time").css({"color":"white","font-weight":"bold","padding":"10px","border-radius":"10px"});
$(".col-10").css({"padding":"7px"});
$("button").css({"padding":"7px"});

$(".btn").on("click", function(event){
    
    var input = this.parentElement.children[1].firstChild.value;

    var index = this.id
    index = index.substring(index.length - 1, index.length)

    //create a JSON object with userinput and index number
    var scheduleObj={value : input, ind : index};

    //append input to local storage
    toStorage(scheduleObj);
});

//store items
function toStorage(item){
    myObj.push(item);
    console.log(myObj);
    //check for exisitng local storage
    if(localStorage.getItem("schedule")){
        localStorage.setItem("schedule", JSON.stringify(myObj));
    }else{
        localStorage.setItem("schedule", JSON.stringify(myObj));
    };
};

//retrieve items
function fromStorage(){
    myObj = JSON.parse(localStorage.getItem("schedule"));
    console.log(myObj);
};
