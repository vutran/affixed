import { throttle } from 'lodash';

export default class affixed {
  constructor(options = {}) {
    // merge options
    const DEFAULTS = {
      element: null,
      offset: 0,
      position: 'fixed', // options: 'absolute', 'fixed', 'mirror'
      throttle: 5,
    };
    this.options = Object.assign({}, DEFAULTS, options);
    // create mirror if necessary
    if (this.options.position === 'mirror') {
      this.createMirror();
    }
    // retrieve the computer styles for the parent element
    this.parentStyles = window.getComputedStyle(this.options.element.parentNode);
    this.parentMarginOffset = parseInt(this.parentStyles.marginBottom, 10);
    // register window scroll event
    window.addEventListener('scroll', throttle(::this.onWindowScroll, this.options.throttle));
  }

  /**
   * Implemented with rAF (https://developer.mozilla.org/en-US/docs/Web/Events/scroll)
   */
  onWindowScroll() {
    this.lastY = window.scrollY;
    const elementHeight = this.options.element.clientHeight;
    // if scrolled passed the given offset
    if (this.lastY > this.options.offset) {
      if (this.options.position === 'mirror') {
        // display the mirror
        this.mirror.style.display = 'block';
        // hide the original element
        this.options.element.style.display = 'none';
      } else {
        // re-position the element based on the position ("fixed", "mirror", or "absolute")
        switch (this.options.position) {
          default:
            // no break
          case 'fixed':
            this.options.element.style.position = 'fixed';
            this.options.element.style.top = '0px';
            break;
          case 'absolute':
            this.options.element.style.position = 'absolute';
            this.options.element.style.top = `${this.lastY}px`;
            break;
        }
        // update the parent node's margins to offset the affixed element
        const newHeight = this.parentMarginOffset + elementHeight;
        if (this.options.element.parentNode.nodeName.toLowerCase() === 'body') {
          this.options.element.parentNode.style.marginTop = `${newHeight}px`;
        } else {
          this.options.element.parentNode.style.marginBottom = `${newHeight}px`;
        }
      }
    } else {
      // hide mirror
      if (this.options.position === 'mirror') {
        this.mirror.style.display = 'none';
      }
      // show original element
      this.options.element.style.display = null;
      this.options.element.style.position = 'static';
      if (this.options.element.parentNode.nodeName.toLowerCase() === 'body') {
        this.options.element.parentNode.style.marginTop = `${this.parentMarginOffset}px`;
      } else {
        this.options.element.parentNode.style.marginBottom = `${this.parentMarginOffset}px`;
      }
    }
  }

  createMirror() {
    this.mirror = document.createElement('div');
    this.mirror = this.options.element.cloneNode(true);
    this.mirror.style.display = 'none';
    this.mirror.style.position = 'fixed';
    this.mirror.style.top = '0px';
    this.mirror.style.left = '0px';
    document.body.appendChild(this.mirror);
  }

}
