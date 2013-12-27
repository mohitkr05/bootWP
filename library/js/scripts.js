/*
Bones Scripts File
Author: Eddie Machado

This file should contain any js scripts you want to add to the site.
Instead of calling it in the header or throwing it inside wp_head()
this file will be called automatically in the footer so as not to
slow the page load.

*/

// IE8 ployfill for GetComputed Style (for Responsive Script below)
if (!window.getComputedStyle) {
    window.getComputedStyle = function(el, pseudo) {
        this.el = el;
        this.getPropertyValue = function(prop) {
            var re = /(\-([a-z]){1})/g;
            if (prop == 'float') prop = 'styleFloat';
            if (re.test(prop)) {
                prop = prop.replace(re, function () {
                    return arguments[2].toUpperCase();
                });
            }
            return el.currentStyle[prop] ? el.currentStyle[prop] : null;
        }
        return this;
    }
}

// as the page loads, call these scripts
jQuery(document).ready(function($) {

    /*
    Responsive jQuery is a tricky thing.
    There's a bunch of different ways to handle
    it, so be sure to research and find the one
    that works for you best.
    */
    
	/*
	 * Get Viewport Dimensions
	 * returns object with viewport dimensions to match css in width and height properties
	 * ( source: http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript )
	 */
	function updateViewportDimensions() {
		var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;
		return {width:x,height:y}
	}
	var viewport = updateViewportDimensions();

	/*
	* Throttle Resize-triggered Events
	* Wrap your actions in this function to throttle the frequency of firing them off, for better performance, esp. on mobile.
	* ( source: http://stackoverflow.com/questions/2854407/javascript-jquery-window-resize-how-to-fire-after-the-resize-is-completed )
	*/
	var waitForFinalEvent = (function () {
		var timers = {};
		return function (callback, ms, uniqueId) {
			if (!uniqueId) { uniqueId = "Don't call this twice without a uniqueId"; }
			if (timers[uniqueId]) { clearTimeout (timers[uniqueId]); }
			timers[uniqueId] = setTimeout(callback, ms);
		};
	})();
	// how long to wait before deciding the resize has stopped, in ms. Around 50-100 should work ok.
	var timeToWaitForLast = 100;

	/*
	 * Setup Resize-triggered Actions
	 * These will be more resource intensive than one-off checks made at load-time
	 */
	/* Example, uncomment and edit as needed.

	// Are we on a page where we need to do something? Create one-time flags for efficient checks.
	// Another good thing to check for might be body.no-touch, to avoid running UI interactivity on touch devices.
	if( typeof is_home === "undefined" ) var is_home = $('body').hasClass('home');

	$(window).resize(function () {

		// Test on flags and do something if needed
		if( is_home ) { waitForFinalEvent( function() {
	  		callMyResizeDependentFunction();
		}, timeToWaitForLast, "your-function-identifier-string"); }
	});

	// Example function
	function callMyResizeDependentFunction() {
		viewport = updateViewportDimensions();
	  	if( viewport.width >= 768 ) {
			console.log('On home page and window sized to 768 width or more.');
	  	} else {
			console.log('Not on home page, or window sized to less than 768.');
	  	}
	}
  	callMyResizeDependentFunction(); // initial page load call
	*/

	/*
	* Resize-unaware responsive scripts
	*/

	/* if is below 481px */
	if (viewport.width < 481) {
	} /* end smallest screen */

	/* if is larger than 481px */
	if (viewport.width > 481) {
	} /* end larger than 481px */

	/* if is above or equal to 768px */
	if (viewport.width >= 768) {

        /* load gravatars */
        $('.comment img[data-gravatar]').each(function(){
            $(this).attr('src',$(this).attr('data-gravatar'));
        });
	}

	/* off the bat large screen actions */
	if (viewport.width > 1030) {
	}

	// add your scripts below this line


}); /* end of as page load scripts */


/*! A fix for the iOS orientationchange zoom bug.
 Script by @scottjehl, rebound by @wilto.
 MIT License.
*/
(function(w){
	// This fix addresses an iOS bug, so return early if the UA claims it's something else.
	if( !( /iPhone|iPad|iPod/.test( navigator.platform ) && navigator.userAgent.indexOf( "AppleWebKit" ) > -1 ) ){ return; }
    var doc = w.document;
    if( !doc.querySelector ){ return; }
    var meta = doc.querySelector( "meta[name=viewport]" ),
        initialContent = meta && meta.getAttribute( "content" ),
        disabledZoom = initialContent + ",maximum-scale=1",
        enabledZoom = initialContent + ",maximum-scale=10",
        enabled = true,
		x, y, z, aig;
    if( !meta ){ return; }
    function restoreZoom(){
        meta.setAttribute( "content", enabledZoom );
        enabled = true; }
    function disableZoom(){
        meta.setAttribute( "content", disabledZoom );
        enabled = false; }
    function checkTilt( e ){
		aig = e.accelerationIncludingGravity;
		x = Math.abs( aig.x );
		y = Math.abs( aig.y );
		z = Math.abs( aig.z );
		// If portrait orientation and in one of the danger zones
        if( !w.orientation && ( x > 7 || ( ( z > 6 && y < 8 || z < 8 && y > 6 ) && x > 5 ) ) ){
			if( enabled ){ disableZoom(); } }
		else if( !enabled ){ restoreZoom(); } }
	w.addEventListener( "orientationchange", restoreZoom, false );
	w.addEventListener( "devicemotion", checkTilt, false );
})( this );
