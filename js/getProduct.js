
function loadProduct() {
    ajaxUtil.getajaxRequest("get", "data/indexProduct" + ".json", true, function (xhr) {
    	var objectarr = eval("(" + xhr.responseText + ")");
    	
    	var div=document.getElementsByClassName("pro_list");
        
        var arrDiv=[];
        for(var j=0;j<div.length;j++){
        	arrDiv.push(div[j]);
        	
        	var ul=document.createElement("ul");
        	ul.className="cle";
        	
        	for (var i = 0; i < objectarr.length; i++) {
        		
	        	var li=document.createElement("li");
	        	
	        	var a=document.createElement("a");
	        	a.href="html/goods.html";
	        	
	        	var p1=document.createElement("p");
	        	p1.className="pic";
	        	
	        	var img=document.createElement("img");
	        	img.src="images/thumb_img/" + objectarr[i].img;
	        	
	        	var h3=document.createElement("h3");
	        	h3.innerHTML = objectarr[i].name;
	        	
	        	var p2=document.createElement("p");
	        	p2.className="price";
	        	
	        	var b=document.createElement("b");
	        	b.innerHTML = objectarr[i].price;
	        	
	        	var span=document.createElement("span");
	        	span.className="sale";
	        	span.innerHTML = objectarr[i].sale;
	        	
	        	
	        	arrDiv[j].appendChild(ul);
	        	
	        	ul.appendChild(li);
	            li.appendChild(a);
	            a.appendChild(p1);
	            p1.appendChild(img);
	            a.appendChild(h3);
	            a.appendChild(p2);
	            p2.appendChild(b);
	            p2.appendChild(span);
        	}
        }
    });
}
loadProduct();