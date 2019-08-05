/*-----------------add by stz 2008-4-8--------------------------
---------------------------------------------------------------------
--------------------------重要说明-----------------------------------
---------------------------------------------------------------------
---------请不要删除注释,以后统一删,现在调试有用!!! 谢谢合作-----------
---------------------------------------------------------------------
---------------------------------------------------------------------
*/
//＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝修改js原有类--s-＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
String.prototype.trim = function()
{
	return this.replace(/(^\s*)|(\s*$)/g, "");
}

//＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝一些浏览公共的或常用的方法＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
//通过id获取页面上的对象，它是唯一的
function $(id){
  return document.getElementById(id); 
}
//通过name获取页面上的对象，页面上可以多个对象用同一个name，这返回一个数组，包含所有名字为name的对象。引用时可以用数组的形式访问按顺序出现的同名对象，如： $s("a")[1]取得第二个名字为a的对象。
function $s(name){
  return document.getElementsByName(name);
}
//列出对象所有属性----测试用
function test(){ alert(1)}
function listAllPara(obj){ //alert(obj);
   var str="";
	for(var i in obj){
		if(checkWebBrouser()!="IE"){
		  str+=i+"<br>   ";
		  if(i%5==0) str+="<br>\n";
		}else{
          str+=i+"|"+obj[i]+"<br>\n";
		}
	}
	alert(str); //ff用这个才不会跳过
	document.write(str);
	return false;
}
function listAllPara2(obj){ //alert(obj);
   var str="";
   if(arguments[1]) var showType=arguments[1];
   if(showType && showType==2){ //显示方式2： 当属性值存在时【不包括null但可以为0】才打印出属性和属性值
	   for(var i in obj){
		  if(obj[i] || obj[i]==0) str+="<span style=\"color:#FF0000\">"+ i + "</span> | " + obj[i] + "<br>\n";
	   }
   }else{
	  for(var i in obj){
		 str+="<span style=\"color:#FF0000\">"+ i + "</span> | " + obj[i] + "<br>\n";
	  }
   }
	//alert(str);
	if(checkWebBrouser()=="IE"){
	    var newDiv = document.createElement('<div id="msg" style="color: #154BA0; position: absolute; z-index: 40; background-color: #FFFFFF; left:0px; top: 0px; width: 600px; height: 300px; overflow:auto"></div>')
        document.body.insertBefore(newDiv);
	    $("msg").innerHTML=str;
	}else{
		var newDiv = document.createElement('DIV');
		newDiv.id="msg";
		newDiv.style.backgroundColor="#FFFFFF";
		newDiv.style.left="0px";
		newDiv.style.top="0px";
		newDiv.style.width="600px";
		newDiv.style.height="300px";
		newDiv.style.overflow="auto";
		newDiv.style.zIndex =40;
		newDiv.style.position ="absolute";
		  document.body.appendChild(newDiv);
		$("msg").innerHTML=str;
	}
	return false;
}
//返回网页参数 形如 somepage.html?para=1， ?后面的参数。若没有参数返回空数组，空数组等价于""
function pageSearchParas(){
	var paras=new Array();
	var url= window.location.search;
	if (url.indexOf("?")!=-1){
		var strs=url.substr(1).split("&");
		for(i=0; i<strs.length; i++){
			paras.push(new Array(strs[i].split("=")[0],unescape(strs[i].split("=")[1])));
		}
	}
	return paras; //返回一个包含参数名和参数值的二维数组。
}

//＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝补充的一些浏览器兼容代码 ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
//ff子节点前后经常有#text节点【不是紧挨着的节点，或第一个子节点没有紧挨着父节点的开始标签之后，那就有(不紧挨包括换行,但无论有没有字符，不紧挨着就有且只有一个#text节点;而ie只有在有字符时才有#text节点)】，此方法取子节点排除此bug。 试验页：F:\stz\PMT\pmt-new2008-6-6\pmt-new2.1\psd\textNode.html.
//另：ie中，如果有2个子节点相邻，且前面都有小空格（也可以是换行），那第二个小空格（或换行）算文本节点！， 所以本方法是在所有子节点前都加入文本节点。
function getChildNodes(obj,childOrder){ 
		   /*
			var childNode=obj.childNodes[childOrder];
			while(childNode.nodeType!=1){
			   childNode=childNode.nextSibling;
			}
			*/
	var childNode=obj.childNodes[childOrder]; //alert(childNode.tagName); return;
	//if(checkWebBrouser()=="IE"){
		var pChilds=obj.childNodes, j=pChilds.length;
		for(var i=0; i<j; i++){ //alert(pChilds.length);
	 //	alert(pChilds[i].nodeType);
			if(pChilds[i].nodeType==1 && i%2==0){ //i%2==0 奇数位置的元素。
				obj.insertBefore(document.createTextNode(" "),pChilds[i]);
				i++;
				j++;
				pChilds=obj.childNodes;
			}
		}
		
	//}alert(obj.childNodes[0].nodeType);
// alert(obj.childNodes.length); //obj.childNodes.length  obj.childNodes[4].nodeType
	return obj.childNodes[2*childOrder+1]; //obj.childNodes[childOrder+childOrder+1]演变
}
//检查浏览器 navigator.userAgent
function checkWebBrouser(){
   if(navigator.userAgent.indexOf("MSIE")>0){
        return "IE";
   } 
   if(navigator.userAgent.indexOf("Firefox")>0){
        return "FF";
   } 
   if(navigator.userAgent.indexOf("Safari")>0){
        return "Safari";
   }  
   if(navigator.userAgent.indexOf("Camino")>0){
        return "Camino";
   } 
   if(navigator.userAgent.indexOf("Gecko")>0){
        return "Gecko";
   }
}
//这个函数用来判断ie的版本。仅在checkWebBrouser()的判断为IE的条件里使用
function getIEVersion()
{
	var verStr=navigator.appVersion;
	if(checkWebBrouser()=="IE") 
    {
           if(verStr.match(/6./i)=='6.') 
           {
                return "IE6";
           }
		 if (verStr.indexOf("MSIE 3.0")!=-1 || verStr.indexOf("MSIE 4.0") != -1 || verStr.indexOf("MSIE 5.0") != -1 || verStr.indexOf("MSIE 5.1") != -1)
           return "IE5.1";
    }
}
//注册firefox innerText 
if(checkWebBrouser()!="IE"){
HTMLElement.prototype.__defineGetter__("innerText", 
function(){ 
  var anyString = ""; 
  var childS = this.childNodes; 
  for(var i=0; i<childS.length; i++) {
	if(childS[i].nodeType==1) 
      anyString += childS[i].tagName=="BR" ? '\n' : childS[i].innerText; 
    else if(childS[i].nodeType==3) 
      anyString += childS[i].nodeValue; 
  } 
  return anyString;
 }
);
HTMLElement.prototype.__defineSetter__("innerText", 
 function(sText){ 
   this.textContent=sText; 
 } 
);
} //if(checkWebBrouser()!="IE")


//attach事件兼容
function addEvent(oElement,sEvent,func){ 
  if (oElement.attachEvent){ 
    oElement.attachEvent(sEvent,func); 
  } 
  else{
    sEvent=sEvent.substring(2,sEvent.length); 
    oElement.addEventListener(sEvent,func,false); 
  } 
}

//触发事件源
function eventMatchObj(e){ 
  //var webBrouser=checkWebBrouser(); 
  if(window.event){  //webBrouser=="IE";
	  return e.srcElement;
  }else if(e.target){  //alert(e.target.tagName);
	  return e.target;
  }
}

//支持事件类型
function eventMatch(e){ 
  //var webBrouser=checkWebBrouser(); 
  if(window.event){  //webBrouser=="IE";
	  return "winEvent";
  }else if(e.target){  //alert(e.target.tagName);
	  return "Target";
  }
}

function initAlink(linkinObj){ 
	var containObj=$(linkinObj),cilds=containObj.childNodes;
	for(var i=0; i<cilds.length; i++){
		if(cilds[i].nodeName=='A'){
			//
		}
	}
}
function changeTdWidth(){
   if(!leftScrollArrow) var leftScrollArrow=$("leftScrollArrow");
   if(!leftMenu) var leftMenu=$("leftMenu");
   if(leftMenu.style.display!="none"){
     leftMenu.style.display="none";
	 leftScrollArrow.src=leftScrollArrow.src.replace("left.gif","left2.gif");
   }else{
     leftMenu.style.display="";
	 leftScrollArrow.src=leftScrollArrow.src.replace("left2.gif","left.gif");
   }
}
function displayDIV(divId){
	var xxx=$(divId);  //alert(xxx.style.display);
	if(xxx.style.display==''){
		xxx.style.display='block'
	}else{
		xxx.style.display=''
	}
}
function displayDIV2(divId){
	var xxx=$(divId);  //alert(xxx.style.display);
	var markframe=$(divId+"_mark");
	markframe.style.height=document.body.scrollHeight;
	//$(divId+"_markframe").style.height=document.body.offsetHeight; //滚动时会闪动啊，难怪大家都用隐藏select来解决
	if(xxx.style.display==''||xxx.style.display=='none'){
		xxx.style.display='block';
	//	xxx.style.left=event.clientX;
	//	xxx.style.top=event.clientY-200;
//	xxx.style.left=(document.body.scrollWidth-xxx.scrollWidth)/2;
//	xxx.style.top=(document.body.scrollHeight-xxx.clientHeight)/2;
      xxx.style.left=event.clientX;
	xxx.style.top=event.clientY-xxx.clientHeight-20;
		markframe.style.display='block';
		hideAllSelect();
	}else{
		xxx.style.display='none';
		markframe.style.display='none';
		showAllSelect();
	}
}

