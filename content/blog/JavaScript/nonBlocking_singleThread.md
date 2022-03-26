---
title: '[JS] call stack, web api, event queue, event loop'
date: 2021-02-04 14:29:13
category: 'javascript'
draft: false
---
- Blocking I/O 
  - 다수의 요청 필요시 멀티쓰레드 필수 -> 하나의 CPU에 다수의 쓰레드 
  - 쓰레드 지연(I/O요청 하고 응답 올 때까지 가만히 있음)
  - 쓰레드 분배 사용 위한 스케줄링에도 CPU 이용 연산 필요 & 쓰레드간의 전환 위해 전환 직전 상태 저장(Context switch)에도 CPU 이용 연산 필요
<p>
<br />
</p>
- Node.js는 이러한 문제들을 **싱글 스레드와 이벤트 기반의 비동기 I/O로 처리**
  - I/O작업 시작 -> 응답 안 기다리고 다음 작업. 대신 작업 종료시 이벤트 발생 -> 이벤트 큐에 이 이벤트 등록 
<p>
<br />
</p>
- JS엔진: 작업 요청되면 싱글 콜스택으로 요청된 작업 순차적으로 실행
  - 이 때 비동기처리(동시성 지원)는 브라우저 or Node.js가 담당
<p>
<br />
</p>
<img src = "https://user-images.githubusercontent.com/60782131/106904834-020dee00-673f-11eb-8a22-219daad1e888.png">
<p>
<br />
</p>
- 이벤트 루프: 동작이 완료되었을 때 특정 콜백함수(특정 작업 완료시 어떤 작업 진행할지에 대한 것)가 실행되는 동작 방식. 즉 어떤 요청 발생시 그 작업에 대해 쓰레드 실행 일으키고 클라이언트에게 결과 응답
  - 즉, 이벤트 루프는 콜스택 내에서 현재 실행 중인 task가 있는지, 이벤트큐에 task가 있는지 반복하여 확인
<p>
<br />
</p>
- 자바스크립트 대부분의 DOM 이벤트 핸들러와 Timer함수, Ajax 요청은 비동기식 처리 모델로 동작
  - 이벤트 핸들러: 이벤트가 연결되는 함수. 이벤트가 발생해야지만 실행되어 이벤트에 대응하는 처리됨


**출처** 
- [PoiemaWeb](https://poiemaweb.com/js-event)
- [구름EDU](https://edu.goorm.io/learn/lecture/557/%ED%95%9C-%EB%88%88%EC%97%90-%EB%81%9D%EB%82%B4%EB%8A%94-node-js/lesson/21763/%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EA%B8%B0%EB%B0%98-%EB%B9%84%EB%8F%99%EA%B8%B0-%EB%B0%A9%EC%8B%9D)

