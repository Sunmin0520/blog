# 좋았던 점
- 며칠을 헤매던 문제에 대해 질문했고, 빛을 보았다. 결국 공식문서를 꼼꼼하게 보고, 공식문서에서 요구하는 형식을 그대로 지키는 것이 꼭 필요하다.
- 시간을 지켜가며 일할 때 일하고, 쉴 때 쉬고, 공부할 때 공부하니 참 좋다. 앞으로도 수축과 이완을 잘 해서 덜 지키면서 많은 것을 알아가야겠다.
  - 덜 지치면서도 집중하는 시간을 오래 가져가서 좋다. 
- 미라클모닝을 간만에 했다. 미라클한 시간을 만들어가서 정말 좋다.


# 배운 것
- SDK, API의 구분
- Docker-compose  
  - 한번에 여러 컨테이너를 띄울 수 있어서 신기했다. docker-compose.yml 파일을 만들면 된다.
  - `docker-compose up -d`: daemon 모드로 docker compose up
- nohup
  - nodejs 서버를 계속 켜두려면 pm2나 forever를 써야하나 했는데 팀장님께서 nohup을 알려주셨다. 
  - `nohup node index.js > app.log &`:  백그라운드 실행되고, app.log에 출력
  - 사용하지 않으려면 lsof -i #port number, kill -9 #pid하면 된다.
- Makefile
  - 다양한 명령어를 한번에 처리할 수 있는 방법
  - 도커를 실행할 sh 파일, docker-compose.yaml, express로 만든 웹서버 등 처리하고 싶은 명령어를 적어놓고, 원하는대로 사용하면 된다.
    ```
    all-container:
      docker-compose up -d
    
    server-start:
      nohup node index.js > app.log &

    all-start:
      make all-container
      make server-start
    ```
  라고 파일을 작성해두었다면 `make all-start`로 켜면 된다.  
  - 도커 명령어를 실행할 수 있는 방법이 많다. 
    1. Makefile에 다 입력 
    2. docker-compose.yml에 입력한 후 Makefile에서는 docker-compose up  
    3.sh 파일을 만든 후 그것을 Makefile에서 실행 등등이 있다.  
    2번 방법을 했던 이유는 하나의 repo이름으로 여러개의 컨테이너가 깔끔하게 뜨는게 좋아서였는데
    오늘 추가한 환경변수는 docker-compose.yml에서 자꾸 에러가 났다.(탭 대신 스페이스를 써야 해결되는 오류도 있었다)  
    수정을 해보다가 안되어서 1번 방법으로 했는데 1로 하면 yml파일보다는 indentation에 덜 민감해서 좋기도 하고, sh나 yml없이 Makefile 하나만 있으면 되니까 더 간결해지는 장점이 있는 것 같다!

- scp
  - 처음 써보는 것은 아니었지만, 작업 내용을 로컬에서 개발서버로 옮길 때 
  `scp -r #로컬위치 #옮기려는 위치`를 통해 잘 옮겼다. 디렉토리를 통째로 옮길 때는 -r을 써야 한다고 한다. 

