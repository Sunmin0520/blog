---
title: '[DB] MongoDB, mongoose, mongo-express의 이용과 docker-compose'
date: 2022-10-25 21:17:13
category: 'database'
draft: false
---
## MongoDB

MongoDB는 Not Only SQL 중 가장 유명한 데이터베이스로 Document oriented db이다.  
MongoDB를 사용하면 데이터들끼리 서로 연관이 없는 경우에도 하나의 문서를 작성하는 것처럼 데이터를 구성할 수 있는 장점이 있다.  
Node.js 환경에서 MySQL을 사용할 때 Sequelize라는 ORM을 사용했듯이, MongoDB를 사용할 때에는 Mongoose라는 ODM을 사용할 수 있다.

## Where to CRUD
MongoDB의 CRUD를 관리하는 위치를 로컬, 클러스터, 컨테이너로 나누어서 테스트해보았다.

- **로컬**

MongoDB는 개인 용도로 사용하는 것을 comminity edition이라고 하는 것 같다.  
공식문서를 참고해서 설치하고 `brew services start mongodb-community`로 시작할 수 있다.

`mongosh`를 입력해 아래와 같이 CRUD를 할 수 있다.

<img src="https://user-images.githubusercontent.com/79896443/197771279-0b6cb07b-b210-4a2a-9655-adb6ba94a378.png" width=700>

- **클러스터**

이 역시 공식문서를 따라해보니 아래와 같이 잘 생성됨을 확인했다.    
로컬에서의 관리 대신 클러스터에 데이터가 잘 저장됨을 확인하기 쉬웠다. 

<img src="https://user-images.githubusercontent.com/79896443/197771269-073d2de8-be34-4d33-81bc-7f560405489c.png" width=700>

- **컨테이너**

로컬 mongo db의 실행을 위해 `brew start`를 했던 것처럼   
도커 컨테이너를 통한 mongo db의 실행을 위해서는 `docker run`을 하면 된다.   
`docker run --name mongodb-container -v ~/data:/data/db -d -p 27017:27017 mongo` 로 docker hub내의 mongo db 이미지를 이용해 실행했다.   
이 때, 로컬의 ~/data 디렉터리와 컨테이너의 /data/db 디렉터리를 마운트시켜서 컨테이너 내에서 작업을 하면 로컬의 ~/data에 파일이 업데이트되는 것을 확인할 수 있다.  
`docker exect -it mongodb-container bash` 을 통해 db에 들어가서 확인할 수 있고, express를 통해 웹서버를 만들었다면 당연히 postman으로 정보를 CRUD할 수 있다.  

<img src="https://user-images.githubusercontent.com/79896443/197771288-5d83b672-06ad-46e5-b008-d7b3041a60d9.png" width=700>
<img src="https://user-images.githubusercontent.com/79896443/197771292-86f31f5a-0889-4fe2-91ec-735a383a273c.png" width=500>

위와 같이 삭제를 할 때에 item 대신 name으로 key를 잘못 입력해도 그 어떤 에러가 나지 않고(물론 삭제가 될 Document가 없으므로 deletedCount는 0으로 나온다) 굉장히 자유롭다.  
자유로워서 편리한 점도 분명히 있지만 너무 자유롭고, 스키마를 정의할 수도 없기에 자료드르이 정리가 쉽지 않다.  
그래서 너무 자유로워서 오히려 불편할 수 있다는 결론을 내렸다. 조금 제한을 두어 실수를 방지하고 더 편하게 사용하기 위한 용도로 **mongoose**를 이용해보자. 

## Mongo-Express
지금까지의 결과로는 DB의 변경사항을 확인할 수 있는 방법은 2가지가 있다.  
첫 번째는 변경사항을 확인하는 엔드포인트를 설정한 후 엔드포인트를 브라우저 혹은postman에서 get 요청을 하는 것이고,
두 번째로는 위의 이미지처럼 db에 직접 들어가서 보는 것이다.  
지금이야 데이터가 적어서 이와 같은 방법이 별로 불편하지 않을 수 있지만, 데이터가 많아지면 postman화면에서는 가독성도 떨어질 것 같고 좀 번거롭다.  
이런 경우에 mongo-express를 쓰면 좋다.

## mongoose, Mongo-Express, docker-compose
mongo-express는 Web-based MongoDB admin interface이다. 즉 웹에서 mongoDB의 db, collection, documentaion 등의 구성을 볼 수 있다.  
mongo-express의 사용 역시 MongoDB처럼 Docker hub에서 run해서 사용하면 된다.   
그런데 컨테이너가 많아진다면 컨테이너마다 하나하나 run을 하기에 번거롭다. 이런 경우에 `docker-compose`를 써서 docker-compose.yml에 작성한 서비스들을 모두 한번에 혹은 각각 띄울 수 있다.  
아래처럼 파일을 작성한 후, `docker-compose up -d` 로 'mongodb'와 'mongo-express'로 정의한 컨테이너들을 띄웠다.  

