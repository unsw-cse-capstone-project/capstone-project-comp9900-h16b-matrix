
export function isEmpty (obj)  {
    if (!obj && obj !== 0 && obj !== "") {
      return true;
    }
    //检验数组
    if (Array.prototype.isPrototypeOf(obj) && obj.length === 0) {
      return true;
    }
    //检验对象
    if (Object.prototype.isPrototypeOf(obj) && Object.keys(obj).length === 0) {
      return true;
    }
    return false;
  };