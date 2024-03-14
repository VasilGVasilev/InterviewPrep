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