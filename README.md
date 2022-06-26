# Reference plugin for H3N-tLe to help developers

## This should not be used as a plugin and only contains a basic documentation for plugins

This plugin is not meant to be used as a plugin and will not do anything useful.

With that said, I hope it helps you to understand how to create a plugin.

## How to create a plugin

A plugin is just a folder with a `manifest.json` file at its root.
This file contains the following information:

- `manifest_version`: A string containing version of the manifest. This is used to determine if the plugin is compatible with the current version of the app. (Required)
- `website`: A link to the plugin's website or repo. (Optional)
- The scripts that the plugin provides.

The `manifest_version` is pretty straightforward. It's just a string that contains the manifest version the plugin uses.
If the manifest version is not compatible with the current version of the app, the plugin will not be loaded.

The `website` is also pretty obvious. It's just a string containing a link to the plugin's website or repo and is not required.

To register a script, you need to specify the host that the script can be used for as the key and the relative path to the script as the value. This path may not contain ".." in it to prevent loading scripts from outside the plugin folder.

You technically don't need to register a script for the plugin to be valid. However, if you do not register a script, the plugin will just be an entry in a list of plugins and won't do anything.

If any of this doesn't make sense to you, check the `manifest.json` file for examples and if that doesn't help create a new issue on the repo asking for help with what you didn't understand, so that it can be added to this README.

## Scripts

When the user tells the app to dowload a chapter with a certain plugin, the app will load the webpage and inject the plugin's script into the webpage.

Scripts are written in JavaScript and will be injected into the page in their own content world, after the DOM is loaded.

This means that they can access the DOM but not the page's JavaScript.

Per default JavaScript is disabled on the page (doesn't affect plugins) and all requests are blocked.

This is done to decrease the load time of the page, but it also means, that some parts of the page may be missing because they are added with JavaScript and that trying to fetch() something will fail, even if the plugin tries to fetch() it.

Obviously this is is a problem if you need the script elements of the page to be present or if you need to download images because they are not included in the HTML as data URIs.

To get around this and to make the script able to tell the app to save a chapter, the app injects functions into the content world of the plugin, that can be used to communicate with the app.

This is a list of all functions injected by the app:

- `allowJS(): void`: Tells the app to allow JavaScript to be loaded. (page reload required)
- `disallowJS(): void`: Tells the app to prevent JavaScript from being loaded. (page reload required)
- `isJSAllowed(): Promise<Boolean>`: Returns a promise that resolves to a boolean indicating if JavaScript is allowed to be loaded.
- `allowRemoteContent(): void`: Tells the app to stop blocking requests.
- `disallowRemoteContent(): void`: Tells the app to block requests.
- `isRemoteContentAllowed(): Promise<Boolean>`: Returns a promise that resolves to a boolean indicating if requests will be blocked.
- `showView(): void`: Shows the page to the user.
- `hideView(): void`: Hides the page from the user.
- `isViewVisible(): Promise<Boolean>`: Returns a promise that resolves to a boolean indicating if the page is visible.
- `doesSeriesExist(seriesTitle: string): Promise<Boolean>`: Returns a promise that resolves to a boolean indicating if the series exists.
- `save(chapterInfo: object): void`: Saves the chapter and stops the script.
- `fail(error?: string): void`: Stops the script and throws an error.

A script should always call either `save()` or `fail()` at the end of its execution to stop the script.

The object `chapterInfo` contains the following information:

```JSON5
{
	"chapterName": "Chapter 1", // Name of the chapter (try to a use formtat like "Chapter <chapter number>")
	"images": [
		{"ext", "b64"}, // Object containing the image data and the extension of the image.
		...
	],
	"nextUrl": "https://example.com/chapter-2.html", // URL to the next chapter - Optional
	"series": {
		"title": "Example Series", // Name of the series the chapter belongs to
		"description": "This is a description of the series.", // Optional
		"status": "ongoing", // "ongoing", "finished", "hiatus", "dropped", "unknown" - Optional
		"cover": {"ext", "b64"} // Object containing the cover of the series - Optional
	}
}
```

As you can see, images are stored in objects with the `ext` property containing the extension of the image and the `b64` property containing the base64 encoded image data. The extension should not contain the dot and base64 data should not contain the `data:image/<ext>;base64,` prefix.

An example of an object that stores an image is:

```JSON5
{
	"ext": "png",
	"b64": "iVBORw0KGgoAAAAN...CYII=" // Base64 encoded image data
}
```

As mentioned before: If you don't understand something, look at the example files in this repo and if that doesn't help create a new issue on the repo asking for help with what you didn't understand so that it can be added to this README.
