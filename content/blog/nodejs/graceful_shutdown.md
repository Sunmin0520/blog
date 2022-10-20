---
title: '[Node.js] Node.js의 Graceful shutdown, K8에서의 Livebness과 Readiness '
date: 2022-10-19 21:46:07
category: 'nodejs'
draft: false
---
## 계기
  기존에는 배포를 할 때, 운영 시간을 피해서 배포를 해왔다. 하지만 이번에 배포할 사이트는 24시간 운영되어서 비는 시간대가 없었다.  
  다행히 k8s 환경으로 롤링업데이트 적용되어 있다. 따라서 v1이 죽으면 v2의 사용이 가능하지만, v1 컨테이너가  죽더라도 요청에 대한 응답이 완료되기 위해 **graceful shutdown이 적용되어 있는 것이 좋다.**  
  기존에는 Node.js의 graceful shutdown에 대해 알아본 적이 없어서 이번 기회를 통해 학습해보기로 했다.

## Node.js의 종료 방법
  프로세스를 종료할 수 있는 다양한 방법이 있는데, 이 중 활용을 고려했던 방법들에 대해서만 정리해보고자한다.
  
  ### 1. process.exit(0)
  프로세스를 강제 종료하는 가장 간단한 도구이다. 0을 제외한 다른 숫자는 프로세스의 비정상 종료를 의미한다.  
  ```js
  let a = 0;
  
  while (a == 0) {
    console.log("프로세스 종료");
    process.exit(0);
  }
  
  // "프로세스 종료" print 후 프로세스 종료됨
  ```
      
  
  ### 2. process.on(’exit’, callback)
  
  프로세스가 종료될 때 exit event가 emit된다. exit이 호출된 이후 즉시 Node.js 프로세스가 종료되기에 이벤트 루프가 관리하는 다른 작업은 실행되지 않는다. 즉 **동기적으로만 작동한다.** 
  
  ```js
  //동기
  process.on('exit', (code) => {
    console.log(`About to exit with code: ${code}`);
  });
  
  // About to exit with code: 0
  
  //비동기
  process.on('exit', (code) => {
    setTimeout(() => {
      console.log('This will not run');
    }, 0);
  });
  
  // 결과 없음
  ```
  
  ### 3. process.on(signal, callback)
  standard POSIX signal names를 event로 받는다.  
  SIGINT는 ctrl+c로 터미널에 간섭하는 경우에 사용된다. SIGINT를 받은 프로세스의 종료를 위해서는 `kill -9 <PID>`가 필요하다.  
  SIGTERM은 graceful termination, 즉 정상종료에 사용된다.  프로세스를 종료하라는 신호를 주는 것이다.  
  SIGKILL은 강제 종료로 정상적인 데이터의 저장이나 프로세스의 처리를 보장할 수 없다.

  ```js
  const express = require("express");
  const app = express();
  const server = app.listen(3000, () =>
    console.log("Example app listening on port 3000!")
  );
  
  console.log(`Process ID: ${process.pid}`);
  process.on("SIGHUP", () => console.log("Received: SIGHUP"));
  process.on("SIGINT", () => console.log("Received: SIGINT"));
  
  // 위의 코드에서는 Ctrl+C를 해도 프로세스가 죽지 않고, SIGINT 시그널을 받는다.  
  // Process ID: <PID>
  // Example app listening on port 3000!
  //^ CReceived: SIGINT // Ctrl+C를 한 한 결과

  // 다른 터미널에서 kill -s SIGHUP <PID> 로 SIGHUP을 보내면 아래와 같은 결과를 확인할 수 있다.
  // Received: SIGHUP 
  
  // SIGINT를 SIGTERM으로 변경하면 Ctrl+C에 프로세스가 종료되는 것을 확인할 수 있다.
  ```
  
  아래처럼 애플리케이션 내부에 프로세스의 정상 종료 로직을 넣어둘 수 있다.
  ```js
  process.on('SIGTERM', () => {
    logger.info('shutdown started')
    server.close()
      .then(closeMysqlConnection())
      .then(() => {
        logger.info('process is stopping')
      })
  })
  ```
쿠버네티스의 pod이 종료되면 애플리케이션에 SIGTERM 신호를 보낸 후, 일정 시간(보통 30초) 동안 정상적으로 프로세스가 종료되면서 데이터를 저장할 수 있다.  
만약 그 시간 이후에도 프로세스가 활성화되어 있으면 쿠버네티스가 SIGKILL을 보낸다.

## K8s의 POD 상태와 관련된 용어들  
**kubelet**은 각 노드에서 실행되는 기본 노드 에이전트로, 이를 통해 컨테이너의 실행을 관리한다.  
**Probe**는 kubelet에 의해 주기적으로 수행되는 진단으로, 실행 중인 컨테이너에 대해 Liveness probe, Readiness probe, Startup probe를 지정할 수 있다.  
**Liveness probe는 컨테이너가 동작 중인지 여부를 나타낸다**. liveness probe에 실패시, kubelet은 컨테이너를 죽이고, 해당 컨테이너는 재시작 정책의 대상이 된다.  
**Readiness probe는 컨테이너가 요청을 처리할 준비되어 있는지를 나타낸다**. readiness probe에 실패시, 엔드포인트 컨트롤러는 파드에 연관된 모든 서비스들의 엔드포인트에서 파드의 IP주소를 제거한다.  
**Startup probe는 컨테이너의 애플리케이션이 시작되었는지를 나타낸다**. startup prode에 실패시, kubelet은 컨테이너를 죽이고, 해당 컨테이너는 재시작 정책의 대상이 된다.   

쿠버네티스의 pod이 정상적으로 요청을 받아들일 수 있는지를 판단하기 위해(readiness) 개별 컨테이너들은 그것을 체크할 end point를 제공하면 된다.  
Node.js에서의 graceful shudown과 함께 k8s liveness, readiness check에 사용될 end point 설정을 위한 [terminus](https://github.com/godaddy/terminus) 등의 라이브러리도 있다.  

## 출처
[https://nodejs.org/api/process.html#process_event_exit](https://nodejs.org/api/process.html#process_event_exit)  
[https://thomashunter.name/posts/2021-03-08-the-death-of-a-nodejs-process](https://thomashunter.name/posts/2021-03-08-the-death-of-a-nodejs-process)  
[https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/](https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/)  
[https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/)  
[https://www.ibm.com/docs/pt/aix/7.2?topic=k-kill-command](https://www.ibm.com/docs/pt/aix/7.2?topic=k-kill-command)  