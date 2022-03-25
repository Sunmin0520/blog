---
title: '[Docker] docker-compose.yml에서 특정 컨테이너만 띄우기'
date: 2022-03-25 21:44:07
category: 'docker'
draft: false
---

## 문제 상황 - 1
- docer-compose.yml에 redis 관련해서 적혀 있었고, 그 중 하나의 컨테이너만 띄우고 싶었다.

- `docker-compose up redis`하면 아래의 에러 메세지

```js
Starting redis ... error

ERROR: for redis  Cannot start service redis: OCI runtime create failed: container_linux.go:380: 
starting container process caused: process_linux.go:545: container init caused: rootfs_linux.go:76: 
mounting "경로1" 
to rootfs at "경로2" caused: mount through procfd: not a directory: unknown: 
Are you trying to mount a directory onto a file (or vice-versa)? Check if the specified host path exists and is the expected type

ERROR: for redis  Cannot start service redis: OCI runtime create failed: container_linux.go:380: 
starting container process caused: process_linux.go:545: container init caused: rootfs_linux.go:76: 
mounting "경로1" 
to rootfs at "경로2" caused: mount through procfd: not a directory: unknown: 
Are you trying to mount a directory onto a file (or vice-versa)? Check if the specified host path exists and is the expected type
ERROR: Encountered errors while bringing up the project.
```

- 해당 경로의 파일들 확인해보면 directory 아닌 file이고, path도 맞음. 해당 에러 검색시 대부분 directory 확인해보라는 답변 나옴
- 문제상황 2로 연결

<br/>

## 문제상황 - 2
- `docker-compose -p redis up` 하면 아래의 메세지

```js
//컨테이너를 처음 띄울 때 
Starting redis           ... done
Creating [다른 컨테이너] ... done
Attaching to redis, [다른 컨테이너]
redis              | 1:C 25 Mar 2022 12:17:13.698 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
redis              | 1:C 25 Mar 2022 12:17:13.699 # Redis version=6.2.6, bits=64, commit=00000000, modified=0, pid=1, just started
redis              | 1:C 25 Mar 2022 12:17:13.699 # Configuration loaded
redis              | 1:M 25 Mar 2022 12:17:13.699 * monotonic clock: POSIX clock_gettime
redis              | 1:M 25 Mar 2022 12:17:13.701 * Running mode=standalone, port=6379.
redis              | 1:M 25 Mar 2022 12:17:13.701 # Server initialized
redis              | 1:M 25 Mar 2022 12:17:13.703 * Ready to accept connections
[다른 컨테이너]    | yarn run v1.22.5
[다른 컨테이너]    | ..
```

```js
//이미 띄워본 적 있고 정지만 시켜놓았을 때
Creating network "redis_default" with the default driver
Creating redis ...
Creating [다른 컨테이너] ... error

Creating redis           ... done
fe7430dc2e4b6d0f". You have to remove (or rename) that container to be able to reuse that name.

ERROR: for [다른 컨테이너]  Cannot create container for service [다른 컨테이너]: Conflict. The container name "다른 컨테이너" is already in use by container "93935a2555d4386dfdf044....". You have to remove (or rename) that container to be able to reuse that name.
ERROR: Encountered errors while bringing up the project.
``` 

  - '다른 컨테이너'라고 표기해둔 부분은 yml 파일에 같이 넣어둔 다른 컨테이너 부분인데 해당 부분에서 에러가 난다.
  - 하나의 컨테이너만 띄우려고 붙인 -p옵션은 여러개의 컨테이너를 생성할 때 특정 이름으로 명명하기 위해 사용하는 것으로 추정된다.
  - 즉 **up 명령어 자체가 여러 컨테이너 중 하나만을 띄우기 위해 사용되는 명령어가 아니다.**

<br/>

### 문제 상황 - 3
- `docker-compose run redis` 
  - 컨테이너 잘 뜸 

