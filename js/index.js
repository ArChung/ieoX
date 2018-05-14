$(document).ready(function () {

  // initLoading();
  initChart();
  initParticleBg();

})

function initLoading() {
  $('.loadingFirst').waitForImages({
    finished: function () {
      // $('#loading').find('.loadingTxt').html('100');
      // simpleHide($('.loadingPage'), 0);
      // _gaPV('index');
      // $('.mainContainer').removeClass('hide');
      // $('.ci').removeClass('hide');
      // playAni(getChannelString());
    },
    each: function (loaded, count, success) {
      var r = Math.floor(loaded / count * 100);
      // console.log(loaded,count)
      // $('.loadingPage').find('.txt').html(r + '%');

    },
    waitForAll: true
  });
}


function initParticleBg() {
  particlesJS.load('indexParticleBg', 'js/indexParticleBg-config.json', function () {
    console.log('callback - particles.js config loaded');
  });

  particlesJS.load('featureParticleBg', 'js/featureParticleBg-config.json', function () {
    console.log('callback - particles.js config loaded');
  });

  particlesJS.load('teamParticleBg', 'js/indexParticleBg-config.json', function () {
    console.log('callback - particles.js config loaded');
  });

  particlesJS.load('chartParticleBg', 'js/featureParticleBg-config.json', function () {
    console.log('callback - particles.js config loaded');
  });
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