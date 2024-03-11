//import yaml from 'yaml-js';

function loadYAMLFile() {
	// Az extension mappájában található js-yaml.min.js betöltése
	/*var script = document.createElement('script');
	script.src = chrome.extension.getURL('js-yaml.min.js');
	document.head.appendChild(script);*/

	// Az js-yaml betöltésének várakoztatása

	// Az extension mappájában lévő YAML fájl betöltése
/*	fetch(chrome.runtime.getURL('settings.yaml'))
		.then(response => response.text())
		.then(text => {
			// A fájl tartalmának feldolgozása
			console.log(text);
			yaml.load(text);
		}).catch(error => console.error('Error loading YAML file:', error));
*/
}



// Futtatjuk a függvényt
loadYAMLFile();






setInterval(clear, 1000);

/*let txt = ["NEM FOGADOM EL", "Nem fogadom el.", "köszönöm, nem", "nem engedélyezem",
	 "Nem kérem",
	"DISAGREE",  "reject all cookies", "close ad",
	"only necessary cookies", "skip ad"];*/

let txt = ["Necessary cookies only", "Only necessary cookies", "Reject All", "Reject", "Az összes elutasítása",
	"Nem kérem", "Kizárólag az elengedhetetlen sütiket használja", "NEM FOGADOM EL", "Elutasítom"];

function clear() {
	hideAds('div', 'class', 'placeholder-ad');
	hideAds('iframe', 'id', 'google_ads_iframe_');
	hideAds('div', 'id', 'adocean');
	hideAds('div', 'id', 'index_shopline');
	hideAds('div', 'class', 'goAdverticum');
	hideAds('div', 'class', 'promotion');
	hideAds('div', 'class', 'banner');
	hideAds('div', 'id', 'banner');
	hideAds('div', 'class', 'adsbygoogle');
	hideAds('img', 'src', 'adocean');
	hideAds('img', 'src', 'googlesyndication');
	hideAds('img', 'src', 'adclick.g.doubleclick.net');

	for (const t of txt) {
		clickIfExists(t);
	}
	clickGdpr();
}


function clickGdpr() {
	if (clickIfExists("TOVÁBBI LEHETŐSÉGEK"))
		sleep(1000);
	if (clickIfExists("ÖSSZES ELUTASÍTÁSA"))
		sleep(1000);
	clickIfExists("MENTÉS ÉS KILÉPÉS");
}

function hideAds(element, attribute, searchString) {
	var selector = `${element}[${attribute}*="${searchString}"]`
	var elements = document.querySelectorAll(selector);
	for (var i = 0; i < elements.length; i++) {
		var elem = elements[i];
		elem.style.setProperty('opacity', '0', 'important');
		elem.style.setProperty('height', '11px', 'important');
		elem.style.setProperty('z-index', '-1000', 'important');
		elem.style.setProperty('display', 'none', 'important');
	}
}



function clickIfExists(content) {
	var b = getButtonByContent(content);
	if (b) {
		b.click();
		return true;
	}
	return false;
}

function sleep(milliseconds) {
	const date = Date.now();
	let currentDate = null;
	do {
		currentDate = Date.now();
	} while (currentDate - date < milliseconds);
}

function getButtonByContent(content) {
	var buttons = document.getElementsByTagName('button');
	for (let i = 0; i < buttons.length; i++) {

		let b = buttons[i];
		if (b.innerHTML.toUpperCase().includes(content.toUpperCase())) {
			return b;
		}
	}
	return null;
}