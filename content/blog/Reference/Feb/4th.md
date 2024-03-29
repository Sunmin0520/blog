---
title: '[Reference] 2월 넷째 주에 본 레퍼런스들'
date: 2022-02-27 12:57:13
category: 'reference'
draft: false
---

## [프로그래머를 위한 이름 짓는 원리](https://green-labs.github.io/programmers-naming)
- 좋은 이름: 문맥에서 충분히 구체적이면서 간결한 이름
- 여러 번 반복되는 이름이라면 짧은 것이 유리
- 좋은 이름을 짓기는 어렵다 -> 이름이 없어도 된다며 억지로 명명하지 말자.
- 데이터가 a-b-c-d-e의 과정으로 변환된다면 a,e에만 붙이자.
- 함수가 커졌는데 조각낼 좋은 이름이 생각 안 난다면 우선 두고 나중에 좋은 이름이 생각날 때 분리하자. 

## [SDK, API, REST API](https://www.ibm.com/cloud/blog/sdk-vs-api)
- Azure SDK를 쓰다가 궁금해져서 찾아보았다. 
- SDK: compiler(내가 작업할 언어의 코드를 translate) + code sample + code libraries(framework) + testing and anlytics tools + docs + debuggers 
  - kit! 새로운 소프트웨어 구축 위한 모든 것
- API: docs + the interface itself
  - interface!서로 다른 플랫폼이 작동하는 방식을 정의
- SDK에는 종종 하나 이상의 API가 포함됨. API 없으면 상호작용이 안되기 때문에
- [What is a REST API?](https://www.youtube.com/watch?v=lsMQRaeKNDk)도 좋다.

## [Watch Google's AI LaMDA program talk to itself at length](https://www.youtube.com/watch?v=aUSSfo5nCdM&t=129s&ab_channel=CNETHighlights)
- AlphaCode 관련 동영상을 보다가 관련해서 찾아보았다. 
- [최강 챗봇 등장! Google LaMDA](https://jiho-ml.com/weekly-nlp-50/?fbclid=IwAR09OEBxvsFt8-ZLaY3iy9m1Kt4slcxomHFFc7jatAbx4uIZtN9D2IlhH7I) 도 정말 추천!

## [Amazon Sr. Software Engineer at 27 — 8 important lessons I’ve learned so far in my career](https://levelup.gitconnected.com/amazons-sr-software-engineer-at-27-8-important-lessons-i-ve-learned-so-far-in-my-career-9fdfbfbc1a6a)
- **You'll never gain experience if you don't act due to lack of experience**

## [Roadmap](https://github.com/kamranahmedse/developer-roadmap)
- 그동안 봐왔던 로드맵이 이 레포에 있던 것이었다. 하나씩 새롭게 배워가는 지표로 삼아야겠다.

## [리눅스 명령어 모음](https://dora-guide.com/linux-commands/)
- 다양한 리눅스 명령어 확인과 함께 https://bellard.org/jslinux/vm.html?url=alpine-x86.cfg&mem=192 에서 테스트도 가능

## [레스토랑에 비유해서 알아보는 운영체제](https://yozm.wishket.com/magazine/detail/1269/)
- 식당/OS: 사용자와 하드웨어 사이에서 동작하는 소프트웨어 시스템
- 지배인/커널: 운영 체제 내에서 메모리관리, 디스크 관리, 프로세스 관리 등
  - CPU 사용량 극대화
  - 프로세스가 다른 프로세스 영향 안 받게(서로 메모리 침범 안 하게) 내부 보안 기능 제공
  - 하드웨어의 제어는 전적으로 운영체제가 한다. 사용자는 UI 통해서 조작할 뿐 직접 접근 안됨
- 요리사/CPU: 논리 및 산술 연산 & 명령어 실행시키는 하드웨어

- 프로세스/각 요리하는 작업대 세팅: 프로그램이 실행되어 메인메모리(RAM)에 올라가 있는 상태 -> CPU는 RAM에서 수행할 프로세스에 필요한 정보를 레지스터로 가져와서 작업 수행
- 여러 작업대 설치/ 멀티태스킹, 멀티 프로세싱: 하나의 프로세스가 CPU 독점하지 않게. 시간 자원의 균등분할(시분할. time sharing)
- 여러 작업대 왔다 갔다하기/ 컨텍스트 스위칭: 프로세스 간에 작업 전환. 
  - 컨텍스트 스위칭은 커널이 돕고 리소스 든다. 
  - 인터럽트 서비스 루틴: 컨텍스트 스위칭은 인터럽트 기반으로 작동. 인터럽트 발생시 CPU는 현재 작업 중단하고, 인터럽트 발생시 할 일 정의된 '인터럽트 서비스 루틴' 수행

- 주문 목록 관리/ PCB(process control block): 멀티태스킹에서 각 프로세스의 정보 관리 
- 조리 중 상태 기록/ Program Counter: 컨텍스트 스위칭 일어나면 현재까지 실행된 코드와 함께 다음으로 실행할 코드 주소를 나타내는 프로그램 카운터를 PCB의 레지스터에 저장
- PCB에는 프로세스 처리 상태를 5개로 나누어 저장
  - new: 프로세스 위한 PCB 생성 O, 아직 메모리 안 올라감
  - waiting: I/O작업처럼 시간 오래 걸리는 작업은 waiting 상태로 두고, 이벤트 발생시 인터럽트 발생하고 PCB를 ready 상태로 바꿈
  - ready: 프로세스가 CPU 점유하고, 사용 가능한(dispatch) 상태
  - running: 작업 처리 중
  - terminated: 프로세스가 작업완료, 메모리 반납, PCB 삭제

- 사용자의 주문에 대해 요구사항이 있다면
  - PCB는 waiting 상태로 
  - 주기적으로 체크: polling. 특정 주기마다 I/O버퍼마다 입출력 쌓여있는지 확인

- 세트 메뉴 만들기 위해 작업대 공유/ IPC(Inter-Process Communication)
  - 물리적으로 공유하는 작업대/ 공유 메모리(Shared Memory): 여러 프로세스에서 공용 접근 되게 보안에 예외둔 메모리
  - 필요할 때마다 요청/ Message Passing: 커널이 메세지 큐에 메세지와 목적지 전달

- 같은 햄버거 100개를 CPU 2개가 한 작업대에서 나눠 만듦/ 멀티 쓰레드(쓰레드: 프로세스 내에서 실행되는 CPU 스케쥴링의 기본 단위)
  - 각 쓰레드는 각자 자신만의 실행 상태 가지고, 프로세스의 메모리 공유
  - 각 요리사가 어느 상태까지 요리했는지/TCB(Thread Control Block): 커널이 TCB만들어 저장

## [웹3.0](https://blog.lgcns.com/2762)
- 웹2.0의 읽기, 쓰기 + 소유, 탈중앙, 개방
- https://www.cryptocurrencyguide.org/web-2-0-to-web-3-0-comparison-landscape/
