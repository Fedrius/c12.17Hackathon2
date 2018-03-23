/**
 * Listen for the document to load and initializes the application
 */
$(document).ready(init);
/**
 * Global variable set
 */
    var counter = 0;
    var localTime;
    var hourlyIndex;

/***************************************************************************************************
 * init - adds clicks handlers on search button, keypress for location, clickhandler for main page logo
 * @param none
 * @return undefined
 * @calls on click of search button calls googleGeoLoc(location);
 */
function init(){
    checkSoundOnLoad();
    setLocalTime();
    playTitleMusic();
    $('.muteButton').click(muteSound);
    $('.titleMuteButton').click(muteSound);
    $('.locationInput').attr('autocomplete','off');
    $(".logoContainer").on("click", ()=>{
        $(".titlePageContainer").addClass("hidden");
        $(".mainPageContainer").addClass("visible");
        stopTitleMusic();
        playTakePlunge();
        playSearchMusic();
    });

    $(".searchButton").on("click", ()=>{
        let location = $(".locationInput").val();
        if(location.length <= 2){
            return;
        }
        loading();
        $(".locationInput").val("");
        googleGeoLoc(location);         //for ajax call
        setTimeout(function(){
            if(counter <4){
                $(".errorModal").show();
            }
            counter = 0;
            doneLoading();

        },5000)
    });

    $(".locationInput").keypress(event=>{
        if (event.which === 13){
            event.preventDefault();
            let location = $(".locationInput").val();
            if(location.length <= 2){
                return;
            }
            loading();
            $(".locationInput").val("");
            googleGeoLoc(location);         //for ajax call
            setTimeout(function(){
                if(counter <4){
                    $(".errorModal").show();
                }
                counter = 0;
                doneLoading();
            },5000)
        }
    });

    $(".returnToMain").on("click", ()=>{
        $(".dataPageContainer").removeClass("visible");
        $(".dataPageContainer").addClass("hidden");
        doneLoading();
    })

    $(".newSearchButton").on("click", ()=>{
        $(".dataPageContainer").removeClass("visible");
        $(".dataPageContainer").addClass("hidden");
    })
  
    $(".pictureModal").on("click", closeModal)
}

// to change icon when page is loading;

function loading() {
    $(".searchButton").css("background-image", "url('')");
    $(".searchButton").css("background-image", "url('images/loader.gif')");
}

function doneLoading(){
    $(".searchButton").css("background-image", "url('')");
    $(".searchButton").css("background-image", "url('images/searchicon.png')");
}

// sets local time to the current hour
function setLocalTime() {
    localTime = new Date().getHours();
    console.log(localTime);
    if(localTime >= 0 && localTime < 3){
        hourlyIndex = 0;
        $(".temp1 .tempTime").text("12:00am");
        $(".temp2 .tempTime").text("3:00am");
        $(".temp3 .tempTime").text("6:00am");
        $(".temp4 .tempTime").text("9:00am");
        $(".temp5 .tempTime").text("Noon");
    }
    else if(localTime >= 3 && localTime < 6){
        hourlyIndex = 1;
        $(".temp1 .tempTime").text("3:00am");
        $(".temp2 .tempTime").text("6:00am");
        $(".temp3 .tempTime").text("9:00am");
        $(".temp4 .tempTime").text("Noon");
        $(".temp5 .tempTime").text("3:00pm");
    }
    else if(localTime >= 6 && localTime < 9){
        hourlyIndex = 2;
        $(".temp1 .tempTime").text("6:00am");
        $(".temp2 .tempTime").text("9:00am");
        $(".temp3 .tempTime").text("Noon");
        $(".temp4 .tempTime").text("3:00pm");
        $(".temp5 .tempTime").text("6:00pm");
    }
    else if(localTime >= 9 && localTime < 12){
        $(".temp1 .tempTime").text("9:00am");
        $(".temp2 .tempTime").text("Noon");
        $(".temp3 .tempTime").text("3:00pm");
        $(".temp4 .tempTime").text("6:00pm");
        $(".temp5 .tempTime").text("9:00pm");
        hourlyIndex = 3;
    }
    else if(localTime >= 12 && localTime < 15){
        $(".temp1 .tempTime").text("Noon");
        $(".temp2 .tempTime").text("3:00pm");
        $(".temp3 .tempTime").text("6:00pm");
        $(".temp4 .tempTime").text("9:00pm");
        $(".temp5 .tempTime").text("12:00am");
        hourlyIndex = 4;
    }
    else if(localTime >= 15 && localTime < 18){
        $(".temp1 .tempTime").text("3:00pm");
        $(".temp2 .tempTime").text("6:00pm");
        $(".temp3 .tempTime").text("9:00pm");
        $(".temp4 .tempTime").text("12:00am");
        $(".temp5 .tempTime").text("3:00am");
        hourlyIndex = 5;
    }
    else if(localTime >= 18 && localTime < 21){
        $(".temp1 .tempTime").text("6:00pm");
        $(".temp2 .tempTime").text("9:00pm");
        $(".temp3 .tempTime").text("12:00am");
        $(".temp4 .tempTime").text("3:00am");
        $(".temp5 .tempTime").text("6:00am");
        hourlyIndex = 6;
    }
    else {
        $(".temp1 .tempTime").text("9:00pm");
        $(".temp2 .tempTime").text("12:00am");
        $(".temp3 .tempTime").text("3:00am");
        $(".temp4 .tempTime").text("6:00am");
        $(".temp5 .tempTime").text("9:00am");
        hourlyIndex = 7;
    }
}

