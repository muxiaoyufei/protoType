function Person(name){
  this.name=name;
  this.showMe=function(){
    console.log(this.name);
  }
}

var one=new Person('js');
console.log(one)  //   Person{name:"js",showMe:f()}
console.log(one.prototype);  //  undefined
console.log(typeof (Person.prototype));  // object 
console.log(Person.prototype.constructor);   // ƒ Person(name){this.name=name; this.showMe=function(){
    // console.log(this.name); }}
console.log(Object.getPrototypeOf(one)==Person.prototype)  // true  备注：getPrototypeOf是获取_proto_

/**我们可以通过给原型添加属性和方法来给给对象添加属性或方法！
    Hero.prototype.name;
    Hero.prototype.sayMe = function(){"添加对象的方法其实就是添加函数"} */
function Hero(){
  // this.name = "zhangwuji";
  this.sayMe = function(){
    console.log("this is zhangwuji.");
  }
}

// 通过原型增加的属性或方法！
Hero.prototype.name = "zhouzhiruo";
Hero.prototype.sayMe = function(){
  console.log("this is zhouzhiruo.");
}

var hero = new Hero();
console.log(hero.name);  //  zhangwuji 
hero.sayMe();   //  zhangwuji 

console.log(hero.name)  //  zhangwuji

/** 删除函数中的this.name输出结果 **/
console.log(hero.name);  //  zhouzhiruo
hero.sayMe();   //  zhangwuji 

console.log(hero.name)  //  zhouzhiruo

/**我们验证了这个例子得到得到了一些结论：
当函数对象本身的属性或方法与原型的属性或方法同名的时候：
    1、默认调用的是函数对象本身的属性或方法.
    2、通过原型增加的属性或方法的确是存在的.
    3、函数对象本身的属性或方法的优先级要高于原型的属性或方法. */

    function Hehe(name) {
      this.name = name;
    }
    var h = new Hehe("笑你妹");
    //伪代码:
    function newObj(name){
       var obj = {};
       obj.__proto__ = Hehe.prototype; 
       obj.constructor = Hehe.prototype.constructor;
       var result = Hehe.call(obj, name);
       return typeof result==='object'&& result!=null ? result : obj;  //当无返回对象或默认时返回obj。
    }
    var hh = newObj("笑你妹");
    console.log(hh);
    console.log(h);
    console.log(h.__proto__.constructor)
    //虽然hh!=h,但是可以看到这个hh就和h的结构一样了。


  /**
   *  原型继承的基本案例
   */
  
  // 原型继承的基本案例
  
  //原型继承的基本案例
function protype(name, age) {
	this.name = name;
  this.age = age;
  console.log("this.name>>>>>>>",this.name)
  console.log("this.age>>>>>>>",this.age)
}
//1.直接替换原型对象 
var parent = {
	sayHello : function() {
    console.log("方式1：替换原型对象");
    console.log("this.name>>>>>>>11111111111",this.name)
    console.log("this.age>>>>>>>111111111111",this.age)
	}
}
protype.prototype = parent;
var p = new protype("张三", 50);
console.log("protype原型>>>>>>",protype.prototype)
console.log("p>>>>>>>",p.name)
p.sayHello();
//2.混入式原型继承
console.log(".............混入式原型继承..............");
function Student(name, age) {
	this.name = name;
	this.age = age;
}
var parent2 = {
	sayHello : function() {
    console.log("方式2：原型继承之混入式加载成员");
    console.log("this.name>>>>>>>222222222222",this.name)
    console.log("this.age>>>>>>>2222222222222",this.age)
	}
}
for ( var k in parent2) {
	Student.prototype[k] = parent2[k];
}
console.log("Student原型>>>>>>>>>",Student.prototype)
var p = new Student("张三", 50);
p.sayHello();
