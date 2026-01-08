const units = {
  length: ["meter", "kilometer", "mile", "feet", "inch", "centimeter"],
  mass: ["gram", "kilogram", "pound", "ounce", "ton"],
  temperature: ["celsius", "fahrenheit", "kelvin"],
  area: ["square_meter", "square_kilometer", "hectare", "acre"],
  volume: ["liter", "milliliter", "cubic_meter", "gallon"],
  speed: ["mps", "kmph", "mph", "knot"],
  pressure: ["pascal", "bar", "psi", "atm"],
  energy: ["joule", "kilojoule", "calorie", "kilocalorie", "watt_hour"]
};

document.addEventListener("DOMContentLoaded", () => {
  populateUnits();
  loadSaved();
});

document.getElementById("type").addEventListener("change", populateUnits);
document.getElementById("convertBtn").addEventListener("click", convert);
document.getElementById("pushBtn").addEventListener("click", pushConversion);
document.getElementById("resetBtn").addEventListener("click", resetForm);

function populateUnits() {
  const type = document.getElementById("type").value;
  const from = document.getElementById("from");
  const to = document.getElementById("to");

  const unitList = units[type];
  if (!unitList) return;

  from.innerHTML = "";
  to.innerHTML = "";

  unitList.forEach(u => {
    from.innerHTML += `<option value="${u}">${u}</option>`;
    to.innerHTML += `<option value="${u}">${u}</option>`;
  });
}

function convert() {
  const type = document.getElementById("type").value;
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const value = parseFloat(document.getElementById("value").value);

  if (isNaN(value)) {
    alert("Please enter a valid number!");
    return;
  }

  let result;
  if (type === "length") result = convertLength(value, from, to);
  if (type === "mass") result = convertMass(value, from, to);
  if (type === "temperature") result = convertTemp(value, from, to);
  if (type === "area") result = convertArea(value, from, to);
  if (type === "volume") result = convertVolume(value, from, to);
  if (type === "speed") result = convertSpeed(value, from, to);
  if (type === "pressure") result = convertPressure(value, from, to);
  if (type === "energy") result = convertEnergy(value, from, to);

  document.getElementById("result").innerText = `${value} ${from} = ${result} ${to}`;
  saveConversion(`${value} ${from} = ${result} ${to}`);
}

// Conversion functions
function convertLength(v, from, to) {
  const m = { meter:1, kilometer:1000, mile:1609.34, feet:0.3048, inch:0.0254, centimeter:0.01 };
  return (v * m[from] / m[to]).toFixed(4);
}
function convertMass(v, from, to) {
  const m = { gram:1, kilogram:1000, pound:453.592, ounce:28.3495, ton:1e6 };
  return (v * m[from] / m[to]).toFixed(4);
}
function convertTemp(v, from, to) {
  if (from === to) return v.toFixed(2);
  if (from === "celsius") {
    if (to === "fahrenheit") return (v*9/5+32).toFixed(2);
    if (to === "kelvin") return (v+273.15).toFixed(2);
  }
  if (from === "fahrenheit") {
    if (to === "celsius") return ((v-32)*5/9).toFixed(2);
    if (to === "kelvin") return ((v-32)*5/9+273.15).toFixed(2);
  }
  if (from === "kelvin") {
    if (to === "celsius") return (v-273.15).toFixed(2);
    if (to === "fahrenheit") return ((v-273.15)*9/5+32).toFixed(2);
  }
}
function convertArea(v, from, to) {
  const m = { square_meter:1, square_kilometer:1e6, hectare:1e4, acre:4046.86 };
  return (v * m[from] / m[to]).toFixed(4);
}
function convertVolume(v, from, to) {
  const m = { liter:1, milliliter:0.001, cubic_meter:1000, gallon:3.785 };
  return (v * m[from] / m[to]).toFixed(4);
}
function convertSpeed(v, from, to) {
  const m = { mps:1, kmph:0.27778, mph:0.44704, knot:0.51444 };
  return (v * m[from] / m[to]).toFixed(4);
}
function convertPressure(v, from, to) {
  const m = { pascal:1, bar:1e5, psi:6894.76, atm:101325 };
  return (v * m[from] / m[to]).toFixed(4);
}
function convertEnergy(v, from, to) {
  const m = { joule:1, kilojoule:1000, calorie:4.184, kilocalorie:4184, watt_hour:3600 };
  return (v * m[from] / m[to]).toFixed(4);
}

// Save & Load
function saveConversion(text) {
  let saved = JSON.parse(localStorage.getItem("saved")) || [];
  saved.unshift(text);
  saved = saved.slice(0, 5);
  localStorage.setItem("saved", JSON.stringify(saved));
  loadSaved();
}
function loadSaved() {
  let saved = JSON.parse(localStorage.getItem("saved")) || [];
  const list = document.getElementById("saved");
  list.innerHTML = "";
  saved.forEach(item => list.innerHTML +=






