---
title: '[JS] 접근자 프로퍼티와 getter, setter'
date: 2021-03-07 16:09:07
category: 'javaScript'
draft: false
---
<p>

- 객체 프로퍼티는 데이터 프로퍼티와 접근자 프로퍼티로 나눌 수 있다.
    - 데이터 프로퍼티: 값 저장 위한 프로퍼티
    - 접근자 프로퍼티: 값이 없음. **프로퍼티 읽거나 쓸 때 호출하는 함수**를 값 대신에 지정하는 일종의 메서드
        - 객체지향에서의 접근자: 객체가 가진 프로퍼티값을 객체 밖에서 읽거나 쓸 수 있도록 제공하는 메서드
            - 객체의 프로퍼티를 객체 밖에서 직접 조작 가능 -> 데이터의 유지보수성 해침
        - 접근자 프로퍼티 사용해서 객체에 접근자를 정의 -> 데이터의 부적절한 수정 방지, 특정 데이터를 외부로부터 숨김 => 유지보수성 증가
        - 접근자 프로퍼티 하나에 대해 getter,setter 2가지 함수로 구성 & function키워드 대신 get이나 set 키워드 사용한 함수를 작성
             
```js
//다른 두 함수를 선언
const USER_EMAIL = Symbol();
class User {
    setEmail(value){
        if(!/@/.test(value)) throw new Error(`invalid email: ${value}`);
        this[USER_EMAIL] = value;
    }

    getEmail(){
        return this[USER_EMAIL];
    }
}
```

```js
//get,set 사용해서 함수 두 개 쓰지만 email이라는 하나의 프로퍼티에 묶임 -> 부주의한 접근을 차단
const USER_EMAIL = Symbol();
class User {
    set email(value){//프로퍼티 쓰기에는 setter 호출
        if(!/@/.test(value)) throw new Error(`invalid email: ${value}`);
        this[USER_EMAIL] = value;
    }

    get email(){//프로퍼티 읽기 getter 호출
        return this[USER_EMAIL];
    }
}
```
<br />

- JS는 유연 But 그만큼 의도치 않은 수정과 공격으로부터 객체 보호 필요

<br />

- 데이터의 캡슐화

```js
//접근자 프로퍼티 사용했지만 여전히 데이터 프로퍼티를 밖에서 읽고 쓸 수 있음
var person = {
    _name: "Sunmin",
    get name(){
        return this._name;
    },
    set name(value){
        var str = value.charAt(0).toUpperCase()+ value.substring(1)
        this._name = str;
    }
}

console.log(person.name)//Sunmin
person.name = "cho"//접근자 프로퍼티에 값 대입
console.log(person.name) //Cho
```
```js
//즉시 실행함수로 클로저 생성 -> 객체 외부에서 못 읽고 쓰고, 접근자프로퍼티로만 읽고 쓰도록 할 수 있다.
var person = (function(){
    var _name = "Sunmin"//프라이빗 변수(즉시실행함수의 지역변수) -> 함수 바깥에서 읽거나 쓸 수 없다.
    return {
        get name(){
            return _name;
        }, 
        set name(value){
            var str = value.charAt(0).toUpperCase()+ value.substring(1)
            _name = str;
        }
    }
})();

console.log(person.name)//Sunmin
person.name = "cho"//접근자 프로퍼티에 값 대입
console.log(person.name) //Cho
```


<br />
<br />

**출처** 
- 이소 히로시, 모던 자바스크립트 입문(길벗, 2018)
- 이선 브라운, 러닝 자바스크립트(한빛미디어,2017) 
</p>
