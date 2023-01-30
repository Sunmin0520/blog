---
title: '[DB] MongoDB Replication'
date: 2023-01-29 17:51:13
category: 'database'
draft: false
---

> MongoDB를 사용시, 동일한 데이터의 복제본을 여러 개 만들어서 데이터의 가용성을 높일 수 있다고 한다!

## MongoDB Replication을 위한 용어들

- `mongod` MongoDB 시스템을 위한 primary daemon process  
- `replica set` 같은 데이터셋을 유지하는 mongod의 그룹으로 데이터의 중복성을 제공하고, 가용성을 높인다.  

<img src="https://user-images.githubusercontent.com/79896443/215315804-5d5407e8-ca1d-4bcd-9979-1cbfcc8c7219.svg" width=480>  

위의 그림처럼 클라이언트는 secondary에 데이터를 쓸 수는 없지만, 읽을 수는 있다.  
primary의 사용이 불가능해지면, secondary 중 어떤 것이 primary될지 election을 거친다. 

<img src="https://user-images.githubusercontent.com/79896443/215315805-7230da73-7c33-4512-8a8a-9e91cb889fb3.svg" width=500>

- `heartbeat` replicat set member끼리는 서로에게 매 2초마다 서로 ping을 보내서 상태를 확인한다.   
10초 후에도 return 이 안 오면 그 member는 접근 불가인 것으로 판단한다.

## Replication 설정 방법

1. **각 mongod 컨테이너가 작동할 docker network 생성**
    
    `docker network create mongoCluster`
    
2. **mongod 컨테이너간의 인증, 클라이언트 access control 위해 keyfile 생성**
    
    `openssl rand -base64 756 > mongodb.key` // openssl 이용하여 공유 암호로 사용하기 위한 complex pseudo-random 1024 character string을 생성  
    `chmod 400 mongodb.key` //사용자에게만 read 권한 설정

3. **docker-compose.yml에 3개의 mongodb 컨테이너 정보 작성**
        
    ```js
    //docker-compose.yml
    version: '3.8'
    
    services:
      mongo_1:
        image: mongo:latest
        container_name: mongo_1
        restart: always
        environment:
          MONGO_INITDB_ROOT_USERNAME: root
          MONGO_INITDB_ROOT_PASSWORD: root
        ports:
          - 27017:27017
        volumes:
          - ./data/db/replica/mongo_1:/data/db
          - ./mongodb.key:/etc/mongodb.key
        command:
          - '--replSet'
          - 'myReplicaSet'
          - '--keyFile'
          - '/etc/mongodb.key'
          - '--bind_ip_all'
    
        # command 내용
          # replicaSet의 이름은 myReplicaSet으로 한다.
          # keyFile은 /etc/mongodb.key를 사용한다.
          # --bind_ip_all로 외부에서 클라이언트 접속이 가능하게 한다.
        
      mongo_2:
        image: mongo:latest
        container_name: mongo_2
        restart: always
        environment:
          MONGO_INITDB_ROOT_USERNAME: root
          MONGO_INITDB_ROOT_PASSWORD: root
        depends_on:
          - mongo_1
        ports:
          - 27018:27017
        volumes:
          - ./data/db/replica/mongo_2:/data/db
          - ./mongodb.key:/etc/mongodb.key
        command:
          - '--replSet'
          - 'myReplicaSet'
          - '--keyFile'
          - '/etc/mongodb.key'
          - '--bind_ip_all'
    
      mongo_3:
        image: mongo:latest
        container_name: mongo_3
        restart: always
        environment:
          MONGO_INITDB_ROOT_USERNAME: root
          MONGO_INITDB_ROOT_PASSWORD: root
        depends_on:
          - mongo_2
        ports:
          - 27019:27017
        volumes:
          - ./data/db/replica/mongo_3:/data/db
          - ./mongodb.key:/etc/mongodb.key
        command:
          - '--replSet'
          - 'myReplicaSet'
          - '--keyFile'
          - '/etc/mongodb.key'
          - '--bind_ip_all'
    
    networks:
      default:
        name: mongoCluster
    ```

4. **컨테이너 실행**
    
    `docker-compose up -d`
    
5. **띄운 3개의 컨테이너 중 하나에 들어가서 config 적용하여 초기화 설정**

```
➜  mongo_replication docker ps
CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS         PORTS                      NAMES
0640cfad95e0   mongo:latest   "docker-entrypoint.s…"   6 minutes ago   Up 6 minutes   0.0.0.0:27019->27017/tcp   mongo_3
3dc08fc9a3a5   mongo:latest   "docker-entrypoint.s…"   6 minutes ago   Up 6 minutes   0.0.0.0:27018->27017/tcp   mongo_2
34092fe360a8   mongo:latest   "docker-entrypoint.s…"   6 minutes ago   Up 6 minutes   0.0.0.0:27017->27017/tcp   mongo_1
```