function closeDiv(divId){
	$(divId).style.display='none';
}
function closeIframe(divId){
	parent.$(divId).style.display='none';
	var markframe=parent.$(divId+"_mark");
	markframe.style.display='none';
	parent.showAllSelect();
}
var attachTimes=1;
function linkActive_tag(obj,inputId){
    var div1=obj, cilds=obj.childNodes, input=$(inputId); //alert(cilds[0].nodeType+"|"+cilds[1].nodeType);
    //alert(div1.tagName);
	if(!attachTimes) return;
	function addLinkToInput(e){
		//input.value+=innerText+" ";
		alert(e);
	}
	//alert(cilds[1].nodeName);
	var addLinkToInputTemp=function(inputObj){
		return function(e){
			if(inputObj.value.trim()==""){
				inputObj.value+=e.srcElement.innerText;
			}else{
			inputObj.value+=","+e.srcElement.innerText; //alert(e.srcElement);
			}
		}
	}
	
	for(var i=0; i<cilds.length; i++){
		if(cilds[i].nodeName=='A' && attachTimes>0){
			cilds[i].attachEvent("onclick",addLinkToInputTemp(input));
			//cilds[i].click=addLinkToInput;
		}
	}
	attachTimes=0; //alert(attachTimes);
}

function addLinkToInput(obj,inputId){
	var inputObj=$(inputId);
	if(inputObj.value.trim()==""){
			inputObj.value+=obj.innerText;
	}else{
			inputObj.value+=","+obj.innerText; //alert(e.srcElement);
	}
	
}
//＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ 初始化 ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
function changeHeight(){ //alert(1);
   var leftMenuDiv=$("leftMenus"), content=$("content"); //,topmenuDivbig=$("topmenuDivbig"), bottomDivbig=$("footer"); //content=$("content"),
  // var outerHeight=topmenuDivbig.scrollHeight+bottomDivbig.scrollHeight; alert(document.body.offsetHeight);
 // alert(content.tagName);
	// if(!leftMenuDiv || !content){ 
	//   alert("结构不对，请参照 news\news.html"); return;
	// }
   if(parseInt(document.body.offsetHeight)>110){ // alert(1);
       leftMenuDiv.style.height=document.body.offsetHeight-110;
	  //  alert($("content").tagName);
	  content.style.height=document.body.offsetHeight-110;
	  if(checkWebBrouser()!="IE"){
		  leftMenuDiv.style.height=document.body.clientHeight-100; //290
		  content.style.height=document.body.clientHeight-120;  //alert(1);
	  }
   }
   if(parseInt(document.body.offsetWidth)<1000){ 
      topmenuDivbig.style.width="1000px";
	//  content.style.width=document.body.offsetHeight-160;
	// content.style.overflowX="scroll";
	  //leftMenuDiv.style.width="175px";content.style.width=parseInt(document.body.offsetWidth)-183;
   }else{
	 // alert(topmenuDivbig.tagName);
	    topmenuDivbig.style.width="100%";
		//$("content").style.width="100%"; //content.style.overflowX="hidden";
   }
   
   if(parseInt(content.offsetWidth)<600){ 
      content.style.width="600px";
   }else{
	 // alert(topmenuDivbig.tagName);
	    content.style.width="100%";
   }
}
//＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ 选择模板 ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
function showModeSelected2(radio){
	var msg=$('showModeChoosedName');
	msg.innerHTML="The mode your choose is: <b>"+radio.value+"</b>";
}
function showModeSelected(radio){
	var msg=parent.$('showModeChoosedName'); //alert(radio.value);
	msg.innerHTML="The mode your choose is: <b>"+radio.value+"</b>";
}

//＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝修正 ie6 png透明bug ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
var arVersion = navigator.appVersion.split("MSIE")
var version = parseFloat(arVersion[1])

function fixPNG(myImage) 
{
 if ((version >= 5.5) && (version < 7) && (document.body.filters)) 
 {
var imgID = (myImage.id) ? "id='" + myImage.id + "' " : ""
var imgClass = (myImage.className) ? "class='" + myImage.className + "' " : ""
var imgTitle = (myImage.title) ? 
"title='" + myImage.title + "' " : "title='" + myImage.alt + "' "
var imgStyle = "display:inline-block;" + myImage.style.cssText
var strNewHTML = "<span " + imgID + imgClass + imgTitle+ " style=\"" + "width:" + myImage.width + "px; height:" + myImage.height + "px;" + imgStyle + "; filter:progid:DXImageTransform.Microsoft.AlphaImageLoader" + "(src=\'" + myImage.src + "\', sizingMethod='scale');\"></span>"
  myImage.outerHTML = strNewHTML 
  }
}
//==========================实现复选框逻辑部分s=========================================

var initChecked=1; //防止attachEvent多次. 那样会响应多次.
var disabledBtn=1; //默认为一组添加和删除按钮，但如果有多个from则有多组添加和删除按钮，它们的name值是一样的【下面置灰按钮有用到】
function initCheckEvent(obj){// alert(1)
	if(arguments[1]) initChecked=arguments[1]; // 当一个页面中有多个from时用到此参数【参数2】
	if(arguments[2]) disabledBtn=arguments[2]; // 要控制的 添加和删除按钮 是第几个form里的【参数3】
   var eles = obj.elements;
	if (eles.length > 0)
	{ var checkboxNum=0;
		if(initChecked){
		for (var i=0; i<eles.length; i++)
		{//alert(eles[i].clientTop);
			var node = eles[i];
			if (node.type == "checkbox" && node.disabled == false)
			{
				//node.attachEvent("onclick",disableAddBtn);
				//node.attachEvent("onmouseover",handMouse);
				addEvent(node,"onclick",disableAddBtn);
				addEvent(node,"onmouseover",handMouse);
				checkboxNum++;
				//node.onmouseover="alert('df')";
			}
		}//for
		  initChecked=0;
		}  
	  //alert(checkboxNum);
	}
}
function handMouse(e){ //默认传入event对象 
	var eventObj=eventMatchObj(e);  //alert(eventObj.tagName);
	eventObj.style.cursor="pointer";
}
function disableAddBtn(e){
 // /*
  //alert("ff");
  var eventObj=eventMatchObj(e);    //alert(eventObj.tagName);
  var form=null;
   //alert(typeof(arguments[0])); //all object
  if(typeof(arguments[0])=="string"){ //alert(arguments[0]); ?? 我也忘了干吗用的了
	  form=document.getElementById(arguments[0]);
  }else{
	 while(eventObj.tagName != 'FORM')
	 {
		 eventObj = eventObj.parentNode;
	 }
	 form=eventObj;
  }
  
 //  alert(form.id);
  var allNoChecked=true;//全未选中
  var oneChecked=false;
  var allCheckBoxNum=0;
  var subCheckedBoxNum=0;
   
  var eles = form.elements; 
	if (eles.length > 0)
	{ //alert(eles[0].id);
	 //alert(eles.length);
	 var selectAllBox=null; //全选筐
		for (var i=0; i<eles.length; i++)
		{
			var node = eles[i];
			if (node.type == "checkbox" && node.disabled == false)
			{  //alert(node.id.indexOf("selectAll"));
			  if(node.id.indexOf("selectAll")<0){ //if 1 : 排除第一个复选筐[它是全选的],复选筐中只有它的id含selectAll
				  allCheckBoxNum++; //alert(node.id);
			   if(!node.checked){
				  allNoChecked=true;
				}else{
				  allNoChecked=false;
				  oneChecked=true;
				  subCheckedBoxNum++;
				}
			  }else{
				  selectAllBox=node;
			  }//if 1
			}
		}//for
		
	}
	  //alert(disabledBtn);
	
	
	if(allCheckBoxNum==subCheckedBoxNum){
	   selectAllBox.checked=true;
	}else{
		selectAllBox.checked=false;
	}
//	*/
}
//------------------------------- 修改数据时的判断是否有选择，是否多选 -------------------------------
function checkEditBox(objid,msg1,msg2){
 	var form=$(objid),eles = form.elements;
 	var curChekbox="";
	if (eles.length > 0)
	{
	   var checkedboxNum=0; //选中的复选筐
	   for (var i=0; i<eles.length; i++) {
	      //alert(eles[i].clientTop);
		  var node = eles[i];
		   if (node.type == "checkbox" && node.disabled == false){
			if(node.checked) checkedboxNum++;
			curChekbox=node.name;
		   }
		
	    }
	    if(curChekbox=='checkbox22' && checkedboxNum==1){
			document.getElementById("jsmsg").innerHTML=msg2;
			return false;
		}
	    if(checkedboxNum>1){
	    	 //alert(msg1);
	    	 document.getElementById("jsmsg").innerHTML=msg1;
	    	 return;
	    } else if(checkedboxNum==0){
	    	 //alert(msg2);
	    	 document.getElementById("jsmsg").innerHTML=msg2;
	    	 return;
	    }else { 
		if(checkedboxNum!=0){
		   return true;
		}
	    }
	}

}

