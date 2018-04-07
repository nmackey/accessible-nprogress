Testing
-------

    $ yarn
    $ yarn test

Releasing
---------

    $ yarn test
    $ update README & typings if needed
    $ bump package.json accessible-nprogress.js    # bump version numbers
    $ git release 0.1.1                            # release to github
    $ npm publish                                  # release to npm
    $ Update master:gh-pages branch                # update the site
