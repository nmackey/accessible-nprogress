import NProgress from '../index';

const defaults = {
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

jest.useFakeTimers();

describe('Accessible NProgress', () => {
  afterEach(() => {
    NProgress.done();
    const element = document.getElementById('nprogress');
    if (element) {
      element.remove();
    }
    NProgress.configure(defaults);
  });

  it('should have defaults', () => {
    expect(NProgress.settings).toEqual(defaults);
    expect(NProgress.status).toBeNull();
  });

  describe('set', () => {
    it('should render nprogress', () => {
      NProgress.set(0);
      expect(document.getElementById('nprogress')).toBeDefined();
      expect(document.querySelector('#nprogress .bar')).toBeDefined();
      expect(document.querySelector('#nprogress .peg')).toBeDefined();
      expect(document.querySelector('#nprogress .spinner')).toBeDefined();
    });

    it('should appear and disappear', () => {
      NProgress.configure({ speed: 10 });
      NProgress.set(0).set(1);
      expect(document.getElementById('nprogress')).toBeDefined();
      jest.runAllTimers();
      expect(document.getElementById('nprogress')).toBeNull();
    });

    it('should respect minimum', () => {
      NProgress.set(0);
      expect(NProgress.status).toEqual(defaults.minimum);
    });

    it('should clamp to minimum', () => {
      NProgress.set(-100);
      expect(NProgress.status).toEqual(defaults.minimum);
    });

    it('must clamp to maximum', () => {
      NProgress.set(456);
      expect(NProgress.status).toBeNull();
    });
  });

  describe('start', () => {
    it('should render', () => {
      NProgress.start();
      expect(document.getElementById('nprogress')).toBeDefined();
    });

    it('should respect minimum', () => {
      NProgress.start();
      expect(NProgress.status).toEqual(defaults.minimum);
    });

    it('should be attached to specified parent when parent is already in the DOM', () => {
      document.body.innerHTML = '<div id="test"></div>';
      NProgress.configure({ parent: '#test' });
      NProgress.start();
      expect(document.getElementById('nprogress').parentElement).toEqual(document.getElementById('test'));
      expect(document.getElementById('test').classList[0]).toEqual('nprogress-custom-parent');
    });

    it('should be attached to specified parent when parent is delayed being rendered to the DOM', () => {
      NProgress.configure({ parent: '#test' });
      NProgress.start();
      document.body.innerHTML = '<div id="test"></div>';

      expect(document.getElementById('nprogress')).toBeNull();

      jest.advanceTimersByTime(1000);

      expect(document.getElementById('nprogress').parentElement).toEqual(document.getElementById('test'));
      expect(document.getElementById('test').classList[0]).toEqual('nprogress-custom-parent');
    });

    it('should increment status until done', () => {
      NProgress.start();
      expect(NProgress.status).toEqual(defaults.minimum);
      jest.runOnlyPendingTimers();
      expect(NProgress.status).toBeGreaterThan(defaults.minimum);
      NProgress.done();
      jest.runAllTimers();
      expect(NProgress.status).toBeNull();
    });
  });

  describe('done', () => {
    it('should not render without start', () => {
      NProgress.done();
      expect(document.getElementById('nprogress')).toBeNull();
    });

    it('done(true) should render', () => {
      NProgress.done(true);
      expect(document.getElementById('nprogress')).toBeDefined();
    });
  });

  describe('remove', () => {
    it('should be removed from the parent', () => {
      document.body.innerHTML = '<div id="test"></div>';
      NProgress.configure({ parent: '#test' });
      NProgress.set(1);
      expect(document.getElementById('nprogress')).toBeDefined();
      expect(document.getElementById('test').classList[0]).toEqual('nprogress-custom-parent');

      NProgress.remove();

      expect(document.getElementById('nprogress')).toBeNull();
      expect(document.getElementById('test').classList.length).toEqual(0);
    });
  });

  describe('inc', () => {
    it('should render', () => {
      NProgress.inc();
      expect(document.getElementById('nprogress')).toBeDefined();
    });

    it('should start with minimum', () => {
      NProgress.inc();
      expect(NProgress.status).toEqual(NProgress.settings.minimum);
    });

    it('should increment', () => {
      NProgress.start();
      const start = NProgress.status;

      NProgress.inc();
      expect(NProgress.status).toBeGreaterThan(start);
    });

    it('should never reach 1.0', () => {
      for (let i = 0; i < 100; i += 1) {
        NProgress.inc();
      }
      expect(NProgress.status).toBeLessThan(1.0);
    });
  });

  describe('configure', () => {
    it('should override defaults', () => {
      NProgress.configure({ minimum: 0.5 });
      expect(NProgress.settings.minimum).toEqual(0.5);
    });
  });

  describe('configure(showSpinner)', () => {
    it('should render spinner by default', () => {
      NProgress.start();
      expect(document.querySelector('#nprogress .spinner')).toBeDefined();
    });

    it('should hide (on false)', () => {
      NProgress.configure({ showSpinner: false });
      NProgress.start();
      expect(document.querySelector('#nprogress .spinner')).toBeNull();
    });
  });

  describe('promise', () => {
    it('should set status for promises added', () => {
      NProgress.promise(Promise.resolve());
      NProgress.promise(Promise.resolve());
      expect(NProgress.status).toEqual(defaults.minimum);
      expect(document.getElementById('nprogress')).toBeDefined();
    });
  });
});
