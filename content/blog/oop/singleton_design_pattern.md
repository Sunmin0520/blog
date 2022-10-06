---
title: '[OOP] 싱글턴패턴'
date: 2022-10-06 21:33:07
category: 'oop'
draft: false
---

## 싱글턴 패턴의 특징은 무엇일까?

싱글턴패턴은 여러 구성 요소에서 사용할 수 있는 **단 하나의 인스턴스**를 생성하고,  
이 인스턴스는 전역변수를 사용할 때처럼 **애플리케이션 내부 어디에서든지 접근**할 수 있다.  
즉 모두가 공통적으로 필요로 하는 변수가 있을 때 유용하게 사용할 수 있는 패턴이다.

<img src="https://user-images.githubusercontent.com/79896443/194313313-50865248-8d3c-4abc-9ecf-012c7d9fed04.gif" width="800">

## 예제

아래의 예제 코드는 색상 선택기가 여러 개 있을 때, 하나의 선택기에서 색을 결정하면 그것이 나머지 선택기들에도 영향을 미치는 것을 나타낸다.  
즉 색상이라는 프로퍼티가 전역변수처럼 값이 설정되어 있고, 각각의 선택기에서 그 값을 가져다가 사용하는 것이다.

```js
let instance;
let globalState = {
  color: ""
};

class StateUtility {
  constructor() {
    if (instance) {
      throw new Error("New instance cannot be created!!");//인스턴스는 오직 한 개만 생성
    }

    instance = this;
  }

  getPropertyByName(propertyName) {//색상 가져오기
    return globalState[propertyName];
  }

  setPropertyValue(propertyName, propertyValue) {//색상 설정하기
    globalState[propertyName] = propertyValue;
  }
}

let stateUtilityInstance = Object.freeze(new StateUtility());

export stateUtilityInstance;
```

또 다른 간단한 예제는 아래와 같다.

```js
class Singleton {
  static instance = null;

  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = this;
    }
    return Singleton.instance;
  }
}

export new Singleton();
```

두 번째 줄을 보면 'static'을 이용해 정적 프로퍼티를 사용한 것을 볼 수 있다.  
`static instance = null`과 `Singleton.instance = null`은 같은 의미로 작동한다.  
정적 프로퍼티는 인스턴스에 따라 변하는 값이 아닌, 클래스 수준에 데이터를 저장하고 싶을 때 사용한다. 즉 클래스마다 단 한 개의 고정된 값을 가질 때 사용하기 좋다.  

사실 평소 자바스크립트에서 정적 프로퍼티를 사용해본 적이 거의 없는데 싱글턴패턴은 정적프로퍼티를 아주 잘 이용할 수 있는 디자인패턴이라는 생각이 들었다.   
참고로 정적 메서드도 같은 이유로 작성하는데 특정 인스턴스가 아닌, 클래스 자체에 속한 함수를 구현하고 싶을 때 사용한다.  
정적 메서드의 예제는 아래와 같다.

```js
class Article {
  constructor(title, number) {
    this.title = title;
    this.number = number;
  }

  static compare(articleA, articleB) {
    return articleA.number - articleB.number;
  }
}

let articles = [
  new Article("a", 2),
  new Article("b", 1),
  new Article("c", 0)
];

articles.sort(Article.compare);

console.log(articles);//[{title: 'c', number: 0}, {title: 'b', number: 1},{title: 'a', number: 2}]
```

compare 메서드는 각각의 인스턴스에서 사용하기 위해 설정한 것이 아닌,  
articles의 구성요소들(인스턴스)을 비교해주는 수단으로 개별적인 article을 위에서 바라보는 관점으로 사용하기 위해 설정한 것을 알 수 있다.

## 출처
에릭 프리먼 , 엘리자베스 롭슨, 헤드 퍼스트 디자인 패턴(한빛미디어, 2022)  
[https://www.freecodecamp.org/news/singleton-design-pattern-with-javascript/#pros-and-cons-of-the-singleton-design-pattern](https://www.freecodecamp.org/news/singleton-design-pattern-with-javascript/#pros-and-cons-of-the-singleton-design-pattern)  
[https://ko.javascript.info/static-properties-methods](https://ko.javascript.info/static-properties-methods)