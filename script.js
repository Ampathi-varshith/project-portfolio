

//let name = "Lucky";
 //var name = prompt("what is ur name:");
//alert("Welcome to my Web Application! " + name);

   

 
// document.addEventListener('keydown',function(event){
//   console.log("an event triggered with: " + event.key);
//  });

// window.addEventListener('scroll',function(){
//   console.log("window was scrolled");
//  });

// window.addEventListener('scroll',function(){
//   console.log("window was scrolled");
//  });

// const control_of_form=document.getElementById("form");
// control_of_form.addEventListener('submit',function(){
//   console.log("form is submitted");
//  });

// function getUser(id){
//   const users = {
//     1: "varshith",
//     3: "bob"
//   };
// if(!users[id]){
//   throw new Error(`no user found with id${id}`);
// }
// return users[id];
// }

// //

// function runHandled(){
//   const ids = [1,2,3];
//   ids.forEach(id => {
//     try{
//       console.log("fetching user" +id +getUser(id));
// //     }
//     catch(error) {
//       console.log("could not find User" +id +error.message +"\n");
//     }
//     finally{
//       console.log("done trying user" +id);
//     }
//   });
//   console.log("processing completed");
// } 

// to view the amin login section step-1
const control_of_admin_btn = document.getElementById("admin-btn");
const control_of_admin_login_section = document.getElementById("admin-login");
const control_of_user_responses_section = document.getElementById("user-responses")
 control_of_admin_btn.addEventListener('click', function(){
   control_of_admin_login_section.style.display = "block";
} 
);

// toggle button work step-2
const control_of_toggle_btn = document.getElementById("toggle-theme");
 
 control_of_toggle_btn.addEventListener('click',function(){
   document.body.classList.toggle("dark-theme");
});  

// make contact me section to capture the user data step-3
const db_url=
"https://script.google.com/macros/s/AKfycbxp-LikUrLUnnOJSjb47qhFI3BeFehauE-dG0VNvzViFKZbia07nawj4Q7Zs786aT6x/exec"

//step-3 capture info from user and store it in db

const control_of_contact_form = document.getElementById("contact me" );
control_of_contact_form.addEventListener("submit",async function(event){
 let name = document.getElementById("input-name").value;
 let email = document.getElementById("input-email").value;
 let msg = document.getElementById("input-message").value;
 // let date = new Date().tolocalstring();
  try{
    let response = await fetch(
    db_url,
    {
      method:"POST",
      headers: {
      "content-type":
      "text/plain;charset-utf-8"
      },
    body:JSON.stringify({
      action: "save_message",
      name: name,
      email: email,
      msg: msg
    })

    }
    );
  let result = await response.json();
  if (result.success){
    alert("your info is submitted,will get back to you shortly!");
  }
    else{
      alert("your info is not submitted")
    }
  }
catch(error){
console.error(error)
alert("there was a problem in submitting the message!")
}
 });

//making the admin login section work
let control_of_admin_form= document.getElementById("admin-login");
control_of_admin_form = addEventListener("submit",async function(event){
let username = document.getElementById("username").value;
let password = document.getElementById("password").value;
  try{let response = await fetch(
    db_url,
  {
      method:"POST",
      headers: {
      "content-type":
      "text/plain;charset-utf-8"
      },
    body:JSON.stringify({
      action: "login",
      username: username,
      password:password,
    })

    }
    );  
      let result = await response.json();
  if (result.success){
    alert("login successful");
    control_of_user_responses_section.style.display="none";
    control_of_user_responses_section.style.display="block";
    
  getUserMessages();
  }
    else{
      alert("login details are not valid")
    }
  }
catch(error){
console.error(error)
alert("there was a problem in logging in!")

  
}
}
)

async function getUserMessages() {
  try{
    let response = await fetch(
    db_url
   );
     let result = await response.json();

    
    if(!result.success){
      alert("could not fetch the messages");
    return;
    }
    const control_of_user_messages_div = document.getElementById("user-messages");
    result.messages.forEach(
    responses => {
      let control_of_new_div = document.createElement("div");

      let nameParagraph = document.createElement("p");
      nameParagraph.textContent = "Name: " + responses.name;

      let emailParagraph = document.createElement("p");
      emailParagraph.textContent = "Email: " + responses.email;

      let messageParagraph = document.createElement("p");
      messageParagraph.textContent = "Message: " + responses.msg;

       let dateParagraph = document.createElement("p");
      dateParagraph.textContent = "Date: " + responses.date;

      let seperater = document.createElement("hr");

      
      control_of_new_div.appendChild(nameParagraph);
      control_of_new_div.appendChild(emailParagraph);
      control_of_new_div.appendChild(messageParagraph);
      control_of_new_div.appendChild(dateParagraph);
      control_of_new_div.appendChild(seperater);
      control_of_user_messages_div.appendChild(control_of_new_div);
    }
 )
   }
  catch(error){
console.error(error)
alert("there was a problem in fetching msgs from db!")
  }
}