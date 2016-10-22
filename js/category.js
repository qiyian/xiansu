
var pageIndex=1;
var number1 = document.getElementById("number");


function loadProductCategory() {
    ajaxUtil.getajaxRequest("get", "../data/goodsCategory1.json", true, function (xhr) {
    	var objectarr = eval("(" + xhr.responseText + ")");
    	
        var div1 = document.createElement("div");
        div1.className = "clear";
        div1.id = "div" + pageIndex;
    	
    	var ul=document.getElementById("clegood")
    	
    	for (var i = 0; i < objectarr.length; i++) {
    		
        	var li=document.createElement("li");
        	
        	var a=document.createElement("a");
        	a.className="productitem";
        	a.href="goods.html"
        	
        	var span1=document.createElement("span");
        	span1.className="productimg";
        	
        	var img=document.createElement("img");
        	img.style.width="230px";
        	img.style.height="230px";
        	img.style.display="block";
        	img.title=objectarr[i].title;
        	img.alt=objectarr[i].alt;
        	img.src="../images/thumb_img/" + objectarr[i].img;
        	
        	var span2=document.createElement("span");
        	span2.className="nalaprice xszk";
        	
        	var b=document.createElement("b");
        	b.innerHTML=objectarr[i].price;
        	
        	var span3=document.createElement("span");
        	span3.className="productname";
        	span3.innerHTML=objectarr[i].name;
        	
        	var span4=document.createElement("span");
        	span4.className="description";
        	span4.innerHTML=objectarr[i].description;
        	
        	var span5=document.createElement("span");
        	span5.className="price";
        	span5.innerHTML=objectarr[i].sale;
        	
        	var span6=document.createElement("span");
        	span6.className="salerow";
        	span6.innerHTML=objectarr[i].salerow;
        	
        	var span7=document.createElement("span");
        	span7.className="sales";
        	span7.innerHTML=objectarr[i].num+"件";
        	
        	var a2=document.createElement("a");
        	a2.id="gouwuche";
        	a2.href="javascript:;"
        	a2.style.position="relative";
        	a2.style.top="-26px";
        	a2.style.left="156px";
        	a2.innerHTML="加入购物车";
        	
        	ul.appendChild(li);
            li.appendChild(a);
            a.appendChild(span1);
            span1.appendChild(img);
            a.appendChild(span2);
            span2.appendChild(b);
            a.appendChild(span3);
            a.appendChild(span4);
            a.appendChild(span5);
            a.appendChild(span6);
            span6.appendChild(span7);
            li.appendChild(a2);
   
    	}
    	document.body.insertBefore(div1, number1);
    });
}
loadProductCategory();




