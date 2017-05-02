//Срелка скрола к нужному блоку
var Arrow = (function () {

  return {
    init: function () {
      const Height = $('.js-section').offset().top;

      $('.arrow').on('click', function () {
        $('body,html').animate({
          scrollTop: Height
        }, 1000);
        return false;
      });
    }
  }
}());

$(function () {
  if ($('#arrow').length) {
    Arrow.init();
  }
});