let bs = ['Learn','Teach','Grow','Earn']
let tes =document.querySelector('#tes')
let i = 0
setInterval(()=>{
  tes.innerHTML = bs[i]
  i++
  if (i>3) {
  i = 0
  }
},2000)
