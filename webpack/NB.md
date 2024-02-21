Webpack is a bundler that makes dependency graphs clearer.

Here's another basic example of using Webpack:

1. Set up your project directory:
mkdir webpack-demo
cd webpack-demo
npm init -y
npm install webpack webpack-cli --save-dev

2. Create the project structure:
webpack-demo
├── package.json
├── package-lock.json
├── /src
│   └── index.js
└── index.html

3. Write your JavaScript code in src/index.js:
function component() {
  const element = document.createElement('div');
  element.innerHTML = 'Hello, webpack!';
  return element;
}
document.body.appendChild(component());

4. Create an HTML file index.html:
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Webpack Demo</title>
  </head>
  <body>
    <script src="dist/main.js"></script>
  </body>
</html>

5. Install and configure Webpack: Install the necessary dependencies:
npm install --save-dev webpack webpack-cli

6. Create a webpack.config.js file at the root of your project with the following content:

const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};

7. Run Webpack: Add a build script to your package.json:
"scripts": {
  "build": "webpack"
}

8. Then, run the build script:

npm run build


This will create a dist directory with the bundled main.js file.
