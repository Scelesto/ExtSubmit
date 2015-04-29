# ExtSubmit

##About
Upload files and submit forms without redirecting the page, even in browsers without fancy APIs!

Works in all modern browsers (anything that supports iframe)

Works in all cases where the form is part of the page's initial HTML.  If the form is loaded dynamically with AJAX, this function will lose a certain degree of browser compatibility.

## How to use:

**Submit a form in the background without redirecting**

    extSubmit(form_element);
	extSubmit("form_id");

*for general use*

**Submit the form and then do something**

	extSubmit({
		form:element_or_id,
		done:function(){
			...
		}
	});

*for general use*

**Wait until the code is finished processing to continue**

	extSubmit(something,true);

*for systems that require a great deal of accuracy*

It's that easy!