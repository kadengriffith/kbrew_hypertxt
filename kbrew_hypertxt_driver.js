// Selects random greetings for the loading screen text
let textOptions = [
  'Loading something neat...',
  'Refilling the coffee...',
  'Looking for bugs...',
  'Discussing function calls...',
  'Counting stars...',
  'Scanning lines for awesomeness...',
  'Please wait for high-fives...',
  'Digging for gold...'
];
generateLoadText();

// Chooses a random text for the loading screen
function generateLoadText() {
  let choice = Math.floor(Math.random() * textOptions.length);
  for (let i = 0; i < textOptions.length; i++) {
    if (choice === i) {
      getDOM('hyper_loading', 0).innerHTML = textOptions[i];
    }
  }
}

// This shows and hides the loading screen
function toggleLoading(state) {
  if (state && getDOM('hyper_loading', 0).style.display === 'none') {
    generateLoadText();
    getDOM('hyper_loading', 0).style.display = 'block';
  } else {
    getDOM('hyper_loading', 0).style.display = 'none';
  }
}

function toggleMenu(state) {
  if (state) {
    disableViewScreen();
    getDOM('#hyper_menu').style.display = "block";
    setTimeout(() => {
      getDOM('hyper_offscreen_top', 0).style.top = "0";
    }, 25);
    getDOM('hyper_action', 0).style.display = "block";
  } else {
    getDOM('hyper_action', 0).style.display = "none";
    getDOM('hyper_offscreen_top', 0).style.top = "-100%";
    getDOM('#hyper_menu').style.display = "none";
    enableViewScreen();
  }
}

function displayError(err) {
  if (getDOM('#hyper_error').innerHTML === '') {
    getDOM('#hyper_error').innerHTML = '<i style="color:rgba(111,111,111,0.3);text-shadow:none;float:left;" class="fa fa-2x fa-info"></i><br><br>' + err + '<br><br>';
  } else {
    return;
  }
  if (getDOM('#hyper_error').style.display = 'none') {
    getDOM('#hyper_error').style.display = 'block';
    setTimeout(() => {
      getDOM('#hyper_error').style.display = 'none';
      getDOM('#hyper_error').innerHTML = '';
    }, 5000);
  }
}

function displaySuccess(s) {
  if (getDOM('#hyper_success').innerHTML === '') {
    getDOM('#hyper_success').innerHTML = '<i style="color:rgba(111,111,111,0.3);text-shadow:none;float:left;" class="fa fa-2x fa-info"></i><br><br>' + s + '<br><br>';
  } else {
    return;
  }
  if (getDOM('#hyper_success').style.display = 'none') {
    getDOM('#hyper_success').style.display = 'block';
    setTimeout(() => {
      getDOM('#hyper_success').style.display = 'none';
      getDOM('#hyper_success').innerHTML = '';
    }, 5000);
  }
}