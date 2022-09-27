---
title: '자바스크립트에는 call-by-reference가 가능할까?'
date: 2022-09-27 09:00:07
category: 'JavaScript'
draft: false
---  
C++에서 call-by-reference, call-by-value를 배우면서 자바스크립트에서는 두 개념이 어떻게 사용되고 있는지에 대해 확실히 정리해야겠다고 생각했다.  
C++에서는 두 개념을 별도의 기호를 통해 분명하게 구분하지만, 자바스크립트에서는 그렇지 않기 때문이다.    
결론부터 말하자면, **자바스크립트에서는 참조에 의한 호출이 없다.**   
더 자세한 이야기는 자바스크립트에서의 자료 타입과 함수에서의 자료의 이용을 통해 알아보자.

# 자바스크립트에서의 자료의 타입: Primitive, Object  
자바스크립트에서는 object가 아니면서 메서드나 프로퍼티가 아닌 데이터 타입을 primitive라고 한다.  
primitive type의 예는 string, number, boolean, undefined, null, symbol, bigint가 있다.  
object는 프로퍼티의 집합으로 표현될 수 있는 자료형이다.  

## primitive type의 선언 및 할당
`let score = 80`  
let score = 80이라고 선언 및 할당을 하면, **score 변수에는 80이 저장된 메모리의 주소값이 할당된다.**  
이 과정에서 메모리에는 score라는 식별자를 저장하는 부분, 80이라는 값을 저장하는 부분이 나누어져 있다.  
**즉,식별자는 값이 아니라 메모리 주소를 기억하므로 변수에는 주소값이 저장되고, 메모리에서 그 주소를 찾으면 값이 바로 있는 형태이다.**  

`let copy = score`로 primitive type의 값을 갖는 변수(score)를 다른 변수(copy)에 할당하면  아래와 같은 메모리 구조를 가진다.

<img src="https://user-images.githubusercontent.com/60782131/192527888-9c1c1016-7f11-45a5-87b4-c6422560be68.jpg" width=500>

## primitive type의 값의 재할당  
위의 상태에서 `score = 100`으로 변경해보자.  
이 경우, 메모리 상의 다른 위치를 차지하므로 주소값은 변하고, 100에 해당하는 데이터 부분은 가비지 컬렉터에 의해 처리되어 메모리에서 해제된다.  

<img src="https://user-images.githubusercontent.com/60782131/192527895-c76fed08-5252-42dc-9ed5-5cf779e5b12f.jpg" width=500>

실제로는 위의 이미지처럼 원시값을 복사해서 다른 주소의 메모리에 할당할 수도 있고, 
아래 이미지처럼 같은 원시값을 참조하다가 하나가 다른 변수에 재할당되었을 때에 메모리의 새로운 공간을 차지하는 두가지 방법이 있다. 이는 JS엔진을 구현하는 제조사마다 다르다고 한다.  

<img src="https://user-images.githubusercontent.com/60782131/192527902-f962e45a-76ac-4e3b-9ce6-134d07e5e990.jpg" width=500>

## object type의 선언 및 할당, 재할당  
object type의 경우에는 **변수에 값 자체가 할당되는 것이 아닌, 메모리에서의 값의 위치의 주소값(참조값)이 할당된다.   
따라서 객체의 값이 변경되어도 주소값은 변경되지 않는다.**  
함수 역시 이와 같은 방식으로 가져오게 된다. 함수 이름이 foo이면, 식별자 foo는 함수의 내용을 담고 있는 메모리의 주소값을 참조한다.

<img src="https://user-images.githubusercontent.com/60782131/192527912-4225b43f-2fa7-4f48-967b-28f946e11778.jpg" width=400>  

즉 위의 이미지에서 `person.name = 'lee'`로 변경되어도 변수 person이 가지는 주소값은 동일하다.  
특정 프로퍼티의 값의 재할당, 프로퍼티의 추가, 삭제도 가능하다.   
`let copy = person` 로 얕은 복사를 하면, 원본의 참조값(위의 이미지에서 0x00001332)이 복사되어 메모리상의 새로운 영역으로 전달된다.  

