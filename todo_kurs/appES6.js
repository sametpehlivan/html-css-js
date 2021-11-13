class Course{
    constructor(title,instructor,image){
        this.id=Math.floor(Math.random()*1000);
        this.image="C:\\wamp64\\www\\html5ancss3\\"+image;
        this.instructor=instructor;
        this.title=title;
    }
}
class UI{
    addCourseTolist(course){
        const list=document.getElementById("course-list");
   
        var html=`  <tr>
                        <td  class="text-center"><img src="${course.image}" style="width:100px; "></td>
                        <td  class="text-center">${course.title}</td>
                        <td>${course.instructor}</td>
                        <td  class="text-center"><a href="#" data-id="${course.id}" class="btn btn-danger btn-sm delete">delete</a></td>
                    </tr>`;
        list.innerHTML+=html;
    }
    clearControls(){
        const title=document.getElementById('title').value="";
        const instructor=document.getElementById('instructor').value="";
        const image=document.getElementById('image').value="";
    }
    deleteCourse(element){
        if(element.classList.contains("delete")){
            /// delete course element ls
            Storage.deleteCourse(element);
            element.parentElement.parentElement.remove();  
            return true;
          }else{
           return   false;
          }
    }
    showAlert(message,class_name){
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
}
class Storage{
    static getCourses(){
        let courses;
        if(localStorage.getItem("courses") ===null){
            courses=[];
        }else{
            courses=JSON.parse(localStorage.getItem("courses"));
        }
        return courses;
    }
    static displayCourses(){
        const courses=Storage.getCourses();
        courses.forEach(course => {
            const ui= new UI();
            ui.addCourseTolist(course);
        });
    }
    static addCourse(course){
            const courses=Storage.getCourses();
            courses.push(course);
            localStorage.setItem("courses",JSON.stringify(courses));
    }
    static deleteCourse(element){
        const courses=Storage.getCourses();
        const id=element.getAttribute("data-id");
        courses.forEach((course,index)=>{
            if(course.id == id ){
                    courses.splice(index,1);
            }
        });
      localStorage.setItem("courses",JSON.stringify(courses));
   
  
    }
}


document.addEventListener("DOMContentLoaded",Storage.displayCourses);
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
        ///save local storage
        Storage.addCourse(course);
        //clear to form table 
        ui.clearControls();
        ui.showAlert('the course has ben created',"success");
    }
  
    e.preventDefault();
});

document.getElementById("course-list").addEventListener('click',function(e){
    const ui=new UI();
    ///delete course element 
   if( ui.deleteCourse(e.target)){
    ui.showAlert("the course has been deleted","danger");
   }
    
   
  
});