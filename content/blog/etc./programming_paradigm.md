---
title: '[programming paradigm] Object-oriented, Procedural, Functional, Imperative, Declarative programming '
date: 2022-03-27 15:13:07
category: 'etc.'
draft: false
---

# Object-oriented Programming과 Procedural Programming

## OOP
- 현실세계처럼, 사람의 사고방식처럼 **"객체"** 단위로 상태와 행위를 정의
- 데이터(상태, 변수)와 처리방법(메서드)를 하나의 객체에서 관리
    - 작은 문제를 해결하는 것을 모아서 하나의 문제를 해결(Bottom-up)
- 데이터의 숨김이 가능하다.

## Procedural Programming
- 위에서 아래로 호출 절차 기반해서 **"함수"**로 행위를 구분 
- 데이터와 처리방법을 분리해서 처리
  - 특정 작업하는 코드 만들어두고, 그것을 호출하고 원래 자리로 다시 돌아오는 procedure를 통해 개발(Top-down)
- 절차지향 프로그래밍의 형식에 기반해서 각각의 기능 단위로 함수를 잘게 쪼개서 사용하는 것이 함수형 프로그래밍이라고 생각된다.  
  (절차지향형 프로그래밍과 함수형 프로그래밍을 같다고 볼 수는 없지만, 둘의 엄격한 구분이 크게 의미가 있을까 싶다)

<br/>

- Object-oriented Programming과 Procedural Programming은 반대의 개념이 아니다.  
  - 어디까지나 선택의 문제이고, 한 가지 지향성만을 가지고 있는 언어가 아닌 이상 필요에 따라 선택한다.

<br/>

참고) 추상화  
  - 복잡한 무언가로부터 필요한 것을 간추려서 기능을 만든다. → 추상화 잘 할 수록 사용자는 그 추상 계층 밑에서 뭐가 어떻게 작동하는지 몰라도 편하게 사용할 수 있다.
  - 객체 지향에서는 그 무언가를 클래스의 변수와 메서드로, 함수형에서는 각각의 함수로 표현

<br/>

# 함수형 프로그래밍
- 객체지향에 비해 각각의 함수를 잘게 쪼개기 좋고, 함수 단위의 재사용이 쉬워진다.
- 전달된 변수의 값을 변경하지 않음 → 부작용 없이 프로그램의 동작 예측 좋음
- 순수함수여야 한다. 외부의 변수를 참조하거나 변경 안됨.
- AI, 빅데이터 등의 요인으로 방대한 데이터를 빠르게 계산해서 병렬적 처리의 필요성 증가로 함수형 프로그래밍 수요가 증가

<br/>

- 함수형 프로그래밍만을 지원하는 언어도 있고, 함수형 프로그래밍의 특징도 함께 지원하는 언어도 있다.(JS, Java, Python, C++, Scala, Go, Rust 등)
  - 둘 중 하나의 패러다임만을 선택하는 것이 아닌 필요에 따라 적절한 선택이 필요

### JS는 프로토타입 기반의 객체지향 언어
- ES6에서 Class 를 지원하긴 하지만, 새로운 객체 지향 모델의 제공은 아니다. Class는 기존의 prototype-chaning 개념의 syntatic sugar일 뿐.
- Javascript는 함수형 언어도 객체지향 언어도 아니지만 또 함수형 언어이기도 하고 객체지향 언어이기도 하다. 그리고 중요한 것은 하나의 프로그래밍 이론에 집착하지 않고 필요에 따라 선택하는 것이다.
  - 객체 단위로 독립적 단위를 만들어놓고, 객체들의 결합이 너무 높아질 경우 굳이 객체가 필요없는 부분은 함수형으로 만들어서 사용하자.   
    즉 **최종 목적은 간단하고, 가독성 좋고, 덩치가 커져도 유지보수가 쉬우며, 재사용성이 좋은 코드를 만드는 것!**

<br/>

# Imperative Programming과 Declarative programming
## 명령형 프로그래밍 Imperative Programming 
- 어떻게 해결할지를 명령 **how** 에 집중
- 같은 문제에 대해 명령형과 선언형은 해결 관점이 다르다.

> 배열을 순회하며 빈 문자열을 걸러내고, 각 원소의 첫 글자를 대문자로 변경해라.

