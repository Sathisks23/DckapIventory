 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
 import {getFirestore,getDocs,addDoc,getDoc,setDoc,doc,updateDoc,collection} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
 
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyDrVtIreaqcn-y10ohCEs_9H-0EwVrfXUM",
   authDomain: "palliinventory.firebaseapp.com",
   projectId: "palliinventory",
   storageBucket: "palliinventory.appspot.com",
   messagingSenderId: "499790381291",
   appId: "1:499790381291:web:a8ef1f120eb8777e8cbeae"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 let db = getFirestore(app)
let inventory =collection(db,'Inventory')


// Dashboar Adding
let dashbord = document.querySelector('.dashboard')

// Adding barchat
let grap = document.querySelector('.graph')

// Getting Table 
let table = document.querySelector('table')



let refid ;
let toalproduct=0

window.onload = async(event) => {
    let getData = await getDocs(inventory)
        refid = getData.size;
    getData.forEach((doc) => {
           let row = document.createElement('tr')
               row.innerHTML = 
                               ` <td> ${doc.data().product} </td> 
                                <td> ${doc.data().quantity} </td> 
                                <td> ${doc.data().recipient} </td> 
                               `
               table.append(row)

    //   create Items append dashboard
     

                let items =  document.createElement('div')
                    items.setAttribute('class','items')
                    items.innerHTML = 
                                        `
                                     <div class="deatils">
                                            <p id="productName">${doc.data().product}</p>
                                            <b id="quantity">${doc.data().quantity}</b>
                                        </div>
                                        <div class="img">&#128722
                                    
                                        `
                   dashbord.append(items)


                     //   add grap
            let newquantity = doc.data().quantity
               

        let epercent1 = newquantity*100/100
        
          toalproduct+=epercent1
        let wrapper = document.createElement('div')
            wrapper.setAttribute('class','wrapper')
            wrapper.innerHTML = 
                              `
                                <div class="bar" style="color:red; height:${epercent1}% "></div>
                                <small>${doc.data().product}</small>
                                
                                `

        grap.append(wrapper)
        console.log(toalproduct);
      });

  
  };

  


//   common closing popup
let closebtn = document.querySelectorAll('#close')
    closebtn.forEach((element)=>{
        element.addEventListener('click',function(){close(this)})
    })
    

function close(element){
    
        element.parentElement.parentElement.style.visibility = 'hidden'
      document.body.style.backgroundColor = ''

 
}


// POPUP DISPLAYEN
function openpopup(element){
document.body.style.backgroundColor = 'grey'
        element.style.visibility = 'visible'
}




// Add data
let  addbtn = document.querySelector('#addProduct')
let  addpopup = document.querySelector('.addpopup')
    addbtn.addEventListener('click',function(){openpopup(addpopup)})

let addform = document.forms['createForm']
     addform.addEventListener('submit',async(event)=>{
        event.preventDefault()

     let productValue =  addform.product.value
     let quantityValue =  addform.quantity.value
     let recipientValue =  addform.recipient.value

     let docData = {
        product:productValue,
        quantity:quantityValue,
        recipient:recipientValue
     }

    //  firebase adding data
    try{
        await setDoc(doc(db, "Inventory",`${productValue}`), docData)
         addpopup.innerHTML = " <p> Susess &#10004</p>"
    }catch{
         addpopup.innerHTML = " <p>Failed ! </p>"
    }

        

       setTimeout(()=>{
              addpopup.style.visibility = 'hidden'
        document.body.style.backgroundColor = ''
        location.reload()

       },1000)
     }

    )


    // ------------------------------ Update 


 let updatbtn  = document.querySelector('#updateProduct')
let  updatepopup = document.querySelector('.updatepopup')
        
      updatbtn.addEventListener('click',function(){openpopup(updatepopup)})

let updateform = document.forms['updateForm']
    updateform.addEventListener('submit',async()=>{

        let productValue =  updateform.product.value
        let quantityValue =  updateform.quantity.value
        let recipientValue =  updateform.recipient.value
   
        let docData = {
           product:productValue,
           quantity:quantityValue,
           recipient:recipientValue
        }
   
        try{
            updateDoc(doc(db,"Inventory",`${productValue}`),docData)
            updatepopup.innerHTML = " <p> Data Updated Sucessfully &#10004</p>"
        }catch{
            updatepopup.innerHTML = " <p> Failed ! </p>"
              
        }


       setTimeout(()=>{
              addpopup.style.visibility = 'hidden'
        document.body.style.backgroundColor = ''
        location.reload()

       },1000)
     

        
    })


    