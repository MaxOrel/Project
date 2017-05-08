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
var AuthorizationSubmit = (function () {
  return {
    init: function () {
      $("#authorization").submit(function (event) {
        event.preventDefault();

        if (!($("#noRobot").prop("checked") && $('input[name=radio]:checked', '#authorization').val() == 1)) {
            $("#validation").text('Вы точно человек?');
        } else {
            $("#validation").text('Все успешно');
        }
      });
    }
  }
}());
$(function () {
  if ($('#authorizationButton').length) {
    AuthorizationButton.init();
  }
  if ($('#authorization').length) {
    AuthorizationSubmit.init();
  }
});
