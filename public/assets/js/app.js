(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _map = require('./map');

var _paralax = require('./paralax');

var _skills = require('./skills');

var _preloader = require('./preloader');

var _blur = require('./blur');

var _arrowTop = require('./arrow-top');

var _flip = require('./flip');

var _blog = require('./blog');

var _formValid = require('./form-valid');

var _slider = require('./slider');

var _hamburger = require('./hamburger');

var _prepareSend = require('./prepareSend');

var _prepareSend2 = _interopRequireDefault(_prepareSend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//------------ block mail

var formMail = document.querySelector('#feedbackForm');
// import {aviatitle} from './textanimation';

var formLogin = document.querySelector('#authorization');

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
    (0, _prepareSend2.default)('/portfolio.html/mail', formMail, data);
    // resultContainer.innerHTML = 'Sending...';
    // sendAjaxJson('/portfolio.html', data, function (data) {
    //     formMail.reset();
    //     resultContainer.innerHTML = data;
    // });
}

function prepareSendLogin(e) {
    e.preventDefault();
    var data = {
        login: formLogin.login.value,
        password: formLogin.password.value
    };

    (0, _prepareSend2.default)('/', formLogin, data, function (data) {
        if (data === 'Авторизация успешна!') {
            location.href = '/admin.html';
        }
    });
}
console.log('app.js run run');

},{"./arrow-top":2,"./blog":3,"./blur":4,"./flip":5,"./form-valid":6,"./hamburger":7,"./map":8,"./paralax":9,"./preloader":10,"./prepareSend":11,"./skills":13,"./slider":14}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
//Срелка скрола к нужному блоку
var Arrow = function () {

  return {
    init: function init() {
      var Height = $('.js-section').offset().top;

      $('.arrow').on('click', function () {
        $('body,html').animate({
          scrollTop: Height
        }, 1000);
        return false;
      });
    }
  };
}();

$(function () {
  if ($('#arrow').length) {
    Arrow.init();
  }
});
exports.Arrow = Arrow;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
//Блог на странице "блог"
var scrollMenu = function () {
  var $news = $('.blog-data'),
      $item = $('.js-blog-item'),
      $wrapMenu = $('.js-blog-inner'),
      body = document.body,
      isPositionArticle = [],
      offsetHeight = 200,
      positionArticle = function positionArticle(element) {
    var len = element.length;
    for (var i = 0; i < len; i++) {
      isPositionArticle[i] = {};
      isPositionArticle[i].top = element.eq(i).offset().top - offsetHeight;
      isPositionArticle[i].bottom = isPositionArticle[i].top + element.eq(i).innerHeight();
    }
  },
      scrollPageFixMenu = function scrollPageFixMenu() {
    var scroll = window.pageYOffset;
    if (scroll < $news.offset().top) {
      $wrapMenu.removeClass('fixed');
    } else {
      $wrapMenu.addClass('fixed');
    }
  },
      scrollPage = function scrollPage() {
    var scroll = window.pageYOffset;
    for (var i = 0; i < isPositionArticle.length; i++) {
      if (scroll >= isPositionArticle[i].top && scroll <= isPositionArticle[i].bottom) {
        $('.blog-nav__item--news').eq(i).addClass('active').siblings().removeClass('active');
        $item.eq(i).addClass('active').siblings().removeClass('active');
      }
    }
  },
      clickOnMenu = function clickOnMenu(e) {
    var index = $(e.target).index();
    var sectionOffset = $news.eq(index).offset().top;
    $(document).off('scroll', scrollPage);
    $('body, html').animate({
      'scrollTop': sectionOffset
    }, function () {
      $(e.target).addClass('active').siblings().removeClass('active');
      $(document).on('scroll', scrollPage);
    });
  },
      addListener = function addListener() {
    $('.js-blog-nav').on('click', clickOnMenu);

    $(document).on('scroll', scrollPage);
    $(document).on('scroll', scrollPageFixMenu);

    $(window).on('load', function (e) {
      positionArticle($news);
    });

    $(window).on('resize', function (e) {
      positionArticle($news);
    });

    $('.news-menu__handler').on('click', function (e) {
      e.preventDefault();
      $(this).parents('.news-menu').toggleClass('blocked');
    });
  };

  return {
    init: addListener
  };
}();

