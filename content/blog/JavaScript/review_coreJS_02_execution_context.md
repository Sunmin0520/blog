---
title: '[JS][코어 자바스크립트] 02. 실행 컨텍스트'
date: 2021-02-06 16:54:13
category: 'javascript'
draft: false
---
## 1. 실행 컨텍스트란?
- 실행컨텍스트: 실행할 코드에 제공할 환경 정보들을 모아놓은 객체<font size="2">(JS엔진이 생성할 뿐, 우리가 직접 코드로 확인은 불가)</font>
  - 동일한 환경에 있는 코드들을 실행시 필요한 환경정보들을 모아 컨텍스트를 구성 -> 이를 콜스택으로 -> 가장 위의 컨텍스트와 관련있는 코드를 실행하는 방식으로 전체 코드의 환경과 순서 보장
    - 동일한 환경을 구성할 수 있는 방법<font size="2">(하나의 실행 컨텍스트를 만드는 방법)</font>: 전역공간, eval()함수, **함수**  
- 전역 컨텍스트과 eval 및 함수 실행에 의한 컨텍스트가  있다.
- 실행컨텍스트 객체는  활성화되는 시점의 VariableEnvironment, LexicalEnvironment, ThisBinding를 수집
  
## 2. VariableEnvironment
- 정의: 현재 컨텍스트 내의 식별자에 대한 정보, 외부환경정보 등. **선언 시점의 LexicalEnvironment와 같지만, 최초 실행시의 스냅샷 유지**
- 실행 컨텍스트 생성시 VariableEnvironment에 정보 담고 -> 이것을 복사해서 LexicalEnvironment 만들고 -> 이후에는 LexicalEnvironment활용
  - LexicalEnvironment는 함수 실행도중에 변경되는 사항이 즉시 반영
  
## 3. LexicalEnvironment
- 정의: 컨텍스트를 구성하는 환경 정보들을 모아 놓은 것
- 구성: environmentRecord<font size="2">(매개변수명, 변수의 식별자, 선언한 함수 이름 등)</font>, outerEnvironmentReference<font size="2">(바로 직전 컨텍스트의 lexicalEnvironment 정보 참조)</font>로 구성
  
### 1. environmentRecord와 호이스팅
- environmentRecord: 현재 컨텍스트와 관련된 코드의 식별자 정보 저장<font size="2">(선언한 함수 자체, var로 선언된 변수의 식별자 등)</font>
- 호이스팅: 'JS엔진은 식별자들을 최상단으로 끌어올려놓은 후 코드 실행'하는 것으로 이해
  - 변수: 선언부만/ 함수: 함수 전체 끌어올림 => 함수 선언식이면 함수 전체가, 함수 표현식이면 변수 선언부만
- 함수 표현 방법
```js
function a(){...} //함수 선언식 function declaration, 전체를 호이스팅
...
var a = function(){...}// 함수 표현식 function expression, 변수 선언부만 호이스팅
```
- override: 동일한 변수명에 서로 다른 값을 할당하면 나중에 할당한 것이 이전 할당값을 덮어씌움 -> 동일한 변수명으로 함수선언식 사용시 override발생 => **상대적으로 함수 표현식이 안전**

### 2. 스코프, 스코프 체인, outerEnvironmentReference
- 스코프: 식별자에 대한 유효범위
- 스코프 체인:스코프를 안에서부터 바깥으로 차례대로 검색해나가는 것<font size="2">(LexicalEnvironment의 두 번째 수집자료인 outerEnvironmentReference덕분에 가능)</font>
- ES5까지는 전역공간 제외하면 함수레벨 스코프만 생성
- 전역변수: 전역공간에서 선언한 변수/ 지역변수: **함수 내부**에서 선언한 변수

- 스코프 체인:outerEnvironmentReference는 현재 호출된 함수가 선언될 당시의 lexicalEnvironment참조
  - 스코프 체인을 타고 inner함수 내부에서는 inner, outer, 전역 스코프 모두에 접근 가능 & outer함수 내부에서는 outer 및 전역스코프에서 생성된 변수만 접근 가능(inner스코프 내부는 접근 불가)
  - 전역 컨텍스트의 lexicalEnvironment까지 탐색해도 해당 변수 못 찾으면 undefined 반환


## 4. this
- 실행컨텍스트의 thisBinding에는 실행컨텍스트를 활성화하는 당시의 this로 저장된 객체 저장. 별도의 this없으면 전역객체. 함수를 호출하는 방법에 따라 this 다름
  
<p>
<br />
<br />
</p>


**출처** 정재남, 코어 자바스크립트(위키북스, 2019)
