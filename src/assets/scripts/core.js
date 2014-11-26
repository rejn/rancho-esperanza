((window, document, undefined) => {

  /* global Modernizr */
  'use strict';

  class AddWidgets {

    constructor(window, document, widgetDataAttr) {

      this.window = window;
      this.document = document;
      this.widgetDataAttr = widgetDataAttr;

    }

    add() {

      let widgets = document.querySelectorAll(this.widgetDataAttr);

      for (let i = 0; i < widgets.length; ++i) {
        switch (widgets[i].dataset.widget) {
          case 'facebook':
            this.addFacebook(widgets[i]);
          break;
          case 'fundrazr':
            this.addFundrazr();
          break;
          case 'gmaps':
            if (900 < this.window.screen.width) {
              this.addGmaps(widgets[i]);
            }
          break;
        }
      }

    }

    addFacebook(el) {

      el.innerHTML = '<iframe src="//www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2Francho.esperanza.jiquilillo&amp;width=195&amp;height=95&amp;colorscheme=light&amp;show_faces=false&amp;header=true&amp;stream=true&amp;show_border=true" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:195px; height:95px;"></iframe>';

    }

    addFundrazr() {

      let fr = this.document.createElement('script');
      let head = this.document.querySelector('head');
      fr.src = 'http://static.fundrazr.com/widgets/loader.js';
      head.appendChild(fr);

    }

    addGmaps(el) {

      el.innerHTML = '<div class="Embed"><iframe class="Embed-inner" width="100%" height="100%" frameborder="0" src="//maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=+&amp;q=Rancho+Esperanza,+Jiquilillo,+Chinandega,+Nicaragua&amp;ie=UTF8&amp;hq=Rancho+Esperanza,&amp;hnear=Jiquilillo,+Chinandega,+Nicaragua&amp;t=m&amp;cid=7029103330845734291&amp;ll=12.734122,-87.442932&amp;spn=1.607365,1.771545&amp;z=9&amp;iwloc=A&amp;output=embed"></iframe></div>';

    }

  }

  // mustard cut?
  if ('querySelector' in document &&
      'addEventListener' in window &&
      Modernizr.dataset) {

    let addWidgets = new AddWidgets(window, document, '[data-widget]');

    // on page load
    window.addEventListener('load', () => {

      addWidgets.add();

    }, false);
  }
})(this, this.document);
