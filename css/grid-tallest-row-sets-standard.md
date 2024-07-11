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
### No grid or flex (float):
Using both word-wrap and overflow-wrap ensures compatibility across different browsers and makes sure that long words are properly wrapped within the container. The word-wrap property is an older property, while overflow-wrap is its modern equivalent.
```html
    <div style="width: 100%; overflow: hidden;">
        <div style="overflow: hidden;">
            <div style="width: 33.33%; float: left; box-sizing: border-box; padding: 10px; background-color: lightblue; word-wrap: break-word; overflow-wrap: break-word;">
                Extremely long text that needs to wrap and extend the height of the div. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur volutpat nisl vitae odio facilisis, id egestas ex dapibus. Nulla facilisi. 
            </div>
            <div style="width: 33.33%; float: left; box-sizing: border-box; padding: 10px; background-color: lightgreen;">
                Column 2
            </div>
            <div style="width: 33.33%; float: left; box-sizing: border-box; padding: 10px; background-color: lightcoral;">
                Column 3
            </div>
        </div>
        <div style="overflow: hidden;">
            <div style="width: 33.33%; float: left; box-sizing: border-box; padding: 10px; background-color: lightblue; word-wrap: break-word; overflow-wrap: break-word;">
                Column 1
            </div>
            <div style="width: 33.33%; float: left; box-sizing: border-box; padding: 10px; background-color: lightgreen;">
                Column 2
            </div>
            <div style="width: 33.33%; float: left; box-sizing: border-box; padding: 10px; background-color: lightcoral;">
                Column 3
            </div>
        </div>
        <!-- Repeat rows as needed -->
    </div>
```