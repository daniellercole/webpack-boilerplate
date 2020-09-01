// var queryString = require('query-string');
var data;
var copy;
var domMap;
var $ = require('jquery');
var pageJson = window.pageJson;

var urlParam = function(name){
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  if (results==null){
     return null; 
  }
  else {
     return decodeURI(results[1]) || 0;
  }
}

const originParam = urlParam('origin'); 
const langParam = urlParam('locale');

var lang = pageJson.locale || window.grFormLanguage || langParam || "en_CA";

if ( pageJson.locale == "en-US" ) {
  lang = "en-CA";
}

var origin = originParam || "default";
origin = origin.toUpperCase();

var selectedOrigin;

var getOrigin = function() {
    var availableLangs = Object.keys(copy);
    var selectedLang;

    if (availableLangs.indexOf(lang) >= 0) {
        selectedLang = copy[lang];
        $('body').addClass(lang); 
    } else {
        console.warn("Couldn't find specified language, reverting to english...");
        selectedLang = copy["en"];
    } 
    console.log('selectedLang', selectedLang);
    var availableOrigins = Object.keys(selectedLang);
    if (availableOrigins.indexOf(origin) >= 0) { 
        $('body').addClass('origin-' + origin.toLowerCase());
        return selectedLang[origin];
    } else {
        console.warn("Couldn't find specified origin, reverting to default...");
        $('body').addClass('origin-default');
        return selectedLang["default"];
    }
}


var mapContentToPage = function() {
    var contentBlocks = Object.keys(domMap);
    selectedOrigin = getOrigin();

    console.log(selectedOrigin); 
    // console.log(selectedOrigin); 
    $('body').addClass(selectedOrigin);

    contentBlocks.forEach(function(contentBlock) {
        var $el = $(domMap[contentBlock]);
        var text = selectedOrigin[contentBlock];

        //  image handler
        //  check if image by looking for "image" in property titles
        if (contentBlock.indexOf('image') !== -1) {
            if ($el.hasClass('b-lazy')) { //blazy is a tool that loads images on demand
                $el.attr('data-src', selectedOrigin[contentBlock]['normal'] + "|" + selectedOrigin[contentBlock]['retina']);
            } else {

                var pixelDensity = 'normal';

                //  check if screen is retina
                if (window.getDevicePixelRatio() > 1) {
                    pixelDensity = 'retina';
                }

                //  grab image URL based on pixelDensity
                var imageProperty = selectedOrigin[contentBlock][pixelDensity];


                //  set image background in css 
                const imgSrc = 'url(' + imageProperty + ')';
                $el.css('background-image', imgSrc);
            }
        } else {
            $el.html(text);
        }
    });

    //console.log('Content mapping compvare.');
};

var init = function(dataSource) {
    data = require('./' + dataSource + '.js');
    copy = data.copy;
    domMap = data.domMap;
    mapContentToPage();
}

window.getDevicePixelRatio = function() {
    var ratio = 1;

    // To account for zoom, change to use deviceXDPI instead of systemXDPI
    if (window.screen.systemXDPI !== undefined && window.screen.logicalXDPI !== undefined && window.screen.systemXDPI > window.screen.logicalXDPI) {
        // Only allow for values > 1
        ratio = window.screen.systemXDPI / window.screen.logicalXDPI;
    } else if (window.devicePixelRatio !== undefined) {
        ratio = window.devicePixelRatio;
    }
    return ratio;
};


module.exports = init;