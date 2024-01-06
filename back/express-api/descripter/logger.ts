export function Log() {
    // console.log("Log set");
    return (target: any, name: string, descriptor: PropertyDescriptor) => {
        //   console.log( name + "defined");
        const method = descriptor.value; //もともとのメソッド。
        descriptor.value = function () {
            console.log("'" + name + "' exec start!");
            //アノテーションを付けた元のメソッドを実行
            const ret = method.apply(this, arguments);
            console.log("'" + name + "' exec end!");
            return ret;
        };
    };
}

export default Log;
