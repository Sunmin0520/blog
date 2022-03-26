---
title: '[JS] var, let, const'
date: 2021-02-07 22:44:13
category: 'javascript'
draft: false
---
## var로 선언한 변수의 문제점
1. 변수 중복 선언 허용(override)
2. **함수 레벨 스코프(함수의 코드블록만을 지역스코프로 인정)** -> 함수 외부에서 선언하면 코드블록내에서 선언해도 전역변수 되어버림 => 전역변수 남발
3. 변수 호이스팅: 변수 선언문이 스코프의 선두로 끌어올려진 것처럼 작동. 
  - var는 선언과 초기화가 한 번에 -> 변수 선언문 이전에 참조 가능(할당은 안되어있으니 undefined)

## let
1. 변수 중복 선언 금지<font size = 2>(syntaxError: Identifier 'bar' has already been declared)</font>
2. 블록 레벨 스코프
3. 변수 호이스팅: 변수 호이스팅 작동하지 않는 것**처럼** 작동 
    - let은 선언과 초기화가 따로 -> 변수 선언문 이전에 참조시 ReferenceError
```js
let foo = 1;//전역변수
...
{
  console.log(foo);//ReferenceError
  let foo = 2;//지역변수
}
```
   - 만약 여기서 호이스팅이 발생하지 않았다면 console.log(foo)에서 foo는 전역변수 let foo = 1을 참조했어야한다.
   - **JS는 모든 선언(var,let,const,function, function*, class)에서 호이스팅 발생 but let,const는 호이스팅 발생 안 하는 것처럼 작동**
4. let으로 선언한 전역변수는 window의 프로퍼티가 아님

## const
1. 선언과 할당 동시에 해야함
2. 재할당 금지
   - const로 객체를 할당한 경우 프로퍼티의 변경 통해서 값 변경 가능 => const는 재할당을 금지할 뿐 불변은 아님!
3. let과 공통점: 블록 레벨 스코프, 호이스팅하지 않는 것처럼 작동

<p>
<br />
<br />
</p>

**출처** 이웅모, 모던 자바스크립트 Deep Dive(위키북스, 2020)