---
title: '[Docker] 컨테이너가 띄워지지 않을 때 '
date: 2022-02-14 22:57:07
category: 'etc.'
draft: false
---

## 문제 상황
- MS의 image tag를 넣어 docker run을 하려고 하는데 컨테이너가 띄워지지 않음
  - 더 정확히는 컨테이너 자체는 띄워졌으나, 이 컨테이너에서 필요로 하는 컨테이너 포트 번호로 띄웠어야 api의 사용이 가능한데 그러지 않았다.

```js
//9000:3000으로 docker run하고  & docker ps --no-trunc 에서 PORTS 부분
5000/tcp, 0.0.0.0:9000->3000/tcp 
````

## 문제 해결
- 해당 이미지에 관한 문서는 아니지만 MS의 다른 문서에서
`To access the running app from the host running the containers use the container IP and port 5000` 라는 문구가 있었고, 무엇보다 바로 위의 9000:3000에서 `5000/tcp` 부분이 나와서 9000:5000으로 변경해보니 원하는대로 잘 실행되었다.

```js
//9000:5000으로 docker run하고  & docker ps --no-trunc 에서 PORTS 부분
0.0.0.0:9000->5000/tcp
```
- MySQL이 3306을 쓰는 것처럼 이 이미지가 5000을 쓰는 건 이미 정해져 있는 상황이었던 것 같고,   
  무엇보다 `5000/TCP`라고 힌트를 주고 있는 상황이었기에 더 빨리 알아챘으면 좋았을 것 같다.  
  모든 로그는 힌트를 주고 있으니 꼼꼼하게 보고, 빠르게 에러를 고치자!
