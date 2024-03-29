---
title: '[Web] HTTPS, SSL'
date: 2021-2-8 00:02:00
category: 'web'
draft: false
---
## HTTPS (HTTP over Secure Socket Layer)
- 정의: SSL을 이용한 HTTP통신
- 데이터가 암호화되지 않는 HTTP에 SSL로 데이터를 **암호화**해서 통신

## 암호화, 암호화 키
- 데이터를 **암호화 알고리즘 & 암호화 키** 통해 결과 예측 안 되게 만든다.
- 당연히 복호화에도 암호화 키 필요

## SSL
- SSL: 1. 클라이언트가 접속한 서버가 신뢰할 수 있는 서버임을 보장 2. SSL 통신에 사용할 공개키를 클라이언트에게 제공. 즉 **클라이언트와 서버간의 통신을 제3자가 보증해주는 전자화된 문서**
  - SSL은 보안과 성능상의 이유로 대칭키, 공개키를 혼용해서 사용
  - CA(Certificate Authority 인증기관): 클라이언트가 접속한 서버가 클라이언트가 의도한 서버가 맞는지 보장
  - 웹사이트 회사는 CA에 인증서 의뢰시 암호화키와 웹사이트 주소 넘겨줌
  - 브라우저는 웹서버와 통신 전에 브라우저 자체의 인증기관 리스트 확인 -> 인증기관에 현재 접속하려는 웹서버 인증서 있는지 확인하고 인증서 받음 -> 인증서의 암호화키로 데이터 암호화해서 통신

- 대칭키: **동일한 키로 암호화 복호화** 할 수 있는 암호화기법
- 공개키: 공개키로는 암호화, 비공개키로는 복호화 or 반대. 컴퓨터 자원 많이 소모
  - 공개키로 데이터 제공한 사람 신원 보장(전자 서명)
- **실제 데이터는 대칭키, 대칭키의 키는 공개키 사용**
- 과정: Handshake -> Session -> Session 종료

<p>
<br />
<br />
</p>

**출처**
- [Opentutorials](https://opentutorials.org/course/1334/4894)
- [Blog](https://dololak.tistory.com/541)