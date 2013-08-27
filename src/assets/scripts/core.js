(function(window, document, undefined) {

  'use strict';

  window.onload = function() {

    // delay facebook loading
    var facebook = document.getElementById('facebook');
    if (facebook) {
      facebook.innerHTML = '<iframe src="//www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2Francho.esperanza.jiquilillo&amp;width=234&amp;height=80&amp;colorscheme=light&amp;show_faces=false&amp;border_color&amp;stream=false&amp;header=true" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:234px; height:80px;" allowtransparency="true"></iframe>';
    }

    // delay fundrazr (and restrict to ie8+)
    var fundrazr = document.getElementById('fundrazr');
    if ('querySelector' in document && fundrazr) {
      var fr = document.createElement('script');
      fr.async = true;
      fr.src = 'http://static.fundrazr.com/widgets/loader.js';
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(fr, s);
    }

    // delay google maps and only load on wide viewports.
    var gmaps = document.getElementById('gmaps');
    if (gmaps && 900 < window.screen.width) {
      gmaps.innerHTML = '<div class="embed"><iframe class="embed__inner" width="100%" height="100%" frameborder="0" src="//maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=+&amp;q=Rancho+Esperanza,+Jiquilillo,+Chinandega,+Nicaragua&amp;ie=UTF8&amp;hq=Rancho+Esperanza,&amp;hnear=Jiquilillo,+Chinandega,+Nicaragua&amp;t=m&amp;cid=7029103330845734291&amp;ll=12.734122,-87.442932&amp;spn=1.607365,1.771545&amp;z=9&amp;iwloc=A&amp;output=embed"></iframe></div>';
    }
  };

}(this, this.document));