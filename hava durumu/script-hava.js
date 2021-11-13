var get_pos=()=>{
    return new Promise((res,rej)=>{
        navigator.geolocation.getCurrentPosition(res, rej);
    });
}
var get_all_city =(full_position)=>{
    return new Promise((resolve,reject)=>{
        let xhr=new XMLHttpRequest();
        xhr.open( "GET",full_position);
     
        xhr.onload=()=>{
            if(xhr.status >=200 && xhr.status<300){
                console.log(xhr.responseText);
                resolve(xhr.responseText);
            }else{
                reject(xhr.statusText);
            }
           
        }
        xhr.onerror=()=>{
            reject(xhr.statusText);
        
        }
        xhr.send();

    } );
}
var get_first_city=(city_woeid_url)=>{
    return new Promise((resolve,reject)=>{
        let xhr=new XMLHttpRequest();
        xhr.open( "GET",city_woeid_url);
     
        xhr.onload=()=>{
            if(xhr.status >=200 && xhr.status<300){
                console.log(xhr.responseText);
                resolve(xhr.responseText);
            }else{
                reject(xhr.statusText);
            }
           
        }
        xhr.onerror=()=>{
            reject(xhr.statusText);
        
        }
        xhr.send();

    } );
}
get_pos()
  .then((position) => {
  full_position_url ="https://www.metaweather.com/api/location/search/?lattlong="+ position.coords.latitude+","+position.coords.longitude;
 return  get_all_city(full_position_url);
  }).then(data => {
    
    let all_city_distance = JSON.parse(data);
    return get_first_city("https://www.metaweather.com/api/location/" +  all_city_distance[0].woeid);
  }).then( 
    data => {
        
        let city_weat_state = JSON.parse(data);
        let date=new Date();
        console.log(city_weat_state);
        let html=`  <h1  class="ml-auto mr-4 mt-3 mb-0"><p>${city_weat_state.title}  Hava Durumu</p></h1>
        <h3 class="ml-auto mr-4 large-font"><p>${city_weat_state.consolidated_weather[0].the_temp}	&#8451; <img src="https://www.metaweather.com/static/img/weather/png/64/${city_weat_state.consolidated_weather[0].weather_state_abbr}.png" style="float:right; "></p> </h3>
        <h6><p class="ml-4 mb-4"id='now_date' >${date.getDate()} /${date.getMonth() +1 }/${date.getFullYear()}</p></h6>`
        document.querySelector(".card").innerHTML=html
      }
  )
  .catch((err) => {
    console.error(err.message);
  });