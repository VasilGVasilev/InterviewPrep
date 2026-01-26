### jQuery is obsolete

jQuery was a universal way to select elements on the DOM in 2006 when each browser had different ways of handling the DOM. However, with the acceptence of universal standard, jQuery seems useless now.

Task	        ---- jQuery	                ---- Vanilla JavaScript (Modern)

Select by ID	---- $('#myId')	            ---- document.getElementById('myId')
Select by Class	---- $('.myClass')	        ---- document.querySelector('.myClass')
Change Text	    ---- .text('Hello')	        ---- .textContent = 'Hello'
Add a Class 	---- .addClass('active')	---- .classList.add('active')
Click Event 	---- .on('click', fn)	    ---- .addEventListener('click', fn)