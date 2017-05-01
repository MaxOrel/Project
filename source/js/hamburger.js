//Гамбургер-меню
var Hamburger = (function () {
  var
    hamburger = $('.js-hamburger'),
    navContainer = $('.js-navigation'),
    navContent = $('.main-nav');
    body = $('body');

  return {
    init: function () {
      hamburger.on('click', function (e) {
        e.preventDefault();
        var _this = $(this);
        _this.toggleClass('active');
        navContainer.toggleClass('active');
        body.toggleClass('active');
       setTimeout(function () {
        navContent.toggleClass('active');
      }, 300);
        
      });
    }
  }
}());

$(function () {
  if ($('#hamburger').length) {
    Hamburger.init();
  }
});