You use self:: to access the class static or const methods and $this to access the object methods:

```sh
<?php

class GFG {
	function print() {
		echo 'Parent Class';
	}

	function bar() {
		self::print();
	}
}

class Child extends GFG {
	function print() {
		echo 'Child Class';
	}
}

$parent = new Child();
$parent->bar();
?>
```
OUTPUT: Parent class

```sh
<?php

class GFG {
	function print() {
		echo 'Parent Class';
	}

	function bar() {
		$this->print();
	}
}

class Child extends GFG {
	function print() {
		echo 'Child Class';
	}
}

$parent = new Child();
$parent->bar();
?>
```
OUTPUT: Child class