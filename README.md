# Affixed

Make something affix on scroll.

## Usage

````js
var menu = new Affixed({
  element: document.getElementById('sticky-menu'),
  offset: 70,
  position: 'fixed',
});
````

````html
<div id="sticky-menu">
  ... content here
</div>
````


### Parameters

| Param | Description |
| :--- | :--- |
| `element` | The DOM element to affix. |
| `offset` | Amount of pixels to scroll before the element is affixed. |
| `position` | Either `absolute` or `fixed` positioning. |

### Notes

`absolute` positioned element's are reposition on every scroll which may perform slow in some instances. You should set the `position` to `fixed` whenever possible. If your `element` is within a container that is positioned relative, you will need to set the `position` parameter to `absolute`.
