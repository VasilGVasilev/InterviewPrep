My very own loading component for line that starts as a dot but expands:

```sh
@keyframes expand {
  0% {
    transform: scaleX(0);
  }
  100% {
    transform: scaleX(1);
  }
}

.line {
    height: 3px;
    background-color: $primary;
    width: 100%;
    left: 50%;
    transform: translateX(-50%);
    transform-origin: center;
    animation: expand 1.5s infinite ease-in-out;
}
```