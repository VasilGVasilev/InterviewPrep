### Unit testing

Unit testing in Symfony is typically done using PHPUnit, a popular testing framework for PHP. Here's a simple step-by-step guide on how to write a unit test for your `EventController`'s `save` method:

1. First, install PHPUnit via composer if you haven't already:

```bash
composer require --dev phpunit/phpunit
```

2. Create a new test file in the `tests/Controller` directory (you may need to create this directory if it doesn't exist). The test file should be named after the controller it's testing, so in this case, it could be `EventControllerTest.php`.

3. In `EventControllerTest.php`, you'll define a new class `EventControllerTest` that extends `PHPUnit\Framework\TestCase`. Inside this class, you'll write your tests as public methods.

Here's a basic structure for your test file:

```php
namespace App\Tests\Controller;

use PHPUnit\Framework\TestCase;

class EventControllerTest extends TestCase
{
    public function testSave()
    {
        // Your test code goes here
    }
}
```

4. In the `testSave` method, you'll need to create mock objects for the `Request` and `MyDataObject` objects that the `save` method expects. By using createMock to create mock Request and NoticeData objects, we can control the state of these objects and eliminate any side effects they might have. This allows us to write a more reliable test for the save method. You'll also need to create a mock `EventController` so you can call the `save` method on it.
Mind that you need the mocks to avoid setting up parameters, headers etc.

5. You'll then call the `save` method with your mock objects and use PHPUnit's assertion methods to check that the method behaves as expected.

Here's a very basic example of what your `testSave` method might look like:

```php
public function testSave()
{
    $requestMock = $this->createMock(Request::class);
    $MyDataObjectMock = $this->createMock(MyDataObject::class);

    $controller = new EventController();
    $response = $controller->save($requestMock, $MyDataObjectMock);

    $this->assertInstanceOf(Response::class, $response);
}
```

This test checks that the `save` method returns an instance of `Response`. You'll need to replace `Request::class` and `MyDataObject::class` with the actual fully-qualified names of these classes, and you'll likely need to add more complex logic to your test to fully test the `save` method.

6. Once your test is written, you can run it with the following command:

```bash
./bin/phpunit tests/Controller/EventControllerTest.php
```

This will run your `EventControllerTest` and output the results in the terminal.

Summary: Unit test focuses on method of controller testing, generally, isolating and for this isolation we need to make mocks of the controller dependenies and apply the necessary test to test the return of the specific method. 


### Intergration testing

Integration tests in Symfony are typically done using the `WebTestCase` class which provides methods for simulating HTTP requests and examining the response. Here's a simple step-by-step guide on how to write an integration test for your `EventController`'s `save` method:

1. Create a new test file in the `tests/Controller` directory. The test file should be named after the controller it's testing, so in this case, it could be `EventControllerIntegrationTest.php`.

2. In `EventControllerIntegrationTest.php`, you'll define a new class `EventControllerIntegrationTest` that extends `Symfony\Bundle\FrameworkBundle\Test\WebTestCase`. Inside this class, you'll write your tests as public methods.

Here's a basic structure for your test file:

```php
namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class EventControllerIntegrationTest extends WebTestCase
{
    public function testSave()
    {
        // Your test code goes here
    }
}
```

3. In the `testSave` method, you'll use the `createClient` method to create a client, which is like a browser that you'll use to make requests. You'll then use the `request` method on the client to make a request to the `save` method's route.

4. You'll then use assertion methods to check the response. For example, you can check that the response status code is 200, which means the request was successful.

Here's a very basic example of what your `testSave` method might look like:

```php
public function testSave()
{
    $client = static::createClient();
    $crawler = $client->request('GET', '/your-route-here');

    $this->assertEquals(200, $client->getResponse()->getStatusCode());
}
```

This test checks that making a GET request to '/your-route-here' returns a 200 status code. You'll need to replace '/your-route-here' with the actual route for your `save` method.

5. Once your test is written, you can run it with the following command:

```bash
./bin/phpunit tests/Controller/EventControllerIntegrationTest.php
```

This will run your `EventControllerIntegrationTest` and output the results in the terminal.

Summary: Integration tests aim at grasping broader part of the app, usually, the services. To achieve 
@TODO: finish explanation of difference unit vs integ