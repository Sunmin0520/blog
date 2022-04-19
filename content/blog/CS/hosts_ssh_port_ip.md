---
title: '[CS] ssh, host, port, ip'
date: 2022-02-13 20:46:07
category: 'cs'
draft: false
---

###  글을 쓰는 목적
  - 오랜만에 들어가는 서버에 접속이 안 되어서 찾아보니 접속정보가 바뀌어 있었다.  
    .ssh/config에 들어가 ProxyJump 정보를 수정하니 접근이 가능해졌고, 이 참에 관련 내용들을 한번에 정리하고 싶었다.


# etc/hosts
- `code /etc/hosts`
- 호스트(로컬 호스트 및 기타 호스트들)대한 IP 주소와 호스트 이름 정보 담는 DNS 기능의 파일

  <img src="https://user-images.githubusercontent.com/79896443/153759284-64771ceb-eca7-485a-97e5-2256ac8220aa.jpg" width="400" >  
 
- 참고
  - 리눅스 파일 구조  

  <img src="https://user-images.githubusercontent.com/79896443/153759290-6c8ae833-3415-4fd3-85e6-760ed4d4f8c1.png" width="400">

    - /etc
      - 환경 설정 관련 파일들(configuration files)
      - 각각의 프로그램 실행 및 중지 위한 shell scripts 

# host
- host: IP 주소 가지고 있는 시스템. IP주소 통해 호스트끼리 식별, 확인할 수 있다.
- localhost: 내 컴퓨터의 주소를 부르는 용어
  - IPv4일 때는 127.0.0.1, IPv6일 때는 ::1의 IP주소로 localhost DNS

# ssh  
- 원격으로 다른 시스템에 로그인할 때 사용 (더 정확히는 원격 서버를 더 안전하게 제어 위한 프로토콜 혹은 그 프로토콜에서 사용하는 프로그램들)
- 각 ssh 접속 정보들은 Host, Hostname, User, IdentityFile, ProxyJump 등을 가진다.
  - `code ~/.ssh` 입력해서 .ssh/config 열어서 정보 CRUD한다.
  
  <img src="https://user-images.githubusercontent.com/79896443/153759286-e6388b16-9093-49e8-b7e2-37bf560e290c.jpg" width="400" >

- 원격 서버 들어가는 방법
  - host이름이 server1이라면 `ssh server1`입력  
- ProxyJump: 로컬에서 특정 서버에 바로 들어갈 수 없을 때 거쳐가야 하는 Host를 ProxyJump에 적는다.

# Root Directory VS Home Directory
- Root Directory: 시스템 드라이브의 최상위 레벨. '/'
- Home Directory: Root directory의 subdirectory. '~'
  - '~'는 실제로는 /Users/sunmin의 path 

# port
- 포트: 하나의 서버에는 여러 개의 서버 설치될 수 있고, 각 서버마다 포트 번호 따로 지정해서 구분하는 주소 개념
  - well-known port: 0~1023  
      - 웹서버는 기본적으로 80에 연결 등  
  - registered port: 1024~49151에서 등록된 포트 구간
  - well-known port, registered port 이외에는 자유롭게 쓰면 된다.  

  <img src="https://user-images.githubusercontent.com/79896443/153759293-e6c972ed-d8b0-4407-b997-8f033ed30816.png" width="700">

# ip 주소
- ip주소 결정 규칙: 네트웍 주소 + 호스트 주소인데 그 비율에 따라 클래스 나뉨
- IPv4의 경우 8비트(0~255) 4개의 조합

  <img src="https://user-images.githubusercontent.com/79896443/153759295-7476fefc-f976-450a-88df-f9ff816000c5.png" width="650">


**출처**

https://www.thegeekstuff.com/2010/09/linux-file-system-structure/  
https://opentutorials.org/course/3265/20037  
https://ko.wikipedia.org/wiki/TCP/UDP%EC%9D%98_%ED%8F%AC%ED%8A%B8_%EB%AA%A9%EB%A1%9D  
https://xn--3e0bx5euxnjje69i70af08bea817g.xn--3e0b707e/jsp/resources/ipv4Info.jsp