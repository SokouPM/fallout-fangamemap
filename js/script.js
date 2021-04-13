'use strict'

window.onload = init();

function init() {

    ajaxGet("./js/places.json", getPlacesIcons);
    toggleElements();
}

function getPlacesIcons(response) {

    let places = JSON.parse(response);
    let mapIconsLocation = document.getElementById("mapIcons");

    addIconsOnMap(places, mapIconsLocation);
    showNameOnHover(places, mapIconsLocation);
}

function addIconsOnMap(places, mapIconsLocation) {

    places.forEach(e => {
        let icon = document.createElement("img");

        mapIconsLocation.appendChild(icon);

        icon.setAttribute("src", "./sources/icons/" + e.icon);
        icon.setAttribute("alt", "ERR::");
        icon.setAttribute("class", "icon " + e.class);

        icon.style.top = e.locationY + "px";
        icon.style.left = e.locationX + "px";
    });
}

function showNameOnHover(places, mapIconsLocation) {

    const icon = document.getElementsByClassName("icon");
    const locationNameText = document.createElement("span");
    const sound = new Audio('./sources/sfx/hover.mp3');

    for (let i = 0; i < icon.length; i++) {

        icon[i].onmouseover = function () {
            sound.play();

            mapIconsLocation.appendChild(locationNameText);
            locationNameText.innerHTML = places[i].name

            locationNameText.style.position = "absolute";
            locationNameText.style.top = places[i].locationY + 7 + "px";

            if (places[i].locationX >= 540) {
                locationNameText.style.left = 0;
                locationNameText.style.removeProperty("left");
                locationNameText.style.right = places[i].locationX - 430 + "px";
            } else {
                locationNameText.style.right = 0;
                locationNameText.style.removeProperty("right");
                locationNameText.style.left = places[i].locationX + 45 + "px";
            }
            locationNameText.style.backgroundColor = "#111c13";
        }

        icon[i].onmouseout = function () {

            mapIconsLocation.removeChild(locationNameText)
        }
    }

}

// TODO
function toggleElements() {

    // Array legend switch squares :
    let toggleSquares = document.getElementsByClassName("far"); // All squares
    ////////////
    let toggleDistrict = document.getElementById("toggleDistrict");
    ////////////
    let toggleFoot = document.getElementById("toggleFoot");
    let toggleCimetery = document.getElementById("toggleCimetery");
    let toggleTrain = document.getElementById("toggleTrain");
    let toggleParc = document.getElementById("toggleParc");
    let toggleSchool = document.getElementById("toggleSchool");
    let togglePaint = document.getElementById("togglePaint");
    let toggleFort = document.getElementById("toggleFort");
    let toggleChurch = document.getElementById("toggleChurch");
    let toggleShop = document.getElementById("toggleShop");

    // All map elements :
    let mapDistricts = document.getElementById("mapDistricts");
    ////////////
    let mapFoot = document.getElementsByClassName("foot");
    let mapCimetery = document.getElementsByClassName("cimetery");
    let mapTrain = document.getElementsByClassName("train");
    let mapParc = document.getElementsByClassName("parc");
    let mapSchool = document.getElementsByClassName("school");
    let mapPaint = document.getElementsByClassName("paint");
    let mapFort = document.getElementsByClassName("fort");
    let mapChurch = document.getElementsByClassName("church");
    let mapShop = document.getElementsByClassName("shop");

    for (let i = 0; i < toggleSquares.length; i++) {

        // For clicking on square envents
        toggleSquares[i].addEventListener('click', function () {

            toggleSquares[i].classList[1] == "fa-check-square" ? toggleSquares[i].classList.replace("fa-check-square", "fa-square") : toggleSquares[i].classList.replace("fa-square", "fa-check-square");

            // Map items hide / show
            // for (let i = 0; i < mapLandGate.length; i++) {
            // toggleLandGate.classList[1] == "fa-square" ? mapLandGate[i].classList.add("none") : mapLandGate[i].classList.remove("none");
            // }

            // for (let i = 0; i < mapWaterGate.length; i++) {
            // toggleWaterGate.classList[1] == "fa-square" ? mapWaterGate[i].classList.add("none") : mapWaterGate[i].classList.remove("none");
            // }

            // for (let i = 0; i < mapRailGate.length; i++) {
            //     // toggleRailGate.classList[1] == "fa-square" ? mapRailGate[i].classList.add("none") : mapRailGate[i].classList.remove("none");
            // }

            for (let i = 0; i < mapFoot.length; i++) {
                toggleFoot.classList[1] == "fa-square" ? mapFoot[i].classList.add("none") : mapFoot[i].classList.remove("none");
            }

            for (let i = 0; i < mapShop.length; i++) {
                toggleShop.classList[1] == "fa-square" ? mapShop[i].classList.add("none") : mapShop[i].classList.remove("none");
            }

            for (let i = 0; i < mapSchool.length; i++) {
                toggleSchool.classList[1] == "fa-square" ? mapSchool[i].classList.add("none") : mapSchool[i].classList.remove("none");
            }

            for (let i = 0; i < mapFort.length; i++) {
                toggleFort.classList[1] == "fa-square" ? mapFort[i].classList.add("none") : mapFort[i].classList.remove("none");
            }

            for (let i = 0; i < mapParc.length; i++) {
                toggleParc.classList[1] == "fa-square" ? mapParc[i].classList.add("none") : mapParc[i].classList.remove("none");
            }

            for (let i = 0; i < mapTrain.length; i++) {
                toggleTrain.classList[1] == "fa-square" ? mapTrain[i].classList.add("none") : mapTrain[i].classList.remove("none");
            }

            for (let i = 0; i < mapCimetery.length; i++) {
                toggleCimetery.classList[1] == "fa-square" ? mapCimetery[i].classList.add("none") : mapCimetery[i].classList.remove("none");
            }

            for (let i = 0; i < mapChurch.length; i++) {
                toggleChurch.classList[1] == "fa-square" ? mapChurch[i].classList.add("none") : mapChurch[i].classList.remove("none");
            }

            for (let i = 0; i < mapPaint.length; i++) {
                togglePaint.classList[1] == "fa-square" ? mapPaint[i].classList.add("none") : mapPaint[i].classList.remove("none");
            }

            toggleDistrict.classList[1] == "fa-square" ? mapDistricts.classList.add("none") : mapDistricts.classList.remove("none");
        });

    }

}

/********** AJAX function **********/

function ajaxGet(url, callback) {

    var req = new XMLHttpRequest();
    req.open("GET", url);

    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            callback(req.responseText);

        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });

    req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);
    });
    req.send(null);
}