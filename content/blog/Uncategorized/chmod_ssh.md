---
title: 'SSH, chmod'
date: 2021-03-07 08:05:07
category: 'Uncategorized'
draft: false
---
<p>

# SSH (Secure Shell)
- shell을 통해 **원격지에서 컴퓨터를 제어**하기 위한 프로토콜 혹은 SSH client, SSH server를 통틀어 이르는 말
  - shell: 명령어를 입력해서 컴퓨터를 제어하는 방식
- 클라이언트와 서버 사이에 SSH protocol을 이용해서 암호화해서 데이터 주고 받음
  
<br />

- SSH 클라이언트: 유닉스 계열에는 기본적으로 SSH 클라이언트 설치 되어 있음, 윈도우에는 PuTYY 등 설치해서 이용
- SSH 서버: 유닉스 계열에서는 OpenSSH 가장 많이 사용(OpenSSH는 SSH 클라이언트와 서버를 포함)
  - 클라이언트에서 사용하는 명령어가 서버에 적용되는 것

```js
.ssh //접속하면 디렉토리와 컨텐츠 볼 수 있음(id_rsa, id_rsa.pub 등등 있음)
exit //나올 떄

ssh sunmin@192.168.1.11// ssh 접속하려는 ID@IP주소
```

- SSH 서버가 SSH 클라이언트 인증 완료 -> tunneled conection 생성 -> secure shell은 클라이언트와 서버 사이에서 암호화된 파일 전송
  
<br />

### 사용 예시
- 예시1: **github 로그인없이 이용**
  - ssh 디렉토리의 id_rsa (private key/내 컴퓨터에 저장), id_rsa.pub (public key/접속하려는 컴퓨터에 저장해주면 됨)
  - github-settings-SSH and GPG keys- New SSH Key-Add SSH key => 깃헙의 원격저장소에 나의 퍼블릭키를 저장한 것 -> 별도의 깃헙 로그인 없이 원격 저장소 사용 가능 -> git clone, commit, push
  
<img src="https://user-images.githubusercontent.com/60782131/110222854-c4a4a800-7f18-11eb-804f-369941ccea5b.png" width=600px>

<img src="https://user-images.githubusercontent.com/60782131/110222879-f7e73700-7f18-11eb-8a0c-00728ca3fe96.png" width="600px">
  
<br />

- 예시2 : **EC2 사용**
  - SSH 사용해서 RSA 공개키 암호화방식으로 EC2에 연결

<br />

# chmod

- change mode. 대상 파일과 사용권한 변경시 사용
- read:4, write:2, execute:1
- execute: 디렉토리에 들어갈 수 있음 But 그 안의 컨텐츠와 어떤 파일들이 있는지는 못 봄
- read: 디렉토리의 컨텐츠 볼 수 있음

```js

chmod 755 test//test라는 파일의 user의 권한은 rwx로, group과 other의 권한은 rx로 변경하는 것
````

<br />
<br />

**출처**
- [chmod](http://www.incodom.kr/Linux/%EA%B8%B0%EB%B3%B8%EB%AA%85%EB%A0%B9%EC%96%B4/chmod)
- [stack overflow](https://stackoverflow.com/questions/47913128/difference-between-read-execute-file-permission)
- [opentutorials-ssh](https://www.youtube.com/watch?v=Bxz-1EgyA7w&ab_channel=%EC%83%9D%ED%99%9C%EC%BD%94%EB%94%A9)
- [opentutorials-ssh이용](https://www.youtube.com/watch?v=78rykXw9_0g)

</p>