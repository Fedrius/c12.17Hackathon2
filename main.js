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
var hbPhotoArrayData = [];
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
}

//Huntington Beach flickr ClickHandler
var hbClickHandler = function() {

    var photoObj;
    var ajaxConfig = {
        method: "GET",
        text: 'huntington beach surf', // input field needs to change text using jQuery
        url: 'https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=629e34714d717373e24940da3b0ad6cb&format=json&nojsoncallback=1&text=huntington beach surf&per_page=10',
        success: function(data) {
            dataFromServer = data;
            for(let dataIndex = 0; dataIndex < 5; dataIndex++) {
                var dataObj = {
                    id: dataFromServer.photos.photo[dataIndex].id,
                    server: dataFromServer.photos.photo[dataIndex].server,
                    farm: dataFromServer.photos.photo[dataIndex].farm,
                    secret: dataFromServer.photos.photo[dataIndex].secret,
                };
                hbPhotoArrayData.push(dataObj);
            }
            makePhotoURL(hbPhotoArrayData);
        },
        error: function() {
            console.log(false);
        }
    };
    $.ajax(ajaxConfig);
}
hbClickHandler();
//Newport Beach Click Handler
// var nbClickHandler = function() {
//     var dataFromServer;
//     var ajaxConfig = {
//         method: "GET",
//         dataType: 'json',
//         nojsoncallback: '1',
//         text: 'newport beach', // input field needs to change text using jQuery
//         url: 'https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=629e34714d717373e24940da3b0ad6cb&format=json&nojsoncallback=1&text=newport beach&per_page=10',
//         success: function(data) {
//             nbDataFromServer = data;
//             console.log(nbDataFromServer);
//         },
//         error: function() {
//             console.log(false);
//         }
//     };
//     $.ajax(ajaxConfig);
// }
//Sunset Beach Click Handler
// var sunsetBeachClickHandler = function() {
//     var dataFromServer;
//     var ajaxConfig = {
//         method: "GET",
//         dataType: 'json',
//         text: 'sunset beach', // input field needs to change text using jQuery later on will make make a dynamic variable
//         url: 'https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=629e34714d717373e24940da3b0ad6cb&format=json&nojsoncallback=1&text=sunset beach&per_page=10',
//         success: function(data) {
//             sunsetBeachDataFromServer = data;
//             console.log(sunsetBeachDataFromServer);
//         },
//         error: function() {
//             console.log(false);
//         }
//     };
//     $.ajax(ajaxConfig);
// }

// var sealBeachClickHandler = function() {
//     var dataFromServer;
//     var ajaxConfig = {
//         method: "GET",
//         dataType: 'json',
//         text: 'seal beach', // input field needs to change text using jQuery later on will make make a dynamic variable
//         url: 'https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=629e34714d717373e24940da3b0ad6cb&format=json&nojsoncallback=1&text=seal beach&per_page=10',
//         success: function(data) {
//             sealBeachDataFromServer = data;
//             console.log(sealBeachDataFromServer);
//         },
//         error: function() {
//             console.log(false);
//         }
//     };
//     $.ajax(ajaxConfig);
// }



