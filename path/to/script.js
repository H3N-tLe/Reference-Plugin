// Because the App uses WebKit all JavaScript features from Safari are available.
// This script is executed at "document end" -> when the DOM is fully loaded

/*
 * Manage JavaScript on the page (doesn't affect this script)
 * 
 * Changes require the page to be reloaded to take effect.
 * 
 * JavaScript is disabled by default.
 * Only enable JavaScript if you need the page to execute its JavaScript.
 */

// Enable JavaScript on the page
allowJS();

// Disable JavaScript on the page
disallowJS();

// Ask the App if JavaScript is enabled (returns a Promise that resolves to a boolean)
isJSAllowed().then((isAllowed) => {
	// Do something with the result
});

/* 
 * Manage remotely loaded contets (does affect this script)
 *
 * Doesn't require the page to be reloaded to take effect.
 * 
 * Remote content is disabled by default.
 * Remote content is everthing that's not included in the HTML of the page. (e.g. images, scripts, etc.)
 * 
 * Because this also affects this script, we need to allow remote content
 * to be able to fetch something (e.g. an image) from a server.
 */

// Allow remote content
allowRemoteContent();

// Disallow remote content
disallowRemoteContent();

// Ask the App if remote content is allowed (returns a Promise that resolves to a boolean)
isRemoteContentAllowed().then((isAllowed) => {
	// Do something with the result
});

/*
 * Tell the App that we failed to download anything
 *
 * This stops the execution of the script and loads an empty page.
 * 
 * Always tell the App call this function when you don't call save()
 * or calling save() fails.
 */

// Takes one argument: a string that describes the reason why the download failed
fail('Currently does nothing');
