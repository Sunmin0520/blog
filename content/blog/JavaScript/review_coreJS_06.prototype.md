---
title: '[JS][코어 자바스크립트] 06. 프로토타입'
date: 2021-02-09 13:50:07
category: 'javascript'
draft: false
---
- 클래스 기반 언어에서는 '상속'을 사용
- JS는 프로토타입 기반 언어 -> 어떤 객체를 프로토타입(원형)으로 잡고 이를 복제(참조)해서 상속과 비슷한 효과 얻음

## 1. 프로토타입 개념 이해

### 1. constructor, prototype, instance

- Constructor.prototype: Constructor의 prototype객체에는 인스턴스가 사용할 메서드 저장
- new : Constructor를 new연산자와 함께 호출하면 instance생성
- instance.__ proto __ : instance의 __ proto __는 Constructor의 prototype 참조
  => 생성자 함수의 prototype에 어떠한 메서드나 프로퍼티가 있다면 인스턴스에서도 마치 자신의 것처럼 해당 메서드나 프로퍼티에 접근 가능
- **__proto__는 생략 가능한 메소드이다.**
```js
var Person = function(name){
  this._name = name;
};
Person.prototype.getName = function(){
  return this._name;
};
var sunmin = Person('sunmin');
sunmin.getName();//sunmin
```
  - sunmin.__ proto __ .getName이라고 쓰면 this === sunmin.__ proto __가 되지만, sunmin.getName이면 this === 생성한 새 인스턴스 === sunmin이 된다.


### 2. constructor 프로퍼티

<img src = "https://user-images.githubusercontent.com/60782131/107513722-f8c3cc00-6beb-11eb-9cb0-ed3930e9f775.png" width=250>
<img src = "https://user-images.githubusercontent.com/60782131/107513725-f9f4f900-6beb-11eb-839c-eb1b43339e9f.png" width=250>
- [Constructor].prototype.constructor === Object.getPrototypeOf([instance]).constructor === [instance].__proto__.constructor === [instance].constructor => 인스턴스로부터 그 원형이 무엇인지 알 수 있다.

## 2. 프로토타입 체인

### 1. 메서드 오버라이드

- 인스턴스가 Constructor와 동일한 이름의 프로퍼티나 메소드 가지고 있다면 -> 오버라이드(즉 인스턴스의 것으로 나타남)

### 2. 프로토타입 체인


<p align = "center">
<br />
<br />
학습한 내용을 추가할 예정입니다.
<br />
<br />
<br />
</p>

**출처** 정재남, 코어 자바스크립트(위키북스, 2019)
