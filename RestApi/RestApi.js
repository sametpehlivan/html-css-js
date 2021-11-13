document.querySelector("#getOne").addEventListener('click',getone);
document.querySelector("#getAll").addEventListener('click',getall);
document.querySelector("#postData").addEventListener('click',postdata);

function showAlert(class_name,id){
  var alert=`
          <div class=" alert alert-${class_name} ">
           null cannot be entered
          </div>
`;
const row=document.querySelector(id);
//before begin , after begin , beforend , afterend
row.insertAdjacentHTML("beforeBegin",alert);
setTimeout(()=>{
  document.querySelector(".alert").remove();
},3000);
}

function postdata(){
  var user_id=document.getElementById("userId").value;
  var title_temp=document.getElementById("title").value;
  var body_temp=document.getElementById("body").value;
  if(title === '' ||user_id==="" || body==='' ){
    showAlert("warning","#form");
   }
  else if( !isNaN(parseInt(user_id))){
    const data={
      userId:parseInt(user_id),
      title:title_temp,
      body:body_temp
    }
    console.log(data)
    var json=JSON.stringify(data);
    console.log(json);
    var  url='https://jsonplaceholder.typicode.com/posts';
    var xhr=new XMLHttpRequest();
    xhr.open("POST",url,true);
    xhr.setRequestHeader("Content-type","application/json;charset=utf-8");
    xhr.onload=function(){
     if(xhr.status===201 && xhr.readyState===4){
       var post= xhr.responseText;
       console.log(post);
     }
    }
   xhr.send(json);
    document.getElementById("userId").classList.remove("is-invalid");
    document.getElementById("userId").classList.add("is-valid");
    document.getElementById("userId").setAttribute("placeholder","Success");
    document.getElementById("userId").value="";
    document.getElementById("title").value="";
    document.getElementById("body").value="";
  }else{
    
    document.getElementById("userId").classList.remove("is-valid");                     
    document.getElementById("userId").classList.add("is-invalid");
    document.getElementById("userId").setAttribute("placeholder","Type Error...");
    document.getElementById("userId").value="";  
  
  }


}

function getone(){
    var post_id =document.getElementById("postid").value;
    if(!isNaN(parseInt(post_id) ) ){
            var url='https://jsonplaceholder.typicode.com/posts/'+post_id;
            var xhr=new XMLHttpRequest();
            document.getElementById("postid").classList.remove("is-invalid");
            document.getElementById("postid").classList.add("is-valid");
            document.getElementById("postid").setAttribute("placeholder","Success");
            document.getElementById("postid").value="";
        xhr.open('GET',url,true);
        xhr.onload =function(){
            if(this.status === 200){
                
               var post=JSON.parse(this.responseText);
               var html="";
                
                    html+=`<div class="card " style="max-width: 18rem;">
                    <div class="card-header">
                    <p>Kullanıcı ${post.id} <p>  
                    </div>
                    <div class="card-body">
                      <h5 class="card-title"> ${post.title}</h5>
                      <p class="card-text"> ${post.body}</p>
                    </div>
                  </div>`;
                    
                
               document.querySelector("#results").innerHTML+=html;
               document.querySelector("#results").classList.add("mx-auto");
            }
    
        }
        xhr.send();
    }else if(post_id === ""){

        showAlert("warning","#form");
       
    }
    else{
      
        document.getElementById("postid").classList.remove("is-valid");                     
        document.getElementById("postid").classList.add("is-invalid");
        document.getElementById("postid").setAttribute("placeholder","Type Error...");
        document.getElementById("postid").value="";   
    }
  
}
function getall(){
    var url='https://jsonplaceholder.typicode.com/posts';
    var xhr=new XMLHttpRequest();
    xhr.open('GET',url,true);
    xhr.onload =function(){
        if(this.status === 200){
           var post=JSON.parse(this.responseText);
           var html="";
            post.forEach(element => {
                html+=`<div class="card mt-3">
                <div class="card-header">
                <p>Kullanıcı ${element.id} <p>  
                </div>
                <div class="card-body">
                  <h5 class="card-title"> ${element.title}</h5>
                  <p class="card-text"> ${element.body}</p>
                </div>
              </div>`
                
            });
           document.querySelector("#results").innerHTML=html;
           document.querySelector("#results").classList.add("mx-auto");
        }

    }
    xhr.send();
}
