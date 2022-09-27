---
title: '[JS][코어 자바스크립트] 03. this'
date: 2021-02-10 23:33:07
category: 'javascript'
draft: true
---

- this는 함수와 객체(메서드)를 구분지어 준다.
  
## 1. 상황에 따라 달라지는 this
- 실행컨텍스트는 함수를 호출할 때 생성 -> 호출 방식에 따라 this달라짐
  
### 1. 전역공간에서의 this
- 전역 컨텍스트 생성 주체: 전역객체 => this === 전역객체: 브라우저-window, Node.js-global
- 실행컨텍스트는 변수를 수집해서 L.E의 프로퍼티로 수집 -> 전역변수 선언시 JS엔진은 이를 전역객체의 프로퍼티로 할당함
  
### 2. 메서드로서 호출할 때 그 메서드 내부에서의 this
- 함수를 실행하는 방법: 함수 호출 vs 메서드로서 호출
  - 함수: 독립적/ 메서드: 자신을 호출한 객체에 관한 동작 
  - 메서드: 객체의 프로퍼티로 할당된 함수 & 객체의 메서드로서 호출할 때만 메서드로 동작
  
```js
var func = (x) => console.log(this,x)
func(1) // 1
...
var obj = {
  method: func
};
obj.method(2)//or obj['method'](2) //this === obj//2
```
- 함수 호출시 함수 이름 앞에 객체 명시된 경우만 메서드로 호출, 나머지는 함수로 호출 

### 3. 함수로서 호출할 때 그 함수 내부에서의 this
- <U>함수 내부에서의 this</U>: 전역
- <U>메서드의 내부 함수 에서의 this</U>: 해당 함수 **호출**하는 구문 앞에 **. or []유무 파악**
- <U>화살표 함수</U>는 thisBinding안 함(실행 컨텍스트 생성시 thisBinding빠짐) => 상위 스코프의 this 그대로 활용
  
<img src = "https://user-images.githubusercontent.com/60782131/107139720-b33f9e80-6960-11eb-9adb-cebd2de7ec1c.png">
<img src = "https://user-images.githubusercontent.com/60782131/107139716-ac189080-6960-11eb-9bb1-50b2bc009e27.png">
  <font size =2>오른쪽의 경우 화살표 함수 X -> 함수로서 호출 -> this 지정 안됨 -> this === Window</font>


### 4. 콜백함수 호출시 그 내부함수에서의 this: 
- 함수이므로 기본적으로는 전역 객체 참조 But 제어권 받은 함수에서 별도로 this 지정시 그 대상 참조
### 5. 생성자 내부 함수에서의 this
- 어떤 함수가 생성자 함수로서 호출된 경우 this === 곧 새로 만들 인스턴스 자신

## 2. 명시적으로 this를 바인딩하는 방법
### 1. call 
- 객체, 객체의 메서드에 대해서 모두 this바인딩 가능
Function.prototype.call(thisArg[,arg1,[,arg2[,...]]]): 첫 번째 인자 제외한 나머지 모든 인자를 호출할 함수의 매개변수로 지정

### 2. apply
Function.prototype.apply(thisArg[, argsArray) : 두 번째 인자를 배열
```js
var func = function(a, b, c){
  console.log(this, a, b, c)
};

func(1,2,3);//Window{...} 123
func.call({x:1},(1,2,3)//{x:1}123
func.apply({x:1},[1,2,3])//{x:1}123
```

### 3. call, apply 활용
- 명시적으로 this 바인딩 가능 but 이로 인해 this 예측이 더 어려워지기도.(bind는 ES5에 첫 등장)
  
- **유사배열객체에 배열메소드 적용 가능** 예)Array.prototype.push.call(obj, 'd') 
  - 하지만 ES6부터 유사배열 or 순회가능한 모든 종류의 데이터타입을 배열로 전환하 **Array.from** 도입
  
```js
var obj = {0:'a',1:'b', length: 2}
var arr = Array.from(obj);
console.log(arr)//['a','b']
```

- **생성자 내부에서 다른 생성자 호출** : 다른 생성자끼리 공통되는 내용이 있으면 call,apply로 중복 줄이기
  
```js
function Person(name){
this.name = name};

function Student(name, school){
Person.call(this, name)
console.log(this);//{name:'선민'}
this.school = school
}

var min = new Student('선민','학교')
console.log(min)//{name:'선민', school:'학교'}
```
- **여러 인수 묶어 하나의 배열로 전달**. 하지만 ES6의 rest parameter사용하는 것이 더욱 간단
  
### 4. bind

<p align = "center">
<br />
<br />
학습한 내용을 추가할 예정입니다.
<br />
<br />
<br />
</p>

**출처** 정재남, 코어 자바스크립트(위키북스, 2019)
