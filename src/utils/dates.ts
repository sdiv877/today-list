export function getTaskCardDateString(date: Date): string {
    //ex. due 8/07/21 at 15:00 
    let taskCardDateString = "Due: " + getLogicalDateString(date);

    taskCardDateString += " at " + getTimeString(date);

    return taskCardDateString; 
}

//-- Date string helpers
function getLogicalDateString(date: Date): string {

    const currentDate = new Date();

    if (date.getDate() === currentDate.getDate()) {
        return "Today";
    } else if (date.getDate() === currentDate.getDate() + 1) {
        return "Tomorrow";

        // If day of the month diff <= 7 and month is equal
    } else if ((date.getDate() - currentDate.getDate()) <= 7 && (date.getMonth() === currentDate.getMonth())) {
        return getDayDateString(date);
    } else {
        return getShortDateString(date);
    }
}

function getShortDateString(date: Date): string {
    // ex. 8/07/21
    const dateString = (date.getDate().toString() + "/0" + (date.getMonth() + 1).toString()) + '/'
        + (date.getFullYear().toString().slice(2))

    return dateString;
}

function getDayDateString(date: Date): string {
    // ex. Thursday, 7th July
    const dateString = getWeekdayString(date.getDay()) + ', ' + getOrdinalDayString(date.getDate()) + ' '
        + getMonthString(date.getMonth());

    return dateString;
}

//-- Day/Month helpers
function getWeekdayString(day: number): string {

    const weekdays = ['Sunday', 'Monday', 'Tueday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return weekdays[day];
}

function getOrdinalDayString(day: number): string {

    switch (true) {
        case day === 1 || day === 21 || day === 31:
            return day.toString() + 'st';
        case day === 2 || day === 22:
            return day.toString() + 'nd';
        case day === 3 || day == 23:
            return day.toString() + 'rd';
        default:
            return day.toString() + 'th'
    }
}

function getMonthString(month: number): string {

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return months[month];
}

//-- Time string helpers
function getTimeString(date: Date): string {

    let hoursString = date.getHours().toString();
    if (date.getHours() < 10) {
        hoursString = '0' + hoursString.toString();
    }

    let minutesString = date.getMinutes().toString();
    if (date.getMinutes() < 10) {
        minutesString = '0' + minutesString.toString();
    }
    
    const timeString = hoursString + ':' + minutesString;

    return timeString;
}