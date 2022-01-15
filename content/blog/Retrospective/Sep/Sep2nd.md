---
title: '[회고] 9월 둘째 주'
date: 2021-09-12 18:00:07
category: 'retrospective'
draft: false
---

## Did
- 팀장님이 분명 미리 진행 후 하라는 일이 있었는데 실수했다.분명 오늘 기록에도 적어놓고!
- 팀장님이 미리 알려주신 사항이 있었는데 확인하지 못해 실수했다. 단순작업일수록 하다보면 피곤해지고 늘어지면서 디테일을 놓칠 때가 있다. 앞으로 같은 실수를 안 하면 된다.그 때의 기분에 취하지 말고, 미리 꼼꼼하게 챙기자!
- 상대방에게 피해가 가는 일이 아니라면 지시하는 법을 배우자. 그럴 권리가 있고, 그것은 무례하지 않다.

## Learned

- host
```js
code /etc/hosts //host 추가해야 해당 도메인에서 ip 주소로의 이동 가능
//예: 127.0.0.1	localhost
```

- ssh
```js
code ~/.ssh/config  //**각 사용자에 대한 설정** /ssh 파일들 나열
//예: 저장해둔 key들(Host, HostName, user, IdentityFile 등)
ssh sunmin//sunmin이라는 Host로 이동
docker ps | grep 특정문구//특정 문구가 들어가는지 확인
```

```js
code /etc/ssh/ssh_config //**모든 사용자(전역)에 대한 설정**
```

- 두 브랜치 간의 차이점 파악
```js
git diff origin/master origin/develop //master와 devlop 브랜치의 차이점 보임
```

- 코드 포맷팅: option - shift - F