`docker exec -it 34092fe360a8 /bin/sh` → `mongosh -u root -p root`  
현재처럼 초기화를 거치지 않은 상태에서 `rs.status()`를 입력시 no replset config has been received가 나오면서 별도의 config이 설정되지 않은 것을 확인할 수 있다.  

<img src="https://user-images.githubusercontent.com/79896443/215315806-f9829e4b-e71b-4198-930a-2de294e31e9a.png" width=1300>

`rs.initiate({_id: "myReplicaSet", members: [{ _id: 0, host: "mongo_1" }, { _id: 1, host: "mongo_2" }, { _id: 2, host: "mongo_3" }]});`를 입력하면  
결과가 `{ok:1}`이 나오며 설정이 잘 완료된 것을 볼 수 있다.

<img src="https://user-images.githubusercontent.com/79896443/215315811-175e02d6-0dee-4caf-8258-782edc18e338.png" width=1300>

3개의 컨테이너에 각각 들어가보면 primary, secondary, secondary로 설정된 것을 확인할 수 있다. 
<img src="https://user-images.githubusercontent.com/79896443/215315812-73e2de33-10b7-4fbb-a1e8-fe0e0a7b88f7.png" width=1300>

또한 rs.status()로 replica set의 config, 상태 등을 확인해볼 수도 있다.  

<img src="https://user-images.githubusercontent.com/79896443/215315815-b895cfe6-ccdf-48ed-9b3c-aff5960f456c.png" width=600>
<img src="https://user-images.githubusercontent.com/79896443/215315816-cda26b42-8ef5-4d42-9b90-278ffdb79844.png" width=600>


## primary와 secondary간에 같은 데이터를 가지는지 확인

### insert, find

primary에서 replicaTest라는 db를 생성하고, 하나의 document를 insert한다.  
(`insertOne`이나 `insertMany`가 아닌 `insert` 자체는 deprecated되었다고 나오지만 작동은 가능했다.) 

<img src="https://user-images.githubusercontent.com/79896443/215315817-5ce2a2a6-97e2-4a39-9302-9db85f9b9893.png" width=1000>


secondary에서 find 시도하면 primary가 아니라는 메세지가 나온다. 

<img src="https://user-images.githubusercontent.com/79896443/215315819-1df7e3a0-bcac-40f6-8d5e-442a300f0a60.png" width=1000>

이 때 `rs.secondaryOk()`를 입력하면 조회가 가능하다.

<img src="https://user-images.githubusercontent.com/79896443/215315820-b26e6b0d-f93b-42be-bc93-741dd054778e.png" width=1000>
<img src="https://user-images.githubusercontent.com/79896443/215315821-db364bdb-2b54-47ba-a7de-9bf1f95b5a85.png" width=1000>

기존에 사용하던 `rs.slaveOk()`와 마찬가지로 `rs.secondaryOk()`역시 deprecated라고 나왔다.  
작동 자체는 가능하였기 때문에 여기서는 rs.slaveOk()로 find 결과를 얻을 수 있었고,   
다른 secondary에서는`db.getMongo().setReadPref('secondary')` 로 같은 결과를 얻을 수 있었다. 


<img src="https://user-images.githubusercontent.com/79896443/215315824-dde88ca0-bf58-4b20-9a34-fb5ab0416288.png" width=1000>

당연하지만 이 때 꼭 어떠한 db를 사용할 것인지 명시한 후 (여기서는 `use replicaTest`) find를 해야 결과가 제대로 나온다.  
`use <db name>` 없이 `db.<db name>.find()`를 하면 빈 결과가 나온다.  


### delete, find

secondary에서 document를 삭제하려고 하면 `not primary`라고 에러가 나오는 것을 볼 수 있다.  

<img src="https://user-images.githubusercontent.com/79896443/215315825-a0ab1608-b4bd-400c-864d-225d4351f87d.png" width=1000>


primary(아래 이미지에서 왼쪽 터미널)에서 삭제 후 secondary(오른쪽 터미널)에서 확인하니 document가 없어진 것을 확인할 수 있다.

<img src="https://user-images.githubusercontent.com/79896443/215315826-89e4d5a6-94a8-4c35-be9a-4e6e059455e3.png" width=1000>


## todo
- election이 되는 과정을 확인해볼 수 있을까?   
사용자가 의도적으로 primary에서 데이터를 삭제하고, 그것이 동일하게 secondary에서도 확인가능한 것과 달리 primary의 사용이 불가해졌을 때 기존의 secondary가 어떻게 그 역할을 하는지 궁금하다.
- docker network에 대해 좀 더 자세하게 알아보자.

## 출처    
[https://www.mongodb.com/docs/manual/replication/](https://www.mongodb.com/docs/manual/replication/)  
[https://www.mongodb.com/compatibility/deploying-a-mongodb-cluster-with-docker](https://www.mongodb.com/compatibility/deploying-a-mongodb-cluster-with-docker)  
[https://www.mongodb.com/docs/manual/tutorial/deploy-replica-set-with-keyfile-access-control/](https://www.mongodb.com/docs/manual/tutorial/deploy-replica-set-with-keyfile-access-control/)  