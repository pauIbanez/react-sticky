# React-Stickyy

This package provides a wrapper component that creates a sticky element relative to the body, but under any parent component.

This component will auto-detect sticky ot fixed elements placed above it in the page (on component render, not on runtime) and will position itself bellow them when it becomes sticky.

## Usage

Using this is very simple. Import the package with:

```js
import Sticky from "react-stickyy";
```

And add your content in it like so:

```jsx
<Stickyy>
  <Component>I'm an example component!</Component>
</Stickyy>
```

## Props

The Sticky component accepts 2 props, the children and an offset.

- The `children` is the content that you want to be sticky.
- The `offset` (Optional) is the space (in pixels) it will leave between it and the above fixed/sticky component. If there is no other fixed/sticky element above it, the offset translates to the space between the top of the page and the Sticky component. If there is a sticky/fixed element, for example a navigation bar, then it's the ofset between the navBar and it.
