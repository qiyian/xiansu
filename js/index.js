function checkSearchForm(){
	if(document.getElementById("keyword").value){
		window.open("http://localhost:8080/httpview/xiansu/html/goods.html");
	}else{
		alert("请输入搜索关键字!");
		return false;
	}
}

$(function(){
	
	/*收藏夹功能*/
	$("#favorite_wb").click(function() {
		var h = "http://"+location.hostname;
		var j = location.title;
		try {
			window.external.addFavorite(h, j);
		} catch (i) {
			try {
				window.sidebar.addPanel(j, h, "");
			} catch (i) {
				alert("对不起，您的浏览器不支持此操作！\n请您使用菜单栏或Ctrl+D收藏。");
			}
     	}
	})
	
	
	/*回到顶部效果 start*/
	$("a.back2top").click(function(){	
		$("body,html").animate({
                    scrollTop: 0
		}, 500);
	})
	/*回到顶部效果 end*/
	
	
	/*头部下拉菜单 start*/
	$("#userinfo-bar li.more-menu").mouseenter(function(){
		$(this).animate(300,function(){
			$(this).addClass("hover");
		})
	})
	
	$("#userinfo-bar li.more-menu").mouseleave(function(){
		$(this).animate(300,function(){
			$(this).removeClass("hover");
		})
	})
	/*头部下拉菜单 end*/
	
	
	/*购物车鼠标移入效果 start*/
	$("#ECS_CARTINFO").on("mouseenter", function() {
		$("#ECS_CARTINFO").animate(200,function(){
			$("#ECS_CARTINFO").addClass("hd_cart_hover");
		})
	}).on("mouseleave", function() {
		$("#ECS_CARTINFO").animate(200,function(){
			$("#ECS_CARTINFO").removeClass("hd_cart_hover");
		})
	});
	/*购物车鼠标移入效果 end*/
	
	
	/*分类导航鼠标移入效果 start*/	
	h = this;
	b = $("#J_mainCata");
	e = $("#J_subCata");
	i = $("#main_nav");
	l = null;
	k = null;    //计时器
	d = false;   //显示隐藏
	g = false;   //calss名
	f = false;   //动画
			
	i.on("mouseenter", function() {
		var m = $(this);
		if (l !== null) {
			clearTimeout(l);
		}
		if (f) {
			return;
		}
		l = setTimeout(function() {
			m.addClass("main_nav_hover");
			b.stop().show().animate({
					opacity: 1
			}, 300);
		}, 200);		
	}).on("mouseleave", function() {
		if (l !== null) {
			clearTimeout(l);
		}
		l = setTimeout(function() {
			e.css({
				opacity: 0,
				left: "100px"
			}).find(".J_subView").hide();
			b.hide();
			g = false;
			if (!f) {
				b.stop().delay(200).animate({
					opacity: 0
				}, 300, function() {
					i.removeClass("main_nav_hover");
					b.hide().find("li").removeClass("current");
				});
			} else {
				b.find("li").removeClass("current");
			}
        }, 200);
	});
			
			
	$("#J_mainCata li").mouseenter(function(){
		m = $(this);
		n = $("#J_mainCata li").index($(this));
				
		
		if (n > 1) {
			subView_h = (e.find(".J_subView").eq(n).height());
			b_h = b.height();
			m_h = m.height();
			m_p = m.position();
			

			x = b_h-subView_h;
			x = (x/2);
			
			v = parseInt(m_p.top)+m_h;
			
			
			if(parseInt(subView_h+x) > v)
			{
				x+=35;
				e.css({
					top: x
				});	
			}
			else
			{
				
				s = v - x - subView_h;
				x += s;
				x += 35;
				
				e.css({
					top: x
				});	
				
			}

			
		} else {
			e.css({
			top: "35px"
			});
		} 
		
		if (g) {					
			m.addClass("current").siblings("li").removeClass("current");
			e.find(".J_subView").hide().eq(n).show();
		} else {
			if (k !== null) {
				clearTimeout(k);
			}
			k = setTimeout(function() {
					m.addClass("current").siblings("li").removeClass("current");
					g = true;
					if (d) {
						e.css({
							opacity: 1,
							left: "213px"
						}).find(".J_subView").eq(n).show();
					} else {
						c(n);
                    }
			}, 200);
		}
	})
			
	function c(m) {
		e.css({
			opacity: 1,
			left: "213px"
		}).find(".J_subView").eq(m).show();
			d = true;
	}
	/*分类导航鼠标移入效果 end*/	

	
	/*今日推荐商品鼠标移入效果 start*/
	$("#temai_list li").on("mouseenter",function(){
		$(this).animate(1000,function(){
			$(this).addClass("hover");
		})
	}).on("mouseleave",function(){
		$(this).animate(1000,function(){
			$(this).removeClass("hover");
		})
	})
	/*今日推荐商品鼠标移入效果 end*/
	
})


