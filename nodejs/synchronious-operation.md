```sh
const fs = require('fs');

console.log('start').

const data = fs.readFileSync('./file.text', 'utf-8');

console.log('data: ', data);

console.log('end');
```

I gave the same examplae but with an infinite loop instead of reading a file.