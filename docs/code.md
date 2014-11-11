# Frontend Guidelines

Use [.editorconfig](http://editorconfig.org/) for consistent formatting styles across file formats.

## HTML and CSS

### Styleguide

Adhere to the [SuitCSS HTML and CSS styleguide](https://github.com/suitcss/suit/blob/master/doc/STYLE.md).

### Architecture

Follow the [SuitCSS design principles](https://github.com/suitcss/suit/blob/master/doc/design-principles.md) and use the [SuitCSS naming conventions](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md).

### Polyfiller and postprocessor

Use [PostCSS](https://github.com/postcss/postcss) as a polyfiller for the following CSS specifications:

* [CSS Custom Media Queries](http://dev.w3.org/csswg/mediaqueries/#custom-mq).
* [CSS Custom Properties for Cascading Variables Module](http://dev.w3.org/csswg/css-variables/).
* [CSS Values and Units Module (calc notation)](http://www.w3.org/TR/css3-values/#calc-notation).
* [CSS Color Module Level 4 (color() function)](http://dev.w3.org/csswg/css-color/#modifying-colors).
* [CSS Color Module Level 4 (gray() function)](http://dev.w3.org/csswg/css-color/#grays).

Use [PostCSS](https://github.com/postcss/postcss) to inline CSS files.

Use [Autoprefixer](https://github.com/postcss/autoprefixer) (as a postcss plugin) to handle vendor prefixes.

#### Example of tools in use

```css
/** @define ComponentName; use strict */

/**
 * ComponentName
 *
 * Description of component
 */

@keyframes component-name-animation-name {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.ComponentName {
  display: flex;
}

.ComponentName::after {
  content 'x';
}

@support (hyphens) {
  hyphens: auto;
  text-align: justify;
}

@media (--md-viewport) {
  .ComponentName:hover {
    width: calc(2 * var(--size-gutter))
  }
}

.ComponentName-descendantName {
  animation: component-name-animation-name 1.5s ease-out 0s infinite;
}

.ComponentName-descendantName.is-active {
  flex: 1;
}

/**
 * modifierName
 *
 * Description of modifier e.g. to illustrate
 * sandboxing/encapsulating component modifiers
 */

.ComponentName--modifierName .ComponentName-descendantName {
  color: var(--color-yellow);
}
```

### Naming of descendants

Keep the naming of descendants consistent across components:

* Use `inner` rather than `wrapper` if an extra element is needed.
* Use `title`, `subTitle` and `body` (rather than `heading` and `content`) to delineate the main content.
* Use `content` to wrap content only when the component also contains presentational mark-up.
* Use `summary` and `details` for revealed content.
* Use `items` for collections.
* Use `item` for elements within a collection.
* Use `media` for images and video.
* Use `<sub component name>` to wrap sub components.

#### Example

```html
<section class="ComponentName">
  <div class="ComponentName-inner">
    <div class="ComponentName-content">
      <div class="ComponentName-summary">
        <div class="ComponentName-audioPlayer" data-region="audio-player"></div>
          <h1 class="ComponentName-title">{{title}}</h1>
          <img alt="{{alt}}" class="ComponentName-media" src="{{src}}">
        </div>
        <div class="ComponentName-details">
          <p class="ComponentName-body">{{body}}</p>
          <div class="ComponentName-button">
            <button class="Button Button--primary">{{link}}</button>
          </div>
        </div>
      </div>
      <ul class="ComponentName-items">
        <li class="ComponentName-item"><a href="ComponentName-itemInner">{{link}}</a></li>
        <li class="ComponentName-item"><a href="ComponentName-itemInner">{{link}}</a></li>
      </ul>
    </div>
    <div class="ComponentName-pulse">
      <span class="ComponentName-pulseItem"></span>
      <span class="ComponentName-pulseItem"></span>
    </div>
  </div>
</section>
```

## JavaScript

### Styleguide

Adhere to the [Google JavaScript Style Guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml).
