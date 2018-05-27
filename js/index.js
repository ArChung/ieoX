var doPageAnimation = true;

$(document).ready(function () {

  // initLoading();
  initChart();

  initMenu();

  initFlipClock();

  if (doPageAnimation) {
    initParticleBg();
  }

  initQA();

  initBack2TopBtn();

  initSwipers();


})

function initSwipers() {
  // var newsSwiper = $('#newsSwipter');

  var mySwiper = new Swiper('#newsSwipter .swiper-container', {
    speed: 400,
    spaceBetween: 100,
    roundLengths: true,
    slidesPerView: 4,
    spaceBetween: 25,
    // loop: true,
    pagination: {
      el: '#newsSwipter .swiper-pagination',
    },
    navigation: {
      nextEl: '#newsSwipter .swiper-button-next',
      prevEl: '#newsSwipter .swiper-button-prev',
    },
    breakpoints: {
      1400: {
        slidesPerView: 3,
        spaceBetween: 25,
      },
      1240: {
        slidesPerView: 2,
        spaceBetween: 25,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 15,
      },
    }
  });

  var mySwiper = new Swiper('#eventSwipter .swiper-container', {
    speed: 400,
    spaceBetween: 100,
    roundLengths: true,
    slidesPerView: 3,
    spaceBetween: 25,
    // loop: true,
    pagination: {
      el: '#eventSwipter .swiper-pagination',
    },
    navigation: {
      nextEl: '#eventSwipter .swiper-button-next',
      prevEl: '#eventSwipter .swiper-button-prev',
    },
    breakpoints: {
      1400: {
        slidesPerView: 3,
        spaceBetween: 25,
      },
      1240: {
        slidesPerView: 2,
        spaceBetween: 25,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 15,
      },
    }
  });

  
  

}



function initBack2TopBtn() {
  var b = $('.back2topBtn');

  $(document).scroll(function () {
    // console.log($(document).scrollTop())
    if ($(document).scrollTop() > 600) {
      b.addClass('show')
    } else {
      b.removeClass('show')

    }
  })

  b.click(function () {
    ChungTool.pageScrollAni(0)
  })
}

function initQA() {
  var qa = $('#qa');
  $('.qaBtn').click(function (e) {
    e.preventDefault();
    simpleShow(qa);
    ChungTool.lockScroll();
  })

  qa.find('.clozBtn').click(function (e) {
    simpleHide(qa);
    ChungTool.unLockScroll();
  })

  qa.find('.qBox').click(function (e) {
    $(this).closest('.qaBox').toggleClass('open')
  })

}

function initFlipClock() {
  var clock = $('#flipClock');
  if (clock) {
    var futureDate = clock.attr('data-countTo').split('/');
    var futureTime = new Date(+futureDate[0], +futureDate[1] - 1, +futureDate[2], 0, 0, 0, 0);
    // var currentDate = clock.attr('data-currentTime');
    var currentDate = new Date(+clock.attr('data-currentTime'))
    // console.log('currentDate: ', currentDate.toLocaleString());
    // console.log('futureTime: ', futureTime.toLocaleString());

    var diff = futureTime.getTime() / 1000 - currentDate.getTime() / 1000;

    // Instantiate a coutdown FlipClock
    clock.FlipClock(diff, {
      clockFace: 'DailyCounter',
      countdown: true
    });
  }
}


function initMenu() {
  var menu = $('.mainMenu');
  $('.phoneMenuBtn').click(function () {
    menu.addClass('show');
  })

  menu.find('.clozBtn').click(function () {
    menu.removeClass('show');
  })

  menu.find('.menuBtn').click(function () {
    menu.removeClass('show');
  })

  menu.find('.pageBtn').click(function (e) {
    // menu.removeClass('show');
    var href = $(this).attr('href');

    if (href.indexOf('#') === 0) {
      e.preventDefault();
      var target = $(href).offset().top;
      ChungTool.pageScrollAni(target)
    }
  })
}



