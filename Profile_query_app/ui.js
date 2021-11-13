class UI{
    constructor(){
        this.profileContainer=document.querySelector('#profileContainer');
        this.alert=document.querySelector("#alert");
    }
    showProfile(profile){
        this.profileContainer.innerHTML=`<div class="card card-body" style="border:none;">
        <div class="row">
          <div class="col-md-3 mx-auto">
              <a href="https://www.placeholder.com"><img src="https://via.placeholder.com/200x200" alt="pp"></a>
          </div>
          <div class="col-md-9 mx-auto"></div>
          <h4  class="my-3">Concant</h4>
          <ul class="listgroup">
            <li class="list-group-item">
              name :  ${profile.name} 
            </li>
            <li class="list-group-item">
              mail :  ${profile.email}
            </li>
            <li class="list-group-item">
             adress :  ${profile.address.street}   ${profile.address.suite} ${profile.address.city}
            </li>
            <li class="list-group-item">
              phone :  ${profile.phone}
            </li>
            
          </ul>
         <h4>Tdo List</h4>
         <ul id="todo" class="list-group">
         </ul>
        </div>
        </div>`;
        
    }
    showTodo(todo){
     let html='';

     console.log( );
    
     todo.forEach((element)=>{
       if(element.completed){
         if(element.id%(todo.length)==0){
          html+=` <li class="list-group-item bg-success">
          Todo ${todo.length} :  ${element.title}
        </li>`;
         }else{
           html+=` <li class="list-group-item bg-success">  Todo ${element.id%(todo.length)} :  ${element.title}
           </li>`;
         }
       
      
       }else{
        if(element.id%(todo.length)==0){
          html+=` <li class="list-group-item bg-secondary">
          Todo ${todo.length} :  ${element.title}
        </li>`;
         }else{
          html+=` <li class="list-group-item bg-secondary">  Todo ${element.id%(todo.length)} :  ${element.title}
          </li>`;
        }
       } 
    });
    this.profileContainer.querySelector("#todo").innerHTML=html;


    }
    showAlert(text){
        this.alert.innerHTML=`${text} is not found`
    }
    clear(){
        this.profileContainer.innerHTML="";
        this.alert.innerHTML="";
    }
}