/*首页轮播图 start */
/**

 * Date           : date
 * isAuto:        true, 自动播放
 * transTime:     3000, 自动播放间隔
 * animateSpeed:  1000,  动画速度
 * sliderMode:    'slide', 类型//'slide | fade',
 * pointerControl: true, 指示器开关
 * pointerEvent:  'click', 指示器类型//'hover' | 'click',

 */
;(function($) {
	$.fn.Slider = function(options) {
		"use strict";
		var settings = $.extend({
			isAuto: true,
			transTime: 3000,
    		animateSpeed: 1000,  
    		sliderMode: 'slide', //'slide | fade',
    		pointerControl: true,
    		pointerEvent: 'click',//'hover' | 'click',
    		arrowControl: true,
		}, options);
		var interval;
  		var isAnimating     = false;
  		var $slider         = $(this);
  		var $sliderWrap     = $slider.find('.slider-inner');
  		var sliderCount     = $sliderWrap.find('> .item').length;
  		var sliderWidth     = $slider.width();
  		var currentIndex    = 0;

  		var sliderFun = {
  			controlInit: function() {
      		// pointerControl
      			if (settings.pointerControl) {
        
        			var html = '';
        			html += '<ol class="slider-pointer">';
        			for (var i = 0; i < sliderCount; i++) {
          				if (i == 0) {
            				html += '<li class="active"></li>'
          				}else{
          					html += '<li></li>'
          				}
        			}
        			html += '</ol>'
        			$slider.append(html);
          			// 指示器居中
        			var $pointer = $slider.find('.slider-pointer');
        			$pointer.css({
          				left: '50%',
          				marginLeft: - $pointer.width()/2
        			});
      			}
    },
    // slider
    sliderInit: function() {
      sliderFun.controlInit();
      // 模式选择
      if (settings.sliderMode == 'slide') {
        // slide 模式
        $sliderWrap.width(sliderWidth * sliderCount);
        $sliderWrap.children().width(sliderWidth);
      }else{
        // mode 模式
        $sliderWrap.children().css({
          'position': 'absolute',
          'left': 0,
          'top': 0
        });
        $sliderWrap.children().first().siblings().hide();
      }
      // 控制事件
      if (settings.pointerEvent == 'hover') {
        $slider.find('.slider-pointer > li').mouseenter(function(event) {
          sliderFun.sliderPlay($(this).index());
        });
      }else{
        $slider.find('.slider-pointer > li').click(function(event) {
          sliderFun.sliderPlay($(this).index());
        });
      }
      // 自动播放
      sliderFun.autoPlay();
    },
    // slidePlay
    sliderPlay: function(index) {
      sliderFun.stop();
      isAnimating = true;
      $sliderWrap.children().first().stop(true, true);
      $sliderWrap.children().stop(true, true);
      $slider.find('.slider-pointer').children()
        .eq(index).addClass('active')
        .siblings().removeClass('active');
      if (settings.sliderMode == "slide") {
        // slide
        if (index > currentIndex) {
          $sliderWrap.animate({
            left: '-=' + Math.abs(index - currentIndex) * sliderWidth + 'px'
          }, settings.animateSpeed, function() {
            isAnimating = false;
            sliderFun.autoPlay();
          });
        } else if (index < currentIndex) {
          $sliderWrap.animate({
            left: '+=' + Math.abs(index - currentIndex) * sliderWidth + 'px'
          }, settings.animateSpeed, function() {
            isAnimating = false;
            sliderFun.autoPlay();
          });
        } else {
          return;
        }
      }else{
        // fade
        if ($sliderWrap.children(':visible').index() == index) return;
        $sliderWrap.children().fadeOut(settings.animateSpeed)
          .eq(index).fadeIn(settings.animateSpeed, function() {
            isAnimating = false;
            sliderFun.autoPlay();
          });
      }
      currentIndex = index;
    },
    // toggleSlide
    toggleSlide: function(arrow) {
      if (isAnimating) {
        return;
      }
      var index;
      if (arrow == 'prev') {
        index = (currentIndex == 0) ? sliderCount - 1 : currentIndex - 1;
        sliderFun.sliderPlay(index);
      }else if(arrow =='next'){
        index = (currentIndex == sliderCount - 1) ? 0 : currentIndex + 1;
        sliderFun.sliderPlay(index);
      }
    },
    // autoPlay
    autoPlay: function() {
      if (settings.isAuto) {
        interval = setInterval(function () {
          var index = currentIndex;
          (currentIndex == sliderCount - 1) ? index = 0: index = currentIndex + 1;
          sliderFun.sliderPlay(index);
        }, settings.transTime);
      }else{
        return;
      }
    },
    //stop
    stop: function() {
      clearInterval(interval);
    },
  };
  sliderFun.sliderInit();
}
})(jQuery);
jQuery(document).ready(function($) {
  $('#slider').Slider();
});


/*首页轮播图 end*/