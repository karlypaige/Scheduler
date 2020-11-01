var newCol=$("<div>");
var myObj=[];
var today = new Date();

//Get the current date and time
console.log(today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate());

//create 24 rows for the hours in the day
for (var i=0; i<8; i++){
    $(".container").append("<time class=\"row\" style=\"background-color: purple;\" id=\"row" + i + "\"></time>");
    $("#row" + i).append("<div class=\"col-10\" style=\"background-color: teal;\"><textarea class=\"form-control\" id=\"textArea" + i + "\"></textarea></div>");
    $("#row" + i).append("<button type=\"button\" class=\"btn btn-light\" id=\"button" + i + "\"><img src=\"./Assets/arrow.png\"></button>");
};

$(".btn").on("click", function(event){
    var input = this.parentElement.firstChild.firstChild.value;
    console.log(input);

    var index = this.id
    index = index.substring(index.length - 1, index.length)
    console.log(index);

    //create a JSON object with userinput and index number
    var scheduleObj={value : input, ind : index};

    //append input to local storage
    toStorage(scheduleObj);
});

function toStorage(item){
    myObj.push(item);
    console.log(myObj);
    //check for exisitng local storage
    if(localStorage.getItem("schedule")){
        localStorage.setItem("schedule", JSON.stringify(myObj));
    }else{
        localStorage.setItem("schedule", JSON.stringify(myObj));
    }
}
