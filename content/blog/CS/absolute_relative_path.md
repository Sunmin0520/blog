---
title: '[CS] 절대경로, 상대경로'
date: 2021-03-03 22:59:07
category: 'cs'
draft: false
---
<p>

<br />

## 절대경로
  - 최상위 디렉토리부터 해당 디렉토리까지의 모든 경로
  - 현재 위치는 확인할 필요 없다. 무조건 최상위부터 시작
  - pwd으로 확인
  
    <img src= "https://user-images.githubusercontent.com/60782131/109816059-a8cca800-7c73-11eb-9f07-ea6a22947812.png">

## 상대경로
  - 현재 디렉토리가 비교대상. 이것 기준으로 작성
  - c에서 a로 가려면, 즉 서브에서 상위에게 가려면 **..**로 시작

    <img src= "https://user-images.githubusercontent.com/60782131/109816575-3e683780-7c74-11eb-9cc3-373c829fe50d.png">
  
<br />

  - a에서 b로 가려면, 즉 상위에서 서브으로 가려면 그냥 바로 서브 이름 추가 (현 위치 의미하는 **./**는 생략가능)
  
    <img src= "https://user-images.githubusercontent.com/60782131/109817710-8e93c980-7c75-11eb-8002-0f62a2eb7bb9.png">'

<br />

  - 아래의 구조에서 c에서 a1으로 가려면 **../../a1**
  
  <img src= "https://user-images.githubusercontent.com/60782131/109819224-2cd45f00-7c77-11eb-9673-e20281650d40.png">
  

</p>