//----------------------------------- 判断多行选择 -----------------------------------------
function checkChkBox_Multi(objid,msg1){
	var form=$(objid),eles = form.elements;
	var curChekbox="";
	if (eles.length > 0)
	{
		var checkedboxNum=0; //选中的复选筐
		for (var i=0; i<eles.length; i++){
		//alert(eles[i].clientTop);
			var node = eles[i];
			if (node.type == "checkbox" && node.disabled == false)
			{
				if(node.checked) checkedboxNum++;
				curChekbox=node.name;
			}
		}
		if(curChekbox=='checkbox22' && checkedboxNum==1){
			document.getElementById("jsmsg").innerHTML=msg1;
			return false;
		}
	    if(checkedboxNum>1){ 
	 		//alert(msg1);
	 		document.getElementById("jsmsg").innerHTML=msg1;
	 		return;
		}else{
		  return true;
		}
	}
}
//----------------------------------- 判断是否有选择 -----------------------------------------
function hasCheckChkBox(objid,msg1){
	var form=$(objid),eles = form.elements; 
	var curChekbox="";
	if (eles.length > 0)
	{
		var checkedboxNum=0; //选中的复选筐
		for (var i=0; i<eles.length; i++){
		    var node = eles[i];
		    if (node.type == "checkbox" && node.disabled == false){
				if(node.checked) checkedboxNum++;
				curChekbox=node.name;
		    }
		}//for
		if(curChekbox=='checkbox22' && checkedboxNum==1){
			document.getElementById("jsmsg").innerHTML=msg1;
			return false;
		}
	   	if(checkedboxNum==0){ 
	   	
             		//alert(msg1);
             		document.getElementById("jsmsg").innerHTML=msg1;
             		return;
		}else{
		  return true;
		}
	    
	}

}

//---- <ec:column property="null" title="<a href='#' onclick='javascript:handleSelectAllEvent2(\"ptform\");'>全选</a>"  width="5%" sortable="false" > --
var handleSelectAllEvent2_selectAll=false;
function handleSelectAllEvent2(formId){

	if (handleSelectAllEvent2_selectAll == false){
		selectAll(formId);
		handleSelectAllEvent2_selectAll = true;
	}
	else{
		deselectAll(formId);
		handleSelectAllEvent2_selectAll = false;	
	}
}

//---<ec:column property="null" title="<input name='checkbox22' type='checkbox' id='items:selectAll' onClick='handleSelectAllEvent(\"ptform\",\"items:selectAll\");' value='selectAll' style='cursor:pointer'>全选"  width="5%" sortable="false" >----
function handleSelectAllEvent(formId,selAllId){

	var selector = $(selAllId);
	if (selector.checked == true){
		selectAll(formId);
	}
	else{
		deselectAll(formId);	
	}
}
/**
 *	Select All checkboxes in the form except for the disables.
 */
function selectAll(formId)
{
	var form = $(formId);
	var eles = form.elements;
	if (eles.length > 0)
	{
		for (var i=0; i<eles.length; i++)
		{
			var node = eles[i];
			if (node.type == "checkbox" && node.disabled == false)
			{
				node.checked = true;
			}
		}
	}
}
/**
 *	Deselect All checkboxes in the form except for the disables.
 */
