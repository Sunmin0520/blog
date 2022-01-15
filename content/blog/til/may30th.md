---
title: '[TIL] Learned - 5th Week/인프라,enum,SSH,TDZ '
date: 2021-05-30 10:52:07
category: 'til'
draft: false
---

# JS에서 enum 사용법
```js
const seasons = Object.freeze({spring:spring, sunmmer: summer});
...
switch(season){
  case seasons.spring:
    //필요한 과정 서술
  break;
}
...
//season을 이용하는 함수를 checkSeason이라고 한다면
checkSeason(seasons.spring); 
```
# SSH
- shell을 통해 **원격지에서 컴퓨터 제어 위한 프로토콜** 혹은 ssh client, ssh server를 통틀어 이르는 말

# Shell
- shell이라는 CLI로 사용자는 명령어를 커널로 전달할 수 있다. 
- shell에서 실행하고자 하는 명령들을 모아놓은 것이 shell scripts이고, 사용하는 쉘의 종류에 따라 스크립트가 달라질 수 있음
  - 쉘의 종류: bash(맥에 기본 내장), zsh: bash와 호환성 있고 고속으로 동작
- [참고](https://futurecreator.github.io/2019/03/14/serverless-architecture/)

# temporary dead zone
- TDZ는 let, const, class 구문의 유효성을 관리(선언 전에 변수 사용 안됨)
  - var, 함수 선언은 TDZ의 영향 없이 현재 스코프에서 호이스팅
```js
//let, const, classe 모두 동일하게 reference error
pi;//ReferenceError://선언 전이므로 pi변수는 TDZ에 있음
const pi = 3.14;

//var
pi;//undefined
var pi;

//function
greet('hello');//'hello'
function greet(value){
  console.log(value)
}
```
- [참고](https://ui.toast.com/weekly-pick/ko_20191014)

# 이번 주의 반성
- 아침 시간을 잘 활용하지 못해서 시간에 쫓기는 느낌을 받았다. 이번 주에는 꼭 규칙적으로 생활해서 여유로운 아침시간을 확보해야지!
