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
  };

}(this, this.document));