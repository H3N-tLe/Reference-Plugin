// Because the App uses WebKit all JavaScript features from Safari are available.
// This script is executed at "document end" -> when the DOM is fully loaded

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