```js
const arr = ['ab', 'cde', ''];
const newArr = [];
for (let i = 0; i < arr.length; i++) {//0번째 인덱스부터 하나씩 늘려나감
  if (arr[i].length !== 0) {//길이가 0이 아니라면 
    newArr.push(
      arr[i].charAt(0).toUpperCase() + arr[i].substring(1)//첫 글자를 대문자로 변경해서 push.즉 "어떻게 할 것인가"에 집중 
    );
  }
}
```

## 선언형 프로그래밍 Declarative programming
- 무엇을 해결할 것인지 (**what**)에 집중
- **함수형 프로그래밍은 어떤 문제를 해결할 것인지에 집중하고 사소한 작업은 컴퓨터에 위임하는 선언형 프로그래밍의 일종으로 볼 수 있다.**  
  즉 선언형 프로그래밍을 함수의 구현과 그 사용으로 표현

```js
function convert (s) {
  return s.charAt(0).toUpperCase() + s.substring(1);//대문자로 변경하는 함수 선언
}

const newArr2 = arr
  .filter(v => v.length !== 0)//길이가 0이 아닐 때
  .map(v => convert(v));//해당 함수를 실행
```
- 결국 명령형과 선언형이 해낸 방식은 비슷하지만, 선언형은 문제 자체의 접근에 더 가까워지는 느낌으로 볼 수 있다.

<br/>


# 위의 내용을 기반으로 한 질문과 답변
- 질문

> 절차적 언어와 객체 기술 중 어느 것이 더 직교성이 좋은 시스템을 만들 수 있을까? ('실용주의 프로그래머' 89쪽)

- 답변

>절차 지향 언어는 호출 절차를 기반으로 함수로 행위를 정의한다.  
>따라서 함수형 프로그래밍과 객체 지향의 특징을 고려해서 답변을 내릴 수 있을 것 같다.  
>(물론 둘은 어디까지나 지향성의 문제이기에 언어의 특성을 고려해서 필요시에 적절한 방향으로 나아가는 것이 가장 중요하고, 언제나 모든 선택은 쉽지 않다.)  

> 프로그래밍 방법 중에는 how에 집중하는 명령형 프로그래밍과 문제 자체의 what에 집중하는 선언적 프로그래밍이 있는데,  
>함수형 프로그래밍은 문제를 어떻게 풀 것인지보다는 문제가 무엇인지에 접근하는 선언적 프로그래밍에 가깝다고 생각된다.  
>즉 if-else와 for문이 끝없이 이어지는 것이 아닌 함수를 정의하고, 그 함수를 사용할 수 있는 환경을 만들어주는 것에 가까운 것이다.  

>객체지향 언어에서 클래스로 상태(변수)와 행위(메서드)로 정의하는 것에 비해 함수형 프로그래밍에서는 보다 작은 단위로의 구분이 가능할 확률이 높다.  
>클래스는 클래스보다 작은 단위로 쪼개질 수 없는데에 반해, 함수는 각각의 기능을 하는 단위로 쪼개질 수 있기 때문이다. 

>또한 객체 지향 언어는 overloading, overriding등의 기능이 있다. 따라서 미처 생각하지 못했던 방향으로  클래스간의 혹은 클래스 내의 메서드들끼리의 결합도가 증가할 수 있다.

>객체 지향과 함수형 둘 중 무엇 하나가 어느 상황에서든 맞다고 할 수는 없지만  
>직교성 측면에서는 사이드 이펙트가 없고, 최소의 단위로 쪼개지기 쉽고, 외부의 변수를 참조하거나 변형시키지 않는 함수형 프로그래밍이 더 적합한 선택이라고 생각된다.


<br/>

**출처** 
- https://poiemaweb.com/js-object-oriented-programming
- https://www.geeksforgeeks.org/differences-between-procedural-and-object-oriented-programming/
- https://www.javatpoint.com/procedural-programming-vs-object-oriented-programming
- https://www.youtube.com/watch?v=4ezXhCuT2mw&ab_channel=%EB%93%9C%EB%A6%BC%EC%BD%94%EB%94%A9by%EC%97%98%EB%A6%AC
- https://codeburst.io/declarative-vs-imperative-programming-a8a7c93d9ad2
- https://evan-moon.github.io/2019/12/15/about-functional-thinking/
- https://evan-moon.github.io/2019/08/24/what-is-object-oriented-programming/
- https://yozm.wishket.com/magazine/detail/1396/