// all the import and login stuff come here
import { 
  initializeApp 
  
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup, 
  GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";



const core = {
  apiKey: "AIzaSyDjLuWLhH6sT13VoP690BYRKzxKjb9HGeQ",
  authDomain: "sskill-e944f.firebaseapp.com",
  projectId: "sskill-e944f",
  storageBucket: "sskill-e944f.firebasestorage.app",
  messagingSenderId: "650928874757",
  appId: "1:650928874757:web:be0663b30a91edbdb6436c",
  measurementId: "G-YGRC5ZHBMQ"
};

let app = initializeApp(core);
let auth = getAuth(app)
let provider = new GoogleAuthProvider();
let none = 'none'
let block = 'block'
let flex = 'flex'

// sign up part 

let semail = document.querySelector('#semail')
let spassword = document.querySelector('#spassword')
let poplogin = document.querySelector('.poplogin')
let signup = document.querySelector('#signup')
signup.addEventListener('click',()=>{
  let a = semail.value
  let b = spassword.value
  vanishall(none)
  createUserWithEmailAndPassword(auth,a,b).catch (e =>{
     let err = e.code
    signerr(err)
  }) 
  
})


// the login part 
let lemail = document.querySelector('#lemail')
let lpassword = document.querySelector('#lpassword')
let login = document.querySelector('#login')

login.addEventListener('click',()=>{
  let c = lemail.value 
  let d = lpassword.value
  signInWithEmailAndPassword(auth,c,d).then((userCredential) => {
    console.log("✅ Logged in:", userCredential.user);
  })

  
  
  document.getElementById('singf').style.display = 'none'
  document.getElementById('loginf').style.display = 'none'
  poplogin.style.display = 'none'
})



// the login pop things

poplogin.addEventListener('click',()=>{
 document.getElementById('loginf').style.top = '100px'
 
})


// after clicking button
let loading = document.querySelector('.loading')
let regestered = document.querySelector('#regestered')
onAuthStateChanged(auth, (user)=>{
  if (user) {
  loading.style.display = 'none'
  regestered.style.display ='flex'
  
  }else{
    // account is not created yet
    console.log('no account avilable')
  }
})


// handeling erroses 

//1. for signin 
let scard = document.querySelectorAll('.scard')
function signerr(er) {
 switch(er){
  case 'auth/invalid-email': 
    vanishall(flex)
    scard.forEach(input =>{
      input.style.borderColor = 'red'
    })
  break;
 }
}


// to vanish all 

function vanishall(arg) {
  document.getElementById('singf').style.display = `${arg}`
document.getElementById('loginf').style.display = `${arg}`
poplogin.style.display = `${arg}`
}


// google sign in
let google = document.querySelector('#google')
google.addEventListener('click',()=>{
  signInWithPopup(auth,provider).then(()=>{
    console.log('u r teggstered')
    vanishall(none)
  })
  
})