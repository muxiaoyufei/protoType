```js
/** 
  // 同一页面中，window.onload 的多次调用 函数封装
  function addEvent(obj,evt,fn) {											
    var saved;
    if (typeof obj["on"+evt] == "function") {
      saved = obj["on"+evt];
    }
    obj["on"+evt] = function () {
      if (saved) saved();		
      fn();				
    }	  				

  addEvent(window,'load',firstAll);
  function firstAll() {
    alert('1');
  }
  addEvent(window,'load',nextAll);
  function nextAll() {
    alert('2');
  }
*/
```
