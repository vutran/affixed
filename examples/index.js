// es6 imports
import Affixed from 'affixed';

const menu = new Affixed({
  element: document.getElementById('sticky-menu'),
  offset: 70,
  position: 'mirror',
  throttle: 10,
});
