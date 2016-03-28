export default class Affixed {
  constructor(options = {}) {
    this.isTicking = false;
    // merge options
    const DEFAULTS = {
      element: null,
      offset: 0,
      type: 'absolute',
    };
    this.options = Object.assign({}, DEFAULTS, options);
    // retrieve the computer styles for the parent element
    this.parentStyles = window.getComputedStyle(this.options.element.parentNode);
    this.parentMarginBottom = parseInt(this.parentStyles.marginBottom, 10);
    // register window scroll event
    window.addEventListener('scroll', ::this.onWindowScroll);
  }

  /**
   * Implemented with rAF (https://developer.mozilla.org/en-US/docs/Web/Events/scroll)
   */
  onWindowScroll(e) {
    this.lastY = window.scrollY;
    if (!this.isTicking) {
      window.requestAnimationFrame(() => {
        const elementHeight = this.options.element.clientHeight;
        // if scrolled passed the given offset
        if (this.lastY > this.options.offset) {
          // apply the position
          this.options.element.style.position = this.options.type;
          this.options.element.style.width = '100%';
          // re-position the element based on the type (fixed, or absolute)
          switch (this.options.type) {
            case 'fixed':
              this.options.element.style.top = '0px';
              break;
            case 'absolute':
              this.options.element.style.top = this.lastY + 'px';
              this.options.element.parentNode.style.marginBottom = (this.parentMarginBottom + elementHeight) + 'px';
              break;
          }
        } else {
          this.options.element.style.position = 'static';
          this.options.element.parentNode.style.marginBottom = this.parentMarginBottom + 'px';
        }
        // not ticking
        this.isTicking = false;
      });
    }
    // currently ticking
    this.isTicking = true;
  }

}
