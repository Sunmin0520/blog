---
title: '[Node.js] 분기하는 경로가 많을 경우의 router 설정'
date: 2023-02-05 11:52:07
category: 'nodejs'
draft: false
---
> Express에서 router를 써야할 항목이 많을 때는 어떻게 해야할까?  
> express와 관련된 새로운 내용은 없지만, 이렇게 해볼 수도 있음을 알게 되어 기록을 남긴다.


## Router object 없이 분기 처리

가장 기본적으로는 아래의 app.js처럼 사용하면 된다. 

```js
//app.js
const express = require("express");
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('GET request to the homepage')
})

app.post('/', (req, res) => {
  res.send('POST request to the homepage')
})

app.get("/about", (req, res) => {
  res.send("about");
});

app.get("/users/:userId/books/:bookId", (req, res) => {
  res.send(req.params);
});

app.listen(port);
```

위와 같이 작성 후 http://localhost:3000/으로 GET, http://localhost:3000/about으로 POST 요청시 잘 접속되는 것을 확인할 수 있다.   
하지만 app.js에서 분기와 관련된 로직까지 한번에 담고 있기 때문에 나누는 것이 좋다.

## Express의 Router object 사용

아래처럼 routes 디렉토리에서 라우팅 관련 설정을 하고, 그것을 app.js에서 불러오는 방식으로 사용할 수 있다.

```js
//app.js
const express = require("express");
const app = express();
const port = 3000;
const indexRouter = require("./routes"); //라우팅 관련 설정 1
const userRouter = require("./routes/user"); //라우팅 관련 설정2

app.use("/", indexRouter); //불러온 설정 1 이용
app.use("/user", userRouter); //불러온 설정 2 이용

app.listen(port);
```

```js
//routes/index.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("index router");
});

module.exports = router;
```

```js
//routes/user.js
const express = require("express");
const router = express.Router();

router
  .route("/info")
  .get((req, res) => res.send("get user info"))
  .post((req, res) => res.send("post user info"));

router.post("/signup", (req, res) => res.send("signup"));

module.exports = router;
```
위와 같이 작성 후 http://localhost:3000/ 으로 GET과 POST 요청, http://localhost:3000/signup 로 POST 요청시 잘 원하는 응답이 오는 것을 확인할 수 있다.   
하지만 분기를 해야하는 endpoint가 여러 개이고, 그 안에서 추가적인 분기까지 이루어져야할 경우 app.js에서 indexRouter, userRouter 등으로 하나하나 설정하는 것은 번거로울 수 있다. 

## 분기할 경로가 여러 개라면?
이런 경우에는 개별적으로 선언하고 사용하기보다는 공통의 구조에 각각의 라우팅 파일들을 배치히고 이 모든 파일을 반복문을 이용하는 형태로 사용하면 조금 더 수월하다.  
우선 uni라는 어플리케이션에 각 학기에 개설되는 과목에서 필요로 하는 api를 기술한다고 할 때, 아래와 같이 간략하게 설정해볼 수 있다.

```js
📦uni
┣ 📂api
┃ ┣ 📂routes
┃ ┃ ┣ 📂semester1 //각 학기명
┃ ┃ ┃ ┣ 📜cProgramming.js // 각 학기에 개설되는 강의명
┃ ┃ ┃ ┗ 📜operatingSystem.js
┃ ┃ ┗ 📂semester2
┃ ┃ ┃ ┣ 📜architecture.js
┃ ┃ ┃ ┗ 📜database.js
┃ ┗ 📜index.js // api directory의 routes를 모음
┗ 📜app.js //express app 실행
```

```js
//app.js
const express = require("express");
const app = express();
const port = 3000;
const getRouter = require("./api"); //라우팅 관련 설정

getRouter().then((router) => app.use(router)); // 두번째 방식과 같이 app.use(<가져온 routing 관련 설정>)

app.listen(port);
```

```js
//api/index.js
const express = require("express");
const router = express.Router();
const fs = require("fs");

function setRouter(path, method, handler) {  //각 endpoint, method일 때 handeler로 어떠한 동작을 할 것인지 설정 
  method === "get" ? router.get(path, handler) : router.get("/", () => {});
  method === "post" ? router.post(path, handler) : router.get("/", () => {});
  return router;
}
const getRouter = async () => {
  const allRoutes = []; //api 디렉토리의 모든 라우팅 관련 설정을 모으는 배열임을 명시하기 위해 allRoutes라는 이름으로 설정
  const semesters = await fs.promises.readdir(`${__dirname}/routes`);
  for (let semester of semesters) {
    const subjects = await fs.promises.readdir(`${__dirname}/routes/${semester}`);
    for (let subject of subjects) {
      const routesBySubject = require(`${__dirname}/routes/${semester}/${subject}`);
      allRoutes.push(...routesBySubject);
    }
  }

  for(let route of allRoutes){//allRoutes의 각 요소에 대해 반복문 실행
    setRouter(route.path, route.method, route.handler )
  }

  return router;
};

module.exports = getRouter;
```
아래는 각 endpoint, method, handler와 관련된 세부 설정이다.
```js
//api/routes/semesters1/cProgramming.js
const routes = [
  {
    path: "/cProgramming/user",
    method: "get",
    handler: async (req, res) => {
      res.send("get /cProgramming/user");
    },
  },
  {
    path: "/cProgramming/lecture",
    method: "post",
    handler: async (req, res) => {
      res.send("post /cProgramming/lecture");
    },
  },  
];

module.exports = routes;
```

```jsx
//api/routes/semesters1/operatingSystem.js
const routes = [
  {
    path: "/os/scheduling",
    method: "get",
    handler: async (req, res) => {
      res.send("get /os/scheduling");
    },
  },
  {
    path: "/os/process",
    method: "post",
    handler: async (req, res) => {
      res.send("post /os/process");
    },
  },
];

module.exports = routes;
```

```jsx
//api/routes/semesters2/archietecture.js
const routes = [
  {
    path: "/architecure/memory",
    method: "get",
    handler: async (req, res) => {
      res.send("get /architecure/memory");
    },
  },
  {
    path: "/architecure/cpu",
    method: "post",
    handler: async (req, res) => {
      res.send("post /architecure/cpu");
    },
  },
];

module.exports = routes;
```

```jsx
//api/routes/semesters2/database.js
const routes = [
  {
    path: "/database/rdbms",
    method: "get",
    handler: async (req, res) => {
      res.send("get /database/rdbms");
    },
  },
  {
    path: "/database/normalization",
    method: "post",
    handler: async (req, res) => {
      res.send("post /database/normalization");
    },
  },
];

module.exports = routes;
```

위와 같이 처리한 후 `npx nodemon app.js`로 서버를 실행한다. 그 이후 endpoint와 method를 맞추어 요청하면 위에서 설정한 8개의 api 모두 제대로 응답을 준다.  
예를 들어 http://localhost:3000/os/scheduling GET요청시 "get /os/scheduling"이라는 응답이 온다.  
즉 api 디렉토리 내부의 모든 파일에 대해 라우팅 처리가 제대로 되었음을 확인할 수 있다.


## 출처
https://expressjs.com/en/guide/routing.html  
https://expressjs.com/en/4x/api.html#router