```js
version: "3.8" 
services: 
  mongodb:
    image: mongo:latest
    restart: always
    ports:
      - "27017:27017"
    environment:  # 부가적으로 설정하는 정보들
      - MONGO_INITDB_ROOT_USERNAME=mongo
      - MONGO_INITDB_ROOT_PASSWORD=mongo
    volumes:
      - ./mongo-data:/data/db

  mongo-express:
    image: mongo-express:latest 
    restart: always
    ports:
      - "8081:8081"  
    environment:
      - ME_CONFIG_MONGODB_SERVER=mongodb  # mongodb 컨테이너 이름
      - ME_CONFIG_MONGODB_PORT=27017  # mongodb 연결 포트
      - ME_CONFIG_MONGODB_ADMINUSERNAME=mongo  # mongodb 컨테이너의 root 계정
      - ME_CONFIG_MONGODB_ADMINPASSWORD=mongo  # mongodb 컨테이너의 root 비밀번호
      - ME_CONFIG_BASICAUTH_USERNAME=mongo  # mongo-express 사용자 계정
      - ME_CONFIG_BASICAUTH_PASSWORD=mongo  # mongo-express 사용자 비밀번호
    depends_on:
      - mongodb
```

컨테이너 내부로 접속을 위해서는 `docker ps`를 통해 컨테이너들의 정보를 확인한 후, `docker exec -it <mongo db 컨테이너 이름> /bin/bash`을 입력한다.   
들어가고자 하는 컨테이너가 MongoDB라면 `mongosh -u mongo -p mongo` 로 id, pw 정보를 입력하면 컨테이너 내부에 접속할 수 있다.  
(위와 같이 docker-compose.yml파일에서 컨테이너를 띄울 때 environment 옵션으로 id, pw를 설정해두었기에 `mongosh` 만으로는 접속이 불가하다.)

두 컨테이너가 모두 잘 동작한다면 CRUD 작업을 한 이후에 컨테이너 내부로 들어가 `show dbs`, `db.<collection 이름>.find({})` 등의 명령어를 입력했을 때 나오는 데이터와  
[http://localhost:8081/](http://localhost:8081/)에 접속했을 때 나오는 데이터가 같음을 확인할 수 있다. 또한 mongo-express 자체에서 제공하는 기능으로 Create database, Create collection등을 하면 이 역시 바로 컨테이너에서 연동이 되고 있음을 확인할 수 있다.

<img src="https://user-images.githubusercontent.com/79896443/197773823-c75acfec-7258-4e04-a3a1-c7edff515e1b.png" width=700>

이 때 `docker exec`명령어를 통해 컨테이너 내부의 mongodb에 들어가지 않고 바로 `mongosh`를 입력하면 컨테이너가 아닌 로컬의 mongodb에 접속하게 됨을 주의하자.  
(다만, 로컬의 mongodb를 끈 상태에서는 docker exec이 아닌 mongosh만 입력해도 컨테이너 내의 데이터에 접속 가능한 점이 조금 의아했다.)

express, mongodb, mongoose, mongo-express로 구성한 웹서버를 만들고,  postman으로 요청을 보내보았다.

<img src="https://user-images.githubusercontent.com/79896443/197773844-eb032887-d7fc-4e0c-b8f0-6a2643a932bc.png" width=700>

해당 서버에서는 `const Task = mongoose.model('todos', taskSchema)` 로 collection을 ‘todos’로 설정했기에 todos 컬렉션에 CRUD가 되었으며,  
postman을 통한 POST 요청이 잘 수행된 결과를 mongo-express를 통해 웹으로 확인가능하다. 물론 터미널을 이용해 직접 DB에서 조회도 가능하다.   

## summary

`docker run --name <이름> -v ~/data:/data/db -d -p 27017:27017 mongo` 로 mongodb 컨테이너 실행  
`docker exec -it <mongo db 컨테이너 이름> /bin/bash` 로 실행 중인 컨테이너에 명령어를 입력할 수 있다.  
mongoose로 Schema를 정의한 후 create, find, update, delete 메서드로 CRUD 작업 가능  
`docker-compose up -d <컨테이너 이름>` 으로 컨테이너 실행 (특정 컨테이너 이름 없으면 docker-compose.yml의 모든 컨테이너 실행)  
`docker-compose stop <컨테이너 이름>` 으로 컨테이너 정지  


## 출처
https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#std-label-install    
https://www.mongodb.com/docs/atlas/tutorial/insert-data-into-your-cluster/    
https://webandcrafts.com/blog/mongodb-advantages-and-disadvantages/  
https://medium.com/bb-tutorials-and-thoughts/how-to-use-mongodb-docker-image-with-nodejs-rest-api-3411582c71e5  
https://tech.cloudmt.co.kr/2022/06/29/도커와-컨테이너의-이해-3-3-docker-image-dockerfile-docker-compose/  
https://www.bearpooh.com/127  