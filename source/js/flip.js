//Флип формы авторизации
var AuthorizationButton = (function () {
  var
    authorization = $('.js-authorization'),
    cardFlip = $('.card__wrapper');

  return {
    init: function () {
      authorization.on('click', function (e) {
        e.preventDefault();

        $('#authorizationButton').toggleClass('active');
        setTimeout(function () {
          cardFlip.toggleClass('flip');
        }, 100);
      });
    }
  }
}());
$(function () {
  if ($('#authorizationButton').length) {
    AuthorizationButton.init();
  }
});
