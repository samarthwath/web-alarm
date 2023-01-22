let alarmBtn = document.querySelector(`#set-alarm-btn`);
alarmBtn.addEventListener(`click`, setAndClearAlarmTimings);
let setAlarmColorClass = `btn-success`;
let clearAlarmColorClass = `btn-secondary`;
setInterval(() => {
    let dateObject = new Date();
    let timeZone = document.querySelector(`#time-zone`);
    let weekDay = document.querySelector(`#week-day`);
    let displayHour = document.querySelector(`#display-hour`);
    let displayDate = document.querySelector(`#display-date`);
    let setTimeZone = `AM`;
    let parseHourValue = dateObject.getHours();
    if (12 <= dateObject.getHours() && dateObject.getHours() <= 24) {
        parseHourValue = dateObject.getHours() % 12;
        setTimeZone = `PM`;
    }
    if (parseHourValue === 0) {
        parseHourValue = 12;
    }
    let daysInfo = [`Sunday`, `Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`];
    let monthsInfo = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];
    timeZone.innerText = setTimeZone;
    timeZone.setAttribute(`style`, `color: black`);
    weekDay.innerText = daysInfo[dateObject.getDay()];
    timeZone.setAttribute(`style`, `color: black`);
    let hoursMinutesAndSeconds = `${parseHourValue}:  ${dateObject.getMinutes()}: ${dateObject.getSeconds()}`
    displayHour.innerText = hoursMinutesAndSeconds;
    displayHour.setAttribute(`style`, `color: black`);
    let formattedDate = `${dateObject.getDate()} ${monthsInfo[dateObject.getMonth()]} ${dateObject.getFullYear()}`;
    displayDate.innerText = formattedDate;
    displayDate.setAttribute(`style`, `color: black`);
}, 1000);

function setAndClearAlarmTimings() {
    console.log(`------setAndClearAlarmTimings method start------`);
    let hourSelectBox = document.querySelector(`#hour-select-box`);
    let minutesSelectBox = document.querySelector(`#minutes-select-box`);
    let timeZoneSelectBox = document.querySelector(`#time-zone-select-box`);
    let hourValue = hourSelectBox.options[hourSelectBox.selectedIndex].value;
    let minutesValue = minutesSelectBox.options[minutesSelectBox.selectedIndex].value;
    let timeZoneValue = timeZoneSelectBox.options[timeZoneSelectBox.selectedIndex].value;
    if (hourValue === `Hour` || minutesValue === `Minutes`) {
        console.log(`Inside the Blank Hour Minutes and Timezone section.....`);
        hourSelectBox.selectedIndex = 0;
        minutesSelectBox.selectedIndex = 0;
        timeZoneSelectBox.selectedIndex = 0;
        alert(`Alarm Input fields are blank please enter the inputs`);
    } else if (alarmBtn.innerText === `Set Alarm`) {
        hourSelectBox.disabled = true;
        minutesSelectBox.disabled = true;
        timeZoneSelectBox.disabled = true;
        alarmBtn.innerText = `Clear Alarm`;
        alarmBtn.classList.remove(setAlarmColorClass);
        alarmBtn.classList.add(clearAlarmColorClass);
        parseHumanTime(hourValue, minutesValue, timeZoneValue, false);
    } else if (alarmBtn.innerText === `Clear Alarm`) {
        hourSelectBox.selectedIndex = 0;
        minutesSelectBox.selectedIndex = 0;
        timeZoneSelectBox.selectedIndex = 0;
        hourSelectBox.disabled = false;
        minutesSelectBox.disabled = false;
        timeZoneSelectBox.disabled = false;
        alarmBtn.innerText = `Set Alarm`;
        alarmBtn.classList.remove(clearAlarmColorClass);
        alarmBtn.classList.add(setAlarmColorClass);
        parseHumanTime(hourValue, minutesValue, timeZoneValue, true);
    }
    console.log(`------setAndClearAlarmTimings method ends------`);
}
function parseHumanTime(alarmHour, alramMinutes, alarmTimeZone, flagStopInterval) {
    console.log(`------parseHumanTime method start------`);
    let timerId = null;
    if (localStorage.getItem(`timerId`) !== null) {
        timerId = Number.parseInt(localStorage.getItem(`timerId`));
    }
    if (!flagStopInterval) {
        timerId = setInterval(() => {
            console.log(`------setInterval method start------`);
            let dateObject = new Date();
            let currentTimeZone = `AM`;
            let currentHourValue = dateObject.getHours();
            if (currentHourValue === 0) {
                currentHourValue = 12;
            }
            let audioElement = document.createElement(`audio`);
            if (12 < dateObject.getHours() && dateObject.getHours() <= 24) {
                currentHourValue = dateObject.getHours() % 12;
                currentTimeZone = `PM`;
            }
            if (currentHourValue === Number.parseInt(alarmHour) && dateObject.getMinutes() === Number.parseInt(alramMinutes) && currentTimeZone === alarmTimeZone) {
                alarmBtn.disabled = true;
                console.log(`------Alarm Ringing start------`);
                audioElement.src = `./wake-up.mp3`;
                audioElement.autoplay = true;
                clearInterval(timerId);
                localStorage.removeItem(`timerId`);
                console.log(`------Alarm Ringing ends------`);
                setTimeout(() => {
                    let hourSelectBox = document.querySelector(`#hour-select-box`);
                    let minutesSelectBox = document.querySelector(`#minutes-select-box`);
                    let timeZoneSelectBox = document.querySelector(`#time-zone-select-box`);
                    hourSelectBox.selectedIndex = 0;
                    minutesSelectBox.selectedIndex = 0;
                    timeZoneSelectBox.selectedIndex = 0;
                    hourSelectBox.disabled = false;
                    minutesSelectBox.disabled = false;
                    timeZoneSelectBox.disabled = false;
                    alarmBtn.innerText = `Set Alarm`;
                    alarmBtn.disabled = false;
                    alarmBtn.classList.remove(clearAlarmColorClass);
                    alarmBtn.classList.add(setAlarmColorClass);
                }, 60000);
            }
        }, 1000);
        localStorage.setItem(`timerId`, timerId);
    } else if (localStorage.getItem(`timerId`) !== null) {
        let getExistingTimerId = localStorage.getItem(`timerId`);
        console.log(`------clearing existing Timer Id ${getExistingTimerId} start------`);
        clearInterval(timerId);
        localStorage.removeItem(`timerId`);
        console.log(`------clearing existing Timer Id ${getExistingTimerId} ends------`);
    }
    console.log(`------parseHumanTime method ends------`);
}