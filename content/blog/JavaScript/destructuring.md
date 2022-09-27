---
title: '[JS] 구조분해할당'
date: 2022-08-09 11:19:07
category: 'javascript'
draft: false
---

최종 수정일: 2022-09-28

const {key} = obj처럼 **객체의 구조를 분해해서 특정 property에 할당한다.** 그 결과 depth가 깊은 객체의 필요한 value를 변수처럼 간결하게 불러올 수 있다.

```js
const user = { firstName: 'Sunmin', lastName: 'Cho' } //라는 객체가 있다면

const { lastName, firstName } = user //로 destructuring/ key 순서는 의미없음
console.log(firstName, lastName) //Sunmin Cho. 원하는 값을 바로 가져온다.
```

- 중첩 객체에서 원하는 value 바로 가져오기

```js
let people = {
  user: {
    firstname: 'Sunmin',
    city: 'Seoul',
    address: {
      postcode: 1234,
      borough: 'gangnam',
    },
  },
}

let { address= {} } = people.user //특정 property의 값만 가져오기
console.log(address) //{postcode: 1234, borough: "gangnam"}
console.log(address.borough)//gangnam. people.user.address.borough의 값만 가져올 수 있다.

let { firstname } = people.user
console.log(firstname) //Sunmin

//firstname의 value를 바꿔보자.
people.user.firstname = 'min'
console.log(firstname) //Sunmin. firstname으로 구조분해할당한 값은 그대로이다.
console.log(people.user.firstname) //min. 하지만 실제로 people객체 내부의 값은 바뀌었다.
```

- 배열일 때

```js
const todos = [
  { id: 0, content: '할일0', completed: true },
  { id: 1, content: '할일1', completed: false },
  { id: 2, content: '할일2', completed: true },
]

const [, { content }] = todos //배열의 index 0,1,2 중 1 이용 
console.log(content) //할일1
```

- argument에 넣기

```js
function todo(todo) {
  console.log(
    `할일: ${todo.content}은 ${todo.completed ? 'Done' : 'not yet'}입니다`
  )
}

todo({ content: '블로깅', completed: true }) //할일: 블로깅은 Done입니다
```