```js
Creating [프로젝트명]_redis_run ... done
1:C 25 Mar 2022 12:18:37.491 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
1:C 25 Mar 2022 12:18:37.491 # Redis version=6.2.6, bits=64, commit=00000000, modified=0, pid=1, just started
1:C 25 Mar 2022 12:18:37.491 # Configuration loaded
1:M 25 Mar 2022 12:18:37.492 * monotonic clock: POSIX clock_gettime
                _._
           _.-``__ ''-._
      _.-``    `.  `_.  ''-._           Redis 6.2.6 (00000000/0) 64 bit
  .-`` .-```.  ```\/    _.,_ ''-._
 (    '      ,       .-`  | `,    )     Running in standalone mode
 |`-._`-...-` __...-.``-._|'` _.-'|     Port: 6379
 |    `-._   `._    /     _.-'    |     PID: 1
  `-._    `-._  `-./  _.-'    _.-'
 |`-._`-._    `-.__.-'    _.-'_.-'|
 |    `-._`-._        _.-'_.-'    |           https://redis.io
  `-._    `-._`-.__.-'_.-'    _.-'
 |`-._`-._    `-.__.-'    _.-'_.-'|
 |    `-._`-._        _.-'_.-'    |
  `-._    `-._`-.__.-'_.-'    _.-'
      `-._    `-.__.-'    _.-'
          `-._        _.-'
              `-.__.-'

1:M 25 Mar 2022 12:18:37.494 # Server initialized
1:M 25 Mar 2022 12:18:37.498 * Ready to accept connections
```

  - run: 서비스에 대해 1회성으로 실행하는 명령어
    - 이미 열려있는 포트와의 충돌을 막는다.

  - 컨테이너는 잘 떴으나 컨테이너와 동시에 express 서버를 띄워야했다. express 서버를 띄우면 아래와 같은 에러 발생
  ```js
  Error: connect ECONNREFUSED 127.0.0.1:6379
    at TCPConnectWrap.afterConnect [as oncomplete] (net.js:1141:16)
    at TCPConnectWrap.callbackTrampoline (internal/async_hooks.js:120:14) {
      errno: 'ECONNREFUSED',
      code: 'ECONNREFUSED',
      syscall: 'connect',
      address: '127.0.0.1',
      port: 6379
    }
  ```

<br/>

### 해결
- `brew install redis` → `redis-server` 
- redis-server 실행하면 아래와 같이 나오며, express 서버와 함께 실행 잘 됨

```js
85588:C 25 Mar 2022 22:14:16.391 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
85588:C 25 Mar 2022 22:14:16.391 # Redis version=6.2.6, bits=64, commit=00000000, modified=0, pid=85588, just started
85588:C 25 Mar 2022 22:14:16.391 # Warning: no config file specified, using the default config. In order to specify a config file use redis-server /path/to/redis.conf
85588:M 25 Mar 2022 22:14:16.392 * Increased maximum number of open files to 10032 (it was originally set to 256).
85588:M 25 Mar 2022 22:14:16.392 * monotonic clock: POSIX clock_gettime
                _._
           _.-``__ ''-._
      _.-``    `.  `_.  ''-._           Redis 6.2.6 (00000000/0) 64 bit
  .-`` .-```.  ```\/    _.,_ ''-._
 (    '      ,       .-`  | `,    )     Running in standalone mode
 |`-._`-...-` __...-.``-._|'` _.-'|     Port: 6379
 |    `-._   `._    /     _.-'    |     PID: 85588
  `-._    `-._  `-./  _.-'    _.-'
 |`-._`-._    `-.__.-'    _.-'_.-'|
 |    `-._`-._        _.-'_.-'    |           https://redis.io
  `-._    `-._`-.__.-'_.-'    _.-'
 |`-._`-._    `-.__.-'    _.-'_.-'|
 |    `-._`-._        _.-'_.-'    |
  `-._    `-._`-.__.-'_.-'    _.-'
      `-._    `-.__.-'    _.-'
          `-._        _.-'
              `-.__.-'

85588:M 25 Mar 2022 22:14:16.395 # Server initialized
85588:M 25 Mar 2022 22:14:16.395 * Loading RDB produced by version 6.2.6
85588:M 25 Mar 2022 22:14:16.395 * RDB age 42 seconds
85588:M 25 Mar 2022 22:14:16.395 * RDB memory usage when created 0.98 Mb
85588:M 25 Mar 2022 22:14:16.396 # Done loading RDB, keys loaded: 3, keys expired: 0.
85588:M 25 Mar 2022 22:14:16.396 * DB loaded from disk: 0.001 seconds
85588:M 25 Mar 2022 22:14:16.396 * Ready to accept connections
```

<br/>

### 에러가 났던 원인
- 설치가 필요하다는 것을 생각하지 못했다.
  - 최근에 DB를 잘 사용하지 않았어서 redis가 맥북에 설치되어 있지 않았다는 사실조차 잊었다. 모듈을 설치했으니 된 것이라고 착각했다.

- 설치만으로 redis가 잘 작동되는데 redis 관련 내용이 docker-compose.yml에 있는 이유는? (내가 작성한 코드가 아니어서 전후 맥락을 몰랐다)
  - 로컬에서 컨테이너를 띄우기 위해 존재하던 것이 애초에 아니었는데 착각했다.

- 원인을 파악하고 나면 너무 간단한 것들이 많아서 허무하지만 이렇게 계속 하다보면 그래도 좀 더 빨리 원인을 파악할 수 있게 되겠지!! 힘내자!



<br/>
<br/>


**출처**
- https://docs.docker.com/compose/faq/#whats-the-difference-between-up-run-and-start
- https://github.com/docker/compose/blob/17682c58db8986f1d1492559d72b3960b86f5f05/docs/reference/run.md
- https://stackoverflow.com/questions/33066528/should-i-use-docker-compose-up-or-run/33066676?noredirect=1#comment124777957_33066676
- https://stackoverflow.com/questions/8754304/redis-connection-to-127-0-0-16379-failed-connect-econnrefused