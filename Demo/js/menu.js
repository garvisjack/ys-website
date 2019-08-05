function toggleMenuDisplay(id,div)
{   
  //var divCtl=document.getElementById('divParent_'+id);
  //var divChild=document.getElementById('divChild_'+id);
  //var divRoot=document.getElementById('div_root');
  //if(divChild.style.display == 'none')
  //{ 
  //  divCtl.className='style_top_pass'; 
   // divChild.style.display='block'; 
	//divRoot.className='style_selected';
	//puckerList();
	//}else { 
	//divCtl.className='style_top_pass1';
	//divChild.style.display='none'; 
	//divRoot.className='style_selected';
	//}
	
}

//折叠div
function puckerList() { 
     
    // alert(div);
     
     str=window.location.href; 
     
     //alert(str);
     //var es=/directoryId=/; 
     //es.exec(str); 
     //var node=RegExp.rightContext;
     
     var  strdirectoryId="directoryId";     
     
     //alert(strdirectoryId.length);
     
     //取得directoryId的长度     
     var strdirectoryIdlength=strdirectoryId.length;
     
     //取得开始取directoryId的位置
     var len1=str.indexOf("directoryId=")+strdirectoryIdlength+1;
     
     var len2=str.indexOf("&treeId");
     
     //alert(len2);     
     
     var node=str.substring(len1,len2);
     
     //alert(node);
      
    //展开子结点<div>
   var div =document.getElementById('divLeaf_'+node);   


   if(div==null){
         //如是父结点，直接展开他所包含的子的div   
         div =document.getElementById('divChild_'+node); 
         if(div!=null)
         {           
         
         div.style.display = "block";           
         
         var childNum=div.childNodes.length;
         
         for(i=0;i<childNum;i++)
         {
          //修改子结点样式
           div.childNodes[i].className='style_bottom_normal';      
         
         }   
                  
         //由子结点取得父结点
         var strDiv1=div.id.replace("divChild","divParent");  
         //取得父结点
         var div1=document.getElementById(strDiv1);
         
         //包含子结点的父结点
         if(div1.childNodes.length>0){         
            
           //设置选中父结点的颜色为红色      
            if(div1!=null)
       		{
        		 div1.className="style_top_pass_select";       
       		}                   
         }else{         
             //设置父结点样式         
             div1.className='style_top_pass';           
         }
         
         
         //定义循环次数
         var num=0;           
         
         //循环显示父结点
         while((div!=null)&&(div.parentNode!=null))
         {
            //如果不是divContent结点才进行遍历，否则退出循环
            if(div.parentNode.id.indexOf("divContent")<0){
               div.parentNode.style.display = "block";   
               div=div.parentNode; 
               num=num+1;   
            }else{            
               div=null;
            }  
         } 
         
         var div1Child;
         var div1ChildParent;
         
         for(i=0;i<num;i++)
         {
            //找到包含div1的结点
            if(i==0)
            {
             	div1Child=div1.parentNode;
            }else
            {
            	div1Child=div1Child.parentNode;
            }
            
            //设置当前选中结点一级的其它兄弟结点隐藏
            //var brothNode;
            //取得兄弟结点的个数
            //var brothNodeNum=div1Child.childNodes.length;
            
            //for(j=0;j<brothNodeNum;j++)
            //{              
            //   brothNode=div1Child.childNodes[j];
               
               //alert(brothNode);
               
               //不是当前结点，是兄弟结点
             //  if(brothNode.id.indexOf(node)<0)
             //  {
               //当前结点的兄弟结点的父结点与当前结点的父结点相同时才隐藏
               //  if(brothNode.parentNode.id==document.getElementById('divChild_'+node).parentNode.id)
               //  {
               //		 brothNode.style.display="none";
               //  }
               
              // }
            
           // }
            
          
           //找到包含div1Child结点的divParent结点
          var div1ChildParentID=div1Child.id.replace("divChild","divParent");  
                    
          //设置选中结点的父结点样式为下箭头样式
          div1ChildParent=document.getElementById(div1ChildParentID);
                    
          div1ChildParent.className='style_top_pass1';  
          
          //有爷爷结点时退出循环
          if(i==1)
          {
             //找到包含div1Child结点的爷爷结点
             var div1ChildParentID=div1Child.id.replace("divChild","divParent");                      
             //取得爷爷结点
             div1ChildParent=document.getElementById(div1ChildParentID);
             //设置选中结点的爷爷结点样式为隐藏
             //div1ChildParent.style.display="none";
             
             //选中结点的爷爷结点
               var divSele=document.getElementById('divChild_'+node).parentNode.parentNode;
             
             var divGrand=document.getElementById(div1ChildParent.parentNode.id);
             //如是最外层的结点
             while(divGrand.id.indexOf("divContent")>=0)
             {
               //隐藏爷爷级结点的兄弟结点
               
                              
               //取得爷爷级结点的所有兄弟结点
               var brothNodeNum=divGrand.childNodes.length;
               for(j=0;j<brothNodeNum;j++)
               {
            	
            	brothNode=divGrand.childNodes[j];            	
            	           
            	//是当前选中结点的爷爷兄弟结点则隐藏	
            	if(brothNode.id!=divSele.id)
                {
                   //不是当前选中结点的爷爷结点则不隐藏
            	   if(brothNode.id!=div1ChildParent.id)
            	   {
               		 brothNode.style.display="none";
                   }
                 
                 }
                           	
               }              
               
               divGrand=divGrand.parentNode;
             
             }                    
           
          }   
          if(i>2)
          {
             break;
          }              
         
         } 
 
         }
         else{
         //只是单独的divParent_开头的父结点，下面没有子结点      
         var divSelectParent=document.getElementById('divParent_'+node);     
             
       		if(divSelectParent!=null)
       		{
        		 divSelectParent.className="style_top_selected";
       
       		}         
         }
              
   
     return false;
   }
    
    
    //点击叶子结点链接展开树
  
    //alert(div.id);
    var  divPre=document.getElementById(div.parentNode.id);   
   
        
    //取得当前结点的id,如是子结点，则为它父结点的值，如是父结点，则为它本身的值
    var strPre=divPre.id; 
    
    var isPre=-1;
    
    var divobj=divPre;
    
    var num=0;
      
    while(isPre==-1){     
     
    
    //判断是否为divParent_结点
    isPre=strPre.indexOf("divParent_");
    //alert(isPre);  
      
      //取得父结点
      divobj=divobj.parentNode;
      
      //要显示叶子结点，他的父结点的个数
      num=num+1;
      
    //不是divParent_结点   
      strPre=divobj.id;  
         
      //alert(strPre);   
      //是divContent结点
       if(strPre.indexOf("divContent")>-1){
         isPre=0;         
         //alert(num);
         
         var strParetnNode="";
         //找出应该打开的父div
         for(i=0;i<num-1;i++){
          strParetnNode=strParetnNode+"parentNode."
          
           if(strParetnNode.length>0){
         
         	//显示父结点
         	var divDisplay="divPre."+ strParetnNode+"style.display ='block';" 
         	
         	//迭代显示父级结点样式
         	//if(i==num-2)
         	//{
         	
         	    //找到爷爷结点控制的div            	    
         	    var strOutput="var tmpdiv1="+"divPre."+ strParetnNode+"id"+";";         	    
         	    //alert("11="+strOutput);
         	    
         	    strOutput=strOutput+"var strTmpdiv1="+'tmpdiv1.replace("divChild","divParent");';         	    
         	    //alert("22="+strOutput);
         	   
         	   
         	    strOutput=strOutput+"var tmpDiv=document.getElementById(strTmpdiv1);";         	    
         	    //alert("33="+strOutput);
         	    
         	    
         	    strOutput=strOutput+'tmpDiv.className="style_top_pass1";';          	     
         	   // alert("44="+strOutput);
                 
                 //strDivParentTemp="divPre."+ strParetnNode+"id";
                 
                 //var strOutput="divPre."+ strParetnNode+"className='style_top_pass1';";
         	
         	    divDisplay=divDisplay+strOutput;
         	//}   
         	        
         	//alert(divDisplay);  
         	       
         	eval(divDisplay); 
          }                
         }     
         
         
          //隐藏最外层的兄弟结点
          
             var divGrand;             
             for(m=0;m<num-1;m++)
             {
               if(m==0)
                {
                   divGrand=divPre.parentNode;
                }else{
                   	   divGrand=divGrand.parentNode;
                   }
             }  
             
             if(divGrand!=null)
             {
            	 //替换成divParent_
            	var  divGrand1=divGrand.id.replace("divChild","divParent");             
            	                  
             	//取得最外层结点所有的div数
            	var numk=divobj.childNodes.length;
            	for(k=0;k<numk;k++)
            	{
                 	var brothNode=divobj.childNodes[k];                   
                          	           
            		//是当前选中结点的爷爷兄弟结点则隐藏	
            		if(brothNode.id!=divGrand.id)
                	{
                   		//不是当前选中结点的爷爷结点则不隐藏
            	   		if(brothNode.id!=divGrand1)
            	   		{
               		 		brothNode.style.display="none";
                   		}
                 
                 	}            
              	}  
             
          	  }                      
         }
                             
         var strDiv1=divPre.id.replace("divChild","divParent");
         
         var div1=document.getElementById(strDiv1);
         
         div1.className='style_top_pass';
         
         divPre.style.display = "block"; 
         
         var childNum=divPre.childNodes.length;
         
         for(i=0;i<childNum;i++)
         {
          //修改子结点样式
           divPre.childNodes[i].className='style_bottom_normal';           
         }    
              
       }
       
        //设置选中叶子结点的颜色为红色              
       var divSelectLeaf=document.getElementById('divLeaf_'+node);        
       
       if(divSelectLeaf!=null)
       {
         divSelectLeaf.className="style_bottom_selected";
       
       }      
      
       
       
    //alert(div);
    
    
    //div.parentNode.style.display = "block";
    
    
    // if(div.style.display == "none") {
          //alert(div);
    //      div.style.display = "block";
    //   }        
       //alert(div.style.display);
       
    //    alert(div.childNodes[0].id);

  }