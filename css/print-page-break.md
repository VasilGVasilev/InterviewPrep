```js
<div>
    one document
</div>
<!-- Insert a page break before this div -->
<div class="page-break" style="border-left: 20px solid #ed1b24; break-before:page">
    next document
</div>
```

In this example, a <div div class="page-break"> with the class page-break is styled with **break-before: page;** This ensures that when the document is printed, a page break is inserted before this <div div class="page-break">.