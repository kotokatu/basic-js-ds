const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode || null;
  }

  add(data) {
    this.rootNode = addInner(this.rootNode, data);

    function createNode(data) {
      return {data: data, left: null, right: null};
    }

    function addInner(node, data) {
      if (!node) node = createNode(data);
      if (node.data === data) return node;
      if ( data > node.data) node.right = addInner(node.right, data);
      if (data < node.data) node.left = addInner(node.left, data);
      return node;
    }
  }

  has(data) {
    return checkdata(this.rootNode, data);
    function checkdata(node, data) {
      if (!node) return false;
      if (node.data === data) return true;
      if (data > node.data) return checkdata(node.right, data);
      if (data < node.data) return checkdata(node.left, data);
    }
  }

  find(data) {
    return findNode(this.rootNode, data);
    function findNode(node, data) {
      if (!node) return null;
      if (node.data === data) return node;
      if (data > node.data) return findNode(node.right, data);
      if (data < node.data) return findNode(node.left, data);
    }
  }

  remove(data) {
    this.rootNode = removeInner(this.rootNode, data);

    function removeInner(node, data) {
      if (!node) return null;

      if (data < node.data) {
        node.left = removeInner(node.left, data);
        return node;
      }

      if (data > node.data) {
        node.right = removeInner(node.right, data);
        return node;
      }

      if (data === node.data) {
        if (!node.left) {
          node = node.right;
          return node;
        }
        if (!node.right) {
          node = node.left;
          return node;
        }
        if (node.left && node.right) {
          let min = node.right.data;
          findMin(node.right)
          function findMin(node) {
            if (!node.left) min = node.data;
            else findMin(node.left);
          }
          removeInner(node, min);
          node.data = min;
          return node;
        }
      }

      return node;
    }
  }

  min(node = this.rootNode) {
    let min = node.data;
    findMin(node);
    function findMin(node) {
      if (!node.left) min = node.data;
      else findMin(node.left);
    }
    return min;
  }

  max(node = this.rootNode) {
    let max = node.data;
    findMax(node);
    function findMax(node) {
      if (!node.right) max = node.data;
      else findMax(node.right);
    }
    return max;

  }
}


module.exports = {
  BinarySearchTree
};