/***************************************************************************************************
 * googleGeoLoc - Ajax call with Google Geo Location when user clicks the search button
 * @param name user input value which is a string the from search box
 * @return undefined
 * @calls flickrClickHandler(beachFlickr), weatherApi(beachObject.lat, beachObject.long);
 */
function googleGeoLoc(name){
    $.ajax({
        dataType: 'json',
        url: 'http://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDbDr73Tuj2WLSNXkSc2P8mH2JdF0xjAeo&address=' + name,
        method: 'get',
        success: function(response){

            $(".beachName").text("");         //to remove before reassigning
            $(".beachLocation").text("");

            let beachObject = {};
            beachObject.name = response['results'][0]['address_components'][0]['long_name'];
            beachObject.city = response['results'][0]['address_components'][1]['long_name'];
            beachObject.state = response['results'][0]['address_components'][2]['short_name'];
            beachObject.lat  = (response['results'][0]['geometry']['location']['lat']);
            beachObject.long = (response['results'][0]['geometry']['location']['lng']);

            $(".beachName").text(beachObject.name);
            $(".beachLocation").text(beachObject.city + ", " + beachObject.state);
            var beachFlickr = beachObject.name;
            // console.log(beachObject);

            localTemp(beachObject.lat, beachObject.long);
            weatherApi(beachObject.lat, beachObject.long);
            flickrClickHandler(beachFlickr);


            counter++;
        },
        error: function(response){
            console.log(response);
            console.log('ERRRROR');
        }
    })
}

/***************************************************************************************************
 * localTemp - ajax call retreiving forecast for given city and attaching to DOM
 * @param (number, number) two - Latitude and Longitude coordinates of the beach location
 * @return undefined none
 */
function localTemp(lat, long){
    $.ajax({
        dataType: "json",
        url: `https://api.worldweatheronline.com/premium/v1/weather.ashx?key=8430e70df2d54ab89d3193134181903&format=json&q=${lat}, ${long}&num_of_days=3`,
        method: 'get',
        success: function(result){
            console.log(result);
            $(`.temp .tempTemp`).text("");
            var tempArray = [];
            // for(var tempIndex = 2; tempIndex < 7; tempIndex++){
            //     var tempHour = result.data.weather[0].hourly[tempIndex];
            //     var tempAtHour = tempHour.tempF;
            //     $(`.temp${tempIndex-1} .tempTemp`).html(tempAtHour+ "&#x2109");
            // }
            for(var dayIndex = 0; dayIndex <= 1; dayIndex++) {
                for (var tempIndex = 0; tempIndex <= 7; tempIndex++) {
                    var tempHour = result.data.weather[dayIndex].hourly[tempIndex];
                    tempArray.push(tempHour);
                }
            }
            console.log(tempArray);
            for(var temperatureIndex = hourlyIndex, weatherIndex = 1;  temperatureIndex < hourlyIndex +5; temperatureIndex++, weatherIndex++) {
                    $(`.temp${weatherIndex} .tempTemp`).html(tempArray[temperatureIndex].tempF + "&#x2109");
                }

            counter++;
        },
        error: function(result){
            console.log("error");
        }
    })
}

/***************************************************************************************************
 * weatherApi - ajax call that appends all of the relevant surf and weather conditions onto the DOM
 * @param (number, number) two - Latitude and Longitude coordinates of the beach location
 * @return undefined none
 */
