---
title: 'compile, transpile, program paradigm'
date: 2021-03-17 23:45:07
category: 'Ungategorized'
draft: false
---

<p>

# compile, build, transpile
## compile
- 주어진 언어를 다른 언어로 변환. 즉 복잡한 고수준 프로그래밍 언어로 작성된 프로그램을 단순한 저수준 프로그래밍 언어(기계어)로 번역. 
- 컴파일된 컴퓨터 프로그램: 일련의 CPU 명령어 모음집
- 빌드 과정 중의 일부
- 스크립트 언어: 프로그래밍 언어 중에  **컴파일하지 않고 실행할 수 있는 언어**
  - JS, Python, Ruby 등
  - 코드를 CPU가 직접 실행하는 것이 아닌 인터프리터 통해 실행 
  - 장점: 컴파일에 걸리는 시간 절약 / 단점: 컴파일된 코드에 비해 느리게 실행

## build
- 코드를 빌드해서 실행파일을 만듦(from editable source material to a shippable software product)
- 여러 과정(pre-processing, compiling, linking, converting data files, running automated tests, packaging 등)을 통틀어 이르는 general term

## transpile
- 트랜스파일러: 유사한 수준의 언어 사이에서 번역하는 일부 컴파일러. 즉 **수준의 차이가 아닌 기능구현이 가능하도록 바꿔줌**
- 소스코드 파일을 비슷한 수준의 추상화 가진 다른 소스코드 파일로 convert해줌. 
- 결과물은 일반적으로 사람이 이해할 수 있다. 그리고 이 결과물은 컴파일러나 인터프리터를 거쳐야 한다.
- 예) Babel: ES6+ 코드를 ES5로 변환. 즉 모든 환경에서 JS가 실행될 수 있게 하기에 컴파일러라고도 할 수 있음

<img src = "https://user-images.githubusercontent.com/60782131/111329057-28199d00-86b2-11eb-8d1a-0f6238c722a4.png">

# 프로그램 패러다임 

- 프로그래밍 패러다임: 명령형, 선언형, 논리형
  - 명령형: 각 단계마다 특정한 명령 사용해 컴퓨터가 수행할 작업을 명확하게 지시
      - 기계코드 프로그래밍: CPU 명령어를 알아보기 쉬운 기호코드로 만들고, 이것을 이진수로 변환하는 과정 거침. 이 과정에서 어셈블리 언어 탄생
      - 구조적 프로그래밍
      - 절차적프로그래밍: 반복 사용되는 코드를 procedure로 묶어 재사용성 증가
  
  - 선언형: 원하는 결과를 선언하는 방식으로 프로그램 작성. 즉 how가 아닌 원하는 결과를 선언
      - 함수형 프로그래밍: 절차적 프로그래밍에서 함수 === procedure인 반면, 함수형 프로그래밍에서는 함수는 단순한 프로시저 이상
  - 논리형: 논리명제가 있고, 컴퓨터가 논리변수와 질의를 해석/ 자연어 처리나 인공지능에서 유용

<br />
<br />

**출처** 
- 블라드스톤 페헤이라 필루, 컴퓨터 과학 로드맵(인사이트, 2018)
- [MDN](https://developer.mozilla.org/en-US/docs/Glossary/Compile)
- [이미지 출처](https://so-tired.tistory.com/98)
- [stack overflow](https://softwareengineering.stackexchange.com/questions/140321/what-is-the-difference-between-building-and-compiling)

</p> 내