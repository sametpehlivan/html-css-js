function Course(title,instructor,image){
    this.title=title;
    this.image="C:\\wamp64\\www\\html5ancss3\\"+image;
    this.instructor=instructor;


}
function UI(){

}
///create add List
UI.prototype.addCourseTolist=function(course){
   const list=document.getElementById("course-list");
   
    var html=`  <tr>
                    <td  class="text-center"><img src="${course.image}" style="width:100px; "></td>
                    <td  class="text-center">${course.title}</td>
                    <td>${course.instructor}</td>
                    <td  class="text-center"><a href="#" class="btn btn-danger btn-sm delete">delete</a></td>
                </tr>`;
    list.innerHTML+=html;
}
///create clear form table
UI.prototype.clearControls=function(){
    const title=document.getElementById('title').value="";
    const instructor=document.getElementById('instructor').value="";
    const image=document.getElementById('image').value="";
}
///delete course

UI.prototype.deleteCourse=function(element){
    if(element.classList.contains("delete")){
      element.parentElement.parentElement.remove();  
    }

}

/// show alert
UI.prototype.showAlert=function(message,class_name){

    var alert=`
                <div class="alert alert-${class_name}">
                    ${message}
                </div>
    `;
    const row=document.querySelector(".row");
    //before begin , after begin , beforend , afterend
    row.insertAdjacentHTML("beforeBegin",alert);
    setTimeout(()=>{
        document.querySelector(".alert").remove();
    },3000);
}
/// get submit 
document.getElementById('new-course').addEventListener('submit',function(e){
    const title=document.getElementById('title').value;
    const instructor=document.getElementById('instructor').value;
    const image=document.getElementById('image').value.split("\\");
    
    const course=new Course(title,instructor,image[image.length-1]);
  
    //create UI
   const ui = new UI();
    if(title ==='' || instructor==="" || image==='' ){
        ui.showAlert('please comlplete the form',"warning");
    }else{
        //Add course to list
        ui.addCourseTolist(course);
        //clear to form table 
        ui.clearControls();
        ui.showAlert('the course has ben created',"success");
    }
  
    e.preventDefault();
});

document.getElementById("course-list").addEventListener('click',function(e){
    const ui=new UI();
    ui.deleteCourse(e.target);
    ui.showAlert("the course has been deleted","danger");
});

