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
 * Manage the visibility of the view that contains the page
 *
 * Doesn't require the page to be reloaded to take effect.
 * 
 * The view isn't visible by default.
 * This does affect document.visibilityState.
 * 
 * Usefull for debugging or letting the user solve a captcha.
 * The user can hide the view at any time but not show it again.
 */

// Show the view
showView();

// Hide the view
hideView();

// Ask the App if the view is visible (returns a Promise that resolves to a boolean)
isViewVisible().then((isVisible) => {
	// Do something with the result
});

/*
 * Check if a series is already present in the library
 *
 * Takes a string as argument (the series title) and
 * returns a Promise that resolves to a boolean.
 * 
 * Might be useful to check if we should bother gathering info like the description.
 */

// Check if a series with the name "Example Series" exists in the library
doesSeriesExist("Example Series").then((exists) => {
	// Do something with the result
});

/*
 * Tell the App to save a chapter
 *
 * This will save the chapter to the App's library and stop the execution of this script.
 * 
 * The function takes one argument (object) that contains the chapter data.
 * 
 * Example object to save:
 * {
 *     "chapterName": "Chapter 1", // Name of the chapter (try to a formtat like "Chapter <chapter number>")
 *     "images": [
 *         {
 *             "ext": "png", // The file extension of the image
 *             "b64": "..." // base64 encoded image
 *         },
 *         // More of these objects
 *     ],
 *     "nextUrl": "https://example.com/chapter-2.html", // Optional
 *     "series": {
 *         "title": "Example Series", // Name of the series the chapter belongs to
 *         "description": "This is a description of the series.", // Optional
 *         "status": "ongoing", // "ongoing", "finished", "hiatus", "dropped", "unknown" // Optional
 *         "cover": {
 *             "ext": "png", // The file extension of the image
 *             "b64": "..." // base64 encoded image
 *         } // Optional
 *     }
 * }
 * 
 * The function may throw an error if the supplied object doesn't
 * contain the required data.
 * This means try/catch is an option, though it isn't recommended
 * because the JavaScript side checks are very basic and the App
 * has more in depth checks that don't throw an error in JavaScript
 * and just silently fail to save the chapter.
 * 
 * The objects that contain images require that both the "ext" and "b64"
 * properties are set.
 * The "ext" property is the file extension of the image.
 * The "b64" property is the base64 encoded image. This has to be without
 * the "data:image/<ext>;base64," prefix and just the base64 encoded image.
 */

// Tell the App to save a chapter with the minimum data required
save({
	chapterName: "Chapter 1",
	images: [],
	series: { title: "Example Series" }
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
