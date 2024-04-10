In CSS Flexbox, the `flex-direction` property sets the direction of the main axis. The main axis is the axis along which the flex items are laid out in the flex container. The `justify-content` property aligns items along this main axis.

By default, the main axis is horizontal (from left to right), so `justify-content` aligns items horizontally. When you set `flex-direction: row;` (the default), `justify-content` controls the horizontal spacing between items.

**However, when you set `flex-direction: column;`, you're changing the main axis to be vertical (from top to bottom). Now, `justify-content` controls the vertical spacing between items.**

So, in your case, when you change `flex-direction` to `column`, `justify-content` starts to align items vertically along the y-axis, instead of horizontally along the x-axis. This is why the direction of `justify-content` changes when you change `flex-direction`.