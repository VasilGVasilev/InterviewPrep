**word-wrap: break-word;**

To make all columns in a row have the same height as the tallest column, you can use **CSS Grid** instead of Flexbox. CSS Grid has a feature that automatically aligns the height of all items in a row to match the height of the tallest item.

Here's how you can modify your code to use CSS Grid:

```html
<div
    style="
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 5px;
        word-wrap: break-word;
    "
>
</div>
```
