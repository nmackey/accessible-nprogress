export as namespace NProgress;

/**
 * Configuration object for accessible-nprogress.
 */
export interface Settings {
    /** Changes the minimum percentage used upon starting. (default: 0.08) */
    minimum?: number;
    /** Adjust animation easing (a CSS easing string). (default: 'linear') */
    easing?: 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | string;
    /** Adjust animation speed (in ms). (default: 200) */
    speed?: number;
    /** Turn off the automatic incrementing behavior by setting this to false. (default: true) */
    trickle?: boolean;
    /** Adjust how often to trickle/increment, in ms. (default: 200) */
    trickleSpeed?: number;
    /** Turn off loading spinner by setting it to false. (default: true) */
    showSpinner?: boolean;
    /** Specify the selector for the progress bar element in the template. (default: 'div.bar') */
    barSelector?: string;
    /** Specify the selector for the spinner element in the template. (default: 'div.spinner') */
    spinnerSelector?: string;
    /** Specify this to change the parent container. (default: 'body') */
    parent?: string;
    /** You can change the markup using template. To keep the progress bar working, keep an element with class='bar' in there. See the default template for reference. */
    template?: string;
}

export interface NProgress {
    /**
     * Current progress (0 - 1.0).
     */
    status: number;

    /**
     * Current settings object.
     */
    settings: Settings;

    /**
     * Updates configuration.
     *
     * @param {object} options - options to override/set
     * @return {object} The NProgress object.
     */
    configure(options: Settings): this;

    /**
     * Sets the progress bar status, where `n` is a number from `0.0` to `1.0`.
     *
     * @param {number} value - progress to set
     * @return {object} The NProgress object.
     */
    set(value: number): this;

    /**
     * Shows the progress bar.
     * This is the same as setting the status to 0%, except that it doesn't go backwards.
     *
     * @return {object} The NProgress object.
     */
    start(): this;

    /**
     * Hides the progress bar.
     * This is the *sort of* the same as setting the status to 100%, with the
     * difference being `done()` makes some placebo effect of some realistic motion.
     *
     * @param {boolean} force - show the progress bar complete even if its hidden
     * @return {object} The NProgress object.
     */
    done(force?: boolean): this;

    /**
     * Increments progress bar by given amount.
     *
     * @param {number} [amount] - amount to increment the progress bar by
     * @return {object} The NProgress object.
     */
    inc(amount?: number): this;

    /**
     * Removes the element. Opposite of render().
     */
    remove(): void;

    /**
     * Waits for all supplied promises and increases the progress as the promises resolve.
     *
     * @param $promise Promise
     * @return {object} The NProgress object.
     */
    promise($promise: Promise<any>): this;
}

declare const nprogress: NProgress

export default nprogress;
