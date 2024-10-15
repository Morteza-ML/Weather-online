const $=document;
const place=$.querySelector(".place");
const box=$.querySelector(".box");
const input=$.querySelector(".input");
const days=$.querySelectorAll(".nomber");
const hours=$.querySelectorAll(".hour");
const movs=$.querySelectorAll(".mov");
const upD=$.querySelector("#up_day");
const downD=$.querySelector("#down_day");
const upH=$.querySelector("#up_hour");
const downH=$.querySelector("#down_hour");
const box_day=$.querySelectorAll(".nomber");
const box_hour=$.querySelectorAll(".hour");
const date_day=$.querySelectorAll(".date_day");
const icon_day=$.querySelectorAll(".icon_day");
const temp_day=$.querySelectorAll(".temp_day");
const time_hour=$.querySelectorAll(".time_hour");
const icon_hour=$.querySelectorAll(".icon_hour");
const temp_hour=$.querySelectorAll(".temp_hour");
const hour=$.querySelectorAll(".hour");
const min_maxNone=$.querySelectorAll(".min_max");
const back=$.querySelector(".back");
const citys=$.querySelectorAll(".city");
const boxLod=$.querySelector(".boxLod");
const container=$.querySelector(".container");
const content=$.querySelector(".content");

const icon=$.querySelector(".sunM");
const date=$.querySelector(".date");
const day=$.querySelector(".day");
const site=$.querySelector(".site");
const date_time=$.querySelector(".date_time");
const temp=$.querySelector("#temp");
const min_temp=$.querySelector("#min_temp");
const max_temp=$.querySelector("#max_temp");
const explanation=$.querySelector(".explanation");
const view=$.querySelector(".view");
const uv=$.querySelector(".uv");
const humidity=$.querySelector(".humidity");
const cloud=$.querySelector(".cloud");
const dew=$.querySelector(".dew");
const air=$.querySelector(".air");

const style=getComputedStyle(document.documentElement);
const width= style.getPropertyValue("--width");
const width_child= (width -65 )/5;

const li_img=[
    "https://english.wafa.ps/image/NewsThumbImg/Default/8aa3ec9b-fae1-42e7-98ff-d509af72c906.jpg",
    "https://www.novascotia.com/sites/default/files/2022-09/Rainbow_Skyline-Trail-1920x1080.jpg",
    "https://www.polartours.com/_next/image?url=https%3A%2F%2Fmedia.venturatravel.org%2Funsafe%2F1300x%2Fsmart%2Fheader_media%2F8bf8bcb3-a306-4d9f-aa50-bb69ab5154fd-2022-12-13-day-7-pm-yalour-island-antarctica-ocean-victory-582-of-601-.jpg&w=3840&q=75",
    "https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/weather/sun/sun-setting-over-a-golden-field.jpg",
    "https://www.climateandweather.net/wp-content/uploads/2022/08/hero-3.jpg",
    "https://www.moon.com/wp-content/uploads/2015/03/Cuba-Veradero-EvgeniyaBolyukh-Dreamstime.jpg",
    "https://www.nps.gov/romo/planyourvisit/images/Fresh-Snow-and-tree-shadows-at-the-Loch.JPG",
    "https://www.theweathernetwork.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fgenai-hero-dark.7107edc7.jpeg&w=3840&q=70",
    "https://wallup.net/wp-content/uploads/2019/10/197424-nature-lake-sunset-landscape-ultrahd-4k-wallpaper.jpg",
    "https://keyassets.timeincuk.net/inspirewp/live/wp-content/uploads/sites/8/2022/10/CLI371.weather.double_rainbow_cammie_czuchnicki.jpg",
    "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/2/articles/2024/7/2_5f988310be1b45ec83c03788120e7927_t_w_1920_h_1080.jpg",
    "https://wallpapers.com/images/hd/beautiful-weather-with-gradient-sky-r6nxyjof50r7renl.jpg",
    "https://live.staticflickr.com/8116/28563067985_fd1d9b956d_h.jpg",
    "https://i.pinimg.com/originals/8b/9f/a6/8b9fa68aef6c87e13bfccb194600cf55.jpg",
    "https://bayanbox.ir/view/7802934807497873809/Flower-field-sunset-beautiful-hd-wallpapers-free-awesome-beautiful-hd-high-quality-nature-download-fabulous-hd-wallpapers-of-sunset-field.jpg",
    "https://webneel.com/wallpaper/sites/default/files/images/10-2017/37-rain-wallpaper-vanerich.jpg",
    "https://wallpapers.com/images/hd/beautiful-galaxy-pictures-hg120dk2ev5fgwoc.jpg",
    "https://cdn.mos.cms.futurecdn.net/MeJKRWtvQSWg738hdoa9NF-1200-80.jpg",
    "https://cdn.esahubble.org/archives/images/wallpaper2/heic0515a.jpg",
  
]
const daysWeek=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
let Location="tabriz";
let xDay=0;
let xHour=0;
let api;
let backUrl;
let hor_now;
let img=new Image();
let finish=0;

