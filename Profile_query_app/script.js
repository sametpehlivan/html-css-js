const profile =new Profile();
const ui=new UI();
const searchProfile=document.querySelector("#search-profile");

///////////bilgileri kontrol etme
searchProfile.addEventListener("keyup",(event)=>{
    ui.clear();
   let text= event.target.value;
   if(text!==''){
    profile.getProfile(text).then(prof =>{
            if(prof.profile.length === 0){
                ui.showAlert(text);
            }else{
               ui.showProfile(prof.profile[0]);
               ui.showTodo(prof.todo);
              
            }
        })
   }
});