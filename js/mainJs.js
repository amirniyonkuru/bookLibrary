var myBooks = [];
var resultTable = document.getElementById("resultTable");
var myEvent = document.getElementById("btnBook");

//function to push to the array and call another build fn to add row
myEvent.addEventListener("click", function(){
    var btitle = document.getElementById("btitle").value.toLowerCase();
    var bauthor = document.getElementById("bauthor").value.toLowerCase();
    var byear = document.getElementById("byear").value.toLowerCase();
    myBooks.push({title:btitle, author:bauthor,year:byear});
    build();
})


//function to delete from array and delete row
function delbtn(){
    var pChange = window.confirm("Are you sure you want to delete this?");
    if(pChange){
        window.event.preventDefault();
        var el = window.event.target.closest("[data-row]");
        var ele = el.getAttribute("data-row");
        myBooks.splice(ele, 1);
        build();
    }else{
        return false;
    }
}

//function that buils the rows depending on the array items
function build(){
    var html = "<table id='bookTable'><th>Title</th><th>Author</th><th>Year</th><th>Action</th>";
    for(var i = 0; i < myBooks.length; i++){
        html += "<tr data-row='" + i + "'><td onclick='edtBtn()'>"+ myBooks[i].title +"</td><td onclick='edtBtn()'>"+ myBooks[i].author +"</td><td onclick='edtBtn()'>"+ myBooks[i].year +"</td><td><button type='button' class='delBtn' onclick='delbtn()'><i class='fa fa-trash'></i></button> || <button type='button' class='edtBtn'><i class='fa fa-pen'></i></button></td></tr>";
    }
    html += "</table>";
    document.querySelector(".resultTable").innerHTML = html;
}


//function to edit row items from array depending on the one u change
function edtBtn(){
    window.event.preventDefault();
    var pChange = window.confirm("Are you sure you want to make changes?");
    if(pChange){
        var el = window.event.target.closest("[data-row]");
        var rid = el.getAttribute("data-row");
        el.style.backgroundColor = "rgb(255, 223, 174)";
        var ele = window.event.target;
        var eleIn = ele.innerText;
        var inputt = document.createElement("input");
        inputt.type = "text";
        inputt.setAttribute("value", eleIn);
        ele.innerHTML = "";
        ele.appendChild(inputt);
        inputt.focus();
        inputt.onblur = function(){
            ele.removeChild(inputt);
            ele.innerHTML = inputt.value;
            if(myBooks[rid]["author"] === eleIn.toLowerCase()){
                myBooks[rid]["author"] = inputt.value.toLowerCase();
            }else if(myBooks[rid]["title"] === eleIn.toLowerCase()){
                myBooks[rid]["title"] = inputt.value.toLowerCase();
            }else if(myBooks[rid]["year"] === eleIn.toLowerCase()){
                myBooks[rid]["year"] = inputt.value.toLowerCase();
            }
            el.style.backgroundColor = "white";
        }
    }else{
        return false;
    }

}