if ( ! localStorage.getItem("mySite")){
  localStorage.setItem("mySite",JSON.stringify(["Tabriz","Sheraz","Mashhad","BostanAbad","Tehran","Esfahan"]));
  localStorage.setItem("nombersite",0);
}
let localCity= JSON.parse(localStorage.getItem("mySite"));
let nomberCity= +localStorage.getItem("nombersite");

backGroundImage();
flshOff();
call_api(localCity[nomberCity]);
place.addEventListener("click",toggle);
movs.forEach(element => {
  element.addEventListener("click",function(){movement(this)});
});
hour.forEach(element=>{
  element.addEventListener("click",function(){lounch_data_hours(+this.dataset.day,+this.textContent.slice(0,2))})
})
box_day.forEach(element=>{
  element.addEventListener("click",function(){lounch_data_days(+this.dataset.nD)})
})
site.addEventListener("click",lounch_data_now);
input.addEventListener("keydown", (event)=>{if(event.key==="Enter" && input.value)check_location(input.value)});
citys.forEach(element => {
  element.addEventListener("click",function(){check_location(this.textContent)})
})

function zoone(timeZone){
  const today = new Date();
  const options = { hour: '2-digit',hour12: false, weekday: 'long', timeZone: timeZone };
  const timeZoneData = today.toLocaleDateString('en-US',options).split(",");
  return timeZoneData;
}
async function call_api(loc) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${loc}?unitGroup=metric&key=9G6P5A47C66PNNK6ADKAGMFYP&contentType=json`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    api=json;
    hor_now=+zoone(api.timezone)[1] + 1;

    if( chech_typeCity(loc) && ! localCity.includes(loc) ){
      if(nomberCity>=5)nomberCity=0;
      else nomberCity++;
      localCity[nomberCity]=loc;
      localStorage.setItem("mySite",JSON.stringify(localCity));
      localStorage.setItem("nombersite",nomberCity);
    }
    loding();
    content.style.opacity="1";
  }
  catch (error) {
    console.log(error.message);    
    switch (error.message){
      case "Failed to fetch":
        console.log("falid");
      case "Response status: 400":
        console.log("400")
    }
  }
}
function chech_typeCity(city){
  if(city.includes(",")) return false;
  else return true;
}
function toggle(){
  box.classList.toggle("toggle");
  input.classList.toggle("toggle")
  input.focus();
}
function flshOff(){
  if(xDay=== (width_child * -10))upD.setAttribute("class","flashFin");else upD.classList.remove("flashFin");
  if(xDay=== 0)downD.setAttribute("class","flashFin");else downD.classList.remove("flashFin");
  if(xHour=== (width_child * -19))upH.setAttribute("class","flashFin");else upH.classList.remove("flashFin");
  if(xHour=== 0)downH.setAttribute("class","flashFin");else downH.classList.remove("flashFin");
}
function movement(move){
  switch (move.id){
    case "up_day":
      if(xDay > (width_child * -10))xDay-=width_child;
      break;
    case "down_day":
      if(xDay < 0)xDay+=width_child;
      break;
    case "up_hour":    
      if(xHour > (width_child* -19))xHour-=width_child;
      break;
    case "down_hour":
      if(xHour < 0)xHour+=width_child;
  }
  flshOff();
  days.forEach(element => {
    element.style.transform=`translate(${xDay}px)`;
  });
  hours.forEach(element => {
    element.style.transform=`translate(${xHour}px)`;
  });
}
function capitalizeFirstLetterOfEachWord(str) {
  return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
function lounch_data_now(tzone){
  site.classList.remove("linearr");
  min_maxNone[0].classList.remove("min_max_none");
  min_maxNone[1].classList.remove("min_max_none");
  site.textContent=capitalizeFirstLetterOfEachWord(api.address);
  day.textContent=zoone(api.timeZone)[0];
  date.textContent=api.days[0].datetime;
  date_time.style.display="block";
  date_time.textContent=`date_time: ${api.currentConditions.datetime.slice(0,5)}`
  temp.textContent=Math.round(+api.currentConditions.temp);
  view.textContent=api.currentConditions.visibility;
  uv.textContent=api.currentConditions.uvindex;
  humidity.textContent=api.currentConditions.humidity;
  cloud.textContent=api.currentConditions.cloudcover;
  dew.textContent=api.currentConditions.dew;
  air.textContent=api.currentConditions.windspeed;
  min_temp.textContent=Math.round(+api.days[0].tempmin);
  max_temp.textContent=Math.round(+api.days[0].tempmax);
  explanation.textContent=api.description;
  icon.src=s(api.currentConditions.icon,+api.currentConditions.precip);
  for(i=0;i<15;i++){
    date_day[i].textContent=api.days[i].datetime.slice(5,10);
    temp_day[i].textContent=Math.round(+api.days[i].temp);
    box_day[i].dataset.nD=i;
    icon_day[i].src=s(api.days[i].icon,+api.days[i].precip)
  }
  for(i=hor_now;i<24;i++){
    time_hour[i-hor_now].textContent=api.days[0].hours[i].datetime.slice(0,5);
    temp_hour[i-hor_now].textContent=Math.round(+api.days[0].hours[i].temp);
    hour[i-hor_now].dataset.day=0;
    icon_hour[i-hor_now].src= s(api.days[0].hours[i].icon,+api.days[0].hours[i].precip);
  }
  for(i=0;i<hor_now;i++){
    time_hour[i+(24-hor_now)].textContent=api.days[1].hours[i].datetime.slice(0,5);
    temp_hour[i+(24-hor_now)].textContent=Math.round(+api.days[1].hours[i].temp);
    hour[i+(24-hor_now)].dataset.day=1;
    icon_hour[i+(24-hor_now)].src= s(api.days[1].hours[i].icon,+api.days[1].hours[i].precip);
  }
}
function lounch_data_days(nomber){
  
  site.classList.add("linearr");
  min_maxNone[0].classList.remove("min_max_none");
  min_maxNone[1].classList.remove("min_max_none");
  date.textContent=api.days[nomber].datetime;
  day.textContent=daysWeek[(new Date().getDay() + nomber) % 7 ];
  temp.textContent=Math.round(+api.days[nomber].temp);
  view.textContent=api.days[nomber].visibility;
  uv.textContent=api.days[nomber].uvindex;
  humidity.textContent=api.days[nomber].humidity;
  cloud.textContent=api.days[nomber].cloudcover;
  dew.textContent=api.days[nomber].dew;
  air.textContent=api.days[nomber].windspeed;
  min_temp.textContent=Math.round(+api.days[nomber].tempmin);
  max_temp.textContent=Math.round(+api.days[nomber].tempmax);
  explanation.textContent=api.days[nomber].description;
  icon.src=s(api.days[nomber].icon,+api.days[nomber].precip);
  for(i=0;i<24;i++){
    time_hour[i].textContent=api.days[nomber].hours[i].datetime.slice(0,5);
    temp_hour[i].textContent=Math.round(+api.days[nomber].hours[i].temp);
    hour[i].dataset.day=nomber;
    icon_hour[i].src= s(api.days[nomber].hours[i].icon,+api.days[nomber].hours[i].precip);
    
  }
}
function lounch_data_hours(nomber,h){
  
  site.classList.add("linearr");
  date.textContent=api.days[nomber].datetime;
  day.textContent=daysWeek[(new Date().getDay() + nomber) % 7 ];
  date_time.style.display="block";
  temp.textContent=Math.round(+api.days[nomber].hours[h].temp);
  view.textContent=api.days[nomber].visibility;
  uv.textContent=api.days[nomber].hours[h].uvindex;
  humidity.textContent=api.days[nomber].hours[h].humidity;
  cloud.textContent=api.days[nomber].hours[h].cloudcover;
  dew.textContent=api.days[nomber].hours[h].dew;
  air.textContent=api.days[nomber].hours[h].windspeed;
  explanation.textContent=api.days[nomber].description;
  min_maxNone[0].classList.add("min_max_none");
  min_maxNone[1].classList.add("min_max_none");
  icon.src=s(api.days[nomber].hours[h].icon,+api.days[nomber].hours[h].precip)
}
function s (apik,precip){
  switch (apik){
    case "clear-night":
      return "./imgs/mah.svg";

    case "clear-day":
      return "./imgs/sunM.svg";

    case "cloudy":
      return "./imgs/abr.svg";

    case "partly-cloudy-night":
      return "./imgs/mah_abr.svg"

    case "partly-cloudy-day":
      return "./imgs/kh_abr.svg"
    
    case "rain":
      if(precip<2)return "./imgs/barsh.svg";
      else return "./imgs/barsh_sh.svg"

    case "snow":
      return "./imgs/barf.svg";

    case "fog":
      return "./imgs/fog.svg";
      
    case "wind":
      return "./imgs/wind.svg";
  }
}
function backGroundImage(){
  let rand= Math.floor( (Math.random()* li_img.length));
  let a=li_img[rand];
  img.src=a;
  
  let flag1=true;
  let flag2=true;
  
  setTimeout(() => {
    flag2=false;
    finish+=1;
    img.src="./imgs/neacher.jpg";
    
    if(flag1){
      if(finish>=3){
        backUrl="./imgs/neacher.jpg";
        loding();
      }
      else backGroundImage();
    } 
  },1400);
  
  img.onload= function(){
    flag1=false;
    if(flag2){
      backUrl=a;
      loding();
    }
  }
}
function check_location(click){
  content.style.opacity="0";
  call_api(click)
  input.value="";
}
function loding(){
  if(api && backUrl){
    let deleteStatus=0;
    back.style.backgroundImage= `url(${backUrl})`;
    boxLod.style.display="none";
    container.style.display="block";
    $.body.style.background="none";
    lounch_data_now(api.timeZone);
    for ( let i=0;i<6;i++){
      if(localCity[i]===localCity[nomberCity]){deleteStatus--; continue}
      if(localCity[i].length >=11)citys[i + deleteStatus].textContent=localCity[i].slice(0,7)+"...";
      else citys[i + deleteStatus].textContent= localCity[i];
    }
  }
}
