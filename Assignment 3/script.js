function getToken(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("token1").value=JSON.parse(xhttp.responseText).token;
            alert("Your Token is : "+JSON.parse(xhttp.responseText).token);
        }
    };
    xhttp.open("GET","http://localhost:12345/get_token",true);
    xhttp.send();
}
function Register(){
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        //alert(xhttp.responseText);
        if (this.readyState == 4) {
            if(this.status==200){
                alert(xhttp.responseText);
            }else{
                alert("Sorry, an error occured :\n"+JSON.parse(xhttp.responseText).error);
            }
        }
    };
    var obj = new Object();
    obj.username=String(document.getElementById("username").value);
    obj.data=String(document.getElementById("data").value);
    obj.token=String(document.getElementById("token1").value);
    xhttp.open("POST","http://localhost:12345/register",true);
    xhttp.setRequestHeader("Content-Type","application/json");
    xhttp.send(JSON.stringify(obj));
}
function GetData(){
    document.getElementById("user2").value="";
    document.getElementById("dat2").value="";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            var res = JSON.parse(xhttp.responseText);
            if(res.error)alert(res.error);
            if(this.status=200){
                
                document.getElementById("user2").value=res.username;
                document.getElementById("dat2").value=res.data;
            }
        }
        
    };
    xhttp.open("POST","http://localhost:12345/get_data",true);
    xhttp.setRequestHeader("Content-Type","application/json");
    var tok=new Object();
    tok.token=document.getElementById("token2").value;
    xhttp.send(JSON.stringify(tok));
    
}
document.getElementById("get_token").addEventListener("click", getToken);
document.getElementById("register").addEventListener("click", Register);
document.getElementById("get_data").addEventListener("click", GetData);