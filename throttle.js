//———————————————————————————————————————————函数节流———————————————————————————————————————————————————
//func: 执行函数
//wait: 间隔时间
//options: 
//      表示首次调用返回值方法时，会马上调用func；否则仅会记录当前时刻，当第二次调用的时间间隔超过wait时，才调用func
//      options.leading = true;
//      当trailing为true时，函数将在调用后，根据wait时间，自动触发。如果为false，则在调用间隔大于wait时间时，立即触发，不会自动触发
//      options.trailing = true; 


function throttle(func, wait, options) {
    //声明变量context上下文，args参数，result值（func函数返回值）
    let context, args, result;
    let timeout = null; //初始化定时器为null
    let previous = 0; //初始化对照时间戳为0
    if (!options) options = {}; //如果没有options，则options为空对象
    //间隔调用程序
    const later = function() {
        //如果options的leading参数为false，则对照时间戳为0，否则为当前时间
        previous = options.leading === false ? 0 : new Date();
        //定时器重置为null
        timeout = null;
        //在当前上下文中执行func函数，并传入当前参数值。保存函数返回值为result
        result = func.apply(context, args);
        //重置上下文及参数
        if (!timeout) context = args = null;
    };

    //返回function函数，闭包
    return function() {
        //保存当前时间戳
        const now = new Date();
        //如果对照时间戳为0，并且options的leading为false，即不会立即调用函数时。对照时间戳与now相等，用于接下来的剩余时间计算。
        if (!previous && options.leading === false) previous = now;
        // 计算剩余时间，输入的延迟时间wait - (当前时间 - 上一次调用时的对照时间)
        const remaining = wait - (now - previous);
        //作用域为当前上下文
        context = this;
        //作用参数为当前上下文传入的参数
        args = arguments;
        // 当下一次调用的时间间隔大于传入的延迟时间wait时，则调用func函数
        // 精彩之处：按理来说remaining <= 0已经足够证明已经到达wait的时间间隔，但这里还考虑到假如客户端修改了系统时间则马上执行func函数。
        if (remaining <= 0 || remaining > wait) { //如果修改了系统时间————假如往过去修改，那么(now - previous)将为负值，计算后remaining将大于wait
            // 由于setTimeout存在最小时间精度问题，因此会存在到达wait的时间间隔，但之前设置的setTimeout操作还没被执行，因此为保险起见，这里先清理setTimeout操作
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            //一旦执行了函数，就将对照时间戳负值为本次调用时间戳
            previous = now;
            //执行函数并保存result
            result = func.apply(context, args);
            //重置定时器，上下文及参数
            if (!timeout) context = args = null;
        }
        //如果定时器不存在，并且options的trailing为true时，执行延迟调用，否则只有当调用时间间隔大于wait时，立即触发函数，不会自动延时调用
        else if (!timeout && options.trailing !== false) {
            // options.trailing=true时，延时执行func函数
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
};