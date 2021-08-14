// Global variables and objects //

// Create two arrays to store duration of remaining time for alarm and alarm Time Objects //
let alarmsListArray = [];
// let durationListArray = [];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var timer ;

// Display clock function //
let displayClock = () => {
    let today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();
    let format = today > 12 ? "P.M" : "A.M" ;
    let clock = document.getElementById('clock');
    //Insert current time to the clock div as innerHTML
    clock.innerHTML = `
    ${hours % 12 < 10 ? '0'+ (hours % 12) : (hours % 12) }
    :${minutes < 10 ? '0' + minutes : minutes}
    :${seconds < 10 ? '0' + seconds : seconds}
    :${format}
    `;
    //create a setTimeout to call displayClock function for Working Clock Display
    setTimeout(displayClock,1000);
}
let setAlarm = () => {
    let alarmsInput = document.getElementById('alarm_input');
    let alarm = alarmsInput.value;
    alarmsInput.value="";
    if(alarm!==""){
        let curr_time = new Date();
        //create alarm_time object
        let alarm_time = new Date(alarm);
        let duration = alarm_time - curr_time ;
        if(duration < 0){
            alert('Time has already passed');
        }else{
            // Push alarm_time obj into alarmsListArray //
            alarmsListArray.push(alarm_time);
            alarmsListArray.sort();
            displayAlarmsList();

            console.log("remaining time in seconds",duration/1000);
             setTimeout(()=>{
            if(alarmsListArray.length > 0){
                alarmsListArray.shift();
            }
            displayAlarmsList();
            alert('Times up');
            console.log("Alarm Deleted");
            },duration);
            // push duration into durationListArray //
            // durationListArray.push(duration);
            // durationListArray.sort();
            // console.log( durationListArray);
            //call Initiate Alarm function with shortest duration
            // if(durationListArray.length > 0){
            //     initiateAlarm(durationListArray[0]);
            // }
        }
    }else{
        alert('Select Alarm Time !!!')
    }

}
// Display Alarm List //
let displayAlarmsList = () => {
    let alarms_ul = document.getElementById('alarms_ul');
    //clear alarms_ul innerHTml to avoid already appened duplicated lists everytime a new alarm is added
    alarms_ul.innerHTML='';
    alarmsListArray.forEach((time,index) => {
    // create necessary variables for every alarm_time object in the array ...
    let alarmTime = time;
    let hours = alarmTime.getHours();
    let minutes = alarmTime.getMinutes();
    let seconds = alarmTime.getSeconds();
    let format = hours <12 ?"A.M" :'P.M';
    //create newLi tag to append to the alarms List
    let newLi = document.createElement('li');
    newLi.className = "alarms-li";
    newLi.innerHTML = `
    ${months[alarmTime.getMonth()]}
    ${alarmTime.getDate() } :
    ${hours % 12 < 10 ? ("0" + (hours % 12)): (hours % 12)} :
    ${minutes<10 ? "0"+ minutes : minutes } :
    ${seconds<10 ? "0"+ seconds : seconds } :
    ${format} 
    <button onClick={deleteAlarm(${index})} type="submit" class='deleteAlarm'>Delete</button>    
    `;
    alarms_ul.appendChild(newLi);
});
}
//Delete Alarm function
let deleteAlarm = (index)=>{
    alarmsListArray.splice(index,1);
    //call displayAlarmsList function again
    displayAlarmsList();
}
//Initiate alarm function
// let initiateAlarm = (duration)=> {
//     setTimeout( () => {
//         alert('Time is up !!!');
       
//         //remove related alarm obj from alarmsListArray
//         if(alarmsListArray.length > 0){
//             alarmsListArray.shift();
//         }
//         // remove the current duration from durationList array
//         durationListArray.shift();
//         console.log( durationListArray);
//         if(durationListArray.length > 0){
//             initiateAlarm(durationListArray[0]);
//         }
//         // call displayAlarmList function
//           displayAlarmsList();
      
//     },duration);
// }

        //  Handle Events //  

//Hanle DisplayClock
document.addEventListener('DOMContentLoaded ',displayClock());

//handle Add Alarm
document.querySelector('#submit_alarm_time').addEventListener('click',(e)=>{
    e.preventDefault();
    //Call setAlarm function
    setAlarm();
})

