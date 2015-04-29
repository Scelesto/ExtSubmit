# ExtSubmit JavaScript Plugin
##About
Upload files and submit forms without redirecting the page, even in browsers without fancy APIs!

Many advanced browsers can upload files or submit forms by using AJAX, but many users on old-fashioned browsers don't have the necessary API.

This is a very easy solution which works for far more users, which allows forms to be submitted on the page.

Works in all modern browsers (anything that supports iframe and javascript) and is only 1.5 KB.
##Basic Use:
**Submit a form without redirecting**

	<form ... redirect="false">
	...
	</form>
*Can be submitted in any way*
****
**Submit the form and then do something**

	<form ... redirect="false">
	...
	</form>
	<script>
	something.onclick = function(){ //or any other trigger
		form_element.submit(function(){
			...
		});
	}
	</script>

or, without the redirect attribute:

	<form>
	...
	</form>
	<script>
	something.onclick = function(){ //or any other trigger
		_eS(form_element,function(){
			...
		})
	}
	</script>

*Must be submitted in JavaScript*

****

## Calling Directly in JavaScript:

**Submit a form in the background without redirecting**

    extSubmit(form_element);
	extSubmit("form_id");

*for general use*

****

**Submit the form and then do something**

	extSubmit({
		form:element_or_id,
		done:function(){
			...
		}
	});

*for general use*

****

**Wait until the code is finished processing to continue**

	extSubmit(something,true);

*for developers*

****

It's that easy!
## Tips:
ExtSubmit only submits your form without redirecting.  It will be less obvious that you have messed up your code and the page does not redirect.

Thus, if you have a problem with ExtSubmit, **please check your own code first.**  I can't guarantee that ExtSubmit will work unless you are following good development practices.
****
ExtSubmit works in all cases where the form is part of the page's initial HTML.  If the form is loaded dynamically with AJAX, ExtSubmit will partially stop working.

If you call the function directly in JavaScript, it will still work, however it may lose a certain degree of browser compatibility.

If this causes you trouble, load the ExtSubmit script **after the form has been loaded to the page.**
****
Some of you who are used to submitting by JavaScript may be used to doing this:

	<form ... onsubmit="return false">
	...
	</form>
This prevents the form from submitting.  If you do this with extSubmit, it will still prevent the form from submitting.  You can call other functions with onsubmit, for instance:

	<form ... onsubmit="alert()">
	...
	</form>
However, if you want your form to submit, **please do not make onsubmit return false.**