// BUTTONS
var searchBtn = document.getElementById('search');
var signUp = document.getElementById("signUp");
var loginBtn = document.getElementById("login");

// Login Screen
var loginScreen = document.getElementById('popUp');

//Close Button
var closeBtn = document.getElementsByClassName('delete')[0];

// LOGIN BUTTON
loginBtn.onclick = function LogInFunction () {
  // console.log('Log In Connected');

      //activate the Modal

    loginScreen.style.display = 'block';
  
};

// SIGN UP
signUp.onclick = function signUpFunction () {
  console.log('Sign Up Connected!');
};

// SEARCH BUTTON
searchBtn.onclick = function Search (){
  console.log('Seach Activated');
}

// CLOSE MODALS AND POPUPS

// CLOSE LOGIN MODAL

closeBtn.onclick = function () {
  loginScreen.style.display = 'none';
}




