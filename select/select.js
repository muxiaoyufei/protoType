 /** 
  *   selectFrame 数值展示框 
  *   optionlist  下拉框中的每一项的集合
  *   selectDownFrame  下拉框
  *   placeholder  无数值时数值展示框的字体颜色
  *   arrowIcon    向下的下拉箭头
  *   点击判断除他本身之外的任何元素，都隐藏 ul
  */
   function selectFun(selectFrame){
    this.selectFrame = document.getElementById(selectFrame); // #select_K
    this.downUp = this.selectFrame.children[1]; // .downUp
    this.selectTitle = this.selectFrame.children[0]; // #selectTitle
    this.selectDownFrame = this.selectFrame.nextElementSibling; // #select_down
    this.optionList = this.selectDownFrame.children; // .optionClass
  }
  // 点击切换显示隐藏 下拉框
  selectFun.prototype.select = function(up){
    var than = this;
    this.selectFrame.onclick = function(e){
      var len = document.getElementsByClassName("select_down");
      var downUps = document.getElementsByClassName("downUp")
      for(var j=0;j<len.length; j++){
        console.log("than.id--->", than.selectDownFrame.id);
        console.log("len[j].id--->", len[j].id);
        if (than.selectDownFrame.id == len[j].id){
          toggle(len[j]);
          toggleClass(len[j].parentElement.children[0].children[1],up);
        }else{
          // 隐藏所有
          len[j].style.display = "none";
          downUps[j].classList.remove("up");
        }
      }
      var e = e || event;

      // 阻止 冒泡事件 冒泡到 document上
      stopPropagation(e);
    }
  }
  // 点击 option 的每一项 ，替换 select 框中的值
  selectFun.prototype.selectOption = function(placeholder,up){
    var than = this
    for(var i=0;i<this.optionList.length;i++){
      this.optionList[i].onclick = function(e){
        var e = e || event;
        // 阻止 冒泡事件 冒泡到 document上
        stopPropagation(e);
        than.selectTitle.innerHTML = this.innerHTML; 
        if(than.selectTitle.innerHTML == '--无--'){
          than.selectTitle.classList.add(placeholder);
        }else {
          than.selectTitle.classList.remove(placeholder);
        }    
        toggle(than.selectDownFrame);
        than.downUp.classList.remove("up");
      }
    }
  }

  selectFun.prototype.init = function(fun){
    console.log("fun>>>>>>>",fun)
    fun.select("up");
    fun.selectOption("placeholder","up");
  }


  document.onclick=function(e){
    var len = document.getElementsByClassName("select_down");
    var downUps = document.getElementsByClassName("downUp")
    for(var j=0;j<len.length; j++){
      len[j].style.display = "none";
      downUps[j].classList.remove("up")
    }
  }
  /** 
  *  js 实现 toggle切换 显示&隐藏
  */
  function toggle(ele){
    var isNone = currentStyle(ele,["display"]);
    if("none" == isNone) {
      ele.style.display="block"
    }else {
      ele.style.display="none"
    }
  }
  /** 
  *  js 实现 toggle Class 切换 显示&隐藏
  */
  function toggleClass(ele,classNames){
    var hasCalss = classNames;
    if(ele.getAttribute("class").indexOf(hasCalss) > -1) {
      ele.classList.remove(classNames)
    }else {
      ele.classList.add(classNames)
    }
  }
  /** 
  *  js 实现 兼容 currentStyle
  *  currentStyle属性和getComputedStyle属性不能设置属性,只能获取 currentStyle:该属性只兼容IE,不兼容火狐和谷歌
  *  写法:ele.currentStyle["attr"]或者ele.currentStyle.attr; getComputedStyle:该属性是兼容火狐谷歌,不兼容IE
  *  写法:window.getComputedStyle(ele,null)[attr]获取是window.getComputedStyle(ele,null).attr
  */
  function currentStyle(ele,attr){
    if(window.getComputedStyle){
        return window.getComputedStyle(ele,null)[attr];
    }
    return ele.currentStyle[attr];
  }
  /** 
  *  js 实现 兼容 冒泡事件
  */
  function stopPropagation(e) {
    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
  }
  function addEvent(obj,evt,fn) {
    var saved;
    if (typeof obj["on"+evt] == "function") {
      saved = obj["on"+evt];
    }
    obj["on"+evt] = function () {
      if (saved) saved();		
      fn;	
    }
  }