function weatherApi(lat, long){
    $.ajax({
        dataType: "json",
        url: `https://api.worldweatheronline.com/premium/v1/marine.ashx?key=8430e70df2d54ab89d3193134181903&num_of_days=3&tp=3&format=json&q=${lat}, ${long}&tide=yes`,
        method: "get",
        success: function(result){
            console.log(result);

            //putting dom elements here that need to be cleared later
            $(".sunriseTime").text("");
            $(".sunsetTime").text("");
            $(".tideData").text("");
            // $(`.temp .tempPicImage`).attr('src', "");
            // $(`.temp .tempTemp`).text("");

            console.log(result);
            //find all weather data
            var weatherArray = result.data.weather[0];
            var sunrise = weatherArray.astronomy[0].sunrise;
            $(".sunriseTime").text(sunrise);
            var sunset = weatherArray.astronomy[0].sunset;
            $(".sunsetTime").text(sunset);
            var tideArray = result.data.weather[0].tides[0].tide_data[1];
            var tideHeight = tideArray.tideHeight_mt;
            var tideType = tideArray.tide_type;
            $(".tideData").text(tideHeight + " meters, " + tideType);
            var timeOfDayStats = [];            //array to hold objects

            for (var hourlyIndex = 2; hourlyIndex < 7; hourlyIndex++){
                var statsObj = {};
                var hourObj = result.data.weather[0].hourly[hourlyIndex];
                var imageDirect = result.data.weather[0].hourly[hourlyIndex].weatherIconUrl[0].value;
                $(`.temp${hourlyIndex-1} .tempPicImage`).attr("src", imageDirect);
                statsObj.windSpeed = hourObj.windspeedMiles;
                statsObj.windDir = hourObj.winddir16Point;
                statsObj.swellHeight = hourObj.swellHeight_ft;
                statsObj.swellDir = hourObj.swellDir16Point;
                statsObj.waterTemp = hourObj.tempF;
                timeOfDayStats.push(statsObj);
            }
            $(".dataTitle").text('');  //clear text
            $(".swellData").text(timeOfDayStats[0].swellHeight + "ft, " + timeOfDayStats[0].swellDir);
            $(".waterTempData").html(timeOfDayStats[0].waterTemp+"&#x2109");
            $(".windData").text(timeOfDayStats[0].windSpeed+"mph, "+ timeOfDayStats[0].windDir);

            $(".tempBox").on("click", function(){
                var weatherAtTime = timeOfDayStats[this.id];
                $(".dataTitle").text('');  //clear text
                $(".swellData").text(weatherAtTime.swellHeight + "ft, " + weatherAtTime.swellDir);
                $(".waterTempData").html(weatherAtTime.waterTemp+"&#x2109");
                $(".windData").text(weatherAtTime.windSpeed+"mph, "+ weatherAtTime.windDir);
            });
        // console.log(timeOfDayStats);
            counter++;


        },
        error: function(result){
            console.log("ajax call failed");
        }
    })
}

/***************************************************************************************************
 * makePhotoDivs - dynamically creates and appends divs onto the pictureInforDataContainer div
 * @param {array} one
 * @return undefined
 * @calls undefined
 */
 function makePhotoDivs(array) {
    $('.pictureInfoDataContainer div').remove();
    for (let photoDivIndex = 0; photoDivIndex < array.length; photoDivIndex++) {
        var definePhotoDiv = $('<div>').addClass('photoDiv');
        var beachPhoto = array[photoDivIndex];
        var makePhotoDiv = definePhotoDiv.css('background-image', 'url(' + beachPhoto + ')').attr('onclick','showModal()');
        $('.pictureInfoDataContainer').append(makePhotoDiv);
    }
    setTimeout(function(){
        $(".dataPageContainer").removeClass("hidden");
        $(".dataPageContainer").addClass("visible");

    },300);
}
/***************************************************************************************************
 * flickrClickHandler - ajax call to flickr API which creates a data object which holds encrypted URL information
 * @param {string} the string of the beach name to be inputted into the flickr ajax search call
 * @return undefined
 * @calls makePhotoURL
 */
 function flickrClickHandler(beachName) {
    var beachPhotoArrayData = [];
    var flickrSearch = beachName;
    var photoObj;
    var dataFromServer;
    var ajaxConfig = {
        method: "GET",
        url: `https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=629e34714d717373e24940da3b0ad6cb&format=json&nojsoncallback=1&text=${flickrSearch} sunset&per_page=10`,
        success: function(data) {
            dataFromServer = data;
            for(let dataIndex = 0; dataIndex < 4; dataIndex++) {
                let farm = dataFromServer.photos.photo[dataIndex].farm;
                let id = dataFromServer.photos.photo[dataIndex].id;
                let server = dataFromServer.photos.photo[dataIndex].server;
                let secret = dataFromServer.photos.photo[dataIndex].secret;
                let url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
                beachPhotoArrayData.push(url);
            }
            makePhotoDivs(beachPhotoArrayData);
            counter++;

        },
        error: function() {
            console.log(false);
        }
    };
    $.ajax(ajaxConfig);
}
/***************************************************************************************************
 * showModal - a click handler that targets the current picture div and opens up a modal which enlarges the image clicked.
 * @param undefined none
 * @return undefined none
 */
function showModal(){
    var backgroundImage = $(event.currentTarget).css('background-image');
    $('.pictureContent').css('background-image', backgroundImage);
    $('.pictureModal').show();
}
/***************************************************************************************************
 * closeModal - a click handler which closes the modal on click.
 * @param undefined none
 * @return undefined none
 */
 function closeModal(){
    $('.pictureModal').hide();
    $('.errorModal').hide();
}

