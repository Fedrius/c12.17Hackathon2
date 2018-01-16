




































































































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