$(function () {
  if ($('#blog').length) {
    scrollMenu.init();
  }
});

exports.scrollMenu = scrollMenu;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
//BLUR-эффект на странице "портфолио"
var blur = function () {
	var wrap = document.querySelector('.js-feedback-wrapper'),
	    bg = document.querySelector('.js-feedback-bg'),
	    bgSection = document.querySelector('.js-reviews-bg');

	function set() {
		var bgWidth = bgSection.offsetWidth,
		    posLeft = -wrap.offsetLeft,
		    posTop = -wrap.offsetTop,
		    offsetImgTop = bgSection.offsetTop,
		    offsetTop = posTop + offsetImgTop;

		bg.style.backgroundSize = bgWidth + 'px ' + 'auto';
		bg.style.backgroundPosition = posLeft + 'px ' + offsetTop + 'px';
	}

	return {
		init: function init() {
			set();

			window.addEventListener('resize', set);
		}
	};
}();

$(function () {
	if ($('#feedbackForm').length) {
		blur.init();
	}

	window.onresize = function () {
		if ($('#feedbackForm').length) {
			blur.init();
		}
	};
});
exports.blur = blur;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
//Флип формы авторизации
var AuthorizationButton = function () {
  var authorization = $('.js-authorization'),
      cardFlip = $('.card__wrapper');

  return {
    init: function init() {
      authorization.on('click', function (e) {
        e.preventDefault();

        $('#authorizationButton').toggleClass('active');
        setTimeout(function () {
          cardFlip.toggleClass('flip');
        }, 100);
      });
    }
  };
}();
var AuthorizationSubmit = function () {
  return {
    init: function init() {
      $("#authorization").submit(function (event) {
        event.preventDefault();

        if (!($("#noRobot").prop("checked") && $('input[name=radio]:checked', '#authorization').val() == 1)) {
          $("#validation").text('Вы точно человек?');
        } else {
          $("#validation").text('Все успешно');
        }
      });
    }
  };
}();
$(function () {
  if ($('#authorizationButton').length) {
    AuthorizationButton.init();
  }
  if ($('#authorization').length) {
    AuthorizationSubmit.init();
  }
});
exports.AuthorizationButton = AuthorizationButton;
exports.AuthorizationSubmit = AuthorizationSubmit;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
//Форма обратной связи
var feedbackForm = function () {
  var popup = $('#popup');
  popup.hide();
  return {
    init: function init() {
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
  };
}();
$(function () {
  if ($('#feedbackForm').length) {
    feedbackForm.init();
  }
});

exports.feedbackForm = feedbackForm;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
//Гамбургер-меню
var Hamburger = function () {
  var hamburger = $('.js-hamburger'),
      navContainer = $('.js-navigation'),
      navContent = $('.main-nav');
  return {
    init: function init() {
      hamburger.on('click', function (e) {
        e.preventDefault();
        var _this = $(this);
        _this.toggleClass('active');
        navContainer.toggleClass('active');
        $('body').toggleClass('active');
        setTimeout(function () {
          navContent.toggleClass('active');
        }, 300);
      });
    }
  };
}();

$(function () {
  if ($('#hamburger').length) {
    Hamburger.init();
  }
});

exports.Hamburger = Hamburger;

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
//Карта на странице "обо мне"
var map = $(function () {
    var Maps;
    var Routes;
    var App;
    var Utils;
    Utils = {
        settings: {
            debug: false
        },
        clickEvent: 'click',
        log: function log(what) {
            if (Utils.settings.debug && window.console) {
                console.log(what);
            }
        }
    };

    //  Для быстрого использования
    var clickEvent = Utils.clickEvent,
        _log = Utils.log;
    Maps = {
        load: function load() {
            _log("Map: load script");
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' + 'callback=initMap&key=AIzaSyCoinv0op00s_n1cclfA0ExKG-yrhCGTq4';
            document.body.appendChild(script);
        },
        initSettings: function initSettings() {
            _log("Map: init settings");
            this.map = null;
            this.marker = null;
            this.settings = {
                zoom: 14,
                center: new google.maps.LatLng(52.95415818, 36.06247723),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: [{
                    "featureType": "administrative",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#444444"
                    }]
                }, {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [{
                        "color": "#ffffff"
                    }]
                }, {
                    "featureType": "landscape",
                    "elementType": "labels",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "road.highway",
                    "elementType": "all",
                    "stylers": [{
                        "visibility": "simplified"
                    }]
                }, {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#d5d5d5"
                    }]
                }, {
                    "featureType": "road.arterial",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#d6d6d6"
                    }]
                }, {
                    "featureType": "road.local",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#d6d6d6"
                    }]
                }, {
                    "featureType": "road.arterial",
                    "elementType": "labels.icon",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "transit",
                    "elementType": "all",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [{
                        "color": "#61dac9"
                    }, {
                        "visibility": "on"
                    }]
                }, {
                    "featureType": "water",
                    "elementType": "labels",
                    "stylers": [{
                        "color": "#61dac9"
                    }]
                }],
                scrollwheel: false,
                mapTypeControl: false,
                panControl: false,
                omControl: false,
                scaleControl: false,
                streetViewControl: false
            };
        },
        init: function init() {
            _log("Map: init Map");
            Maps.initSettings();
            Maps.map = new google.maps.Map(document.getElementById('map'), Maps.settings);
            Maps.marker = new google.maps.Marker({
                map: Maps.map,
                draggable: false,
                position: new google.maps.LatLng(52.95415818, 36.06247723)
            });
        }
    };
    //  Функция для обратного вызова карт при асинхронной загрузке
    window.initMap = function () {
        Maps.init();
    };
    Routes = {
        init: function init() {
            _log("Routes: init");
            Maps.load();
        }
    };
    App = {
        init: function init() {
            Routes.init();
        }
    };
    if ($('#map').length) {
        App.init();
    }
});

