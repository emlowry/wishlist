function initialize()
{
	var d = new Date();
	var year = new Date().getFullYear();
	var isBDayList = (d <= new Date("May 21, " + year) || d > new Date("December 25, " + year));
	
	var headElement = document.getElementsByTagName("HEAD")[0];
	var stylenode = document.createElement("link");
	stylenode.rel = "stylesheet";
	stylenode.type = "text/css";
	stylenode.href = (isBDayList ? "bday" : "xmas") + "_style.css";
	headElement.insertBefore(stylenode, headElement.firstChild);
	var iconnode = document.createElement("link");
	iconnode.rel = "shortcut icon";
	iconnode.type = "image/x-icon";
	iconnode.href = "images/" + (isBDayList ? "bday" : "xmas") + "_icon.ico";
	headElement.insertBefore(iconnode, headElement.firstChild);
	
	var titleText = "Elizabeth's " + year + " " + (isBDayList ? "Birthday" : "Christmas") + " Wishlist";
	var titles = document.getElementsByClassName("wishlist-title");
	for (var t = 0; t < titles.length; ++t) {
		titles[t].innerHTML = titleText;
	}
	
	var loaders = document.getElementsByClassName("loader");
	for (var t = 0; t < loaders.length; ++t) {
		loaders[t].style.display = "none";
	}
	
	var pages = document.getElementsByClassName("page");
	for (var t = 0; t < pages.length; ++t) {
		pages[t].removeAttribute("style");
	}
}
