// const keyboardGraph = {
//   // ' ': {'a': 'down' , 'b': 'down', 'c': 'down'},
//   'a': { 'g': 'down', 'b': 'right'},
//   'b': { 'h': 'down', 'c': 'right', 'a': 'up'},
//   'c': { 'b': 'up', 'i': 'down', 'd': 'right'},
//   'd': {'c': 'up', 'j': 'down', 'e': 'right'},
//   'e': {'d': 'left', 'k': 'down', 'f': 'right'},
//   'f': {'e': 'left', 'l': 'down'},
//   'g': {'a': 'up', 'm': 'down', 'h': 'right'},
//   'h': {'b': 'up', 'n': 'down', 'i': 'right', 'g': 'left'},
//   'i': {'c': 'up', 'h': 'left', 'o': 'down', 'j': 'right'},
//   'j': {'d': 'up', 'i': 'left', 'p': 'down', 'k': 'right'},
//   'k': {'e': 'up', 'j': 'left', 'q': 'down', 'l': 'right'},
//   'l': {'f': 'up', 'k': 'left', 'r': 'down'},
//   'm': {'g': 'up', 's': 'down', 'n': 'right'},
//   'n': {'h': 'up', 't': 'down', 'o': 'right', 'm': 'left'},
//   'o': {'i': 'up', 'n': 'left', 'u': 'down', 'p': 'right'},
//   'p': {'j': 'up', 'o': 'left', 'v': 'down', 'q': 'right'},
//   'q': {'k': 'up', 'p': 'left', 'w': 'down', 'r': 'right'},
//   'r': {'l': 'up', 'q': 'left', 'x': 'down'},
//   's': {'m': 'up', 'y': 'down', 't': 'right'},
//   't': {'n': 'up', 'z': 'down', 'u': 'right', 's': 'left'},
//   'u': {'o': 'up', 't': 'left', 'v': 'down', '1': 'right'},
//   'v': {'p': 'up', 'u': 'left', 'w': 'down', '2': 'right'},
//   'w': {'q': 'up', 'v': 'left', 'x': 'down', '3': 'right'},
//   'x': {'r': 'up', 'w': 'left', '4': 'down'},
//   'y': {'s': 'up', '5': 'down', 'z': 'right'},
//   'z': {'t': 'up', '6': 'down', 'y': 'left', '1': 'right'},
//   '1': {'u': 'up', 'z': 'left', '2': 'down', '7': 'right'},
//   '2': {'v': 'up', '1': 'left', '3': 'down', '8': 'right'},
//   '3': {'w': 'up', '2': 'left', '4': 'down', '9': 'right'},
//   '4': {'x': 'up', '3': 'left', '0': 'down'},
//   '5': {'y': 'up', '6': 'right'},
//   '6': {'z': 'up', '5': 'left', '7': 'right'},
//   '7': {'1': 'up', '6': 'left', '8': 'right'},
//   '8': {'2': 'up', '7': 'left', '9': 'right'},
//   '9': {'3': 'up', '8': 'left', '0': 'right'},
//   '0': {'4': 'up', '9': 'left'},
// }

// function bfs(search, start, graph) {
//   const queue = [[{node: start, direction: ''}]]
//   const visited = new Set()
//   let result = []

//   while (queue.length > 0) {
//     const path = queue.shift()
//     const current = path[path.length - 1].node

//     if (visited.has(current)) {
//       continue
//     }

//     const children = graph[current]
//     let childrenKeys = Object.keys(children)

//     for(const key of childrenKeys) {
//       const newPath = [...path, {node: key, direction: children[key]}]
//       if (key === search) {
//         console.log('Found:', key)
//         result = newPath.map(p => p.direction)
//         result.shift() // remove the first element
//         return result
//       }
//       queue.push(newPath)
//     }

//     visited.add(current)
//   }

//   return null
// }

// console.log(bfs('0','a', keyboardGraph)) // This will print the shortest path from 'a' to 'o'


const util = require('util')

const keyboardGrid = [
  ['a', 'b', 'c', 'd', 'e', 'f'],
  ['g', 'h', 'i', 'j', 'k', 'l'],
  ['m', 'n', 'o', 'p', 'q', 'r'],
  ['s', 't', 'u', 'v', 'w', 'x'],
  ['y', 'z', '1', '2', '3', '4'],
  ['5', '6', '7', '8', '9', '0'],
]



function findPathBetween2(keyboardGrid, start, end) {

  let startRow = 0
  let startCol = 0
  let endRow = 0
  let endCol = 0

  for (let i = 0; i < keyboardGrid.length; i++) {
    for (let j = 0; j < keyboardGrid[i].length; j++) {
      if (keyboardGrid[i][j] === start) {
        startRow = i
        startCol = j
      }
      if (keyboardGrid[i][j] === end) {
        endRow = i
        endCol = j
      }
    }
  }

  let rowDiff = endRow - startRow
  let colDiff = endCol - startCol
  let result = []

  while (rowDiff !== 0) {
    if (rowDiff > 0) {
      result.push('down')
      rowDiff--
    } else {
      result.push('up')
      rowDiff++
    }
  }

  while (colDiff !== 0) {
    if (colDiff > 0) {
      result.push('right')
      colDiff--
    } else {
      result.push('left')
      colDiff++
    }
  }

  return result
}

const getAllComands = (searchWord) => {
  let result = []
  for (let i = 0; i < searchWord.length; i++) {
    let start =  i == 0 ? 'a' : searchWord[i - 1]
    let end = searchWord[i]
    if (start === end) {
      result.push("confirm")
      continue
    }
    let find = findPathBetween2(keyboardGrid, start, end)
    result.push(find)
    result.push("confirm")
  }
  return result.flat()
}

const text = "testeamanha"

const regex = /[^a-z0-9]/gi
const textClean = text.toLowerCase().replace(regex, '')

const axios = require('axios');
const textInput = getAllComands(textClean).join(',');

axios.post('http://192.168.0.177', textInput, {
  headers: {
    'Content-Type': 'text/plain'
  }
})
.then((response) => {
  console.log(`Status: ${response.status}`);
  console.log('Body: ', response.data);
})
.catch((error) => {
  console.error(`Error: ${error}`);
});