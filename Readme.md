Accessible NProgress
=========

[![Status](https://api.travis-ci.org/nmackey/accessible-nprogress.svg?branch=master)](http://travis-ci.org/nmackey/accessible-nprogress)
[![npm version](https://img.shields.io/npm/v/accessible-nprogress.png)](https://npmjs.org/package/accessible-nprogress "View this project on npm")
[![jsDelivr Hits](https://data.jsdelivr.com/v1/package/npm/accessible-nprogress/badge?style=rounded)](https://www.jsdelivr.com/package/npm/accessible-nprogress)

Forked from https://github.com/rstacruz/nprogress

I have left most of the original README intact for usage purposes, but have not tested with most of the integrations listed below.

> Minimalist progress bar

Slim progress bars for Ajax'y applications. Inspired by Google, YouTube, and Medium.

Installation
------------

Add [accessible-nprogress.min.js] and [accessible-nprogress.min.css] to your project.

```html
<script src='lib/accessible-nprogress.min.js'></script>
<link rel='stylesheet' href='lib/accessible-nprogress.min.css'/>
```

Accessible NProgress is available via [npm].

    $ npm install --save accessible-nprogress

[npm]: https://www.npmjs.org/package/accessible-nprogress

Basic usage
-----------

Simply call `start()` and `done()` to control the progress bar.

~~~ js
NProgress.start();
NProgress.done();
~~~

### Turbolinks (version 5+)
Ensure you're using Turbolinks 5+, and use this: (explained [here](https://github.com/rstacruz/nprogress/issues/8#issuecomment-239107109))

~~~ js
$(document).on('turbolinks:click', function() {
  NProgress.start();
});
$(document).on('turbolinks:render', function() {
  NProgress.done();
  NProgress.remove();
});
~~~

### Turbolinks (version 3 and below)
Ensure you're using Turbolinks 1.3.0+, and use this: (explained [here](https://github.com/rstacruz/nprogress/issues/8#issuecomment-23010560))

~~~ js
$(document).on('page:fetch',   function() { NProgress.start(); });
$(document).on('page:change',  function() { NProgress.done(); });
$(document).on('page:restore', function() { NProgress.remove(); });
~~~

### Pjax
Try this: (explained [here](https://github.com/rstacruz/nprogress/issues/22#issuecomment-36540472))

~~~ js
$(document).on('pjax:start', function() { NProgress.start(); });
$(document).on('pjax:end',   function() { NProgress.done();  });
~~~

Ideas
-----

 * Add progress to your Ajax calls! Bind it to the jQuery(3+) `ajaxStart` and `ajaxStop` events.

 * Make a fancy loading bar even without Turbolinks/Pjax! Bind it to `$(document).ready` and `$(window).load`.

Advanced usage
--------------

__Percentages:__ To set a progress percentage, call `.set(n)`, where *n* is a number between `0..1`.

~~~ js
NProgress.set(0.0);     // Sorta same as .start()
NProgress.set(0.4);
NProgress.set(1.0);     // Sorta same as .done()
~~~

__Incrementing:__ To increment the progress bar, just use `.inc()`. This increments it with a random amount. This will never get to 100%: use it for every image load (or similar).

~~~ js
NProgress.inc();
~~~

If you want to increment by a specific value, you can pass that as a parameter:

~~~ js
NProgress.inc(0.2);    // This will get the current status value and adds 0.2 until status is 0.994
~~~

__Force-done:__ By passing `true` to `done()`, it will show the progress bar even if it's not being shown. (The default behavior is that *.done()* will not do anything if *.start()* isn't called)

~~~ js
NProgress.done(true);
~~~

__Get the status value:__ To get the status value, use `.status`

Configuration
-------------

#### `minimum`
Changes the minimum percentage used upon starting. (default: `0.08`)

~~~ js
NProgress.configure({ minimum: 0.1 });
~~~

#### `template`
You can change the markup using `template`. To keep the progress bar working, keep an element with `class='bar'` in there. See the [default template] for reference.

~~~ js
NProgress.configure({
  template: "<div class='....'>...</div>"
});
~~~

#### `easing` and `speed`
Adjust animation settings using *easing* (a CSS easing string) and *speed* (in ms). (default: `ease` and `200`)

~~~ js
NProgress.configure({ easing: 'ease', speed: 500 });
~~~

#### `trickle`
Turn off the automatic incrementing behavior by setting this to `false`. (default: `true`)

~~~ js
NProgress.configure({ trickle: false });
~~~

#### `trickleSpeed`
Adjust how often to trickle/increment, in ms.

~~~ js
NProgress.configure({ trickleSpeed: 200 });
~~~

#### `showSpinner`
Turn off loading spinner by setting it to false. (default: `true`)

~~~ js
NProgress.configure({ showSpinner: false });
~~~

#### `parent`
specify this to change the parent container. (default: `body`)

~~~ js
NProgress.configure({ parent: '#container' });
~~~

Customization
-------------

Just edit `accessible-nprogress.css` to your liking. Tip: you probably only want to find and replace occurrences of `#29d`.

The included CSS file is pretty minimal... in fact, feel free to scrap it and make your own!

Resources
---------

 * [New UI Pattern: Website Loading Bars](http://www.usabilitypost.com/2013/08/19/new-ui-pattern-website-loading-bars/) (usabilitypost.com)

Thanks
-------

__Bugs and requests__: submit them through the project's issues tracker.<br>
[![Issues](http://img.shields.io/github/issues/nmackey/accessible-nprogress.svg)]( https://github.com/nmackey/accessible-nprogress/issues )

[default template]: https://github.com/nmackey/nprogress/blob/master/src/index.js#L14
[Turbolinks]: https://github.com/rails/turbolinks
[accessible-nprogress.min.js]: https://github.com/nmackey/accessible-nprogress/blob/master/lib/accessible-nprogress.min.js
[accessible-nprogress.min.css]: https://github.com/nmackey/accessible-nprogress/blob/master/lib/accessible-nprogress.min.css

Thanks
------

**Acessible NProgress** © 2018, Nicholas Mackey. Released under the [MIT License].<br>
Authored and maintained by Nicholas Mackey with help from [contributors].

[MIT License]: https://mit-license.org/
[contributors]: https://github.com/nmackey/accessible-nprogress/contributors

[![](https://img.shields.io/github/followers/nmackey.svg?style=social&label=@nmackey)](https://github.com/nmackey) &nbsp;
[![](https://img.shields.io/twitter/follow/nicholas_mackey.svg?style=social&label=@nmackey)](https://twitter.com/nicholas_mackey)
