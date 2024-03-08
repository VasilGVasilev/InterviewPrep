Symfony is opinionated framework, so the same goes for its forms. 
You basically start with a php class with getters and setters.
You import it in the special Form builder which relies on specific for opinionated symfony form types, a ready to use radio, checkboxes, and other form fields.
You can create the forms out of classes in controllers, but it is advised to create them in a separate classes.

1) create special form class

```sh
// src/Form/Type/TaskType.php
namespace App\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;

class TaskType extends AbstractType //better extend AbstractType

{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('task', TextType::class)
            ->add('dueDate', DateType::class)
            ->add('save', SubmitType::class)
        ;
    }
}
```

2) import the special form class into the controller:

```sh
// src/Controller/TaskController.php
namespace App\Controller;

use App\Entity\Task;
use App\Form\Type\TaskType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class TaskController extends AbstractController
{
    public function new(Request $request): Response
    {
        //instantiate the object that will hold our form data
        $task = new Task();

        // attach the special form class and the object
        $form = $this->createForm(TaskType::class, $task);

        //render the newly creaeted form
        return $this->renderForm('task/new.html.twig', [
            'form' => $form,
        ]);
    }
}
```

3) put in twig:

```sh
{# templates/task/new.html.twig #}
{{ form(form) }}
```

4) processing the form, see updated ex.2

```sh

class TaskController extends AbstractController
{
    public function new(Request $request): Response
    {
        //instantiate the object that will hold our form data
        $task = new Task();

        // attach the special form class and the object
        $form = $this->createForm(TaskType::class, $task);

//see-> processing form
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $task->setEvent($form->getData());
            return $this->redirectToRoute('some_route_name'); //potential redirect
        }

        //render the newly creaeted form
        return $this->renderForm('task/new.html.twig', [
            'form' => $form,
        ]);
    }
}
```


**Additionals**

[Adding validation: via entity class or constraints](https://symfony.com/doc/5.x/form/without_class.html#form-option-constraints)

Bootstrap5 infers css styling to form fields automatically,
if you use the form automatic generation, a style like this will be inferred:
```sh
<button type="button" class="btn btn-primary">Primary</button>
```

However, if you create a plain button element outside of the Symfony form context, Symfony's form theming system will not apply Bootstrap classes to it automatically. 


