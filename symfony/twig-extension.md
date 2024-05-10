[official docs solution](https://symfony.com/doc/5.x/templates.html#writing-a-twig-extension)

### Why do we need a twig extension?

- We can potentially apply CSS and JS logic for more complex functionalities in a twig, like interacting with the current page URL or storing state. Also, we could do the logic in the controller, but a progress bar for example is semantically part of the html and thus twig, so it is better to utilize the **twig extension** instead.
- We do it to make an illusion of state (meaning rely on variables for the kind of set var1 to temp, set temp to var2 to set var1 to var2, but it is still not state) but more of storing some data into temporary for the life of the current request variables and executing some comparison and looping logic with those variables.

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