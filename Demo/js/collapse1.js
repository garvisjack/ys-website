// JavaScript Document
// 基于JQuery框架，页面需要包含jQuery.js
$(document).ready(function() {
		//查找id＝specif的容器，将容器内的<dd>标签内容全部隐藏,end()结束，查找id															
	$('#specif1').find('dd').hide().end().find('dt').css("cursor", "pointer").click(function() {
         var answer = $(this).next();
         if (answer.is(':visible')) {
             answer.slideUp();
         } else {
             answer.slideDown();
         }
     });
	$('#expand1').click(function(){
		$('#specif1').find('dd').slideDown();
		return false;
	});
	$('#collapse1').click(function(){
		$('#specif1').find('dd').slideUp();
		return false;
	});
});
