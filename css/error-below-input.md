To make an error appear right below input without layout shift use absolute and top 100% on child:
```sh
    .col-sm-10 {
        position: relative; //for the invalid-feedback to be positioned correctly
    }

    .invalid-feedback {
        position: absolute; //for the invalid-feedback to be positioned correctly
        top: 100%; //for the invalid-feedback to be positioned correctly
        font-size: 1.4rem;
        text-align: right;
        right: 1rem;
    }
```