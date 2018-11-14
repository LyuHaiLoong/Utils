//———————————————————————————————————————————函数防抖———————————————————————————————————————————————————
//func: 执行函数
//wait: 间隔时间
//immediate: 当函数第一次被调用时，以及每次调用到达间隔时间时，是否执行一次函数，默认为false不执行
function debounce(func, wait, immediate) {
    //声明变量timeout定时器、args参数、context上下文、timestamp对照时间戳、result调用函数的返回值
    let timeout, args, context, timestamp, result;
    //创建延迟执行函数
    const later = function() {
      //计算事件触发与延迟执行的间隔时间。相当于每次通过事件触发防抖函数时，都会以本次事件触发为时间戳刷新setTimeout的延迟时间 
      const last = +new Date() - timestamp;

      if (last < wait && last >= 0) {//如果间隔时间在wait时间内，并且间隔时间大于等于0(防止系统时间调整)
        timeout = setTimeout(later, wait - last); //以上次事件触发点为时间戳，刷新延迟时间
      } else { //定时器到时间时，last >= wait，则执行函数
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = +new Date();
      // 第一次调用该方法时，且immediate为true，则调用func函数
      const callNow = immediate && !timeout;
      // 在wait指定的时间间隔内首次调用该方法，则启动定时器调用func函数
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) { //调用func函数
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };