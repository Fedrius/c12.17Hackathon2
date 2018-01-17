function weatherApi(){
    $.ajax({
        dataType: "json",
        url: "https://api.worldweatheronline.com/premium/v1/marine.ashx?key=ee5b80f43e9149f79be22719181601&num_of_days=1&tp=3&format=json&q=44.068203, -114.742043&tide=yes",
        method: "get",
        success: function(result){
            console.log("success");
            var weatherArray = result.data.weather[0];
            var tideArray = result.data.weather[0].tides[0];
            var sunrise = weatherArray.astronomy[0].sunrise;
            var sunset = weatherArray.astronomy[0].sunset;
            var maxTemp = weatherArray.maxtempF;
            var minTemp = weatherArray.mintempF;
            
            for (var hourlyIndex = 2; hourlyIndex < 7; hourlyIndex++){
                var hourObj = result.data.weather[0].hourly[hourlyIndex];
                var imageDirect = result.data.weather[0].hourly[hourlyIndex].weatherIconUrl[0].value;
                var tempAtHour = hourObj.tempF;
                var windSpeed = hourObj.windspeedMiles;
                var windDir = hourObj.winddir16Point;
                var swellHeight = hourObj.swellHeight_ft;
                var swellDir = hourObj.swellDir16Point;
                var waterTemp = hourObj.waterTemp_F;
                console.log(hourObj);
            }

            for (var tideIndex = 0; tideIndex < 3; tideIndex++){
                var tideArray = result.data.weather[0].tides[0].tide_data[tideIndex];
                var tideTime = tideArray.tideTime;
                var tideHeight = tideArray.tideHeight_mt;
                var tideType = tideArray.tide_type;
            }
            // console.log(tideArray);
        },
        error: function(result){
            console.log("ajax call failed");
        }
    })
}





































































































var beachPhotoArray = [];
var beachPhotoArrayData = [];
var dataFromServer;

var makePhotoURL = function(array){
    for(let photoIndex = 0; photoIndex<array.length; photoIndex++) {
        let farm = array[photoIndex].farm;
        let id = array[photoIndex].id;
        let server = array[photoIndex].server;
        let secret = array[photoIndex].secret;
        let url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
        beachPhotoArray.push(url);
        // https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
    }
    makePhotoDivs();
}

var makePhotoDivs = function() {

    for (let photoDivIndex = 0; photoDivIndex < beachPhotoArray.length; photoDivIndex++) {
        var definePhotoDiv = $('<div>').addClass('photoDiv');
        var beachPhoto = beachPhotoArray[photoDivIndex];
        var makePhotoDiv = definePhotoDiv.css('background-image', 'url(' + beachPhoto + ')').attr('onclick','showModal()');
        $('.pictureInfoContainer').append(makePhotoDiv);
    }
}
//Huntington Beach flickr ClickHandler
var hbClickHandler = function(beachName) {
    beachPhotoArrayData = [];
    beachPhotoArray = [];
    var photoObj;
    var ajaxConfig = {
        method: "GET",
        text: 'huntington beach surf', // beachName + surf input field needs to change text using jQuery beachObject.name
        url: 'https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=629e34714d717373e24940da3b0ad6cb&format=json&nojsoncallback=1&text=huntington beach waves&per_page=10',
        success: function(data) {
            dataFromServer = data;
            for(let dataIndex = 0; dataIndex < 5; dataIndex++) {
                var dataObj = {
                    id: dataFromServer.photos.photo[dataIndex].id,
                    server: dataFromServer.photos.photo[dataIndex].server,
                    farm: dataFromServer.photos.photo[dataIndex].farm,
                    secret: dataFromServer.photos.photo[dataIndex].secret,
                };
                beachPhotoArrayData.push(dataObj);
            }
            makePhotoURL(beachPhotoArrayData);
        },
        error: function() {
            console.log(false);
        }
    }
    $.ajax(ajaxConfig);
}
// Newport Beach Click Handler
var nbClickHandler = function() {
    beachPhotoArrayData = [];
    beachPhotoArray = [];
    var dataFromServer;
    var ajaxConfig = {
        method: "GET",
        text: 'newport beach', // input field needs to change text using jQuery
        url: 'https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=629e34714d717373e24940da3b0ad6cb&format=json&nojsoncallback=1&text=newport beach&per_page=10',
        success: function (data) {
            dataFromServer = data;
            for (let dataIndex = 0; dataIndex < 5; dataIndex++) {
                var dataObj = {
                    id: dataFromServer.photos.photo[dataIndex].id,
                    server: dataFromServer.photos.photo[dataIndex].server,
                    farm: dataFromServer.photos.photo[dataIndex].farm,
                    secret: dataFromServer.photos.photo[dataIndex].secret,
                };
                beachPhotoArrayData.push(dataObj);
            }
            makePhotoURL(beachPhotoArrayData);
        },
            error: function(error){
                console.log(error);
        }
    }
    $.ajax(ajaxConfig);
}
// Sunset Beach Click Handler
var sunsetBeachClickHandler = function() {
    beachPhotoArrayData = [];
    beachPhotoArray = [];
    var dataFromServer;
    var ajaxConfig = {
        method: "GET",
        dataType: 'json',
        text: 'sunset beach', // input field needs to change text using jQuery later on will make make a dynamic variable
        url: 'https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=629e34714d717373e24940da3b0ad6cb&format=json&nojsoncallback=1&text=sunset beach surf&per_page=10',
        success: function (data) {
            dataFromServer = data;
            for (let dataIndex = 0; dataIndex < 5; dataIndex++) {
                var dataObj = {
                    id: dataFromServer.photos.photo[dataIndex].id,
                    server: dataFromServer.photos.photo[dataIndex].server,
                    farm: dataFromServer.photos.photo[dataIndex].farm,
                    secret: dataFromServer.photos.photo[dataIndex].secret,
                };
                beachPhotoArrayData.push(dataObj);
            }
            makePhotoURL(beachPhotoArrayData);
        },
            error: function(error){
                console.log(error);
            }
    }
    $.ajax(ajaxConfig);
}

//Seal Beach Click Handler for Ajax Call
var sealBeachClickHandler = function() {
    beachPhotoArrayData = [];
    beachPhotoArray = [];
    var dataFromServer;
    var ajaxConfig = {
        method: "GET",
        text: 'seal beach', // input field needs to change text using jQuery
        url: 'https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=629e34714d717373e24940da3b0ad6cb&format=json&nojsoncallback=1&text=seal beach surf&per_page=10',
        success: function (data) {
            dataFromServer = data;
            for (let dataIndex = 0; dataIndex < 5; dataIndex++) {
                var dataObj = {
                    id: dataFromServer.photos.photo[dataIndex].id,
                    server: dataFromServer.photos.photo[dataIndex].server,
                    farm: dataFromServer.photos.photo[dataIndex].farm,
                    secret: dataFromServer.photos.photo[dataIndex].secret,
                };
                beachPhotoArrayData.push(dataObj);
            }
            makePhotoURL(beachPhotoArrayData);
        },
        error: function (error) {
            console.log(error);
        }
    }
    $.ajax(ajaxConfig);
}

var showModal = function(){
    var backgroundImage = $(event.currentTarget).css('background-image');
    $('.pictureContent').css('background-image', backgroundImage);
    $('.pictureModal').show();
}

var closeModal = function(){
    $('.pictureModal').hide();
}

let beachInput = 'newport beach'; //currently just a placeholder
let beachObject = {};

function googleGeoLoc(name){
    $.ajax({
        dataType: 'json',
        url: 'http://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDbDr73Tuj2WLSNXkSc2P8mH2JdF0xjAeo&address=' + name,
        method: 'get',
        success: function(response){

            //store these variables
            console.log(response['results'][0]['address_components'][0]['long_name']); //string
            console.log(response['results'][0]['geometry']['location']['lat']); //num
            console.log(response['results'][0]['geometry']['location']['lng']); //num

            beachObject.name = response['results'][0]['address_components'][0]['long_name'];
            beachObject.latLong = [];
            beachObject.latLong.push(response['results'][0]['geometry']['location']['lat']);
            beachObject.latLong.push(response['results'][0]['geometry']['location']['lng']);
            console.log(beachObject);
        },
        error: function(response){
            console.log(response);
            console.log('ERRRROR');
        }
    })
}

