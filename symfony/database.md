### Connect DB
You need the DB on your localhost, example is mysql.
brew install mysql, init, install mysql workbench to create first DB and extract URL that you then add to the .env and .env.local as a field: 
```php
# DATABASE
DATABASE_URL=DATABASEURL
```

What do we need this DB for?
To store data, of course. But let's think about the strucutre of our app. This is a symfony app explanation, thus, we have in mind that the app is server side rendered. This is the phocal point, the server. We send back to the browser client some html+css+js but form validation for example happens on the server. So, a server-side rendered app is like a switchman between request/response cycle with browser and ORM with DB. 

### BE communnicates with async req/res for FE and with ORM for DB:

1. **Frontend Communication**: The communication between the Symfony backend and the frontend (browser) typically happens via HTTP request/response cycles. These can be either synchronous or asynchronous (AJAX). The server receives a request, processes it (which may involve interacting with the database), and then sends a response back to the client. The response could be a full HTML page (in a traditional web application), or JSON data (in a single-page application or API).

2. **Database Communication**: On the server side, Symfony communicates with the database using an Object-Relational Mapping (ORM) tool, typically Doctrine. The ORM allows you to interact with your database, like fetching data, inserting new records, updating, or deleting records, **using object-oriented code instead of writing SQL queries**. The ORM also provides other features like data validation, caching, and transactions. In PHP this is a synchronous process, it may immitate async via Symfony's Messenger, but this also adds complexity which must be managed.


### Using object-oriented code instead of writing SQL queries

When using an Object-Relational Mapping (ORM) tool like Doctrine in Symfony, you interact with your database using object-oriented code instead of writing SQL queries directly.

This means that tables in your database are represented as classes (often called "entities") in your code, and rows in those tables are represented as instances of those classes. You can then perform operations on these objects, and the ORM will translate these operations into the appropriate SQL queries behind the scenes.

For example, instead of writing a SQL query like this:

```sql
INSERT INTO users (username, email) VALUES ('jdoe', 'jdoe@example.com');
```

You would write object-oriented code like this **in the Controller**:

```php
$user = new User();
$user->setUsername('jdoe');
$user->setEmail('jdoe@example.com');

$entityManager = $this->getDoctrine()->getManager();
$entityManager->persist($user);
$entityManager->flush();
```
```php
namespace App\Controller;

// ...
use App\Entity\Product;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ProductController extends AbstractController
{
    #[Route('/product', name: 'create_product')]
    public function createProduct(ManagerRegistry $doctrine): Response
    {
        $entityManager = $doctrine->getManager(); //for many db or use direclty EntityManagerInterface $entityManager for on DB

        $user = new User();
        $user->setUsername('jdoe');
        $user->setEmail('jdoe@example.com');

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($user);// tell Doctrine you want to (eventually) save the Product (no queries yet)
        $entityManager->flush();// actually executes the queries (i.e. the INSERT query)

        return new Response('Saved new user with username '.$product->getUsername());
    }
}
```

In this example, the `persist` and `flush` methods tell Doctrine to save the new User object to the database. Doctrine automatically generates the appropriate SQL query and executes it. `persist` and `flush` are like many `git commit, git commit, git commmit` and one final `git push`.

This approach has several benefits, including:

- It allows you to work with data in a more intuitive and object-oriented way.
- It abstracts away the specifics of the SQL language, allowing you to focus on your application logic.
- It provides a layer of **security against SQL injection attacks**, as it automatically escapes data.
- It makes your code more portable, as the ORM can generate SQL for different types of databases.

### Creating the Entity class

In Symfony, the User class is typically created as an Entity class. This class is a plain PHP class that maps to a database table through annotations. Here's a basic example of a User entity class:

```php
namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 */
class User
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     */
    private $username;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $password;

    // getters and setters

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }
}
```

In this class, each property (id, username, password) maps to a column in the `user` table in the database. The `@ORM\Entity` annotation tells Doctrine that this class should be treated as an entity class. The `@ORM\Column` annotations provide metadata about the columns that the properties map to.

The getters and setters allow you to fetch and modify the data of an object. When you want to create a new user, you would create a new instance of the User class, set its properties using the setters, and then tell Doctrine to persist the changes. Doctrine will automatically create the appropriate SQL query to insert the new user into the database.