function resetPage(){
    $('.pictureInfoDataContainer div').remove();


}

// Audio Javascript
/***************************************************************************************************
 * searchBackgroundSound - global variable that creates a new audio sound for the search page
 * @param undefined none
 * @return undefined none
 */
var searchBackgroundSound = new Audio("sounds/searchPageWaves.wav");
searchBackgroundSound.volume = .3;
/***************************************************************************************************
 * birdChirp - global variable that creates a new audio sound for hovering over the search button
 * @param undefined none
 * @return undefined none
 */
var birdChirp= new Audio("sounds/birdchirp.wav");
birdChirp.volume = .5;

/***************************************************************************************************
 * titleMusicSound - global variable that creates audio sound for title page
 * @param undefined none
 * @return undefined none
 */
var titleMusicSound = new Audio("sounds/spongebob.mp3");
titleMusicSound.volume = .5;

/***************************************************************************************************
 * takePlungeSound - global variable that creates a new audio sound for clicking on search button
 * @param undefined none
 * @return undefined none
 */
var takePlungeSound = new Audio("sounds/takePlunge.wav");
takePlungeSound.volumne = .8;
/***************************************************************************************************
 * seagull - global variable that creates a seagull sound for mouseentering input field
 * @param undefined none
 * @return undefined none
 */
var seagull = new Audio("sounds/seagull.wav");
seagull.volume = .5;

/***************************************************************************************************
 * playSearchMusic - function that plays the search page music
 * @param undefined none
 * @return undefined
 */
function playSearchMusic(){
    searchBackgroundSound.pause();
    searchBackgroundSound.currentTime = 0;
    searchBackgroundSound.play();
    searchBackgroundSound.loop = true;
}
/***************************************************************************************************
 * stopSearchMusic - click handler that stops the search page music
 * @param undefined none
 * @return undefined
 */
function stopSearchMusic(){
    searchBackgroundSound.pause();
    searchBackgroundSound.currentTime = 0;
    searchBackgroundSound.loop = true;
}
/***************************************************************************************************
 * playBirdChirp - click handler that plays the bird chirp on hovering over the search button
 * @param undefined none
 * @return undefined
 */
function playBirdChirp(){
    birdChirp.pause();
    birdChirp.currentTime = 0;
    birdChirp.play();
}
/***************************************************************************************************
 * playSeagull - click handler that plays seagull sounds on hovering over the input field
 * @param undefined none
 * @return undefined
 */
function playSeagull(){
    seagull.pause();
    seagull.currentTime = 0;
    seagull.play();
}
/***************************************************************************************************
 * playTitleMusic - click handler that plays the title page music when it loads.
 * @param undefined none
 * @return undefined
 */
function playTitleMusic(){
    titleMusicSound.pause();
    titleMusicSound.currentTime = 0;
    titleMusicSound.play();
    titleMusicSound.loop = true;
}
/***************************************************************************************************
 * stopTitleMusic - click handler that stops the title page music
 * @param undefined none
 * @return undefined
 */
function stopTitleMusic(){
    titleMusicSound.pause();
    titleMusicSound.currentTime = 0;
    titleMusicSound.loop = true;
}
/***************************************************************************************************
 * playTakePlunge - click handler that plays the take plunge sound on search button click.
 * @param undefined none
 * @return undefined
 */
function playTakePlunge(){
    takePlungeSound.pause();
    takePlungeSound.currentTime = 0;
    takePlungeSound.play();
}
/***************************************************************************************************
 * muteSound - click handler that stops all sounds and changes display of mute button depending on if its muted or not
 * @param undefined none
 * @return undefined
 */

function checkSoundOnLoad(){
    if(localStorage.sound === "off"){
        searchBackgroundSound.volume = 0;
        birdChirp.volume = 0;
        titleMusicSound.volume = 0;
        seagull.volume = 0;
        takePlungeSound.volume = 0;
        $(".muteButton, .titleMuteButton").text("Sound");
    }

}

function muteSound(){
    if(titleMusicSound.volume === 0){
        localStorage.setItem("sound", "on");
        searchBackgroundSound.volume = .3;
        birdChirp.volume = .5;
        titleMusicSound.volume = .5;
        seagull.volume = .5;
        takePlungeSound.volume = .8;
        $(".muteButton, .titleMuteButton").text("Mute");

    }
    else{
        localStorage.setItem("sound", "off");
        searchBackgroundSound.volume = 0;
        birdChirp.volume = 0;
        titleMusicSound.volume = 0;
        seagull.volume = 0;
        takePlungeSound.volume = 0;
        $(".muteButton, .titleMuteButton").text("Sound");



    }
}

