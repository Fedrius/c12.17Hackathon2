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