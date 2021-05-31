const tok1=document.getElementById('token1');
const user1=document.getElementById('username');
const data=document.getElementById('data');
const tok2=document.getElementById('token2');
const myHeaders = new Headers({
    'Content-Type' : 'application/json',
    'Referrer-Policy' : 'origin-when-cross-origin'
});
async function get(endpoint=''){
    var resp;
    
    resp=await fetch('http://localhost:12345/'+endpoint,{
        method : 'GET'
    })

    return resp;
}
async function post(data,endpoint=''){
    var resp;
    
    resp=await fetch('http://localhost:12345/'+endpoint,{
        headers : myHeaders,
        method : 'POST',
        
        body : data
    });
    return resp;
}
async function getToken(){
    var resp;
    try{
        resp=await (await get('get_token')).json();
        clip(resp.token);
        alert("Your token is : "+resp.token+"\nCopyied to clipboard!");
        console.log("Token received");
        tok1.value=resp.token;
    }catch(err){
        console.log(err);
        alert("Token NOT_FOUND");
    }
    
    
    
}
async function Register(){
    var regForm = new FormData(document.getElementById("regForm"));
    // var regForm = new Object();
    // regForm.username=document.getElementById("username").value;
    // regForm.data=document.getElementById("data").value;
    // regForm.token=document.getElementById("token1").value;
    var obj={};
    regForm.forEach((val,key)=>{
        if(!val){
            alert("Please input valid "+key);
        }else {
            obj[key]=val;
            console.log("Successfully inserted "+key +" : "+val);
        }
        
    });
    console.log("Making a POST request with :\n"+JSON.stringify(obj));
    var resp=await post(JSON.stringify(obj),'/register');
    if(resp.ok){
        var text=await resp.text();
        console.log("Recevied response :\n"+text);
        alert(text);
        tok1.value="";
        user1.value="";
        data.value="";
    }else {
        alert((await resp.json()).error);
    }
}
async function GetData(){
    var obj={};
    obj.token=tok2.value;
    obj=JSON.stringify(obj);
    console.log("Making a POST request with :\n"+obj);
    var resp=await post(obj,'get_data');
    if(resp.ok){
        resp=await resp.json();
        console.log("Recevied response :\n"+JSON.stringify(resp));
        document.getElementById('user2').value=resp.username;
        document.getElementById('dat2').value=resp.data;

    }else{
        resp=await resp.json();
        alert(resp.error);
    }
}
document.getElementById("get_token").addEventListener("click", getToken);
document.getElementById("register").addEventListener("click", Register);
document.getElementById("get_data").addEventListener("click", GetData);
function clip(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
  
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
  
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Copying text command was ' + msg);
    } catch (err) {
      console.error('Oops, unable to copy', err);
    }
  
    document.body.removeChild(textArea);
  }
