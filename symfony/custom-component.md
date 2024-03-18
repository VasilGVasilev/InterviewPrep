https://symfony.com/doc/5.x/form/create_custom_field_type.html


1. Create a custom class that has some configure options that override the defualt class.

2. Add this custom class to the builder of the specific form as a Form Type

3. Create the actual Twig template by adding it to the twig.yaml and creating it as a twig block

```sh
{# templates/form/custom_types.html.twig #}
{% block postal_address_row %}
    {% for child in form.children|filter(child => not child.rendered) %}
        <div class="form-group">
            {{ form_label(child) }}
            {{ form_widget(child) }}
            {{ form_help(child) }}
            {{ form_errors(child) }}
        </div>
    {% endfor %}
{% endblock %}
```

- The first part of the Twig block name **postal_address** comes from the class name (PostalAddressType -> postal_address). This can be controlled by overriding the getBlockPrefix() method in PostalAddressType. The second part of the Twig block name (e.g. _row) defines which form type part is being rendered (**row**, widget, help, errors, etc.)