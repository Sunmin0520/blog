---
title: '[CS] 용어 정리'
date: 2022-02-01 21:52:07
category: 'cs'
draft: false
---
- 학습 내용을 반영해 계속해서 업데이트할 글입니다.  

### 컴퓨터 내부의 언어 체계
- ASCII: 키보드상의 기호에 7비트 부여 (decimal기준 0 ~ 127) 
- unicode: 기호에 16비트 부여하는 새로운 표준(현재는 21비트까지 확장)
- encoding: 유니코드는 문자코드마다 다른 인코딩 사용해서 변환
  - UTF-8: Unicode Transformation Format-8 bit: 모든 아스키 문자를 8비트로 표현해서 인코딩/ 하위호환성, 효율성 좋아서 널리 사용
- 색 인코딩: 웹페이지는 텍스트(주로 UTF-8 문자의 시퀀스로 이루어짐)를 표현 → hex triplet으로 텍스트 이용해서 색 표현 예:#ffff00 

### 메모리, 디스크
- 레지스터: 클록을 공유하는 여러개의 D플립플롭을 한 패키지에 넣은 것
  - D플립플롭: 에지에 의해 데이터가 바뀌는 래치
 
- 버스: 비트를 이동시키는 수단
- RAM: 메모리 위치 중 어디나 random access해서 read, write 가능한 메모리 #
- ROM: 정확히는 write-once memory
  - 데이터 사용하려면 RAM으로 읽어들여야함

- 디스크 드라이브: 대량저장장치
- SSD: 디스크 드라이브 틀 안에 넣은 플래시 메모리

### 내부 구조
- CPU
  - ALU: 산술논리장치 arithmetic login unit
    - 수를 표현하는 비트가 명령어에 대해 어떤 연산자 적용할지 ALU가 결정
  - 실행장치: execution unit, conrtrol unit
    - 메모리의 정해진 장소에서 명령코드, 비트 가져와서 ALU에게 할 것 알리고, 결과를 메모리에 돌려줌
    - 명령어: 컴퓨터에게 어떤 것 할지 알려주는 비트패턴
      - PC: program counter. 메모리 위치 참조. 필요한 명령어의 메모리 위치를 PC가 실행장치에게 알려줌


### 프로그램, 메모리 관리
- 운영체제(운영체제커널): 여러 프로그램을 동시에 쓰기 위해 각 프로그램을 전환시켜주는 관리자 역할
- 프로세서는 보통 RAM으로 이루어진 메인메모리와 통신
  - 공간의 크기: 대용량 저장장치> 메인메모리> 레지스터
    - 속도는 반대
  - 캐시: 메인 메모리보다 크기는 훨씬 작지만 프로세서와 같은 속도로 작동

### 외부와의 상호작용(입출력, 네트워킹)
- 네트워킹
  - 인터넷: 여러 계층의 프로토콜이 모인 집합
    - TCP/IP
      - TCP: Transmission Control Protocol/ IP 위에서 패킷의 전송 조절
      - IP: Internet Protocol/ 패킷을 옮겨주는 역할
    - IP 주소
    - DNS 
    - world wide web
      - TCP/IP 위에 만들어진 여러 프로토콜이 있고, 그 중 가장 많이 사용되는 것은 HTTP(HyperText Transfer Protocol)
        - HTTP 표준: 웹브라우저와 웹서버가 소통하는 방법 규정

### 데이터 구조와 처리
- 메모리 할당
  - 정적 static: 배열 같은 변수가 사용하는 메모리에 할당된 주소는 안 바뀜 <-> 동적 dynamic: linked list처럼 새 노드가 추가될 경우 힙에서 새로운 메모리 얻음
  - garbage collection: JS에서의 동적 메모리 할당 #
    - C에서의 포인터 대신 참조 사용(메모리 주소 노출 안함) 
- database: 정해놓은 방식대로 모아놓은 데이터 모음
  - DBMS: 데이터베이스에 정보를 저장, 읽기하게 하는 프로그램
- 정렬: 정렬된 데이터의 검색 → 메모리 접근 횟수 줄여서 검색 빠름
- 샤딩 sharding(수평 파티셔닝 horizontal partitioning): 데이터베이스를 각각 다른 기계에서 실행되는 여러 개의 샤드로 나눠둠 → 요청 들어온 연산을 모든 샤드에 전달 → 컨트롤러가 결과 모음
  - 병렬적으로 수행 가능 → 성능 향상

