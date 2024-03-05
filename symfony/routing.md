Routing

How the web app works, we write some URL, it goes to public/index.php, which gets the route and applies the controller logic and finally the hydrated twig.

Why name and path instead of href='/' directly -> so that we can change the routes and rely on symfony generating dynamically the actual urls used from the path(name_of_route) placeholder also known as internal name