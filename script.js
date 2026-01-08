// Categories and units
const units = {
  length: ["meter","kilometer","mile","feet","inch","centimeter"],
  mass: ["gram","kilogram","pound","ounce","ton"],
  temperature: ["celsius","fahrenheit","kelvin"],
  area: ["square_meter","square_kilometer","hectare","acre"],
  volume: ["liter","milliliter","cubic_meter","gallon"],
  speed: ["mps","kmph","mph","knot"],
  pressure: ["pascal","bar","psi","atm"],
  energy: ["joule","kilojoule","calorie","kilocalorie","watt_hour"],
  flow: ["cubic_meter_per_second","liter_per_second","gallon_per_minute","cfm"],
  heat: ["watt","kilowatt","BTU_per_hour","ton_refrigeration"],
  power: ["watt","kilowatt","horsepower","BTU_per_hour"],
  density: ["kg_per_cubic_meter","g_per_cubic_cm","lb_per_cubic_ft"],
  force: ["newton","kilonewton","pound_force","dyne"],
  torque: ["newton_meter","kilogram_meter","pound_foot"],
  frequency: ["hertz","kilohertz","megahertz","rpm"],
  electrical: ["volt","kilovolt","ampere","milliampere","ohm","kilohm"],
  math: ["radian","degree"]
};

// Populate on load
document.addEventListener("DOMContentLoaded", () => {
  populateUnits();
  loadSaved();
});

// Events
document.getElementById("type").addEventListener("change", () => {
  populateUnits();
  document.getElementById("value").value = "";
  document.getElementById("result").innerText = "";
});
document.getElementById("convertBtn").addEventListener("click", convert);
document.getElementById("pushBtn").addEventListener("click", pushConversion);
document.getElementById("resetBtn").addEventListener("click", resetForm);

// Populate dropdowns with persistent placeholder
function populateUnits() {
  const type = document.getElementById("type").value;
  const from = document.getElementById("from");
  const to = document.getElementById("to");

  const list = units[type] || [];

  const placeholder = '<option value="" disabled selected>-- pilih unit --</option>';
  const options = list.map(u => `<option value="${u}">${u}</option>`).join("");

  from.innerHTML = placeholder + options;
  to.innerHTML   = placeholder + options;
}

// Convert dispatcher
function convert() {
  const type = document.getElementById("type").value;
  const from = document.getElementById("from").value;
  const to   = document.getElementById("to").value;
  const value = parseFloat(document.getElementById("value").value);

  if (!from || !to) { alert("Sila pilih unit untuk From dan To."); return; }
  if (isNaN(value)) { alert("Sila masukkan nombor yang sah."); return; }

  let result;

  switch (type) {
    case "length":     result = convertLength(value, from, to); break;
    case "mass":       result = convertMass(value, from, to); break;
    case "temperature":result = convertTemp(value, from, to); break;
    case "area":       result = convertArea(value, from, to); break;
    case "volume":     result = convertVolume(value, from, to); break;
    case "speed":      result = convertSpeed(value, from, to); break;
    case "pressure":   result = convertPressure(value, from, to); break;
    case "energy":     result = convertEnergy(value, from, to); break;
    case "flow":       result = convertFlow(value, from, to); break;
    case "heat":       result = convertHeat(value, from, to); break;
    case "power":      result = convertPower(value, from, to); break;
    case "density":    result = convertDensity(value, from, to); break;
    case "force":      result = convertForce(value, from, to); break;
    case "torque":     result = convertTorque(value, from, to); break;
    case "frequency":  result = convertFrequency(value, from, to); break;
    case "electrical": result = convertElectrical(value, from, to); break;
    case "math":       result = convertMath(value, from, to); break;
    default:           result = value;
  }

  document.getElementById("result").innerText = `${value} ${from} = ${result} ${to}`;
  saveConversion(`${value} ${from} = ${result} ${to}`);
}

