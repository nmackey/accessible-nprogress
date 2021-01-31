import {
  assign, clamp, toBarPerc, queue, removeElement, randomInc,
} from '../util';

describe('Accessible NProgress Utils', () => {
  describe('assign', () => {
    let target;
    let merge;
    beforeEach(() => {
      target = {
        foo: 'bar',
        one: 'test',
      };
      const object = {
        one: 'test1',
        two: 'test2',
      };
      merge = assign(target, object);
    });
    it('should retain keys & values not in object', () => {
      expect(merge.foo).toEqual('bar');
    });

    it('should append keys & values to target', () => {
      expect(merge.two).toEqual('test2');
    });

    it('should override existing keys & values in target', () => {
      expect(merge.one).toEqual('test1');
    });

    it('should bet the same object', () => {
      expect(merge === target).toBeTruthy();
    });
  });

  describe('clamp', () => {
    it('should return min if value is less than min', () => {
      expect(clamp(0.5, 0.6, 0.9)).toEqual(0.6);
    });

    it('should return value if value is equal to min', () => {
      expect(clamp(0.6, 0.6, 0.9)).toEqual(0.6);
    });

    it('should return max if value is greater than max', () => {
      expect(clamp(1.0, 0.6, 0.9)).toEqual(0.9);
    });

    it('should return value if value is equal to max', () => {
      expect(clamp(0.9, 0.6, 0.9)).toEqual(0.9);
    });

    it('should return value if greater than min and less than max', () => {
      expect(clamp(0.7, 0.6, 0.9)).toEqual(0.7);
    });
  });

  describe('toBarPerc', () => {
    it('should convert to negative percentage', () => {
      expect(toBarPerc(0.5)).toEqual(-50);
      expect(toBarPerc(0.0)).toEqual(-100);
      expect(toBarPerc(1.0)).toEqual(0);
    });
  });

  describe('randomInc', () => {
    it('should return a "random" increment based on status', () => {
      expect(randomInc(0)).toEqual(0.1);
      expect(randomInc(0.19)).toEqual(0.1);
      expect(randomInc(0.2)).toEqual(0.04);
      expect(randomInc(0.49)).toEqual(0.04);
      expect(randomInc(0.5)).toEqual(0.02);
      expect(randomInc(0.79)).toEqual(0.02);
      expect(randomInc(0.8)).toEqual(0.005);
      expect(randomInc(0.98)).toEqual(0.005);
      expect(randomInc(0.99)).toEqual(0);
      expect(randomInc(-0.01)).toEqual(0);
    });
  });

  describe('removeElement', () => {
    beforeEach(() => {
      document.body.innerHTML = '<div id="test"></div>';
    });

    it('should remove the element from the DOM', () => {
      removeElement(document.getElementById('test'));
      expect(document.getElementById('test')).toBeNull();
    });
  });

  describe('queue', () => {
    it('should execute the queued function', () => {
      let counter = 0;
      const addOne = () => {
        counter += 1;
      };
      queue(addOne);
      expect(counter).toEqual(1);
    });
  });
});
