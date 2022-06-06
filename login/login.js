

// show loader spinner untill page loads completely
window.addEventListener('load',()=>{
    this.document.getElementById('loader').remove();
    this.document.querySelector('.right-section').style.display='block';

})



let storedData_arr = [];    // initialise array to store new signup details
let signup_form = document.querySelector(".signup-form");

let stored_data_str = "";   // this string will store the existing login details if available
if(localStorage.data != null ){     // if localstore is null or no login details available
    stored_data_str = localStorage.data;     
    storedData_arr = stored_data_str.split(",");   // convert localstoreage string to array data
}


signup_form.addEventListener("submit",(event)=>{  
    event.preventDefault();
    // location.href = "home2.html";
    let username = signup_name.value;
    let password = signup_password.value;

    let secret_str = username+":"+password;

    storedData_arr.push(secret_str);     // adding login detail in array

    // console.log(stored_data_str);
    putin_LocalStorage(storedData_arr);  // now using this to store array

    location.href = "index.html";
})

function putin_LocalStorage(data_array){
    
    localStorage.setItem("data",data_array.toString());
}








let login_form = document.querySelector("#login-form");

login_form.addEventListener("submit",(event)=>{
    event.preventDefault();
    // location.href = "home2.html";

    let name = username.value;
    let pass = password.value;
    let secret_str = name+":"+pass;

    checklogin(secret_str);
})

   

function checklogin(login_str){
   

        if(storedData_arr.length > 0  && storedData_arr.includes(login_str) ){
            
            sessionStorage.login='1';
            location.href = "../movies.html";
        }else{
            username.value = '';
            password.value = '';
            document.querySelector('.error_msg').classList.remove("d-none");
        }
        
}