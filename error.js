//———————————————报错控制———————————————
// 可根据需要自行修改

function error(errType) {
  const error = {
    "String": "The parameter must be String",
    "DOM": "The parameter must be DOM",
    "Object": "The parameter must be Object",
    "Array": "The parameter must be Array",
    "mustA&S": "The parameter must be Array or String",
    "lengthEqual": "The length must be equal"
  }
  throw new Error(error[errType]);
}