### 컴퓨터는 어떻게 프로그램을 해석, 변환하는가
- 저수준 VS 고수준 언어
  - 저수준 low level: 컴퓨터가 이해하기 쉽게 작성된 프로그래밍 언어/현재는 특수한 경우 아니면 사용 안됨
    - 예: 기계어, 어셈블리어
  - 고수준 언어: 대부분의 프로그래밍 언어(추상화의 정도에 따라 결정)
  - 고수준 언어를 실행하는 방식: 인터프리트, 컴파일
    - 컴파일러: 소스코드 → 구체적인 기계에 맞는 기계어로 변환/번역처럼/컴파일언어의 예:C, C++
    - 인터프리터: 인터프리터 언어로 작성된 코드는 가상머신virtual machine에서 실행됨 #
      - 즉 별도의 변환 없이 통역처럼.
      - scripting language: 인터프리트되는 프로그래밍 언어/예: Python, Node.js, Java, HTML, CSS
      - 많은 언어들이 컴파일러, 인터프리터 모두 구현되어 있음

### 웹브라우저
- 웹 브라우저는 소스코드를 인터프리트 & 실행하는 가상머신의 역할 둘다 수행
- URL: 서버에게 HTTP프로토콜의 규정을 지켜서 URL(균일 자원 위치 지정자 Uniform Resource Locator) 통해 문서 요청
  - https://sunmin.netlify.app/?category=articles
    - scheme(https) + host(sunmin.netlify.app) + path(?category=articles)
- HTML: HyperText Markup Language
  - HyperText: 웹페이지 등 다른 대상에 대해 링크가 들어있는 텍스트
  - Markup: 텍스트(본문) 과 구분 가능한 mark의 추가가 가능한 시스템
- DOM(Document Object Model): 웹페이지에 대한 인터페이스. 웹브라우저는 문서를 DOM에 따라 처리
  - DFS로 해석
- Ajax (Asynchronous javascript and XML): 브라우저와 서버의 상호작용은 Ajax 통해 일어난다.
  - 서버는 Ajax엔진에 res를 주고, Ajax엔진은 사용자 인터페이스에 그 데이터를 줌. 즉 사용자 인터페이스와 서버가 분리되어 있기에 res받을 때마다 전체가 아닌 브라우저에서 바뀌는 부분에서만 빠르게 상호작용
  - 초기에는 소통하는 데이터 형식으로 XML 사용. 요즘은 JSON
- JSON 자바스크립트 객체 표기법 Javascript Object Notation: JS객체를 사람이 읽기쉬운 형식으로 표현

### 고수준 언어와 저수준 언어의 프로그래밍 방식 비교
- 터미널, 명령 프롬프트(command prompt), buffer, shell
  - 터미널을 열면 명령프롬프트가 보임 → 사용자가 input 입력 → 입력버퍼, 출력버퍼(buffer:FIFO데이터구조)사용 & echo(입력을 화면에 표시) 
  - shell은 명령 해석기

### 병렬성, 비동기성(컴퓨터는 어떻게 한번에 많은 일을 할까)
- 운영체제, 프로세스, 스레드
  - 운영체제는 프로세스를 관리
  - 프로세스: 사용자공간 user space에서 실행되는 프로그램(운영체제에서 자원 할당받는 작업의 단위)
    - 서로 독자적인 메모리 가짐 → 다른 프로세스간의 공유 없음
    - 멀티프로세스: 하나의 프로그램 & 여러 개의 프로세스 → 각 프로세스가 하나의 작업 처리
      - 하나의 프로세스가 block되도 다른 프로세스에는 영향 안 미침
  - 스레드: static데이터와 힙을 공유하지만, 자체적으로 스택을 갖는 프로그램을 실행하는 단위
    - 프로세스의 자원 이용해서 작업 실행 (즉, 프로세스는 스레드의 컨테이너)
    - 멀티스레드: 하나의 프로그램 & 여러 개의 스레드 → 각 스레드가 하나의 작업 처리
      - 빠르다(스레드는 일반적으로 프로그램보다 저장할 컨텍스트가 작다 → context switching 빠르다), 스레드 간 자원 공유/ 하나의 스레드에 문제 생기면 전체 프로세스가 영향 받는다

- 락 대기
  - 블로킹: 시스템 상에서 락 할당 가능할 때까지 해당 프로그램 suspend
  - 논블로킹: 프로그램 실행되고나서 락을 받았는지 나중에 notify

- JS
  - JS는 싱글 스레드 → 특정 순서를 인터럽트(잠시 중단) 안됨
  - JS 인터프리터는 프로그래머에게 싱글스레드 모델 제공, 내부적으로는 멀티스레드 활용 #
  - 동작의 순서 제어 위해 비동기 사용: Promise, async-await



### 출처
- 한 권으로 읽는 컴퓨터 구조와 프로그래밍(2021, 조너선 스타인하트, 책만)
- https://www.ibm.com/docs/ko/rational-soft-arch/9.6.1?topic=page-asynchronous-javascript-xml-ajax-overview
- https://www.geeksforgeeks.org/difference-between-process-and-thread/

### 더 알아볼 것

- [ ] RAM, ROM, 메모리
- [ ] 메모리, 힙, 스택, 스레드
- [ ] JS 싱글스레드, 멀티스레드
- [ ] process, thread
- [ ] 가상머신
- [ ] garbage collection
