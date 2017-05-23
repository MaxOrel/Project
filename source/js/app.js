import {map} from './map';
import {ParallaxScroll} from './paralax';
import {ParallaxMouse} from './paralax';
import {animateSkills} from './skills';
import {preloader} from './preloader';
import {blur} from './blur';
import {Arrow} from './arrow-top';
import {AuthorizationButton} from './flip';
import {AuthorizationSubmit} from './flip';
import {scrollMenu} from './blog';
import {feedbackForm} from './form-valid';
import {sliderCont} from './slider';
import {Hamburger} from './hamburger';
// import {aviatitle} from './textanimation';

import prepareSend from './prepareSend';

//------------ block mail

const formMail = document.querySelector('#feedbackForm');
const formLogin = document.querySelector('#authorization');

if (formMail) {
    formMail.addEventListener('submit', prepareSendMail);
}
if (formLogin) {
    formLogin.addEventListener('submit', prepareSendLogin);
}

function prepareSendMail(e) {
    e.preventDefault();
    var resultContainer = document.querySelector('.status');
    var data = {
        name: formMail.name.value,
        email: formMail.email.value,
        text: formMail.text.value
    };
    prepareSend('/portfolio.html/mail', formMail, data);
    // resultContainer.innerHTML = 'Sending...';
    // sendAjaxJson('/portfolio.html', data, function (data) {
    //     formMail.reset();
    //     resultContainer.innerHTML = data;
    // });
}

function prepareSendLogin(e) {
    e.preventDefault();
    let data = {
        login: formLogin.login.value,
        password: formLogin.password.value
    };

    prepareSend('/', formLogin, data, function(data) {
        if (data === 'Авторизация успешна!') {
            location.href = '/admin.html';
        }
    });
}
console.log('app.js run run');