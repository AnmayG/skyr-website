// get button elements
var button_red = document.getElementById( 'button-red' );
var button_green = document.getElementById( 'button-green' );
var button_blue = document.getElementById( 'button-blue' );

// initial button states
var button_red_state = false;
var button_green_state = false;
var button_blue_state = false;

// check for active connection
var isConnectionActive = false;

// connect to the Web Socket server
var connection = io( 'http://10.0.0.237:9000' );

// when connection is established 
connection.on( 'connect', () => {
  isConnectionActive = true;
} );

connection.on( 'disconnect', () => {
  isConnectionActive = false;
} );

// WebSocket event emitter function
var emitEvent = function( event ) {
  if( ! isConnectionActive ) {
    return alert( 'Server connection is closed!' );
  }

  // change button state
  if( event.target.id === 'button-red') { button_red_state = ! button_red_state; }
  if( event.target.id === 'button-green') { button_green_state = ! button_green_state; }
  if( event.target.id === 'button-blue') { button_blue_state = ! button_blue_state; }

  // emit `led-toggle` socket event
  connection.emit( 'led-toggle', {
    r: button_red_state,
    g: button_green_state,
    b: button_blue_state,
  } );
};

// add event listeners on button
button_red.addEventListener( 'click', emitEvent );
button_blue.addEventListener( 'click', emitEvent );
button_green.addEventListener( 'click', emitEvent );
