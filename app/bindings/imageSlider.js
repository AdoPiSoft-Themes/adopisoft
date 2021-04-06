define(['knockout'], function(ko) {

  ko.bindingHandlers.imageSlider = {
    init: function(element, valueAccessor) {
      var imageUrls = ko.unwrap(valueAccessor());
      var imageIndex = 0;
      var $_interval;

      function changeImage() {
        if (imageIndex === imageUrls.length) imageIndex = 0;
        element.src = imageUrls[imageIndex];
        imageIndex++;
      }

      changeImage();
      $_interval = setInterval(changeImage, 3000);

      ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
        clearInterval($_interval);
      });

    }
  };
});
