export function getMatrixFromString(str) {
  let shapeArr = str.trim().replaceAll(" ", "").split("\n");
  let newArr = []
  for (let i of shapeArr) {
    newArr.push(i.split(""));
  }
  return newArr;
}

// move to test
// console.table(getMatrixFromString(`
//        ......T...
//        ......TT..
//        ......T...
//        ...TT.T...
//        ..TTTTTT..
//        ...TT.T...`));