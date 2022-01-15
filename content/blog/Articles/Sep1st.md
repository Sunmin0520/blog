---
title: '[아티클] Walmart, ORACLE 2020, Naver blog'
date: 2021-09-05 22:10:00
category: 'articles'
draft: false
---

# Walmart. AI, IoT, AR. Digital transformation
- 2017년 사명 변경: walmart store → walmart
- IRL(Intelligent Retail Lab) 오픈
  - 매장
    - 선반 위의 아이템 유무 감지 → 특정 아이템임을 인식 → 직원의 휴대기기에 그 아이템 Restock alert
    - 음식 마감세일 시간 조절 → 쓰레기 발생량 감소
  - 고객: 지갑 필요없이 앱을 사용해서 매장 입장
  
  <br/>

  - 너무 미래적인 전략보다는 물건 restock alert처럼 미래에 어떤 것이 가능하고 필요할지 예측
  - Amazon go를 둘러싼 프라이버시 논란도 있고, 고객경험 향상을 위해 AI 기술 이용해 매장 곳곳에 정보성 디스플레이 설치

  <br/>

  - 수백 대의 카메라로부터 생기는 개인정보 보호는?
    - CEO의 말에 따르면 '이 기술은 직원의 업무 개선, 반복 작업 완화를 돕도록 구축되었다. 고객 안면 인식 등에 쓰인다면 절대적으로 먼저 동의를 구할 것이다. 고객이 특별히 선택하지 않는 이상 그런 일은 절대 일어나지 않는다'
    - 매장 입장에서는 고객의 이동 경로, 위치 등 모든 것을 알 수 있다. 고객이 이에 대해 거절할 방법은 없다.
    - 예를 들어 셔츠 구입하면 스캔한 정보로 사이즈 제안 혹은 매장 떠날 때 표정과 행동 긍정적이지 않아보인다 → 기록 가능성
    - Intelligent Retail **Lab**을 위해 사람이 실험용 쥐가 되는 것은 아닐지?

- 자율주행차량 배송서비스 테스트
- 직원 교육에 시뮬레이션 게임 이용
  - 재고관리, 상품 보충, 고객 접객 등 매장 내에서의 업무에 대처하고 포인트 얻음

  <br/>

- 출처
  - [corporate.walmart.com: IRL](https://corporate.walmart.com/newsroom/2019/04/25/walmarts-new-intelligent-retail-lab-shows-a-glimpse-into-the-future-of-retail-irl)
  - [corporate.walmart.com - Spark City](https://corporate.walmart.com/newsroom/2019/01/23/how-one-associate-used-his-passion-for-gaming-to-create-the-latest-walmart-training-app)
  - [Forbes](https://www.forbes.com/sites/joetoscano1/2020/02/17/walmart-intelligent-retail-lab-irl-breaches-privacy-nightmares-while-promising-a-better-tomorrow/?sh=91815ae1c6d2)
  - [Future Stores](https://futurestoreseast.wbresearch.com/blog/walmart-ai-powered-store-strategy-future-amazon-go)

  <br/>

# ORACLE 2020
  - 무신론자를 위한 종교라는 모순적 명제에서 시작
  - GPT-2를 이용해 기존 종교들의 계율, 잠언 등을 학습 후 도출된 결과물을 재조합
  - 코로나 19 상황에서 더 이상 집단으로 모여 공동의 경험을 하기는 힘들고, 휴대 가능 기기로 어디서든 쉽게 컨텐츠를 소비할 수 있지만 사람들은 여전히 '말씀'과 주제와 내용을 찾는다.
  - 인공지능과 종교가 만나서 하나의 컨텐츠를 만들어 냈다는 것이 무척 흥미로웠다. 나는 무신론자여서 신앙이 있는 사람의 마음을 온전히 이해할 수는 없다. 하지만 종교가 절대자에게 지지하며 위안과 용기를 얻는 것이라면, 이 인공지능이 전하는 말씀이야말로 모든 신의 말씀을 모은 것이니 가장 강하게 마음으로 와닿지 않을까? 혹은 내가 믿는 신이 아니어서 진심으로 느껴지지 않을까?

- 출처  
  [ZER01NE](https://zer01ne.zone/project/oracle-2020/)

  <br/>

# 어서 와, SSR은 처음이지? - 도입, 개발 편
- 네이버 모바일 블로그에는 Node.js 기반의 SSR 아키텍처가 적용되고 있다.

-  SSR
  - 사용자에게 보여줄 페이지를 서버에서 모두 구성 → 사용자에게 보여줌 
  - CSR에 비해 SSR은
    -  초기 페이지 전송 속도는 ↓, but CSR은 서비스에서 필요한 데이터를 클라에서 추가로 요청해서 재구성 필요 → 전체적인 페이지 완료 시점은 빨라짐 
  - SEO 비교적 쉽게 구성

<br/>

-  왜 Node.js 기반?
  - 기존 상황
    - Angular는 CSR만을 지원한다. → 페이지 로드 이후에 동적으로 컨텐츠 생성 → 전체 구성 느림
  - Node.js 기반의 SSR 선택 이유
    1. JS 활용: 클라에서 작성한 코드는 서버에서도 동일 로직으로 구성되는 경우 많다. → React기반의 SSR과 함께 JS 최대한 활용
    2. 생산성: SSR 사용하면 프런트와 백이 REST API 통해 연결
      - CSR 페이지는 프런트, SSR 페이지는 백에서 했던 것과 달리 SSR 환경이면 페이지의 소유권이 모두 프런트로 이전

<br/>

-  기존의 레거시를 어떻게 SSR로 전환했을까?
  - 점진적 오픈, 확인을 위해 URL 단위의 배포 사용
    - reverse proxy 구조 채택(요청 전달 순서: 사용자 → 프록시서버 → 웹서버)
    - reverse proxy에서 Node.js SSR 전환이 완료된 페이지이면 Node.js SSR을, 아니라면 기존 페이지 서빙

<br/>

-  Node.js는 구조적으로 조회성 서비스에서 훌륭한 성능과 안정성 지님
  - 준비와 검증
    - 검증(안스턴스 개수 대비 최적의 Request Per Second 찾음) → 준비(목표치에 부합하는 세팅)
  
  - 에러 대응
    - 비동기에서 에러 발생시 UncaughtException & 프로세스 죽음 → 핵심플로우의 에러 상황 대비한 테스트 실행


  <br/>

- 출처  
  [Naver D2 - 도입](https://d2.naver.com/helloworld/7804182)  
  [Naver D2 - 개발](https://d2.naver.com/helloworld/2177909)
  
  <br/>

