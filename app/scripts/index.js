var $ = require('jquery');
var _ = require('underscore');
var handlebars = require('handlebars');
var url = "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=yarn&includes=Images,Shop&sort_on=score";





function logData(data) {
        console.log(data);
        var etsyData = data.results;
        etsyProducts(etsyData);
      }

      function etsyProducts(productList){
        console.log(etsyProducts);
        var source = $('#product-template').html();
        var productTemplate = handlebars.compile(source);


        _.each(productList, function(etsyData){
          var $etsyDataHtml = $(productTemplate(etsyData));
          $('.etsy-products').append($etsyDataHtml);

        });

      }











      fetchJSONP(url, logData);







function fetchJSONP(url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    var script = document.createElement('script');

    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}
