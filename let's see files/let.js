
// all the fire base imports 
import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";



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



// Authstate and pic suystem
//loadimg things
let loader = document.querySelector('.loader')
let submited = document.querySelector('.saveddata')
let dataLoad = document.querySelector('.dataLoad')

let name = document.querySelector('#name')
let uploadf = document.querySelector('#uploadb')

onAuthStateChanged(auth,(user)=>{
  
  console.log(user.uid)
   name.value = user.displayName
   
//the system of profile pic

let filedata = document.querySelector('#file')
let ppf = document.querySelector('#ppf')

uploadf.addEventListener('click',
async()=>{
let file = filedata.files[0]
let pic = await convert(file)
let ref = doc(db,'user',user.uid)
await setDoc(ref,{ppf : pic},{merge:true})
ppf.src = pic
})

// saving the user info in object
// fetching user infos
let save = document.querySelector('.save')
save.addEventListener('click',()=>{
  dataLoad.style.display = 'flex'
  fetchValues(name)
  let userdata = fetchValues(name)
  console.log(userdata)
  set(ref(rdb,'user/'+user.uid),userdata).then(()=>{
    console.log('ur data is saved')
    loader.style.display = 'none'
    submited.style.display = 'flex'
  }
    
  )
})

})





// converting file function
function convert(file){
  return new Promise((resolve,reject)=>{
    let reder = new FileReader()
   reder.readAsDataURL(file)
   reder.onload = ()=> resolve(reder.result)
  })
}




// for the last elements
let items = document.querySelectorAll('.item')

let itemslis = []
items.forEach(item=>{
  item.addEventListener('click',()=>{
    itemslis.push(item.innerHTML)
    console.log(itemslis)
    item.style.backgroundColor = 'grey'
  })
})


// function to get values
function fetchValues(name){
let userName = name.value
let userdesc = document.querySelector('#desc').value
let teach = document.querySelector('#teach').value
let learn = document.querySelector('#learn').value
console.log(userName)
console.log(userdesc)
console.log(learn)
console.log(teach)

let data = {
  uname : userName,
  desc : userdesc,
  uteach : teach,
  ulearn : learn,
  int : itemslis
}

return data
}



// an portel for profile pic
let edit = document.querySelector('#edit')
edit.addEventListener('click',()=>{
  document.querySelector('.portel').style.display = 'flex'
})

// a samll function to show upload
let upload = document.querySelector('#upload')
upload.addEventListener('click',()=>{
  upload.innerHTML = 'selected'
  
})
// canceling upload
let cancel = document.querySelector('#cancel')
cancel.addEventListener('click',()=>{
  document.querySelector('.portel').style.display = 'none'
})
uploadf.addEventListener('click',()=>{
  document.querySelector('.portel').style.display = 'none'
})
  
