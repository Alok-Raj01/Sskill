
// all the fire base imports 
import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, collection ,doc, setDoc, getDocs , getDoc} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getDatabase, ref, set,get, push } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";



 
//core
const core = {
  apiKey: "AIzaSyDjLuWLhH6sT13VoP690BYRKzxKjb9HGeQ",
  authDomain: "sskill-e944f.firebaseapp.com",
  projectId: "sskill-e944f",
  storageBucket: "sskill-e944f.firebasestorage.app",
  messagingSenderId: "650928874757",
  appId: "1:650928874757:web:be0663b30a91edbdb6436c",
  measurementId: "G-YGRC5ZHBMQ"
};

// configratiin
let app = initializeApp(core);
let auth = getAuth(app)
let db = getFirestore(app)
let rdb = getDatabase(app)
let refofst = ref(rdb,'user')

let formedUserData


async function data1() {
  await get(refofst).then((snapshot) => {
  if (snapshot.exists()) {
    formedUserData = snapshot.val()
  } else {
    console.log('didt get bhai');
  }
}).catch((error) => {
  console.error(error);
});
return formedUserData;
}



// fetching all users data 
async function ud(){
  let imgObj = {}
try {
    const querySnapshot = await getDocs(collection(db, "user")); 
    querySnapshot.forEach((doc) => {
    imgObj[doc.id] = doc.data();
    });
  } catch (err) {
    console.error("Error fetching docs:", err);
  }
return imgObj
}


async function dekh() {
  let userData1 = await data1()
  let userData2 = await ud()
  let theData = {}
  Object.keys(userData1).forEach(tik =>{
    theData[tik] = {
      ...userData1[tik],...userData2[tik]
    }
  })
  return theData
  console.log(thedata)

}
dekh()



// making element here ( all general isers )

async function hehehe(){
  let a = await dekh()
  console.log(a)
  Object.keys(a).forEach(zf => {
    let zz = a[zf]
    console.log(zz.uname,zz.ppf,zz.ulearn,zz.uteach)
  makeAllUserCards(zz.uname,zz.ppf,zz.ulearn,zz.uteach)
  
  })
  
}
hehehe()





// auth 
onAuthStateChanged(auth,user=>{
  if (user) {
    let userUid = user.uid
    console.log(userUid)
  getProfileInfo(userUid)
  profiledet(userUid)
  }
})


// setting profile 
let profilePic = document.querySelector('#profilePic')
let ppf2 = document.querySelector('#ppf2')
let ppf3 = document.querySelector('#ppf3')
async function getProfileInfo(uid){
   let see = await getDoc(doc(db,'user',uid))
   let see2 = see.data()
   profilePic.src = see2.ppf
   ppf3.src = see2.ppf
   // setting images 
   
   ppf2.src = see2.ppf
   console.log(see2.ppf)
}


async function profiledet(uid){
let aa =  await get(ref(rdb,'user/'+uid))
 let haha2 = aa.val()
 console.log(haha2.uname)
 
 // asingning names to elements 
 let username2 = document.querySelector('#username2')
 let username1 = document.querySelector('#username1')
 username1.innerHTML = haha2.uname
 username2.innerHTML = haha2.uname
}


// imagggesss
let img = document.querySelector('.img')
let preProfile = document.querySelector('.preProfile')
let cross = document.querySelector('.cross')

img.addEventListener('click',()=>{
  console.log('noi')
  preProfile.style.display = 'flex'
})
cross.addEventListener('click',()=>{
  preProfile.style.display = 'none'
})


/// hamburger  
let hamburger = document.querySelector('.hamburger')
let hamElement = document.querySelector('.hamElement')
let hamcross = document.querySelector('.hamcross')
hamburger.addEventListener('click',()=>{
  hamElement.style.left = '0px'
})
hamcross = document.querySelector('.hamcross')
hamcross.addEventListener('click',()=>{
  hamElement.style.left = '-100%'
})


function makeAllUserCards(name,imgSrc,learns,teach){
  let mainThing = document.querySelector('.allUsers')
  let div = document.createElement('Div')
  let img = document.createElement('IMG')
  let div2 = document.createElement('DIV')
  let h2 = document.createElement('H2')
  let div3 = document.createElement('DIV')
  let span1 = document.createElement('span')
  let span2 = document.createElement('snap')
  
  mainThing.appendChild(div)
  div.appendChild(img)
  div.appendChild(div2)
  div2.appendChild(h2)
  div2.appendChild(div3)
  div3.appendChild(span1)
  div3.appendChild(span2)
  
  h2.innerHTML = name
  img.src = imgSrc
  span1.innerHTML = learns
  span2.innerHTML = teach
  
  div.classList.add('users')
  div2.classList.add('details')
  div3.classList.add('lrAndtc')
}

