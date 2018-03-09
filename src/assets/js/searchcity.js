export default function(){
var cityWrapper = document.querySelector('.city-wrapper-hook');
var cityScroller = document.querySelector('.scroller-hook');
var cities = document.querySelector('.cities-hook');
var shortcut = document.querySelector('.shortcut-hook');

var scroll;

var shortcutList = [];
var anchorMap = {};

function initCities() {
  var y = 0;
  var titleHeight = 28;
  var itemHeight = 44;

  var lists = '';
  var en = '<ul>';
  cityData.forEach(function (group) {
    var name = group.name;
    lists += '<div class="title">'+name+'</div>'; 
    lists += '<ul>';
    group.cities.forEach(function(g) {
      lists += '<li class="item" data-name="'+ g.name +'" data-id="'+ g.cityid +'"><span class="border-1px name">'+ g.name +'</span></li>';
    });
    lists += '</ul>';


    var name = group.name.substr(0, 1);
    en += '<li data-anchor="'+name+'" class="item">'+name+'</li>';
    var len = group.cities.length;
    anchorMap[name] = y;
    y -= titleHeight + len * itemHeight;

  });
  en += '</ul>';

  cities.innerHTML = lists;

  shortcut.innerHTML = en;
  // shortcut.style.top = (cityWrapper.clientHeight - shortcut.clientHeight) / 2 + 'px';

  scroll = new window.BScroll(cityWrapper, {
    probeType: 3
  });

  // scroll.on('scroll', function (pos) {
  //   console.log(Math.round(pos.y));
  // });

  scroll.scrollTo(0, 0);
}


//bind Event
function bindEvent() {
  var touch = {};
  var firstTouch;

  shortcut.addEventListener('touchstart', function (e) {

    var anchor = e.target.getAttribute('data-anchor');

    firstTouch = e.touches[0];
    touch.y1 = firstTouch.pageY;
    touch.anchor = anchor;

    scrollTo(anchor);

  });

  shortcut.addEventListener('touchmove', function (e) {

    firstTouch = e.touches[0];
    touch.y2 = firstTouch.pageY;

    var anchorHeight = 16;

    var delta = (touch.y2 - touch.y1) / anchorHeight | 0;

    var anchor = shortcutList[shortcutList.indexOf(touch.anchor) + delta];

    scrollTo(anchor);

    e.preventDefault();
    e.stopPropagation();

  });

  function scrollTo(anchor) {
    var maxScrollY = cityWrapper.clientHeight - cityScroller.clientHeight;

    var y = Math.min(0, Math.max(maxScrollY, anchorMap[anchor]));

    if (typeof y !== 'undefined') {
      scroll.scrollTo(0, y);
    }
  }
}

initCities();

bindEvent();
}