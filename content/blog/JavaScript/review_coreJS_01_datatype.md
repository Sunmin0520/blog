---
title: '[JS][코어 자바스크립트] 01.데이터 타입'
date: 2021-02-2 11:25:13
category: 'javascript'
draft: true
---

## 1. 데이터 타입 종류
- 기본형: Number, String, Boolean, Null, Undefined, Symbol
- 참조형: Object - Array, Function, Date, RegExp, Map, WeakMap, Set, WeakSet
- 기본형, 참조형 차이
  - 기본형: **값이 담긴 주소값**을 바로 복제 & 불변성
  - 참조형: **값이 담긴 주소값들로 이루어진 묶음을 가리키는 주소값**을 복제 

## 2. 데이터 타입 배경 지식
### 1. 메모리와 데이터
- bit: 0 또는 1로 표현할 수 있는 하나의 메모리 조각 / 각 비트는 고유한 식별자 통해 위치 확인 가능 / 1byte = 8bit
- 모든 데이터는 바이트 단위의 식별자(시작하는 비트의 식별자)로 위치 파악. 더 정확히는 **메모리 주소값** 통해 서로 구분, 연결
  
### 2. 식별자와 변수
- 변수: 변할 수 있는 데이터 / 식별자: 변수명(어떤 데이터를 식별하는 데 사용되는 이름)

## 3. 변수 선언과 데이터 할당 
### 1. 변수 선언
- 변수: 변경 가능한 데이터가 담길 수 있는 그릇
- 변수 선언: 메모리 중 빈 공간 하나의 이름(식별자)가 변수명
  
### 2. 데이터 할당
```js
var a;//변수 a 선언
a = 'abc'//변수 a에 데이터 할당
...
var a = 'abc'//변수 선언, 할당 함께
```
- 데이터를 저장하기 위한 별도의 메모리 공간 사용해서 'abc' 저장 -> 그 **주소를 변수 영역에 저장** 
- 변수 영역, 데이터 영역 분리(즉 값이 아닌 데이터의 주소를 저장) -> 데이터의 효율적 처리 가능
  
## 4. 기본형 데이터와 참조형 데이터
### 1. 불변값
- 불변값 !== 상수
- 변수, 상수 구분의 변경 가능성의 대상: 한 번 데이터 할당이 된 변수 공간에 다른 데이터를 **재할당**할 수 있는지
- 불변성 구분의 변경 가능성의 대상: 데이터 영역의 메모리 
  - 이미 있는 데이터라면 다른 변수명이어도 동일한 데이터의 주소값을 참조. 즉 **없을 때만 새로 만듦. 한 번 만들어진 값은 가비지컬렉팅 되지 않는 이상 안 변함(불변성)**
  - 기본형 데이터: 모두 불변값 / 참조형: 가변값일 때가 많지만 경우에 따라 다름

### 2. 가변값
- 불변값은 변수영역(주소, 데이터), 데이터 영역(주소, 데이터)만으로 가능한 반면, 가변값은 추가적으로 더 nested되는 관계가 필요
- 참조 카운트: 어떤 데이터에 대해 자신의 주소를 참조하는 변수의 개수
  - 참조 카운트가 0인 메모리의 주소는 가비지 컬렉터가 수거

### 3. 변수 복사 비교
```js
var a = 10;
var b = a;//복사

var obj1 = {c:10, d:'ddd'};
var obj2 = obj1;//복사
```

- 기본형: 주소값을 복사하는 과정이 한 번만 -> 데이터 바뀐다. 즉 참조하는 데이터 주소가 바뀜
- 참조형: 데이터 영역 동일, 객체의 데이터 영역의 데이터가 바뀐다.
  - 데이터 자체를 변경(새로운 데이터 할당)이 아닌, **그 내부의 프로퍼티를 변경**할 때 **가변 성립**
```js
//위의 코드에 이어서
obj2.c = 20;//일 떄는 참조하는 변수영역의 데이터의 값은 달라지지 않음
...
obj2 = {c:20, d:'ddd'}//일 때는 참조하는 변수영역의 데이터의 값이 달라짐
```

## 5. 불변 객체
### 1. 불변 객체
- 원본 객체 안 변해야할 떄 불변 객체가 필요. 즉 참조형 데이터를 가변값으로 여겨야하는 상황임에도 불변값으로 사용할 필요가 있다면 **깊은 복사 하면 됨**

### 2. 얕은 복사와 깊은 복사
- 얕은 복사: 바로 아래 단계의 값만 복사(참조형 데이터가 저장된 프로퍼티 복사시 그 주소값만 복사) -> 원본 변경시 사본 변경, 사본 변경시 원본 변경/ 기본형 데이터면 이것만 해도 됨
- 깊은 복사: 내부의 모든 값들을 하나하나 찾아서 전부 복사/ 참조형 데이터이면 내부의 프로퍼티 복사까지 재귀적으로 수행
- 간단하게 깊은 복사 할 수 있는 방법: JSON.parse(JSON.stringify(target))
  - JSON으로 변경할 수 있는 프로퍼티에는 잘 작동(예: httpRequest로 받은 데이터를 저장한 객체 복사 등)


## 6. undefined와 null
- undefined
  - 값으로써 어딘가에 할당된 undefined: 실존하는 데이터
  - JS엔진이 반환하는 undefined: 값이 없음을 의미
  - 위의 2가지 의미로 혼란 유발 -> **비어있음, 없음을 명시적으로 표현 원할 때는 null**을 쓰자. undefined는 값을 대입하지 않은 변수에 접근할 때 JS엔진이 반환하는 값의 의미로 쓰자.

- typeof null: object -> 값이 undefined인지 null인지 구분 필요하면 '==='로 판단

**출처** 정재남, 코어 자바스크립트(위키북스, 2019)