<img src="https://user-images.githubusercontent.com/60782131/192527921-c4746bf7-8ba0-4035-89c8-2b138bc8d59a.jpg" width=500>   

이미지에서 볼 수 있듯이, person과 copy는 각각의 식별자로 메모리상의 다른 주소에 존재하지만 같은 참조값을 가진다. 즉 2개의 식별자가 1개의 객체를 공유하므로, 객체의 값이 바뀌면 2개의 식별자 모두 영향을 받는다.   
이는 **값에 의한 전달(pass by value)이다. 자바스크립트에서 object type은 primitive type과 달리, 메모리에서 그 데이터를 가지는 주소값을 참조하는 것일 뿐 결국 값을 전달하는 것이다.   
즉, 다른 언어에서 말하는 것과 같은 참조에 의한 전달(pass by reference)은 자바스크립트에는 없다.**  
다만, primitive type과 object type의 전달은 조금 다른 양상을 거치니 이를 구분하기 위해 call-by-sharing이라고도 하는데 공식용어는 아니다. 

# C++에서의 call-by-reference  
값에 의한 전달인지, 참조에 의한 전달인지를 확인하는 이유는 이를 통해 함수 호출시 매개변수(parameter)와 인자값(argument)의 관계를 구분지을 수 있기 때문이다.
먼저 자바스크립트에는 call-by-reference가 없기 때문에 C++을 통해 해당 개념을 자세히 알아보자.   
(책이나 교재마다 다르겠지만, 내가 참고한 교재에 따르면 C++에서는 parameter를 형식 매개변수, argument를 실매개변수라고 하는 것 같다.)   

call-by-value는 실매개변수의 값을 형식매개변수에 복사하므로, 형식매개변수가 변해도 실매개변수는 변함이 없다.    
반면, call-by-reference는 실매개변수의 참조를 형식매개변수에 전달한다. 따라서 실매개변수의 값이 변할 수 있다.  
즉 **call-by-value, call-by-reference는 매개변수와 인자값의 관계를 설명한다.**  
아래는 call-by-reference를 이용한 함수이다. 함수 호출시 인자로 쓰인 a, b의 크기를 비교해서 큰 것이 a가 되도록 인자를 변경한다.

```js
//call-by-reference
#include <iostream>
using namespace std;
void SwapValues(int &x, int &y)
{
  int temp = x;
  x = y;
  y = temp;
}; 

int main()
{
  int a, b;  
    cout << "a,b를 순서대로 입력하시오:";
    cin >> a >> b;
  if (a < b)
    SwapValues(a, b);//a,b 중 큰 수를 a로 한다 
  cout << "큰 수는 a이고" << a << ", 작은 수는 b이고" << b << endl;
  return 0;
}
```  
결과는 아래와 같다.  
```js
a,b를 순서대로 입력하시오:10 20
큰 수는 a이고 20, 작은 수는 b이고 10//입력한 값(a=10, b=20)과 달리 a=20, b=10으로 call-by-refernece에서는 실매개변수가 변경되었다.
```  
반면 이를 call-by-value 혹은 자바스크립트로 구현한다면 `큰 수는 a이고 10, 작은 수는 b이고 20` 이 나온다. 즉 a=10, b=20으로 실매개변수는 입력한 값과 같다.

