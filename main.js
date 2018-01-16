




































































































//Flickr API for Beach Photos

//Huntington Beach flickr ClickHandler
var hbClickHandler = function() {
    var dataFromServer;
    var photoObj;
    var ajaxConfig = {
        method: "GET",
        dataType: 'json',
        nojsoncallback: '1',
        text: 'huntington beach', // input field needs to change text using jQuery
        url: 'https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=629e34714d717373e24940da3b0ad6cb&format=json&nojsoncallback=1&text=huntington beach&per_page=10',
        success: function(data) {
            dataFromServer = data;
            for(var dataIndex = 0; dataIndex < 5; dataIndex++) {
                var dataObj = {
                    id: dataFromServer.photos.photo[dataIndex].id,
                    server: dataFromServer.photos.photo[dataIndex].server,
                    farm: dataFromServer.photos.photo[dataIndex].farm,
                    secret: dataFromServer.data[dataIndex].secret,
                };
            }
            console.log(data);
        },
        error: function() {
            console.log(false);
        }
    };
    $.ajax(ajaxConfig);
}
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




// var dataObj = {
//     name: dataFromServer.data[dataIndex].name,
//     course: dataFromServer.data[dataIndex].course,
//     grade: dataFromServer.data[dataIndex].grade,
//     id: dataFromServer.data[dataIndex].id,
//
// };

// for(var dataIndex = 0; dataIndex < dataFromServer.data.length; dataIndex++) {
//
// }