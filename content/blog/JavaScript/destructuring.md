---
title: '[JS] Destructuring'
date: 2022-08-09 11:19:07
category: 'javascript'
draft: false
---
- const {key} = obj처럼 객체의 구조를 분해  
  → 가져오고 싶은 value만 or 객체 안의 객체 자체 가져올 수 있다.
  

```js
const user = {firstName: "Sunmin", lastName: "Cho"}//라는 객체가 있다면

const {lastName, firstName} = user//로 destructuring/ key 순서는 의미없음
console.log(firstName, lastName) //Sunmin Cho. 원하는 값을 바로 가져온다.
```

```
const todo = {id: 1, content: '블로깅', completed: true}
const {content} = todo
console.log(content)//'블로깅'
```

- argument에 넣기

```js
function todo(todo){
	console.log(`할일: ${todo.content}은 ${todo.completed? 'Done': 'not yet'}입니다`)
}

todo({content: '블로깅', completed: true})//할일: 블로깅은 Done입니다
```

- 중첩 객체에서 원하는 value 바로 가져오기1

```js
const user = {
	firstname: "Sunmin",
	city: "Seoul",
	address: {
		postcode:1234,
		borough: 'gangnam'
}
}

const {address: {borough}} = user 
console.log(borough)//gananam
```

- 중첩 객체에서 원하는 value 바로 가져오기2

```js
const result = {
	id: 1,
	config: {
		success: 10,
		fail: 2
	}
}

const {config = {} } = result
console.log(config)//{success: 10, fail: 2}
```


- 배열일 때

```js
const todos  = [
{id: 1, content: '블로깅1', completed: true},
{id: 2, content: '블로깅2', completed: false},
{id: 3, content: '블로깅3', completed: true}
]

const [,{content}] = todos//배열 index로 destructuring 
console.log(content)//블로깅2
```

