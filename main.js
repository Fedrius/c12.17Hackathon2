function weatherApi(){
    $.ajax({
        dataType: "text",
        url: "https://api.worldweatheronline.com/premium/v1/marine.ashx?key=ee5b80f43e9149f79be22719181601&num_of_days=1&tp=3&format=json&q=33.656595, -118.004010&tide=yes",
        method: "get",
        success: function(result){
            console.log("success");
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
}

//Huntington Beach flickr ClickHandler
var hbClickHandler = function() {
    beachPhotoArrayData = [];
    beachPhotoArray = [];
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

let beachInput = 'newport beach'; //currently just a placeholder
let beachObject = {};

function googleApiCall(name){
    $.ajax({
        dataType: 'json',
        url: 'http://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDbDr73Tuj2WLSNXkSc2P8mH2JdF0xjAeo&address=' + name,
        method: 'get',
        success: function(response){
            console.log(response['results'][0]['address_components'][0]['long_name']);
            console.log(response['results'][0]['geometry']['location']['lat']);
            console.log(response['results'][0]['geometry']['location']['lng']);
        },
        error: function(response){
            console.log(response);
            console.log('ERRRROR');
        }
    })
}

googleApiCall(beachInput);