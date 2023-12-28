# General observations while looking at the docs:

PHP and Node.js:
- PHP scripts are often executed using a web server module or through a separate CGI process. Popular web servers for PHP include Apache and Nginx.
- Node.js applications are typically run using a dedicated server (such as the built-in HTTP module or frameworks like Express.js) rather than being integrated into a web server. Node.js can be used with reverse proxies like Nginx or Apache, but it often runs as a standalone server.
- PHP is a language and it has an interpreter