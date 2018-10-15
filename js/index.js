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

  $('.clozBtn').click(function (e) {
    simpleHide($(this).closest('.popPage'));
    ChungTool.unLockScroll();
  })


  initPopPage();

  initFlipNumber();
})

function initFlipNumber() {

  $('.flip-number').each(function () {
    var text = $(this).text().trim();
    var html = '';
    for (var i = 0; i < text.length; i++) {
      var c = text.charAt(i);
      if (c === '.') {
        html = html + '<span class="flip-comma">.</span>';
      } else {
        html = html + '<span class="flip-digit">' + c + '</span>';
      }
    }
    $(this).html(html);
    $('.flip-digit').append('<span class="flip-stripe"></span>');
  })

}

function initPopPage() {
  $('.popBtn').click(function (e) {
    e.preventDefault();
    var popPage = $($(this).attr('href'));
    simpleShow(popPage);
    ChungTool.lockScroll();
  })
}

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
      if(index===2){
        return;
      }

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
      if(psnArr[index]){
        clearAnimation(psnArr[index]);
      }
    });


  function clearAnimation(index) {
    cancelRequestAnimFrame(pJSDom[index].pJS.fn.checkAnimFrame);
    cancelRequestAnimFrame(pJSDom[index].pJS.fn.drawAnimFrame);
    pJSDom[index].pJS.fn.particlesEmpty();
    pJSDom[index].pJS.fn.canvasClear();
  }
}


function initChart() {

  // var arr = $('#coinPlaning .cb1 .rate').map((index,el)=> {
  //   return +$(el).text()
  // }).get();

  var count1 = 0 ;
  var data1 =  $('#coinPlaning .cb1 .rate').map((index,el)=> {
    return +$(el).text()
  }).get();
  var data2 = $('#coinPlaning .cb2 .rate').map((index,el)=> {
    return +$(el).text()
  }).get();;


  TweenMax.set('.chatDataWrap .chartData',{autoAlpha:0})
  TweenMax.set('.chat01_sub',{autoAlpha:0})

  var chart3 = new Chartist.Pie('#chart03', {
    series: [20,19,8,8,45],
  }, {
    labelInterpolationFnc: function(value) {
      if(value=='45'){
        return ''
      }
      return value + '%';
    },
  });


  inView('#chart01').once('enter',function(){
    TweenMax.to('.chat01_sub',.8,{autoAlpha:1,delay:3})

    var tl = new TimelineMax();

    tl.set('ul.chat01_sub li',{autoAlpha:0})
    .set('#chart03 .ct-series',{autoAlpha:0})
    .set('#chart03 .ct-label',{autoAlpha:0})
    .set('.chat01_sub',{autoAlpha:1},3)
    .staggerTo('ul.chat01_sub li',.6,{autoAlpha:1},.6,'show')
    .staggerTo('#chart03 .ct-series',.6,{autoAlpha:1},.6,'show')
    .staggerTo('#chart03 .ct-label',.6,{autoAlpha:1},.6,'show')
    



    var chart = new Chartist.Pie('#chart01', {
      series: data1,
    }, {
      donut: true,
    });
  
      
    
    chart.on('draw', function (data) {
      drawFunc(data, $('#chart .cb1'))
    });

    chart.on('created', function(){
      chart.detach(); // it will detach resize and media query listeners
    });
  
    //then update the chart only when window.width() changes
    var width = $(window).width();
    $(window).resize(function() {
      if($(window).width() != width) {
        width = $(window).width(); // update the width width
        chart.update();
      }
    });
  })
  
  inView('#chart02').once('enter',function(){
    var chart2 = new Chartist.Pie('#chart02', {
      series: data2,
    }, {
      donut: true,
    });

    chart2.on('draw', function (data) {
      drawFunc(data, $('#chart .cb2'))
    });

    chart2.on('created', function(){
      chart2.detach(); // it will detach resize and media query listeners
    });
  
    //then update the chart only when window.width() changes
    var width = $(window).width();
    $(window).resize(function() {
      if($(window).width() != width) {
        width = $(window).width(); // update the width width
        chart2.update();
      }
    });
  })


  function drawFunc(data, chartBox) {
    
    var durring = .6;
    if (data.type === 'slice') {
      var pathLength = data.element._node.getTotalLength();

      // Set a dasharray that matches the path length as prerequisite to animate dashoffset
      data.element.attr({
        'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
      });
  
      // Create animation definition while also assigning an ID to the animation for later sync usage
      var animationDefinition = {
        'stroke-dashoffset': {
          id: 'anim' + data.index,
          dur: durring * 1000,
          from: -pathLength + 'px',
          to:  '0px',
          // easing: Chartist.Svg.Easing.easeOutQuint,
          // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
          fill: 'freeze'
        }
      };
  
      // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
      if(data.index !== 0) {
        animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
      }
  
      // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
      data.element.attr({
        'stroke-dashoffset': -pathLength + 'px'
      });
  
      // We can't use guided mode as the animations need to rely on setting begin manually
      // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
      data.element.animate(animationDefinition, false);

      
    }

    if (data.type === 'label') {

      data.element.animate({
        opacity: {
          from: 0,
          to: 0
        },
      }, false);

      if(data.index===0){
        count1=0;
        // TweenMax.killAll();
      }

      var point = chartBox.find('.chatDataWrap .chartData').eq(data.index);
      var txt = point.find('.txtBox');
      var num = +point.find('.rate').html();
      count1+=num/2;
      // if(count1/25<1){
      //   txt.css({'text-align':'left','left':'15px','bottom':'15px'});
      // }else if(count1/25<2){
      //   txt.css({'text-align':'left','left':'15px'});
      // }else if(count1/25<3){
      //   txt.css({'text-align':'right','right':'15px'});
      // }else{
      //   txt.css({'text-align':'right','right':'15px','bottom':'15px'});
      // }
// console.log(count1)
      var angleX = 20*Math.sin(count1*3.6* Math.PI / 180)
      var angleY = 20*Math.cos(count1*3.6* Math.PI / 180)
      
      if(angleX> 0 ){
        txt.css({'text-align':'left','left':angleX + 'px'});
      }else{
        txt.css({'text-align':'right','right':-angleX + 'px'});
      }
      if(angleY> 0 ){
        txt.css({'bottom':angleY + 'px'}); 
      }else{
        txt.css({'top': -angleY + 'px'});
      }



      count1+=num/2;
      // console.log(count1/25)
      // console.log('num: ', num);
      point.css('top', data.y);
      point.css('left', data.x);

      // console.log(count);
      if (num > 30) {
        point.addClass('dot_big');
      } else if (num > 10 && num <= 30) {
        point.addClass('dot_mid');
      } else {
        point.addClass('dot_small');
      }

      var time1 = durring;
      var time2 = durring*data.index+durring/2;
      TweenMax.fromTo(point,time1,{autoAlpha:0},{autoAlpha:1,delay:time2})
      TweenMax.from(point.find('.txtBox'),time1,{marginTop:10,delay:time2});
      var game = {score:0}
      // TweenLite.to(game, time1, {score:num, delay:time2,roundProps:"score", onUpdate:updateHandler});
      // function updateHandler() {
      //   point.find('.rate').html(game.score);
      // }
    }
  }

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