/* ==== Converters ==== */
// Length
function convertLength(v, from, to) {
  const m = { meter:1, kilometer:1000, mile:1609.34, feet:0.3048, inch:0.0254, centimeter:0.01 };
  return (v * m[from] / m[to]).toFixed(4);
}
// Mass
function convertMass(v, from, to) {
  const m = { gram:1, kilogram:1000, pound:453.592, ounce:28.3495, ton:1e6 };
  return (v * m[from] / m[to]).toFixed(4);
}
// Temperature
function convertTemp(v, from, to) {
  if (from === to) return v.toFixed(2);
  if (from === "celsius") {
    if (to === "fahrenheit") return (v*9/5 + 32).toFixed(2);
    if (to === "kelvin")     return (v + 273.15).toFixed(2);
  }
  if (from === "fahrenheit") {
    if (to === "celsius") return ((v - 32)*5/9).toFixed(2);
    if (to === "kelvin")  return ((v - 32)*5/9 + 273.15).toFixed(2);
  }
  if (from === "kelvin") {
    if (to === "celsius")    return (v - 273.15).toFixed(2);
    if (to === "fahrenheit") return ((v - 273.15)*9/5 + 32).toFixed(2);
  }
}
// Area
function convertArea(v, from, to) {
  const m = { square_meter:1, square_kilometer:1e6, hectare:1e4, acre:4046.86 };
  return (v * m[from] / m[to]).toFixed(4);
}
// Volume
function convertVolume(v, from, to) {
  const m = { liter:1, milliliter:0.001, cubic_meter:1000, gallon:3.785411784 };
  return (v * m[from] / m[to]).toFixed(4);
}
// Speed
function convertSpeed(v, from, to) {
  const m = { mps:1, kmph:0.277777778, mph:0.44704, knot:0.514444 };
  return (v * m[from] / m[to]).toFixed(4);
}
// Pressure
function convertPressure(v, from, to) {
  const m = { pascal:1, bar:1e5, psi:6894.757293, atm:101325 };
  return (v * m[from] / m[to]).toFixed(4);
}
// Energy
function convertEnergy(v, from, to) {
  const m = { joule:1, kilojoule:1000, calorie:4.184, kilocalorie:4184, watt_hour:3600 };
  return (v * m[from] / m[to]).toFixed(4);
}
// Flow (HVAC)
function convertFlow(v, from, to) {
  const m = {
    cubic_meter_per_second:1,
    liter_per_second:0.001,
    gallon_per_minute:0.0000630902, // US gal/min to m^3/s
    cfm:0.00047194745                // cubic feet per minute to m^3/s
  };
  return (v * m[from] / m[to]).toFixed(6);
}
// Heat (HVAC heat rate)
function convertHeat(v, from, to) {
  const m = {
    watt:1,
    kilowatt:1000,
    BTU_per_hour:0.29307107,       // BTU/h to W
    ton_refrigeration:3516.852842  // ton to W (approx 3.516852842 kW)
  };
  return (v * m[from] / m[to]).toFixed(6);
}
// Power
function convertPower(v, from, to) {
  const m = {
    watt:1,
    kilowatt:1000,
    horsepower:745.699872,
    BTU_per_hour:0.29307107
  };
  return (v * m[from] / m[to]).toFixed(6);
}
// Density
function convertDensity(v, from, to) {
  const m = {
    kg_per_cubic_meter:1,
    g_per_cubic_cm:1000,          // 1 g/cm^3 = 1000 kg/m^3
    lb_per_cubic_ft:16.018463373  // 1 lb/ft^3 ≈ 16.018463 kg/m^3
  };
  return (v * m[from] / m[to]).toFixed(6);
}
// Force
function convertForce(v, from, to) {
  const m = {
    newton:1,
    kilonewton:1000,
    pound_force:4.4482216153, // lbf to N
    dyne:1e-5
  };
  return (v * m[from] / m[to]).toFixed(6);
}
// Torque
function convertTorque(v, from, to) {
  const m = {
    newton_meter:1,
    kilogram_meter:9.80665,      // kgf·m to N·m
    pound_foot:1.3558179483      // lbf·ft to N·m
  };
  return (v * m[from] / m[to]).toFixed(6);
}
// Frequency
function convertFrequency(v, from, to) {
  const m = {
    hertz:1,
    kilohertz:1000,
    megahertz:1e6,
    rpm:1/60 // rpm to Hz
  };
  return (v * m[from] / m[to]).toFixed(6);
}
// Electrical (basic magnitude scaling; not mixing V/A/Ω)
function convertElectrical(v, from, to) {
  const groups = {
    volt: { volt:1, kilovolt:1000 },
    ampere: { ampere:1, milliampere:0.001 },
    ohm: { ohm:1, kilohm:1000 }
  };
  const map = { volt: "volt", kilovolt: "volt", ampere: "ampere", milliampere: "ampere", ohm: "ohm", kilohm: "ohm" };
  const family = map[from];
  if (!family || map[to] !== family) return "Incompatible units";
  const m = groups[family];
  return (v * m[from] / m[to]).toFixed(6);
}
// Math (angle)
function convertMath(v, from, to) {
  if (from === to) return v.toFixed(6);
  if (from === "radian" && to === "degree") return (v * (180 / Math.PI)).toFixed(6);
  if (from === "degree" && to === "radian") return (v * (Math.PI / 180)).toFixed(6);
  return "Unsupported";
}

/* ==== History ==== */
function saveConversion(text) {
  let saved = JSON.parse(localStorage.getItem("saved")) || [];
  saved.unshift(text);
  saved = saved.slice(0, 5);
  localStorage.setItem("saved", JSON.stringify(saved));
  loadSaved();
}
function loadSaved() {
  const saved = JSON.parse(localStorage.getItem("saved")) || [];
  const list = document.getElementById("saved");
  list.innerHTML = "";
  saved.forEach(item => list.innerHTML += `<li>${item}</li>`);
}

/* ==== Buttons ==== */
function pushConversion() {
  const resultText = document.getElementById("result").innerText;
  if (resultText) saveConversion(resultText);
}
function resetForm() {
  document.getElementById("value").value = "";
  document.getElementById("result").innerText = "";
  populateUnits(); // reset placeholder
}









