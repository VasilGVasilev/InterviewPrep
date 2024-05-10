[official docs solution](https://symfony.com/doc/5.x/templates.html#writing-a-twig-extension)

### Why do we need a twig extension?
- We can potentially apply CSS and JS logic for more complex functionalities in a twig, like interacting with the current page URL or storing state. Also, we could do the logic in the controller, but a progress bar for example is semantically part of the html and thus twig, so it is better to utilize the **twig extension** instead.

### Basic implementation - a function

```php
// src/Twig/AppExtension.php
namespace App\Twig;

use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class AppExtension extends AbstractExtension
{
    public function getFunctions()
    {
        return [
            new TwigFunction('area', [$this, 'calculateArea']),
        ];
    }

    public function calculateArea(int $width, int $length)
    {
        return $width * $length;
    }
}
```

**getFunctions** is crucial, the name (first arg) is what is then used as a reusable component:

```php
{{ area(width, length) }} // height and width come from the respective Controller
```