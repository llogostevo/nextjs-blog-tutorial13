// Function getFormattedDate
// This function takes a date string as an argument and returns a formatted date string.
export default function getFormattedDate(dateString:string):string {
    
    // Convert the input date string to a Date object, and format it in the 'en-UK' locale with a 'long' date style.
    // The 'long' option will display the date in a full textual format, including the day of the week, the month, and the year.
    // An example of a 'long' formatted date would be: "Tuesday, 11 June 2023".
    const date = new Intl.DateTimeFormat('en-UK', {dateStyle: 'long'}).format(new Date(dateString))
    
    // Return the formatted date.
    return date;
}
