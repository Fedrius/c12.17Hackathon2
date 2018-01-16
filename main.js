




































































































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



