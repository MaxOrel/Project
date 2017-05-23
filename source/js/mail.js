import sendAjaxJson from './sendAjax';
//------------ block mail

const formMail = document.querySelector('#feedbackForm');


if (formMail) {
    formMail.addEventListener('submit', prepareSendMail);
}

function prepareSendMail(e) {
    e.preventDefault();
    var resultContainer = document.querySelector('.status');
    var data = {
        name: formMail.name.value,
        email: formMail.email.value,
        text: formMail.text.value
    };
    resultContainer.innerHTML = 'Отправка...';
    sendAjaxJson('/portfolio.html', data, function (data) {
        form.reset();
        resultContainer.innerHTML = data;
        if (cb) {
            cb(data);
        }
    });
}
