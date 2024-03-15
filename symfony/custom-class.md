https://symfony.com/bundles/ux-twig-component/current/index.html

While delving into custom manipualtion of css of input fields of symfony forms that have a default bootstrap theme, I found out the feature:

- width: fit-content

```sh
            .radio-container {
                width:fit-content;
                ...
            }
            .radio-nested-item-in-container{
                ...
            }
```

It fits the width appropriately to the combined width of the child elements of the container

It seems that the best approach is to see the html of the rendered page and enquire the bootstrap generated name for classes of the symfony form elements. In the twig, we just render the plain form.row widget and in the css we apply styles to the label and the input which are part of the custom radio button. If some additional css attribute is necessary, add it to the builder after the choice, as attr_choice.

[:has()](https://dev.to/yuridevat/css-has-pseudo-class-p6g) is a pseudo element that has support on all browsers since Dec 2023. 

It is ideal to change a div that has an input checked:
```sh
div:has(input:checked) {
  background-color: #f0f0f0;
}
```