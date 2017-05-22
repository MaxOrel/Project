(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _upload = require('./upload');

var _upload2 = _interopRequireDefault(_upload);

var _prepareSend = require('./prepareSend');

var _prepareSend2 = _interopRequireDefault(_prepareSend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Загрузка картинки

var formUpload = document.querySelector('#works');
var formBlog = document.querySelector('#blog');
var formSkills = document.querySelector('#skills');

formUpload.addEventListener('submit', prepareSendFile);
formBlog.addEventListener('submit', prepareSendPost);
formSkills.addEventListener('submit', prepareSendSkills);

function prepareSendFile(e) {
    e.preventDefault();
    var resultContainer = document.querySelector('#work-status');
    var formData = new FormData();
    var file = document.querySelector('#file-select').files[0];
    var name = document.querySelector('#file-desc').value;
    var teh = document.querySelector('#file-teh').value;
    var link = document.querySelector('#file-link').value;
    if (file) {
        formData.append('photo', file, file.name);
        formData.append('name', name);
        formData.append('teh', teh);
        formData.append('link', link);
    } else {
        resultContainer.innerHTML = 'Выберите файл';
        return;
    }
    resultContainer.innerHTML = 'Загрузка...';
    (0, _upload2.default)('/admin.html/upload', formData, function (data) {
        formUpload.reset();
        resultContainer.innerHTML = data;
    });
}

function prepareSendPost(e) {
    e.preventDefault();
    var data = {
        title: formBlog.title.value,
        date: formBlog.date.value,
        text: formBlog.text.value
    };
    (0, _prepareSend2.default)('/admin.html/addpost', formBlog, data);
}

function prepareSendSkills(e) {
    e.preventDefault();
    var data = {};
    var itemsElement = document.querySelectorAll('.admin-skills__title');
    itemsElement.forEach(function (i) {
        var inputs = i.parentNode.querySelectorAll('INPUT');
        data[i.textContent] = [];
        inputs.forEach(function (input) {
            data[i.textContent].push({ name: input.name, value: input.value });
        });
    });

    (0, _prepareSend2.default)('/admin.html/update', formSkills, data);
}
console.log('admin run run');

},{"./prepareSend":2,"./upload":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = prepareSend;

var _sendAjax = require('./sendAjax');

var _sendAjax2 = _interopRequireDefault(_sendAjax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function prepareSend(url, form, data, cb) {
    var resultContainer = form.querySelector('.status');
    resultContainer.innerHTML = 'Отправка...';
    (0, _sendAjax2.default)(url, data, function (data) {
        form.reset();
        resultContainer.innerHTML = data;
        if (cb) {
            cb(data);
        }
    });
}

},{"./sendAjax":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sendMailData;
function sendMailData(url, data, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function (e) {
    var result = void 0;
    try {
      result = JSON.parse(xhr.responseText);
    } catch (e) {
      cb('Извените в данных ошибка');
    }
    cb(result.status);
  };
  xhr.send(JSON.stringify(data));
}

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (url, data, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);

    xhr.onload = function (e) {
        var result = JSON.parse(xhr.responseText);
        cb(result.status);
    };

    xhr.send(data);
};

},{}]},{},[1])

//# sourceMappingURL=maps/admin.js.map
