// scientific calculator logic
const display = document.getElementById('display');

// constants available inside eval()
const pi = Math.PI;
const e = Math.E;

// wrapper functions (degrees -> radians for trig)
function sin(x){ return Math.sin(Number(x) * Math.PI / 180); }
function cos(x){ return Math.cos(Number(x) * Math.PI / 180); }
function tan(x){ return Math.tan(Number(x) * Math.PI / 180); }
function sqrt(x){ return Math.sqrt(x); }
function log(x){ return Math.log10(x); } // base-10
function ln(x){ return Math.log(x); }    // natural log

function appendToDisplay(input){
  display.value += input;
}

function clearDisplay(){
  display.value = '';
}

function backspace(){
  display.value = display.value.slice(0, -1);
}

function calculate(){
  try {
    let expression = display.value;

    // Normalize a few user-friendly symbols if present
    expression = expression.replace(/×/g, '*').replace(/÷/g, '/').replace(/π/g, 'pi');

    // Convert caret to JS exponent operator
    expression = expression.replace(/\^/g, '**');

    // Evaluate. The functions (sin, cos, sqrt, etc.) and constants (pi, e)
    // are defined above so they are available inside eval.
    const result = eval(expression);

    // Handle invalid results
    if (result === Infinity || result === -Infinity || Number.isNaN(result)) {
      display.value = 'Error';
    } else {
      // Trim long floats to a reasonable length
      const asNumber = Number(result);
      display.value = (Math.abs(asNumber) < 1e12) ? String(roundToSignificant(asNumber, 12)) : String(asNumber);
    }
  } catch (err) {
    display.value = 'Error';
  }
}

// helper: round to N significant digits (keeps floats neat)
function roundToSignificant(num, sig) {
  if (!isFinite(num) || num === 0) return num;
  const digits = Math.max(0, sig - Math.floor(Math.log10(Math.abs(num))) - 1);
  return Number.parseFloat(num.toFixed(digits));
}
