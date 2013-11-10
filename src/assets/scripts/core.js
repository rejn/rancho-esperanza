(function(window, document, undefined) {

  /* global Modernizr */
  'use strict';

  // mustard cut?
  if ('querySelector' in document &&
      'addEventListener' in window &&
      Modernizr.dataset) {

    // on dom ready
    window.addEventListener('DOMContentLoaded', function() {

      // get node lists
      var widows = document.querySelectorAll('p, a, [data-widow]');

      // process widows
      for (var c = 0; c < widows.length; ++c) {
        widows[c].innerHTML = widows[c].innerHTML.replace(/\s([^\s<]{0,10})\s*$/,'&nbsp;$1');
      }
    }, false);

    // on page load
    window.addEventListener('load', function() {

      // get nodelists
      var widgets = document.querySelectorAll('[data-widget]'),
        head = document.querySelector('head');

      // process widgets
      for (var i = 0; i < widgets.length; ++i) {

        switch (widgets[i].dataset.widget) {
          case "facebook":
            widgets[i].innerHTML = '<iframe src="//www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2Francho.esperanza.jiquilillo&amp;width=195&amp;height=95&amp;colorscheme=light&amp;show_faces=false&amp;header=true&amp;stream=true&amp;show_border=true" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:195px; height:95px;"></iframe>';
            break;
          case "gmaps":
            if (900 < window.screen.width) {
              widgets[i].innerHTML = '<div class="embed"><iframe class="embed__inner" width="100%" height="100%" frameborder="0" src="//maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=+&amp;q=Rancho+Esperanza,+Jiquilillo,+Chinandega,+Nicaragua&amp;ie=UTF8&amp;hq=Rancho+Esperanza,&amp;hnear=Jiquilillo,+Chinandega,+Nicaragua&amp;t=m&amp;cid=7029103330845734291&amp;ll=12.734122,-87.442932&amp;spn=1.607365,1.771545&amp;z=9&amp;iwloc=A&amp;output=embed"></iframe></div>';
            }
            break;
          case "fundrazr":
            var fr = document.createElement('script');
            fr.src = 'http://static.fundrazr.com/widgets/loader.js';
            head.appendChild(fr);
            break;
         }
      }
    }, false);
  }
}(this, this.document));
