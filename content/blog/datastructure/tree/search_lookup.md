---
title: '[자료구조][Tree] BST의 search, lookup'
date: 2022-02-07 23:55:00
category: 'datastructure'
draft: true
---

```js
class Node {
  constructor(value){
    this.left = null;
    this.right = null;
    this.value = value;
  }
}

class BinarySearchTree {
  constructor(){
    this.root = null;
  }
  insert(value){
    let newNode = new Node(value);
    if(!this.root) {
      this.root = newNode;
    } else {
      let currentNode = this.root;
      while(true){//!
        if(value < currentNode.value){
          if(!currentNode.left){
            currentNode.left = newNode;
            return this;
          }currentNode = currentNode.left;
        }  else {
          if(!currentNode.right){
            currentNode.right = newNode;
            return this;
          } currentNode = currentNode.right;
        }
      }
    } 
  }

  lookup(value){//value와 같은 node 리턴
    if(!this.root){
      return false;
    } 
    let currentNode = this.root;
    while(currentNode){//!
      if(value < currentNode.value){
        currentNode = currentNode.left;
      } else if(value > currentNode.value){
        currentNode = currentNode.right;
      } else if(value === currentNode.value){
        return currentNode;
      }
    }
    return false
  }
}

const tree = new BinarySearchTree();
//insert
tree.insert(9)
tree.insert(4)
tree.insert(6)
tree.insert(20)
tree.insert(170)
tree.insert(15)
tree.insert(1)

JSON.stringify(traverse(tree.root))
function traverse(node) {
  const tree = { value: node.value };
  tree.left = node.left === null ? null : traverse(node.left);
  tree.right = node.right === null ? null : traverse(node.right);
  return tree;
}
//     9
//  4     20
//1  6  15  170 의 순서로 들어감. root 와 비교하고 -> 대소 비교 -> this.root = this.root.left or right로 계속 비교해가며 BST 형성


//lookup
tree.lookup(8)//false
tree.lookup(9)//value:9, left에 4,right에 20 등 있는 node 정보 나옴


```