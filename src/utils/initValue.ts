export function initString(data, name) {
  data[name] = String(data[name] ?? 1);
}
export function initBoolean(data, name) {
  const map = {
    0: false,
    1: true,
  };
  data[name] = map[data[name]];
}
export function initStringToArray(data, name, resultName) {
  if (data[name]) {
    data[resultName] = data[name]?.split(',');
  } else {
    data[resultName] = [];
  }
}
export function initImgPath(data, pathName) {
  if (data[pathName]) {
    data[pathName] = [data[pathName]];
  } else {
    data[pathName] = [];
  }
}