function initParticleBg() {
  var aniConfigArr = ['js/animation-bubble-config.json', 'js/animation-particle-config.json', 'js/animation-bubble-config-2.json', 'js/animation-particle-config.json']
  var selectorArr = ['indexParticleBg', 'featureParticleBg', 'teamParticleBg', 'chartParticleBg']
  var selector = '.partclieBg';
  var psnArr = [];
  var count = 0;



  inView(selector)
    .on('enter', function (e) {
      var t = $(e);
      var index = $(selector).index(t);
      if (!psnArr[index]) {
        particlesJS.load(selectorArr[index], aniConfigArr[index]);
        psnArr[index] = count;
        count++;
      } else {
        pJSDom[psnArr[index]].pJS.fn.vendors.start();
      }
    })
    .on('exit', function (e) {
      var t = $(e);
      var index = $(selector).index(t);
      clearAnimation(psnArr[index])

    });


  function clearAnimation(index) {
    cancelRequestAnimFrame(pJSDom[index].pJS.fn.checkAnimFrame);
    cancelRequestAnimFrame(pJSDom[index].pJS.fn.drawAnimFrame);
    pJSDom[index].pJS.fn.particlesEmpty();
    pJSDom[index].pJS.fn.canvasClear();
  }
}


function initChart() {
  var data1 = [55, 10, 15, 3, 10, 2, 5];
  var data2 = [40, 15, 30, 15];


  var chart = new Chartist.Pie('#chart01', {
    series: data1,
  }, {
    donut: true,
  });

  var chart2 = new Chartist.Pie('#chart02', {
    series: data2,
  }, {
    donut: true,
  });

  chart.on('created', function () {
    getPosition($('#chart01'));
  });


  chart2.on('created', function () {
    getPosition($('#chart02'));
  });

  // chart.on('draw', function (data) {
  //   drawFunc(data);
  //   // console.log('hi');
  // });
  // chart2.on('draw', drawFunc);


  // function drawFunc(data) {
  //   if (data.type === 'slice') {

  //     // Get the total path length in order to use for dash array animation
  //     var pathLength = data.element._node.getTotalLength();

  //     // Set a dasharray that matches the path length as prerequisite to animate dashoffset
  //     data.element.attr({
  //       'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
  //     });
  //     // Create animation definition while also assigning an ID to the animation for later sync usage
  //     var animationDefinition = {
  //       'stroke-dashoffset': {
  //         id: 'anim' + data.index,
  //         dur: 600,
  //         from: -pathLength + 'px',
  //         to: '0px',
  //         easing: Chartist.Svg.Easing.easeInOutQuad,
  //         // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
  //         fill: 'freeze'
  //       }
  //     };

  //     // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
  //     if (data.index !== 0) {
  //       animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
  //     }

  //     // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
  //     data.element.attr({
  //       'stroke-dashoffset': -pathLength + 'px'
  //     });

  //     // We can't use guided mode as the animations need to rely on setting begin manually
  //     // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate


  //     setTimeout(function () {  
  //       console.log('start');
  //       var emitter = Chartist.EventEmitter();
  //       data.element.animate(animationDefinition, false, emitter);
  //       emitter.addEventHandler('animationBegin', (e) => {
  //       console.log(e);
  //     });
  //     },2000)
  //   }


  // }

  // For the sake of the example we update the chart every time it's created with a delay of 8 seconds





}


function getPosition(chat) {

  var mom = chat.closest('.chartBox');
  chat.find('.ct-label').each(function (index, el) {
    var t = $(this);
    var num = +t.html();
    var txtDot = mom.find('.chartData').eq(index);

    txtDot.css('top', t.offset().top - mom.offset().top + 4);
    txtDot.css('left', t.offset().left - mom.offset().left + 4);

    if (num > 30) {
      txtDot.addClass('dot_big');
    } else if (num > 10 && num <= 30) {
      txtDot.addClass('dot_mid');
    } else {
      txtDot.addClass('dot_small');
    }
  })
}