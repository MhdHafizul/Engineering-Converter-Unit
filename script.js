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

document.getElementById("type").addEventListener("change", () => {
  populateUnits();
  document.getElementById("value").value = "";
  document.getElementById("result").innerText = "";
});

document.getElementById("convertBtn").addEventListener("click", convert);
document.getElementById("pushBtn").addEventListener("click", pushConversion);
document.getElementById("resetBtn").addEventListener("click", resetForm);

function populateUnits() {
  const type = document.getElementById("type").value;
  const from = document.getElementById("from");
  const to = document.getElementById("to");

  const list = units[type] || [];
  from.innerHTML = '<option value="" disabled selected>-- pilih unit --</option>';
  to.innerHTML   = '<option value="" disabled selected>-- pilih unit --</option>';

  list.forEach(u => {
    from.innerHTML += `<option value="${u}">${u}</option>`;
    to.innerHTML += `<option value="${u}">${u}</option>`;
  });
}

function convert() {
  const type = document.getElementById("type").value;
  const from = document.getElementById("from").value;
  const to   = document.getElementById("to").value;
  const value = parseFloat(document.getElementById("value").value);

  if (!from || !to) {
    alert("Sila pilih unit untuk From dan To.");
    return;
  }
  if (isNaN(value)) {
    alert("Sila masukkan nombor yang sah.");
    return;
  }

  let result;
  if (type === "length") result = convertLength(value, from, to);
  else if (type === "mass") result = convertMass(value, from, to);
  else if (type === "temperature") result = convertTemp(value, from, to);
  else if (type === "area") result = convertArea(value, from, to);
  else if (type === "volume") result = convertVolume(value, from, to);
  else if (type === "speed") result = convertSpeed(value, from, to);
  else if (type === "pressure") result = convertPressure(value, from, to);
  else if (type === "energy") result = convertEnergy(value, from, to);

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
  if (from ===