exports.map = map;

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
//Параллакс
var ParallaxScroll = function () {
  return {
    init: function init() {
      window.onscroll = function () {
        var parallax = function () {
          var bg = document.querySelector('.js-hero-bg'),
              title = document.querySelector('.js-hero-title'),
              user = document.querySelector('.js-user');

          return {
            move: function move(block, windowScroll, strafeAmount) {
              var strafe = windowScroll / -strafeAmount + '%',
                  style = block.style,
                  transformString = 'translate3d(0,' + strafe + ', 0)';

              style.top = strafe;
              style.transform = transformString;
              style.webkitTransform = transformString;
            },
            init: function init(wScroll) {
              this.move(bg, wScroll, 45, 0);
              this.move(title, wScroll, 15, 50);
              this.move(user, wScroll, 5, 50);
            }
          };
        }();
        var wScroll = window.pageYOffset;

        parallax.init(wScroll);
      };
    }
  };
}();
//Паралак по движению мышкой
var ParallaxMouse = function () {

  return {
    init: function init() {
      var parallaxContainer = document.getElementById('parallaxMouse'),
          layers = parallaxContainer.children;

      window.addEventListener('mousemove', function (e) {
        var pageX = e.pageX,
            pageY = e.pageY,
            initialX = window.innerWidth / 2 - pageX,
            initialY = window.innerHeight / 2 - pageY;

        [].slice.call(layers).forEach(function (layer, i) {
          var divider = i / 100,
              positionX = initialX * divider,
              positionY = initialY * divider,
              bottomPosition = window.innerHeight / 2 * divider,
              layerStyle = layer.style,
              transformString = 'translate3d(' + positionX + 'px, ' + positionY + 'px, 0)';

          layerStyle.transform = transformString;
          layerStyle.webkitTransform = transformString;
          layerStyle.oTransform = transformString;
          layerStyle.msTransform = transformString;
          layerStyle.bottom = '-' + bottomPosition + 'px';
        });
      });
    }
  };
}();

$(function () {
  if ($('#parallaxScroll').length) {
    ParallaxScroll.init();
  }
  if ($('#parallaxMouse').length) {
    ParallaxMouse.init();
  }
});

