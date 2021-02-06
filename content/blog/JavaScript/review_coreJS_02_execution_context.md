---
title: '[코어 자바스크립트] 02. 실행컨텍스트'
date: 2021-02-06 16:54:13
category: 'JavaScript'
draft: true
---
## 1. 실행 컨텍스트란?
- 실행컨텍스트: 실행할 코드에 제공할 환경 정보들을 모아놓은 객체 (JS엔진이 생성할 뿐, 우리가 직접 코드로 확인은 불가)
  - 동일한 환경에 있는 코드들을 실행할 때 필요한 환경정보들을 모아 컨텍스트를 구성 -> 이를 콜스택으로 -> 가장 위의 컨텍스트와 관련있는 코드를 실행하는 방식으로 전체 코드의 환경과 순서 보장
    - 동일한 환경을 구성할 수 있는 방법(하나의 실행 컨텍스트를 만드는 방법): 전역공간, eval()함수, **함수**  
- 실행컨텍스트에 담기는 정보: VariableEnvironment, LexicalEnvironment, ThisBinding
  
## 2. VariableEnvironment
- 정의: 현재 컨텍스트 내의 식별자에 대한 정보, 외부환경정보 등. **선언 시점의 LexicalEnvironment와 같지만, 최초 실행시의 스냅샷 유지**
- 실행 컨텍스트 생성시 VariableEnvironment에 정보 담고 -> 이것을 복사해서 LexicalEnvironment 만들고 -> 이후에는 LexicalEnvironment활용
  
## 3. LexicalEnvironment
- 정의: 컨텍스트를 구성하는 환경 정보들을 모아 놓은 것
### 1. environmentRecord와 호이스팅

**출처** 정재남, 코어 자바스크립트(위키북스, 2019)
