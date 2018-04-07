import { assign, clamp, toBarPerc, queue, removeElement, randomInc } from './util';
import './styles.css';

const DEFAULTS = {
  minimum: 0.08,
  easing: 'linear',
  speed: 200,
  trickle: true,
  trickleSpeed: 200,
  showSpinner: true,
  barSelector: 'div.bar',
  spinnerSelector: 'div.spinner',
  parent: 'body',
  template: `
    <div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="1">
      <div class="peg"></div>
    </div>
    <div class="spinner" role="progressbar" aria-valuemin="0" aria-valuemax="1">
      <div class="spinner-icon"></div>
    </div>
  `,
};

const NProgress = () => {
  const localSettings = DEFAULTS;
  let localStatus = null;
  let initialPromises = 0;
  let currentPromises = 0;

  return {
    /**
     * Updates configuration.
     *
     * @param {object} options - options to override/set
     * @return {object} The NProgress object.
     */
    configure(options) {
      assign(localSettings, options);
      return this;
    },

    /**
     * Sets the progress bar status, where `n` is a number from `0.0` to `1.0`.
     *
     * @param {number} value - progress to set
     * @return {object} The NProgress object.
     */
    set(value) {
      const clamppedValue = clamp(value, localSettings.minimum, 1);
      localStatus = (clamppedValue === 1 ? null : clamppedValue);

      const progress = this.render();

      // Repaint
      progress.offsetWidth; // eslint-disable-line no-unused-expressions

      queue((next) => {
        // Add transition
        const { speed, easing } = localSettings;
        const bar = progress.querySelector(localSettings.barSelector);
        bar.setAttribute('aria-valuenow', clamppedValue);
        bar.style.transform = `translate3d(${toBarPerc(clamppedValue)}%,0,0)`;
        bar.style.transition = `all ${speed}ms ${easing}`;

        if (clamppedValue === 1) {
          // Fade out
          progress.style.transition = 'none';
          progress.style.opacity = 1;

          // Repaint
          progress.offsetWidth; // eslint-disable-line no-unused-expressions

          setTimeout(() => {
            progress.style.transition = `all ${speed}ms linear`;
            progress.style.opacity = 0;
            setTimeout(() => {
              this.remove();
              next();
            }, speed);
          }, speed);
        } else {
          setTimeout(next, speed);
        }
      });

      return this;
    },

    /**
     * Shows the progress bar.
     * This is the same as setting the status to 0%, except that it doesn't go backwards.
     *
     * @return {object} The NProgress object.
     */
    start() {
      if (!localStatus) {
        this.set(0);
      }

      const work = () => {
        setTimeout(() => {
          if (!localStatus) {
            return;
          }
          this.inc();
          work();
        }, localSettings.trickleSpeed);
      };

      if (localSettings.trickle) {
        work();
      }

      return this;
    },

    /**
     * @return {boolean} If there is curent progress.
     */
    isStarted() {
      return typeof localStatus === 'number';
    },

    /**
     * Hides the progress bar.
     * This is the *sort of* the same as setting the status to 100%, with the
     * difference being `done()` makes some placebo effect of some realistic motion.
     *
     * @param {boolean} force - show the progress bar complete even if its hidden
     * @return {object} The NProgress object.
     */
    done(force) {
      if (!force && !localStatus) {
        return this;
      }

      const halfRandom = 0.5 * Math.random();
      return this.inc(0.3 + halfRandom).set(1);
    },

    /**
     * Increments progress bar by given amount.
     *
     * @param {number} [amount] - amount to increment the progress bar by
     * @return {object} The NProgress object.
     */
    inc(amount = randomInc(localStatus)) {
      if (!localStatus) {
        return this.start();
      }

      const clamppedStatus = clamp(localStatus + amount, 0, 0.994);
      return this.set(clamppedStatus);
    },

    /**
     * Renders the progress bar markup based on the `template` setting.
     *
     * @return {HTMLElement} The element rendered.
     */
    render() {
      if (this.isRendered()) {
        return document.getElementById('nprogress');
      }

      document.documentElement.classList.add('nprogress-busy');

      const progress = document.createElement('div');
      progress.id = 'nprogress';
      progress.innerHTML = localSettings.template;

      const perc = this.isStarted() ? '-100' : toBarPerc(localStatus || 0);
      const bar = progress.querySelector(localSettings.barSelector);
      bar.style.transform = `translate3d(${perc}%,0,0)`;
      bar.style.transition = 'all 0 linear';

      if (!localSettings.showSpinner) {
        const spinner = progress.querySelector(localSettings.spinnerSelector);
        if (spinner) {
          removeElement(spinner);
        }
      }

      const parent = document.querySelector(localSettings.parent);
      if (parent !== document.body) {
        parent.classList.add('nprogress-custom-parent');
      }

      parent.appendChild(progress);
      return progress;
    },

    /**
     * Removes the element. Opposite of render().
     */
    remove() {
      document.documentElement.classList.remove('nprogress-busy');
      document.querySelector(localSettings.parent).classList.remove('nprogress-custom-parent');
      const progress = document.getElementById('nprogress');
      if (progress) {
        removeElement(progress);
      }
    },

    /**
     * @return {boolean} If the progress bar is rendered.
     */
    isRendered() {
      return !!document.getElementById('nprogress');
    },

    /**
     * Waits for all supplied promises and increases the progress as the promises resolve.
     *
     * @param $promise Promise
     */
    promise($promise) {
      if (currentPromises === 0) {
        this.start();
      }

      initialPromises += 1;
      currentPromises += 1;

      const promiseResolution = () => {
        currentPromises -= 1;
        if (currentPromises === 0) {
          initialPromises = 0;
          this.done();
        } else {
          this.set((initialPromises - currentPromises) / initialPromises);
        }
      };

      $promise
        .then(promiseResolution)
        .catch(promiseResolution);

      return this;
    },

    get status() {
      return localStatus;
    },

    get settings() {
      return localSettings;
    },
  };
};

// export using 'module.exports' so the object on the window doesn't have 'default'
module.exports = NProgress();
