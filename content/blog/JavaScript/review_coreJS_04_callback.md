---
title: '[코어 자바스크립트] 04. 콜백 함수'
date: 2021-02-04 10:46:13
category: 'JavaScript'
draft: false
---

## 1. 콜백 함수란?
- 정의: 다른 코드(함수, 메서드)의 인자로 넘겨짐으로써 그 제어권도 위임한 함수 

## 2. 제어권
### 1. 호출 시점
```js
var count = 0;
var cbFunc = function(){
  console.log(count);
  if(++count > 4) clearInterval(timer);
};
var timer = setInterval(cbFunc,300)
```
- cbFunc()의 호출 주체:사용자, 제어권: 사용자
- setInterval(cbFunc,300)의 호출 주체: setInterval, 제어권: setInterval
- 다른 코드(setInterval)에 인자로 cbFunc 넘겨줌 -> setInterval이 제어권 가짐 -> 300ms마다 콜백함수 실행. 즉 **콜백함수의 제어권을 넘겨받은 코드(setInterval)는 콜백함수 호출 시점에 대한 제어권 가짐**

### 2. 인자
```js
var arr = [1,2]
var newArr = arr.map((ele,index) => (ele * 2))
console.log(newArr)
```
- map: 모든 element(map메서드의 대상)을 처음부터 끝까지 하나씩 꺼내어 콜백 함수 반복 호출 -> 콜백 함수 실행 결과 모아 새로운 배열 생성
- 콜백함수의 제어권을 넘겨받은 코드(map메서드)는 콜백함수를 호출할 때 인자에 어떤 값들을 어떤 순서로 넘길 것인지에 대한 제어권 가짐

### 3. this
- 기본적으로는 this가 전역객체 참조, 제어권을 넘겨받을 코드에서 별도로 this가 될 대상 지정했으면 그 대상 참조

## 3. 콜백 함수는 함수다.
- 콜백함수로 어떤 객체의 메서드를 전달해도 그 메서드는 메서드가 아닌 **함수로서 호출**. 즉 '지정한 객체를 this로 하는 메서드'를 전달한 것이 아닌, 메서드로 표현된 '함수'만 전달시에는 this는 전역객체가 된다. 

## 4. 콜백 함수 내부의 this에 다른 값 바인딩하기
```js
var obj1 = {
  name:'obj1',
  func: function(){
    console.log(this);
  }
};
setTimeout(obj1.func.bind(obj1),1000);//this === obj1 / otherwise this === Window

var obj2 = {name:'obj2'};
setTimeout(obj1.func.bind(obj2), 1500)//this === obj2로 바인딩
```



