---
title: '[OOP] 팩토리 패턴'
date: 2023-02-14 11:19:07
category: 'javascript'
draft: true
---

##  클래스의 사용 목적과 구성요소: 객체 생성 위한 템플릿
  - **constructor**: 클래스로 생성된 객체를 생성하고 초기화하는 메서드
      - 아래의 예시코드에서 firtst name, lastname, email 정의
  - **class body**
      - fullName 함수 정의
  - **static 속성 및 메서드**: 인스턴스화 없이 호출되며, 인스턴스에서는 호출 불가
  
  ```js
  class User {
    constructor(firstName, lastName, email) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
    }
  
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    }
    
    static species = 'human'
    static getSpecies(){
      return 'this is human'
    }
  }
  
  const user = new User("John","Doe","john@doe.com");

  console.log("user:", user);//User {firstName: { firstName: 'John', lastName: 'Doe', email: 'john@doe.com' }}
  console.log("static - Instance user.species: ", user.species, ", user.getSpecies: ", user.getSpecies()); //undefined, user.getSpecies is not a function
  console.log("static - User.species:", User.species, ", User.getSpecies: ", User.getSpecies());//User.species: human , User.getSpecies:  this is human
  ```

## 팩토리 패턴  
  - 제품 생성 코드를 실제로 사용하는 코드와 분리한다.
  - 예시코드에서라면, 클래스Car를 생성하는 클래스CarFactory를 만들어두고, Car클래스의 인스턴스 생성은 CarFactory의 메서드 createCar가 담당한다.
  - 클라이언트는 Car 생성위해 CarFactory 사용하지만, 그게 어떻게 작용하는지는 알 필요 없다. 그건 CarFactory가 알아서 할 일이다.
  - 조건에 따라 다양한 객체 형성이 필요할 경우, 인스턴스화할 유형에 대한 제어는 필요하지만 어느 인스턴스를 생성할지는 모를 때 즉 공장처럼 다양한 물건을 계속해서 찍어내야할 경우 유용하게 사용할 수 있다.

```js
      class Car {
  constructor(type, model, price) {
    this.type = type;
    this.model = model;
    this.price = price;
  }
}

class CarFactory {
  createCar(type) {
    switch (type) {
      case "sedan":
        return new Car(type, 1, "100");
      case "suv":
        return new Car(type, 2, "200");
    }
  }
}

const carFactory = new CarFactory();
const sedan = carFactory.createCar("sedan");
const suv = carFactory.createCar('suv')
console.log("sedan:", sedan);//sedan: Car { type: 'sedan', model: 1, price: '100' }
console.log('suv:', suv)//suv: Car { type: 'suv', model: 2, price: '200' }
```

## todo
- 추상 팩토리 패턴에 대해 알아보자


- 출처
https://refactoring.guru/ko/design-patterns/factory-method