function deselectAll(formId)
{
	var form = $(formId);
	var eles = form.elements;
	//alert(eles.length);
	if (eles.length > 0)
	{
		for (var i=0; i<eles.length; i++)
		{
			var node = eles[i];
			//alert(node.tagName);
			if (node.type == "checkbox" && node.disabled == false)
			{
				node.checked = false;
			}
		}
	}
}

//＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ 隐藏所有下啦列＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
function hideAllSelect(){
	var inputs=document.getElementsByTagName("SELECT");
	for (var i=0;i<inputs.length;i++){
		inputs[i].style.visibility="hidden";
    }
}
//＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ 显示所有下啦列表 ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
function showAllSelect(){
	var inputs=document.getElementsByTagName("SELECT");
	for (var i=0;i<inputs.length;i++){
		inputs[i].style.visibility="visible";
    }
}
//＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ 增加问题列表（内核：增加表格行） ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
function addQuestions_qn(e,trid,tbid){
   var tr_cur=$(trid),tb_cur=$(tbid);
   //alert(tr_cur.rowIndex);
   if(!addQuestionsTitle_qn(tr_cur.cells[0].innerHTML)){ alert('不能再添加了'); return;}
   
   var newTR = tb_cur.insertRow(tr_cur.rowIndex); //alert(newTR.nodeName); return; insertRow插入一行， rowIndex当前行的索引，0开始。
   var newTD1=newTR.insertCell(0); //插入单元格
   var newTD2=newTR.insertCell(1);
   newTD1.innerHTML=tr_cur.cells[0].innerHTML;
   newTD2.innerHTML=' <input name="textfield3224" type="text" size="40">\n <input type="checkbox" name="checkbox4" value="checkbox" style=" border:0px"> correct answer ? <A href="#" onClick="deleteRow(event,\'contentTB\')"><IMG height="15" alt="Delete Row" src="../../images/saveDelete.gif" width="15" align="absMiddle" border="0"></A>';
   newTD1.className=tr_cur.cells[0].className;
   newTD2.className=tr_cur.cells[1].className; //alert(tr_cur.cells[1].innerHTML.replace('24','54'));
   
   tr_cur.cells[0].innerHTML=addQuestionsTitle_qn(tr_cur.cells[0].innerHTML)+":";
}

function addQuestionsTitle_qn(str){ //alert("z".charCodeAt(0));
   if(str.charCodeAt(0)==90)
    return false;
   else
   return String.fromCharCode(str.charCodeAt(0)+1);
}
//＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ 添加表格行 ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
function addRow(e,tbId){
	var table=$(tbId), eventobj=eventMatchObj(e), cur_tr=eventobj.parentNode;
	while(cur_tr.nodeName!="TR"){ //这样可以找到元素所在的行
		cur_tr=cur_tr.parentNode;
	}
	var oldTR=table.rows[cur_tr.rowIndex-1], oldTD1=oldTR.cells[0], oldTD2=oldTR.cells[1];
	var newTR=table.insertRow(cur_tr.rowIndex);  //insertRow 插入行
	var newTD1=newTR.insertCell(0); //插入单元格
    var newTD2=newTR.insertCell(1);
	newTD1.className=oldTD1.className;
    newTD2.className=oldTD2.className;
	newTD1.innerHTML=oldTD1.innerHTML;
    newTD2.innerHTML=oldTD2.innerHTML;
}

//＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ 删除表格行 ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
function deleteRow(e,tbId){
	var table=$(tbId), eventobj=eventMatchObj(e), cur_tr=eventobj.parentNode;
	while(cur_tr.nodeName!="TR"){ //这样可以找到元素所在的行
		cur_tr=cur_tr.parentNode;
	}
	if(table.rows.length>2) table.deleteRow(cur_tr.rowIndex);  //deleteRow 删除行  cur_tr.rowIndex>0保证还有两行。
}
//＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ 按钮样式 ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
function clearBorder(obj){
  obj.blur();
  obj.className="preview";
}
function btnOverStyle(obj){
  obj.blur();
  obj.className="previewOver";
}
//＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ 根据是否是图片决定 url是否出现 ＝＝＝＝＝＝＝＝＝＝＝＝
function changeMsg_banner(status){
  var bannerText=$("bannerText");
  if(status){bannerText.style.display=""}else{bannerText.style.display="none"}
  
}
function changeMsg_banner2(selObj){
	var selVal=selObj.value;
	var bannerText=$("bannerText");
    if(selVal=="01"){bannerText.style.display=""}else{bannerText.style.display="none"}
}

function checkEmail(i){ 
	var re = /\w+@\w+\.\w+/;
  	var te = re.test(i);
    if(!te){
     
	   return false; 
    }else{
       return true;
    }
} 

