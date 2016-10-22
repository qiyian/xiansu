
$(function(){
	var ione = $(".pic_view"),
		ithe = $(".the"),
		itwo = $(".item-thumbs img"),
		tthe = $(".the img");
	
	var arr = ["../images/thumb_img/69_thumb_P_1452466986391.jpg","../images/thumb_img/69_thumb_P_1452466996136.jpg","../images/thumb_img/69_thumb_P_1452467007896.jpg","../images/thumb_img/69_thumb_P_1452467119934.jpg","../images/thumb_img/69_thumb_P_1452467131187.jpg"];
	var oarr = ["../images/goods_fdj/goods11.jpg","../images/goods_fdj/goods12.jpg","../images/goods_fdj/goods13.jpg","../images/goods_fdj/goods14.jpg","../images/goods_fdj/goods15.jpg"];
	itwo.each(function(i){
		$(this).click(function(){
			$(".pic_view img").attr("src",arr[i])
			tthe.attr("src",oarr[i])
			itwo.removeClass("active")
			$(this).addClass("active")
		})
		
		ione.mousemove(function(a){
			var evt = a || window.event
			ithe.css('display','block')
			var ot = evt.clientY-($(".pic_view").offset().top- $(document).scrollTop())-87;
			var ol = evt.clientX-($(".pic_view").offset().left- $(document).scrollLeft())-87;
			if(ol<=0){
				ol = 0;
			}
			if(ot<=0){
				ot = 0;
			}
			if(ol>=175){
				ol=175
			}
			if(ot>=175){
				ot=175
			}
			$(".fdjspan").css({'left':ol,'top':ot})
			var ott = ot/350*800
			var oll = ol/350*800
			tthe.css({'left':-oll,'top':-ott})
		})
		ione.mouseout(function(){
			ithe.css('display','none')
		})
		
	})
	
})

