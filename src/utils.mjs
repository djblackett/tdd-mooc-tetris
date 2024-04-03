export function getMatrixFromString(str) {
  let shapeArr = str.trim().replaceAll(" ", "").split("\n");
  let newArr = []
  for (let i of shapeArr) {
    newArr.push(i.split(""));
  }
  return newArr;
}

console.table(getMatrixFromString(`......T...
       ......TT..
       ......T...
       ...TT.T...
       ..TTTTTT..
       ...TT.T...`));