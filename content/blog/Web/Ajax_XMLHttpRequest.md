---
title: 'Ajax, XMLHttpRequest'
date: 2021-2-7 20:59:00
category: 'Web'
draft: false
---
## Ajax
- Asynchronous JavaScript and XML: JS를 이용하여 브라우저가 서버에게 비동기로 데이터를 요청 & 서버가 응답한 데이터를 받아 웹페이지를 동적으로 갱신하는 프로그래밍 방식
- **XMLHttpRequest** 객체를 기반으로 동작
  - XMLHttpRequest 객체: 브라우저에서 제공하는 web api/ HTTP 비동기 통신(요청 전송, 응답 수신) 위한 메서드와 프로퍼티 제공
  - Ajax 이전에는 웹페이지 전체를 다시 렌더링했음 -> 불필요한 데이터 통신 발생, 화면전환으로 인한 깜빡임, 클라이언트와 서버와 동기적으로 통신해서 서버로부터 응답있을 떄까지 블로킹

## XMLHttpRequest
- 프로토타입 프로퍼티: readyState(HTTP요청의 현재 상태 나타냄-예:DONE:4),status(HTTP요청에 대한 응답상태) 등등 
- 메서드: open(HTTP요청 초기화), setRequestHeader(특정 HTTP요청헤더의 값 설정) 등등
<p>
<br />
<br />
</p>

**출처** 이웅모, 모던 자바스크립트 Deep Dive(위키북스, 2020)