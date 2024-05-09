Although there is a database NB, Doctrine is so fundamental as a connecting part in an app that it needs its own NB.

Doctrine is a Object-Relational Mapping tool. It makes possible that we communicate with a DB via OOP logic.

Aside from the special CLI, syntax and declarations:

```sh
php bin/console make:entity
```

```php
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;
```

The other important part that actually "executes those executions" is the migrations. **Database migrations are a way of managing changes to your database schema over time**

each time we make an entity or edit an entity:

- we create a migration:
```sh
php bin/console make:migration
```

- and migrate the migration:
```sh
php bin/console doctrine:migrations:migrate
```

Thus, each time you make a change to your schema, run these two commands to generate the migration and then execute it. 

### Object persistance into DB

Entities are merely classes and once they are migrated into the database
If we want to populate those tables with some objects, we ought to use the **->persist** and **->flush** methods in a Controller:


```php
    #[Route('/product', name: 'create_product')]
    public function createProduct(EntityManagerInterface $entityManager): Response
    {
        $product = new Product();
        $product->setName('Keyboard');
        $product->setPrice(1999);
        $product->setDescription('Ergonomic and stylish!');

        // tell Doctrine you want to (eventually) save the Product (no queries yet)
        $entityManager->persist($product);

        // actually executes the queries (i.e. the INSERT query)
        $entityManager->flush();

        return new Response('Saved new product with id '.$product->getId());
    }
```

Another way is via Repository:
- use a Doctrine repository. A repository is like a PHP class where you can add custom functions for things like querying for data. You could add a function to a repository that persists an object to the database.

```php
<?php
class ProductRepository extends ServiceEntityRepository
{
    public function saveProduct($productName)
    {
        $product = new Product();
        $product->setName($productName);

        $product->persist($product);
        $product->flush();
    }
}
?>
```

But this all seems static, you have some tables that are set and that's it. What if you have some changes of your db due to user interactions?
- use **->flush** method:

```php
<?php
public function updateProduct(Request $request, EntityManagerInterface $entityManager, $id)
{
    // find the product you want to update
    $product = $entityManager->getRepository(Product::class)->find($id);

    if (!$product) {
        throw $this->createNotFoundException(
            'No product found for id '.$id
        );
    }

    // create a form
    $form = $this->createForm(ProductType::class, $product);

    // handle the request
    $form->handleRequest($request);

    if ($form->isSubmitted() && $form->isValid()) {
        // the form data has been applied to the product object

        // save the product object to the DB
        $entityManager->flush();

        return $this->redirectToRoute('product_show', [
            'id' => $product->getId(),
        ]);
    }

    // render the form
    return $this->render('product/edit.html.twig', [
        'form' => $form->createView(),
    ]);
}
?>
```
