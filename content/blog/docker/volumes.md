---
title: '[Docker] docker volumes 사용 목적과 경로 설정'
date: 2023-01-27 20:46:07
category: 'docker'
draft: false
---

> 실수로 컨테이너를 삭제해도 컨테이너에서 생성한 데이터를 계속해서 가지고 있으려면?  
## 도커 볼륨 사용 이유

도커 이미지로 컨테이너를 생성하면 이미지는 읽기 전용(R/O)이 되고,   
컨테이너의 변경사항은 **컨테이너 레이어(R/W)에 저장된다.**  
이 때 어떠한 경우에도 이미 생성된 이미지는 변경되지 않지만, 컨테이너 계층에 있던 데이터는 컨테이너 삭제시 함께 삭제된다. 이를 persistent한 데이터로 관리하기 위해 **볼륨**을 활용할 수 있다.

<img src="https://user-images.githubusercontent.com/79896443/215004932-93402c51-19ae-4c59-8dcd-c409ff0447f2.jpeg" width="500" />


## 도커 볼륨 경로를 쓰는 형식

경로를 `host-src:container-src` 형태로 표기한다.  

```js
//container A
version: "2"
services:
  vault:
    image: vault
    container_name: vault_test
    volumes:
      - $PWD/config:/tmp/config
      - $PWD/logs/:/tmp/test
    cap_add:
      - IPC_LOCK
    command: server -config /tmp/config/config.hcl
    ports:
      - "8300:8200"
```

```js
//container B
version: "3.8"
services:
  vault:
    image: "vault:1.11.3"
    container_name: "vault"
    ports:
      - "8200:8200"
		entrypoint: vault server -config=/vault/config/vault.json    
		volumes:
      - "./volumes/vault/logs:/vault/logs"
		(...)
		
```

위와 같이 각각의 앱에서 docker-compose.yml를 작성한다면 각 컨테이너를 생성시  
container A는 호스트의 `$PWD/config` (없으면 자동으로 생성)과 컨테이너의 `/tmp/config`는 완전히 같은 파일을 지닌다.  
또한 `$PWD/logs/:/tmp/test` 를 작성한 것처럼 여러 개의 볼륨 옵션을 지정할 수도 있다.  
위의 container A와 B를 모두 생성한 후 컨테이너 목록을 보면 아래와 같다

```jsx
CONTAINER ID   IMAGE          COMMAND                  CREATED        STATUS          PORTS                    NAMES
aff3f55c5749   vault          "docker-entrypoint.s…"   45 hours ago   Up 5 seconds    0.0.0.0:8300->8200/tcp   vault_test//container A
e4200ca770de   vault:1.11.3   "vault server -confi…"   10 days ago    Up 25 seconds   0.0.0.0:8200->8200/tcp   vault//container B
```

`docker exec -it aff3f55c5749 /bin/sh`를 입력하여 container A 내부로 들어가보면

<img src="https://user-images.githubusercontent.com/79896443/215004967-a6d71f01-f935-4ec8-9f95-25f520eb78c5.png" width="700" />

container A의 /tmp/config에는 당연히 접근 가능하지만,   
container B 내부의 entrypoint 파일(vault/config/vault.json)까지는 접근이 불가한 것을 알 수 있다.  
같은 맥락으로 `docker exec -it e4200ca770de /bin/sh` 로  container B 내부로 들어가보면 

<img src="https://user-images.githubusercontent.com/79896443/215004972-b04011bd-3f5e-454a-b058-a1f27b83c9fd.png" width="700" />

container B 내부의 entrypoint 파일(vault/config/vault.json)에 당연히 접근 가능하지만,  
container A 내부의 tmp 파일에는 접근이 불가한 것을 알 수 있다.

## 의문

위에서 볼 수 있듯이 각 컨테이너마다 호스트와 컨테이너의 볼륨 위치를 원하는 곳으로 지정할 수 있다.     
그러면 같은 이미지를 이용한 컨테이너라도 어플리케이션 A를 위한 컨테이너, 어플리케이션 B를 위한 컨테이너를 각각 생성 및 관리할 수 있는 것이라고 생각된다.  
하지만 실제로는 생각한 것처럼 작동되지 않아 의아하다.  
아래와 같이 1~3의 순서대로 차례대로 진행을 하면 3에서 테스트가 실패하면서   (2번을 제외한 1,3만 진행시 잘됨)   
2에서 생성한 container B가 3에서의 container A에 영향을 미치는 것 같은 인상을 받았다.

```jsx
1. 어플리케이션 A을 위한 vault 컨테이너를 생성 후 init, unseal, 작동 테스트(encryption, decryption) 완료
2. 어플리케이션 B를 위한 vault 컨테이너를 생성 후 init 및  unseal, 작동 테스트(encryption, decryption) 완료
3. 컨테이너 A의 작동 테스트(encryption, decryption) 실패
```

하지만 같은 이미지를 사용하는 컨테이너라고 해도 이름, 포트, 볼륨 경로를 다르게 하면 서로에게 영향이 없을 것으로 예상되고, 실제로도 그렇지 않은 증거는 찾지 못했다.   
vault의 경우 컨테이너 포트는 8200번이 아니면 연결이 실패했었는데  각각의 컨테이너 포트를 사용하기 때문에 컨테이너 A의 작동이 컨테이너 B에 영향을 주지는 않을 것 같다.  

이  부분에 대해서는 조금 원인을 찾아보고 글을 보완해야겠다.

 ## 출처

- [https://docs.docker.com/storage/storagedriver/](https://docs.docker.com/storage/storagedriver/)
- [https://superuser.com/questions/1753075/how-to-understand-the-colon-symbol-in-directory-path](https://superuser.com/questions/1753075/how-to-understand-the-colon-symbol-in-directory-path)
- [https://docs.docker.com/engine/reference/run/#volume-shared-filesystems](https://docs.docker.com/engine/reference/run/#volume-shared-filesystems)
- 용찬호, 시작하세요! 도커/쿠버네티스 (위키북스, 2021)