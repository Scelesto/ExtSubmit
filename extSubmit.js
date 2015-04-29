window._eS=function(form,done){
	if(!window.FormData){
		var iframe = document.createElement('iframe'),
			loaded;
		iframe.style.display = 'none';
		iframe.src = window.location.href.replace(/[^#?]*\//,'');
		document.body.appendChild(iframe);
		loaded = document.getElementsByTagName('iframe')[0];
		loaded.onload = function(){
			var content = loaded.contentDocument,
				allForms = content.getElementsByTagName('form'),
				replacement,
				i = 0;
			for(;i<allForms.length;++i){
				if(allForms[i].isEqualNode(form.cloneNode(true))){
					replacement = allForms[i];
					break;
				}
			}
			form.parentNode.replaceChild(form.cloneNode(true),form);
			replacement.parentNode.replaceChild(form,replacement);
			content.getElementsByTagName('form')[i].submit();
			loaded.onload = typeof(done)!='undefined'?done:function(){};
		}
	} else {
		var ajax = new XMLHttpRequest();
		ajax.open(form.method?form.method:'post', form.action?form.action:'', true);
		if(typeof(done)!='undefined'){
			ajax.onload = function(){
				if(ajax.status==200){
					done();
				}
			}
		}
		ajax.send(new FormData(form));
		form.parentNode.replaceChild(form.cloneNode(form),form);
	}
}
window.extSubmit=function(value,wait){
    var func = function(){
        (function(object){
            if(object.form.constructor==String){
                object.form = document.getElementById(object.form);
            }
            _eS(object.form,object.done);
        })(value.constructor==Object?value:{
			form:value
		});
    };
    if(typeof(wait)!='undefined'&&wait==true){
        func();
    } else {
        setTimeout(func, 0);
    }
}
HTMLFormElement.prototype.oldSubmit=HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit=function(done){
	if((this.attributes.redirect?this.attributes.redirect.value:'true')=='true'){
		this.oldSubmit();
	}else{
		_eS(this,done);
	}
}
document.body.onload=function(){
	var forms=document.getElementsByTagName('form'),
		i=0;
	for(;i<forms.length;++i){
		if((forms[i].attributes.redirect?forms[i].attributes.redirect.value:'true')!='true'){
			forms[i].oldOnSubmit=forms[i].onsubmit?forms[i].onsubmit:function(){};
			forms[i].onsubmit=function(event){
				event.preventDefault();
				if(this.oldOnSubmit()!==false){
					this.submit()
				}
				return false;
			}
		}
	}
}