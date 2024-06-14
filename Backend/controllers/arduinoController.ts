import axios from 'axios';
import { Request, Response } from "express";
import { notifyUser } from "./sseController";

export const searchArduino = async (req: Request, res: Response) => {
  const { code } = req.params
  const { search } = req.body;
  const regex = /[^a-z0-9]/gi;
  const textClean = search.toLowerCase().replace(regex, '');

  const textInput = getAllComands(textClean).join(',');

  console.log(search);
  notifyUser( code , textInput);
  res.status(200).json({ message: 'Searching started', data: textInput });

  // try {
  //   const response = await axios.post('http://192.168.0.177', textInput, {
  //     headers: {
  //       'Content-Type': 'text/plain'
  //     }
  //   });

  //   console.log(`Status: ${response.status}`);
  //   console.log('Body: ', response.data);

  //   // Return the response from the server to the client
  //   res.status(200).json({ message: 'Searching started', data: response.data });
  // } catch (error: any) {
  //   console.error(`Error: ${error}`);

  //   // Return an error response to the client
  //   res.status(500).json({ message: 'An error occurred', error: error.toString() });
  // }
}

const netflixKeyboardGrid: string[][] = [
  ['a', 'b', 'c', 'd', 'e', 'f'],
  ['g', 'h', 'i', 'j', 'k', 'l'],
  ['m', 'n', 'o', 'p', 'q', 'r'],
  ['s', 't', 'u', 'v', 'w', 'x'],
  ['y', 'z', '1', '2', '3', '4'],
  ['5', '6', '7', '8', '9', '0'],
]

const youtubeKeyboardGrid: string[][] = [
  ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
  ['h', 'i', 'j', 'k', 'l', 'm', 'n'],
  ['o', 'p', 'q', 'r', 's', 't', 'u'],
  ['v', 'w', 'x', 'y', 'z', '-', '`'],
]

function findPathBetween2(keyboardGrid: string[][], start: string, end: string) {

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

const getAllComands = (searchWord: string) => {
  let result = []
  for (let i = 0; i < searchWord.length; i++) {
    let start =  i == 0 ? 'a' : searchWord[i - 1]
    let end = searchWord[i]
    if (start === end) {
      result.push("confirm")
      continue
    }
    let find = findPathBetween2(netflixKeyboardGrid, start, end)
    result.push(find)
    result.push("confirm")
  }
  return result.flat()
}

