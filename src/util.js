/**
 * Substitute for Object.assign()
 * Modified from: https://stackoverflow.com/a/30498430
 *
 * @param {object} target - target object to merge to
 * @param {...object} objectsToMerge - arbitrary number of objects to merge into 'target'
 * @return {object} target merged object
 */
export function assign(target, ...objectsToMerge) {
  const retTarget = Object(target);
  for (let i = 0; i < objectsToMerge.length; i += 1) {
    const obj = objectsToMerge[i];
    const keys = Object.keys(obj);
    for (let j = 0; j < keys.length; j += 1) {
      retTarget[keys[j]] = obj[keys[j]];
    }
  }
  return retTarget;
}

/**
 * Ensure n is between min & max
 *
 * @param {number} value - number to clamp
 * @param {number} min - minimum
 * @param {number} max - maximum
 * @return {number} clampped value
 */
export function clamp(value, min, max) {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

/**
 * Converts a percentage (`0..1`) to a bar translateX
 * percentage (`-100%..0%`).
 *
 * @param {number} value - percentage to convert
 * @return {number} percentage
 */
export function toBarPerc(value) {
  return (-1 + value) * 100;
}

/**
 * Gets an increment to use based on status
 *
 * @param {number} status - current status of the progress bar
 * @return {number} increment
 */
export function randomInc(status) {
  if (status >= 0 && status < 0.2) {
    return 0.1;
  }
  if (status >= 0.2 && status < 0.5) {
    return 0.04;
  }
  if (status >= 0.5 && status < 0.8) {
    return 0.02;
  }
  if (status >= 0.8 && status < 0.99) {
    return 0.005;
  }
  return 0;
}

/**
 * Removes an element from the DOM.
 *
 * @param {HTMLElement} element - element to remove
 */
export function removeElement(element) {
  if (element && element.parentNode) {
    element.parentNode.removeChild(element);
  }
}

/**
 * Queues a function to be executed.
 *
 * @return {function}
 */
export const queue = (() => {
  const functionQueue = [];

  function next() {
    const fn = functionQueue.shift();
    if (fn) {
      fn(next);
    }
  }

  return (fn) => {
    functionQueue.push(fn);
    if (functionQueue.length === 1) {
      next();
    }
  };
})();