exports.ParallaxScroll = ParallaxScroll;
exports.ParallaxMouse = ParallaxMouse;

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
//прелоадер для всех страниц
var preloader = function () {
  var preloader = $('.preloader'),
      persentsTotal = 0,
      cardAnimate = $('.l-card__wrapper');
  var imgPath = $('*').map(function (ind, element) {

    var background = $(element).css('background-image'),
        path = '';
    var isImg = $(element).is('img');

    if (background != 'none') {
      path = background.replace('url("', '').replace('")', '');
    }

    if (isImg) {
      path = $(element).attr('src');
    }

    if (path) return path;
  });

  var setPersents = function setPersents(total, current) {

    var persents = Math.ceil(current / total * 100);
    $('.js-percents').text(persents + '%');

    if (persents >= 100) {
      preloader.fadeOut();
      cardAnimate.addClass('active');
    }
  };

  var loadImages = function loadImages(images) {
    if (!images.length) preloader.fadeOut();

    images.forEach(function (img, i, images) {
      var fakeImages = $('<img>', {
        attr: {
          src: img
        }
      });

      fakeImages.on('load error', function () {
        persentsTotal++;
        setPersents(images.length, persentsTotal);
      });
    });
  };

  return {
    init: function init() {
      var imgs = imgPath.toArray();
      loadImages(imgs);
    }
  };
}();

$(function () {
  preloader.init();
});

exports.preloader = preloader;

},{}],11:[function(require,module,exports){
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

},{"./sendAjax":12}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var animateSkills = function () {

  var checkDistance = function checkDistance(scrollTop, element) {
    var offset = element.offset().top,
        windowMargin = Math.ceil($(window).height() / 1.5),
        topBorder = offset - scrollTop - windowMargin,
        bottomEdge = element.outerHeight(true) + offset,
        bottomBorder = scrollTop + windowMargin - bottomEdge;

    return topBorder <= 0 && bottomBorder <= 0;
  };

  var item = $('.skills-list__item');

  var animationActions = {
    toSkills: function toSkills() {
      item.addClass('active');
    }
  };

  return {
    init: function init() {
      $(window).on('scroll', function () {
        var scrollTop = $(window).scrollTop();

        if (checkDistance(scrollTop, $('.animate'))) {
          animationActions['toSkills']();
        }
      });
    }
  };
}();

$(function () {
  if ($('#skills').length) {
    animateSkills.init();
  }
});

exports.animateSkills = animateSkills;

},{}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
//Слайдер на странице "портфолио"

