const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const date = new Date()
const fullDate = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear()

let dayNight = date.getHours()
let dayUpdate = ""

if (dayNight > 0 && dayNight < 12) {
  dayUpdate = "Am"
} else {
  dayUpdate = "Pm"
}

const fullTime = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " " + dayUpdate

module.exports = { fullDate, fullTime }