document.getElementById("one").addEventListener("submit",function(event){
    event.preventDefault();

    let username = document.getElementById("username").value;
    let passoword = document.getElementById("passowrd").value;
    
    if (username==" " && passoword==" "){
        alert("login successfully");
        window.location.href="Zamato.html";
    }else{
        errorMessage.textContent="invalid user name or password";
        
    }
});