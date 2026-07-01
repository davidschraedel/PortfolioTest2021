$(document).mousemove(function(event) {
  windowWidth = $(window).width();
  windowHeight = $(window).height();
  
  mouseXpercentage = Math.round(event.pageX / windowWidth * 100);
  mouseYpercentage = Math.round(event.pageY / windowHeight * 100);
  
  $('.radial-gradient').css('background', 'radial-gradient(at ' + mouseXpercentage + '% ' + mouseYpercentage + '%, #6db1bd, #33a1b4)');
});



function myFunction() {
  var y = document.getElementById('myIcon');
  var x = document.getElementById("myLinks");
  var z = document.getElementById('fillSpace');
  if (x.style.display === "block") {
    x.style.display = "none";
    y.className = 'fa fa-chevron-circle-down'
    z.style.display = 'block';
  } else {
    x.style.display = "block";
    y.className = 'fa fa-chevron-circle-up'
    z.style.display = 'none';
  }
}

function myFootFunction() {
  var y = document.getElementById('myFootIcon');
  var x = document.getElementById("myFootLinks");
  var z = document.getElementById('fillFootSpace');
  if (x.style.display === "block") {
    x.style.display = "none";
    y.className = 'fa fa-chevron-circle-down'
    z.style.display = 'block';
  } else {
    x.style.display = "block";
    y.className = 'fa fa-chevron-circle-up'
    z.style.display = 'none';
  }
}

function emailInFunction() {
  var copyText = document.getElementById("emailText").innerHTML;
  
  var elem = document.createElement('textarea');
  elem.value = copyText;
  document.body.appendChild(elem);
  elem.select();
  elem.setSelectionRange(0, 99999);
  document.execCommand('copy');
  document.body.removeChild(elem);

  var tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Email Copied";
}

function emailOutFunc() {
  var tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Copy Email Address";
}