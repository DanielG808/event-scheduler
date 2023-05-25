// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// DEPENDENCIES

var saveButton = $('.btn');

// first creates an object to get locally stored key/value pairs, then populates they object after they've been stored
var savedEvents = JSON.parse(localStorage.getItem("schedule-event")) || {};
// DATA 

//FUCNTIONS

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  var currentHour = dayjs().hour()
  console.log("The current hour is " + currentHour)
  
  function getDate () {
    console.log("we are getting the date!");
    var currentDate = dayjs().format('dddd MMMM D, YYYY');
    console.log(currentDate);
    var dateClock = $('#currentDay');
    dateClock.text(currentDate);
  }

  function populateSavedEvents(){
    console.log("function is running")
    // get a list of the keys from the savedEvents obj
    var savedEventKeys = Object.keys(savedEvents);
    console.log("The event keys are " + savedEventKeys)
    var savedEventValues = Object.values(savedEvents)
    console.log("The event values are " + savedEventValues)
    console.log(typeof savedEventKeys)  
    for (const property in savedEvents) {
      console.log(`${property}: ${savedEvents[property]}`);
      $("#" + property).children("textarea").val(savedEvents[property]);
    }
      // at each iteraction, you'll have the key which is the id of an element
      // now that you have the id use that to target the html element and get the child class description
      // now that you have the class description change its value with the value of the key
    
  }
  // USER INTERACTIONS
  
  saveButton.on('click', function() {
    console.log("Save button clicked!");
    // grab the sibiling of the button - textarea
    var textArea = $(this).siblings("textarea");
    // grab the user input of the text area
    var textAreaVal =$(textArea[0]).val();
    // grab the id containing the hour from each save button parent div 
    var hourAttr = $(this).parent().attr('id');
    // saved events is an object, hourAttr is a key stored in the object and is paired with the value textAreaVal
    savedEvents[hourAttr] = textAreaVal;
    // stores savedEvents object locally
    localStorage.setItem("schedule-event", JSON.stringify(savedEvents));
  })
  
  // INITIALIZATION

  getDate();
  populateSavedEvents();

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});


