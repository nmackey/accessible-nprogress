Accessible NProgress
=========

[![Status](https://api.travis-ci.org/nmackey/accessible-nprogress.svg?branch=master)](http://travis-ci.org/nmackey/accessible-nprogress)
[![npm version](https://img.shields.io/npm/v/accessible-nprogress.png)](https://npmjs.org/package/accessible-nprogress "View this project on npm")
[![npm downloads](https://img.shields.io/npm/dm/accessible-nprogress.svg?style=flat-square)](http://npm-stat.com/charts.html?package=accessible-nprogress)

[![Tested with Jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![Tested with TestCafe](https://img.shields.io/badge/tested%20with-TestCafe-2fa4cf.svg)](https://github.com/DevExpress/testcafe)

![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
--- | --- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | 11+ ✔ |

> Minimalist accessible progress bar (no dependencies)

Slim accessible progress bars for Ajax'y applications. Inspired by Google, YouTube, and Medium.

Originally forked from https://github.com/rstacruz/nprogress

1.0.0+ has be rewritten and only supports IE 11+ & A+ spec promises but the API is essentially the same.

For a drop in replacement of the original nprogress with accessibility fixes and older browser support then use version [0.3.0](https://github.com/nmackey/accessible-nprogress/tree/v0.3.0)

Installation
------------

Using [npm](https://www.npmjs.org/package/accessible-nprogress).

    $ npm install --save accessible-nprogress

Using CDN:

```html
<script src="https://unpkg.com/accessible-nprogress/dist/accessible-nprogress.min.js"></script>
<link rel='stylesheet' href='https://unpkg.com/accessible-nprogress/dist/accessible-nprogress.min.css'/>
```

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

 * Add progress to your Ajax calls! Bind it to the jQuery or axios requests.

#### jQuery

~~~ js
var requests = 0;
$(document).ajaxStart(function() {
  if (requests === 0) {
    NProgress.start();
  }
  requests++;
});
$(document).ajaxStop(function() {
  requests--;
  if (requests === 0) {
    NProgress.done();
  }
});
~~~

#### Axios

~~~ js
var requests = 0;
axios.interceptors.request.use(function (config) {
    if (requests === 0) {
      NProgress.start();
    }
    requests++;
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

axios.interceptors.response.use(function (response) {
    requests--;
    if (requests === 0) {
      NProgress.done();
    }
    return response;
  }, function (error) {
    return Promise.reject(error);
  });
~~~

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

__Promise:__ By passing A+ spec promises to `promise()`, it will automatically track progress for those promises as they complete.

~~~ js
NProgress.promise(new Promise((resolve) => setTimeout(resolve(), 1000)));
NProgress.promise(new Promise((resolve) => setTimeout(resolve(), 500)));
~~~

__Get the status value:__ To get the status value, use `.status`

__Get the settings value:__ To get the settings value, use `.settings`

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

#### `barSelector` and `spinnerSelector`
specify this to change the selectors for the bar and spinner. (default: `div.bar` & `div.spinner`)

~~~ js
NProgress.configure({ spinnerSelector: 'div.spin' });
~~~

#### `barLabel` and `spinnerLabel`
specify this to change the aria-label for the bar and spinner. (default: `processing request`)

~~~ js
NProgress.configure({ barLabel: 'fetching data' });
~~~

Customization
-------------

Just edit `dist/accessible-nprogress.css` to your liking. Tip: you probably only want to find and replace occurrences of `#29d`.

The included CSS file is pretty minimal... in fact, feel free to scrap it and make your own!

Thanks
-------

__Bugs and requests__: submit them through the project's issues tracker.<br>
[![Issues](http://img.shields.io/github/issues/nmackey/accessible-nprogress.svg)]( https://github.com/nmackey/accessible-nprogress/issues )

[default template]: https://github.com/nmackey/nprogress/blob/master/src/index.js#L14
[Turbolinks]: https://github.com/rails/turbolinks
[accessible-nprogress.min.js]: https://github.com/nmackey/accessible-nprogress/blob/master/dist/accessible-nprogress.min.js
[accessible-nprogress.min.css]: https://github.com/nmackey/accessible-nprogress/blob/master/dist/accessible-nprogress.min.css

Thanks
------

**Acessible NProgress** © 2021, Nicholas Mackey. Released under the [MIT License].<br>
Authored and maintained by Nicholas Mackey with help from [contributors].

[MIT License]: https://mit-license.org/
[contributors]: https://github.com/nmackey/accessible-nprogress/contributors

[![](https://img.shields.io/github/followers/nmackey.svg?style=social&label=@nmackey)](https://github.com/nmackey) &nbsp;
[![](https://img.shields.io/twitter/follow/nicholas_mackey.svg?style=social&label=@nmackey)](https://twitter.com/nicholas_mackey)