function changeMsg_banner3(selObj,objid){
        var bannerText=$(objid);
         //alert(selObj.value);
        if(selObj.value=="1"){bannerText.style.display=""}else{bannerText.style.display="none"}
}

function chg_relatShip(selObj,objid,fileId){
  var bannerText=$(objid), file=$(fileId);
  //alert(selObj.value);
  if(selObj.value=="Image"){bannerText.style.display=""}else{bannerText.style.display="none"}
  if(selObj.value=="function"){file.style.display="none"}else{file.style.display=""}
}

//清除左边空格
function pub_ltrim(deststr){
	var pos=0;
	var retStr=new String(deststr);
	if (retStr.lenght=0) return retStr;
	while ( retStr.substring(pos,pos+1)==" ") pos++;
	retStr=retStr.substring(pos);
	return(retStr);
}

//清除右边空格
function pub_rtrim(deststr){
	var retStr=new String(deststr);
	var pos=retStr.length;
	if (pos == 0 ) return retStr;
	while (pos && retStr.substring(pos-1,pos)==" " ) pos--;
	retStr=retStr.substring(0,pos);
	return(retStr);
}

//清除左边和右边空格
function pub_trim(deststr){   
	var retStr=new String(deststr);
	var pos=retStr.length;
	if (pos == 0 ) return retStr;
	retStr=pub_ltrim(retStr);
	retStr=pub_rtrim(retStr);
	return retStr;
}

//============================================= 显示隐藏层 ============================================= 
function showDiv(showDivId,hideDivId){
   
	var showedDiv=$(showDivId), hidedDiv=$(hideDivId);
	showedDiv.style.display="";
	hidedDiv.style.display="none";
}
function showDiv2(DivId){
	var div=$(DivId);
	if(div.style.display==""||div.style.display=="block")
	  div.style.display="none";
	else
	  div.style.display="";
}
function showTipMassage(divId){
	var div=$(divId), content=$("content"); 
	div.style.visibility="visible"; //alert(document.body.scrollWidth+" "+document.body.clientWidth+" "+document.body.offsetWidth);
	//div.style.top+=parseInt(content.scrollTop);
	var hideTipMassage_temp=function(divId){
		return function(){
			hideTipMassage(divId);
		}
	}
	setTimeout(hideTipMassage_temp(divId),1000);
}
function hideTipMassage(divId){
	$(divId).style.visibility="hidden";
}
//============================================= 给文本赋值。
function evaluateToText(eObj,objId){
	var obj=$(objId);
	obj.value=eObj.src;
}

//判断复选框选是否被选中，选中返回选中后的ID值
function getEmenVale(objid){
   var form=$(objid),eles = form.elements; 
   var reId="";
   var k=0;
   if (eles.length > 0){
   var checkedboxNum=0; //选中的复选筐
	for (var i=0; i<eles.length; i++){
	    var node = eles[i];
	    if (node.type == "checkbox" && node.disabled == false){
			if(node.checked){
			   if (k == 0) {
			     reId = "'" + node.value+ "'";
			     k=k+1;
			   }else {
				 reId = reId + ",'" + node.value + "'";
				 k=k+1;
			  } 
			}
			
	    }
	}
   } 
   return reId;
 }
//判断复选框选是否被选中，选中返回选中后的ID值(不包含“‘”号)
function getEmenValeTwo(objid){
   var form=$(objid),eles = form.elements; 
   var reId="";
   if (eles.length > 0){
   var checkedboxNum=0; //选中的复选筐
	for (var i=0; i<eles.length; i++){
	    var node = eles[i];
	    if (node.type == "checkbox" && node.disabled == false){
			if(node.checked){
			  
				 reId = reId + "," + node.value;
				
			 
			}
			
	    }
	}
   } 
   return reId;
 }
//返回ID字符串为数组形式
function getEmenValeThree(objid){
   var form=$(objid),eles = form.elements; 
   var reId="";
   var arr=new Array(); 
   var count = 0;   
   if (eles.length > 0){
   var checkedboxNum=0; //选中的复选筐
	for (var i=0; i<eles.length; i++){
	    var node = eles[i];
	    if (node.type == "checkbox" && node.disabled == false){
			if(node.checked){
				arr[count++] = eles[i].value;
			}
			
	    }
	}
   } 
   return arr;
 }
 
 
 GetoffsetLeft = function(theObject)
	{ //return theObject's absolute offsetLeft .  translate by stz: 返回对象在页面中的绝对左距离

		var absLeft = 0; 

		var thePosition=""; 

		var tmpObject = theObject; 

		while (tmpObject != null)
		{
			thePosition = tmpObject.position; 
			tmpObject.position = "static"; 
			absLeft += tmpObject.offsetLeft; 
			tmpObject.position = thePosition; 
		 	tmpObject = tmpObject.offsetParent; 
		}
		return absLeft; 
	} 

