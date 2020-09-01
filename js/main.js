const conditionalContent = require('./conditionalContent/conditionalContent.js');
let windowWidth;

var handleImages = function() {
    $('.js-background').each(function() {
        var $this = $(this);

        if ($this.is('img')) {
            //  grabs the source of image
            $this.parent().css('background-image', 'url(' + $this.attr('src') + ')');
            $this.css('display', 'none');

        } else {
            //  grabs the text content (containing URL) of element
            $this.parent().css('background-image', 'url(' + $this.text() + ')');
            $this.css('display', 'none');
        }
    });
}


$(document).ready(function() {
  conditionalContent('content');
  handleImages();
 

});