# 자바스크립트에서의 call-by-value  
자바스크립트에서의 매개변수는 function scope를 벗어나지 못한다.  
매개변수가 primitive type인 경우 값을 그대로 복사해서 사용한다. (엄밀히는 주소값이지만, 그 주소에 접근시 바로 값을 가져올 수 있으니 '복사'라고 표현했다.)  
```js
//case1 
function call(a){
  a = 10;
  console.log(a);
}  
let a = 0;
call(a)//10. function scope
console.log(a)//0. primitive type의 경우, 함수 호출에 의해 인자 값 자체는 영향 받지 않는다.
```  
object type은 참조값을 이용한다. 즉 그 객체 자체의 값을 가지는 메모리의 주소값을 참조하고 있으므로 객체 자체가 바뀌면 참조값은 그대로여도 그 안의 내용은 달라진다.   
```js
//case 2-1: 같은 객체 구조 유지하며 property의 값 변화
function call(obj){
  obj.a = 10;
  console.log(obj);
}  
let obj = { a : 0 };
call(obj)//{a:10}. 계속해서 동일한 주소값을 참조하고, 참조하는 객체 내부의 값이 {a: 0}에서 {a:10}으로 바뀜
console.log(obj)//{a:10} call 함수에 인자로 사용된 obj 객체의 값이 변경되었다.
```  
```js
//case 2-2: 같은 객체 구조 유지하며 property와 그것의 값 변화
function call(obj){
  obj.b = 10;
  console.log(obj);
}  
let obj = { a : 0 };
call(obj)//{a: 0, b: 10}. 참조하는 객체의 프로퍼티 및 프로퍼티의 값 변경으로 참조하는 객체 내부 값이 바뀜. 즉 case 2와 3은 같은 경우
console.log(obj)//{a: 0, b: 10} call 함수에 인자로 사용된 obj 객체의 값이 변경되었다.
```  
```js
//case 3: 객체 구조 깨짐 → 참조 깨짐
function call(a){
  a = 10;
  console.log(a);
}  
let obj = { a : 0 };
call(obj)// 10. obj의 값을 반환하는 함수. 객체 참조가 깨졌으니 obj 객체의 값은 더 이상 변하지 않는다. 함수 내부에서 a = 10으로 할당했으니 10
console.log(obj)//{a: 0} obj 객체의 값은 그대로이다.
```  
```js
//case 4
function call(a){
  b = 10;
  console.log(a);
}  
let obj = { a : 0 };
call(obj)//{a: 0}. obj의 값을 반환하는 함수. 함수 내부에는 obj관련 정의가 없으니 전역변수의 것을 사용.
console.log(obj)//{a: 0} obj 객체의 값은 그대로이다.
```  

# 결론
객체의 참조를 이용하므로 객체의 property 및 value를 수정하는 것은 계속해서 같은 주소값을 바라본다. 따라서 case 2-1, 2-2처럼 기존 객체 구조가 유지되며 객체의 내용이 변화하고, 인자 값 자체를 변화시킬 수 있다.  
반면, case 3처럼 기존 객체의 구조를 깨면 참조도 끊긴다. 만약 call-by-reference라면 call(obj)을 호출한 이후에는 인자 obj의 값이 {a:0}에서 10으로 바뀌어 있어야 한다.  
따라서 **자바스크립트에서 object type은 참조값을 전달받음에도 객체 내부의 구조가 유지되는 경우에 한해서만 함수 내부에서의 변경이 인자 값을 변화시킬 수 있다. primitive type에서는 case 1처럼 함수 내부에서의 변경이 인자 값을 변화시키지 않는다.**  
그러므로 자바스크립트에서는 call-by-reference가 없고, call-by-value만 존재함을 알 수 있다.

<br />
<br />

**출처** 
- [https://developer.mozilla.org/en-US/docs/Glossary/Primitive#:~:text=In JavaScript%2C a primitive](https://developer.mozilla.org/en-US/docs/Glossary/Primitive#:~:text=In%20JavaScript%2C%20a%20primitive%20primitive,has%20no%20methods%20or%20properties)
- https://www.youtube.com/watch?v=__Zz17_5FRU&t=815s&ab_channel=드림코딩
- 이병래/전중남, C++프로그래밍(출판문화원, 2019)
- 이웅모, 모던 자바스크립트 Deep Dive(위키북스, 2020)
</p>