GetoffsetTop = function(theObject)
	{ //return theObj's absolute offsetTop 
		var absTop = 0; 
		var thePosition = ""; 
		var tmpObject = theObject; 
		while (tmpObject != null)
		{ 
			thePosition = tmpObject.position; 
			tmpObject.position = "static"; 
			absTop += tmpObject.offsetTop; 
			tmpObject.position = thePosition; 
			tmpObject = tmpObject.offsetParent; 
		} 
		return absTop; 
	}
	

/*-----------------tab页效果---------------------------------*/
var CurComId=1,widthed=0;
function switchComment(Id,tabbar){
	var tab=$("tab");
	for(var i=0;i<tab.childNodes.length;i++) {
		if(tab.childNodes[i].className!="horizontalSpace")
		tab.childNodes[i].className="unitOff"	
	}//alert(tabbar.outerHTML);
	tabbar.className="unitOn"
    CurComId=Id;
}
function switchComment2(Id,tabbar){
	var tab=$("tab"), imgBg=tab.style.backgroundImage; //alert(imgBg.substring(imgBg.indexOf("."),imgBg.length));
	var imgNumPos=imgBg.lastIndexOf("."); //alert(imgBg.substring(imgNumPos-1,imgNumPos)); return;
	tab.style.backgroundImage=imgBg.replace(imgBg.substring(imgNumPos-1,imgNumPos),Id);
	//tab.style.backgroundImage=imgBg.replace(imgBg.substr(imgBg.length),Id);
	if (Id!=CurComId){
		eval("document.getElementById('tab" + Id.toString() + "').style.display='block';");
		eval("document.getElementById('tab" + CurComId.toString() + "').style.display='none';");
		CurComId=Id;
	}
}

function showFAQlist(curObj){
	var oprObj=curObj.nextSibling; 
	while(oprObj.nodeType!=1){
		oprObj=oprObj.nextSibling; 
	}//alert(oprObj.nodeType); return;//.parentNode.childNodes[1]  word_bold cursorHand
	if(oprObj.style.display==""){
		oprObj.style.display="none";
		curObj.className="word_bold cursorHand";
	}else{
		oprObj.style.display="";
		curObj.className="word_666 word_bold cursorHand"; //word_black
	}
}
 
 /**
 * validate value  whether is  null
 * value --
 *
 */
function isNull(obj)
{
	if(trim(obj.value)=="")
	{
		return true;
	}
	return false;
}
 
 
 /**
 * delete string start's position space and end's position space
 * @param str 
 * @return str
 */
function trim(str)
{
    if(str == null) return "" ;

    /** delete front space */
    while( str.charAt(0)  == ' ' )
    {
        str = str.substring(1,str.length);
    }
    /** delete end space ** */
    while( str.charAt(str.length-1)  == ' ' )
    {
        str = str.substring(0,str.length-1);
    }
    return str ;
}

	//目录测试
	function catalogTest(str){
		if(str.substring(0,3)!='|--'){
			return false;
		}
		return true;
	}


	//两个参数，一个是cookie的名子，一个是值
	function SetCookie(name,value)
	{
	    var Days = 30; //此 cookie 将被保存 30 天
	    var exp  = new Date();    //new Date("December 31, 9998");
	    exp.setTime(exp.getTime() + Days*24*60*60*1000);
	    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
	}
	//取cookies函数
	function getCookie(name){
	    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
	     if(arr != null) return unescape(arr[2]); return null;
	
	}
	//删除cookie
	function delCookie(name){
	    var exp = new Date();
	    exp.setTime(exp.getTime() - 1);
	    var cval=getCookie(name);
	    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
	}

//字符串替换
	function strTest(str){
	if(str.indexOf('Y')!=-1){
		return true;
	}
	return false;
}

  function substr(s){
      var start = 0;
      if(s.charAt(0)=='|'){
	      for(var i=1; i<s.length; i++){
	         start = i;
	         if(s.charAt(i)!='-')
	            break;
	      }   
      }
      return s.substring(start, s.length);
   }
