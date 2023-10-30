![alt img](https://github.com/VasilGVasilev/InterviewPrep/blob/main/public/server-actions.png)

## How is this sql call possible?

### Tagged Template

It all goes down to the fact that when we use a template literal next to a function, it triggers an evaluation of this template literal, which in turn triggers a function call for that very function (with the template literal as its parameter):

Ex.

```sh
const someVar = 'John';

function greet(name){
    console.log(`Hello ${name}!`)
}

greet`hello world ${someVar}`

```

This is due to JS engine being flexible and of course the above function call via template literal can be a cause of concern due to escaping the rule that functions are called only via parenthesis ().

**NB - template literals trigger a function call**



## How is this sql query safe from SQL attacks?

Mind, you have **separation of dynamic from static values in the template literal**. This is visible using TS:

```sh
const someVar = 'John';

function greet(strings: TemplateStringsArray, name: string){
    console.log(strings);
    console.log(name);
    console.log(`Hello ${name}!`)
}

greet`hello world ${someVar}`

# [LOG]: ["hello world ", ""] 
# [LOG]: "John" 
# [LOG]: "Hello John!" 

```

Usually the SQL query is vulnerable to SQL injection attacks because the query builds the SQL statement by directly inserting user input into the query string without proper sanitization and validation.
This SQL query is vulnerable to SQL injection attacks because the query builds the SQL statement by directly inserting user input into the query string without proper sanitization and validation

**The key is to sanithize the sql query from the picture, namely, parameterize it, so that the passed in dynamic argument does not constitute a separate malicious sql query, thus, one way is to use template literals, since it has separation of interpolated and non0-interpolated values.**

[article explained](https://neon.tech/blog/sql-template-tags)
<br>
[video explained 1](https://www.youtube.com/watch?v=2Ggf45daK7k)
<br>
[video explained 2](https://www.tektutorialshub.com/typescript/typescript-tagged-templates/)