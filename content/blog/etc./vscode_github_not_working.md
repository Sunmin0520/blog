---
title: 'VS Code에서 github repo와의 연결이 끊겼을 때'
date: 2022-02-14 21:38:07
category: 'etc.'
draft: false
---

## 문제 상황
- VS code에서 github repo와의 연결이 끊기며, unstaged 상태인 파일들의 목록을 볼 수 없다.
- 끊겼던 계기
    - PATH 수정
    - github repo 이름 변경에 따라 로컬에서도 디렉토리 이름 및 remote origin 변경  

- Initiailize Repository 버튼은 비활성화되어 눌러도 아무 반응이 없고, 좌측 하단의 user 버튼 'Loading...'이라고만 나오며 아무 것도 나오지 않는다.  
- vs code를 껐다가 켜는 것으로는 해결되지 않았다.

<br/>

<img src="https://user-images.githubusercontent.com/79896443/153862963-7712b2f3-4a79-4cec-b55f-607e19f06b75.png" width="260" >

## 해결 방법
- 위와 같은 상태라면 Code 탭에 'Restart to update'라는 기능이 활성화된다.  
클릭하면 모든 vs code창이 꺼졌다가 켜지면서 다시 repo와 연결이 되고, 'Restart to update'기능은 아래 이미지와 같이 사라져 있다.

<br/>
 
<img src="https://user-images.githubusercontent.com/79896443/153862967-eb2ff3a1-0beb-42be-88d4-21569c581654.png" width="249" align="center">


