var para= "";
let studentlist = [];
$(document).ready(function(){
    $("#add").click(function(){
        let newid = para;
        const student = {
            name : $("#name").val(),
            fatherName : $("#fatherName").val(),
            age : $("#age").val(),
            contact : $("#contact").val(),
            address : $("#address").val(),
            newid : para
           
        }
        var phoneNum = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if(student.name == ""){
             $("#nameerr").html(" Please Enter Your Full Name!");

        }else{
            $("#nameerr").hide("");
        }
        if(student.fatherName == ""){
            $("#fnameerr").html(" Please Enter Your Father's Name!");

       }else{
           $("#fnameerrr").hide("");
       }
       if(student.age == ""){
        $("#ageerr").html(" Please Enter Your age!");

       }else{
        $("#ageerr").hide("");
       }
       if(student.contact == "" || !phoneNum.test(student.contact)|| student.contact.length>10){
        $("#contacterr").html(" Please Enter Your contact number!");

       }else{
        $("#contacterr").hide("");
       }
       if(student.address == ""){
        $("#addresserr").html(" Please Enter Your address!");

       }else{
        $("#addresserr").hide("");
       }
       
       if(student.name&&student.fatherName&&student.age&&student.contact&&student.address){
        
        if(para != ''){
            updatestudenttoapi(student)
        }else{
            
            $.ajax({
                url :"https://634e4aaaf34e1ed826877d3e.mockapi.io/student",
                method : "POST",
                dataType : "json",
                data : student,
                success : function(result){
                    console.log(result);
                    onloadfromAPI();
                    
                },
                error: function(error){
                    console.log(error);

                },
            })
        }
    }else{
        alert("Please Enter your data")
    }
    })
})


function updateTabletoapi(studentlist){
    $("#tbody").html(" ");
    for(let i=0;i<studentlist.length;i++){
         row ='<tr><td>' + studentlist[i].name + 
              '</td><td>' + studentlist[i].fatherName+ 
              '</td><td>' + studentlist[i].age + 
              '</td><td>' + studentlist[i].contact + 
              '</td><td>' + studentlist[i].address +
              '</td><td> <button class="btn bg-light"><a href="formget.html?id=' + studentlist[i].id +'">edit</a></button></td>'+
              '</td><td> <button class="btn bg-danger" onclick ="delstudent('+ studentlist[i].id +')">Delete</button></td></tr>';            
    $("#tbody").append(row);
    }
    console.log(studentlist)
}
function onloadfromAPI(){

    $.ajax({
        url :"https://634e4aaaf34e1ed826877d3e.mockapi.io/student",
        method : "get",
        dataType : "json",
        success : function(result){
            updateTabletoapi(result);
              
        },
        error: function(error){
            console.log(error);

        },
    })
}

function getUrlParameter(studentlist) {
    studentlist = studentlist.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + studentlist + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
var qsp = 'id',
para = getUrlParameter(qsp);
editlist(para);
function editlist(id){

    $.ajax({
        url :"https://634e4aaaf34e1ed826877d3e.mockapi.io/student/" + id,
        method : "get",
        dataType : "json",
        success : function(result){
           $("#name").val(result.name);
           $("#fatherName").val(result.fatherName);
           $("#age").val(result.age);
           $("#contact").val(result.contact);
           $("#address").val(result.address);
           make_id = result.id
                  
        },
        error: function(error){
            console.log(error);

        },
    })

}

function  updatestudenttoapi(student){
    console.log(student)
    $.ajax({
        url :"https://634e4aaaf34e1ed826877d3e.mockapi.io/student/" + student.newid,
        method : "PUT",
        data : student,
        dataType : "json",
        success : function(result){
            studentlist.push(result)
            alert('Edited Successfully')
            window.location.href="form123.html"
                  
        },
        error: function(error){
            console.log(error);

        },
    })

}
function delstudent(student){
    $.ajax({
        url :"https://634e4aaaf34e1ed826877d3e.mockapi.io/student/" + student,
        method : "delete",
        dataType : "json",
        success : function(result){
          onloadfromAPI();
              
        },
        error: function(error){
            console.log(error);

        },
    })

}
onloadfromAPI();