var sliderCont = function () {
  var Slider = function Slider(container) {
    var nextBtn = container.find('.js-slider-bth--left'),
        prevBtn = container.find('.js-slider-bth--right'),
        items = nextBtn.find('.js-slider-item'),
        display = container.find('.js-slider-display'),
        title = container.find('.js-slider-subtitle'),
        skills = container.find('.js-slider-tehnologes'),
        link = container.find('.js-slider-site'),
        itemsLength = items.length,
        duration = 500,
        flag = true,
        that = this;

    var timeout;

    this.counter = 0;

    var generateMarkups = function generateMarkups() {
      var list = nextBtn.find('.js-slider-list'),
          markups = list.clone();

      prevBtn.append(markups).find('.js-slider-item').removeClass('active').eq(that.counter + 1).addClass('active');
    };

    var getDataArrays = function getDataArrays() {
      var dataObject = {
        pics: [],
        title: [],
        skills: [],
        link: []
      };

      $.each(items, function () {
        var $this = $(this);

        dataObject.pics.push($this.data('full'));
        dataObject.title.push($this.data('title'));
        dataObject.skills.push($this.data('skills'));
        dataObject.link.push($this.data('link'));
      });

      return dataObject;
    };

    var slideInLeftBtn = function slideInLeftBtn(slide) {
      var reqItem = items.eq(slide - 1),
          activeItem = items.filter('.active');

      activeItem.stop(true, true).animate({
        'top': '100%'
      }, duration);

      reqItem.stop(true, true).animate({
        'top': '0%'
      }, duration, function () {
        $(this).addClass('active').siblings().removeClass('active').css('top', '-100%');
      });
    };

    var slideInRightBtn = function slideInRightBtn(slide) {
      var items = prevBtn.find('.js-slider-item'),
          activeItem = items.filter('.active'),
          reqSlide = slide + 1;

      if (reqSlide > itemsLength - 1) {
        reqSlide = 0;
      }

      var reqItem = items.eq(reqSlide);

      activeItem.stop(true, true).animate({
        'top': '-100%'
      }, duration);

      reqItem.stop(true, true).animate({
        'top': '0%'
      }, duration, function () {
        $(this).addClass('active').siblings().removeClass('active').css('top', '100%');
      });
    };

    var changeMainPicture = function changeMainPicture(slide) {
      var image = display.find('.js-slider-display-img');
      var data = getDataArrays();

      image.stop(true, true).fadeOut(duration / 2, function () {
        image.attr('src', data.pics[slide]);
        $(this).fadeIn(duration / 2);
      });
    };

    var changeTextData = function changeTextData(slide) {
      var data = getDataArrays();

      aviatitle.generate(data.title[slide], title, 'ru');

      aviatitle.generate(data.skills[slide], skills, 'en');

      link.attr('href', data.link[slide]);
    };

    this.setDefaults = function () {
      var _that = this,
          data = getDataArrays();

      generateMarkups();

      nextBtn.find('.js-slider-item').eq(_that.counter - 1).addClass('active');

      prevBtn.find('.js-slider-item').eq(_that.counter + 1).addClass('active');

      display.find('.js-slider-display-img').attr('src', data.pics[_that.counter]);

      // текстовые описания
      changeTextData(_that.counter);
    };

    this.moveSlide = function (direction) {
      var _that = this;

      var directions = {
        next: function next() {

          if (_that.counter < itemsLength - 1) {
            _that.counter++;
          } else {
            _that.counter = 0;
          }
        },

        prev: function prev() {
          if (_that.counter > 0) {
            _that.counter--;
          } else {
            _that.counter = itemsLength - 1;
          }
        }
      };

      directions[direction]();

      if (flag) {
        flag = false;

        if (typeof timeout != 'undefined') {
          clearTimeout(timeout);
        }

        timeout = setTimeout(function () {
          flag = true;
        }, duration + 50);

        slideInLeftBtn(_that.counter);
        slideInRightBtn(_that.counter);
        changeMainPicture(_that.counter);
        changeTextData(_that.counter);
      }
    };
  };
  return {
    init: function init() {
      var slider = new Slider($('.sec-works__content'));
      slider.setDefaults();

      $('.js-slider-bth--left').on('click', function (e) {
        e.preventDefault();
        slider.moveSlide('prev');
      });

      $('.js-slider-bth--right').on('click', function (e) {
        e.preventDefault();
        slider.moveSlide('next');
      });
    }
  };
}();
$(function () {
  if ($('#slider').length) {
    sliderCont.init();
  }
});

//Анимация для букв
if ($('#slider').length) {
  var aviatitle = {
    generate: function generate(string, block) {
      var wordsArray = string.split(' '),
          stringArray = string.split(''),
          sentence = [],
          word = '';
      block.text('');
      wordsArray.forEach(function (currentWord) {
        var wordsArray = currentWord.split('');
        wordsArray.forEach(function (letter) {
          var letterHtml = '<span class="letter-span">' + letter + '</span>';
          word += letterHtml;
        });
        var wordHTML = '<span class="letter-word">' + word + '</span>';
        sentence.push(wordHTML);
        word = '';
      });
      block.append(sentence.join(' '));
      // анимация появления
      var letters = block.find('.letter-span'),
          counter = 0,
          timer,
          duration = 500 / stringArray.length;
      function showLetters() {
        var currentLetter = letters.eq(counter);
        currentLetter.addClass('active');
        counter++;
        if (typeof timer !== 'undefined') {
          clearTimeout(timer);
        }
        timer = setTimeout(showLetters, duration);
      }
      showLetters();
    }
  };
}
exports.sliderCont = sliderCont;

},{}]},{},[1])

//# sourceMappingURL=maps/app.js.map
