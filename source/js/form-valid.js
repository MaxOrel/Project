//Форма обратной связи
var feedbackForm = (function () {
	var popup = $('#popup');
	popup.hide();
  return {
    init: function () {
      $("#feedbackForm").submit(function (event) {
        event.preventDefault();
        $('input[name=text]', "#feedbackForm").val('');
        $('input[name=email]', "#feedbackForm").val('');
        $('textarea[name=textarea]', "#feedbackForm").val('');
        popup.fadeIn('fast');
      });
      $('.js-close-popup').click(function () {
        popup.fadeOut('fast');
      });
    }
  }
}());
$(function () {
  if ($('#feedbackForm').length) {
    feedbackForm.init();
  }
});

export {feedbackForm};