console.log('lesson 2');

//func/class, loops, anonymous code, switch, try/catch, if/else - Все создают область видимости.....объект не создает область видимости
//хвостовая рекурсия???

// Lexical environment
// http://jsflow.org/docs/lex-env/

//// Closure
// https://learn.javascript.ru/closure
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Closures
// https://medium.com/@stasonmars/%D0%BF%D0%BE%D0%BD%D0%B8%D0%BC%D0%B0%D0%B5%D0%BC-%D0%B7%D0%B0%D0%BC%D1%8B%D0%BA%D0%B0%D0%BD%D0%B8%D1%8F-%D0%B2-javascript-%D1%80%D0%B0%D0%B7-%D0%B8-%D0%BD%D0%B0%D0%B2%D1%81%D0%B5%D0%B3%D0%B4%D0%B0-c211805b6898
// https://www.youtube.com/watch?v=pahO5XjnfLA

//// Сurrying
// https://learn.javascript.ru/currying-partials
// https://medium.com/@stasonmars/%D0%BF%D0%BE%D0%BD%D0%B8%D0%BC%D0%B0%D0%B5%D0%BC-%D0%BA%D0%B0%D1%80%D1%80%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D0%B2-javascript-5ec4a1d88827

// Pattern Module
// https://habr.com/ru/company/ruvds/blog/419997/

// Recursion
// https://learn.javascript.ru/recursion
// https://www.youtube.com/watch?v=Kuq6oIN3PH0


// Task 01
// Реализовать функцию sum которая суммирует 2 числа следующим образом sum(3)(6) === 9

function sum(n: number) {
    return function (n2: number) {
        return n + n2
    }
}

console.log(sum(3)(6))

// Task 02
// Реализовать функцию makeCounter которая работает следующим образом:
// const counter = makeCounter();
// counter(); // 1
// counter(); // 2
// const counter2 = makeCounter();
// counter2(); // 1
// counter(); // 3

function makeCounter() {
    let counter = 0
    //@ts-ignore
    function inner() {
        return ++counter
    }
    return inner
}

const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
const counter2 = makeCounter();
console.log(counter2()); // 1
console.log(counter()); // 3


// Task 03
// Переписать функцию из Task 02 так, что бы она принимала число в качестве аргумента и это число было стартовым значением счетчика
// и возвращала следующий объект методов:
// increase: +1
// decrease: -1
// reset: установить счетчик в 0;
// set: установить счетчик в заданное значение;

function makeCounter2(counter: number) {
    let result = counter
    return {
        increase: () => {
            ++result
        },
        decrease: () => {
            --result
        },
        reset: () => {
            result = 0
            return result
        },
        set: (n: number) => {
            result = n
            return result
        },
        getResult: () => {
            console.log(result)
        }
    }
}

let counter3 = makeCounter2(1)
counter3.increase() // 2
counter3.set(5)
counter3.increase() // 6
let counter4 = makeCounter2(5)
counter3.increase() // 7
counter3.decrease() // 6
counter3.reset() // 0
counter3.getResult()
counter4.getResult()


// Task 04*
// Реализовать функцию superSum которая принимает число в качестве аргумента, которое указывает на количество слагаемых
// и что бы корректно работали следующие вызовы:
// 1) superSum(0) //0
// 2) superSum(3)(2)(5)(3) //10
// 3) superSum(3)(2)(5,3) //10
// 4) superSum(3)(2,5,3) //10
// 5) superSum(3)(2,5)(3) //10
// 6) superSum(3)(2,5)(3,9) //10

function superSum(argsNum: number) {
    if (argsNum === 0) return 0
    if (argsNum === 1) return (n: number) => n

    let argsArr: number[] = []
    function inner(...args: number[]) {
        argsArr = [...argsArr, ...args]
        if (argsArr.length >= argsNum) {
            argsArr.length = argsNum
            return argsArr.reduce((acc, el) => acc + el)
        } else {
            return inner
        }
    }
    return inner
}

// P.S. типизируйте только аргументы, а при вызове функции используйте @ts-ignore

// Task 05
// решить все задачи по рекурсии которые даны в конце статьи https://learn.javascript.ru/recursion

function sumTo(n: number): number {
    if (n === 1) return n
    return n + sumTo(n - 1)
}

console.log('sumTo')
console.log(sumTo(100))

function fact(n: number): number {
    if (n === 0) return 1
    if (n === 1) return 1
    return n * fact(n - 1)
}

console.log('factorial')
console.log(fact(4))

function fib(n: number): number {

    if (n === 1 || n === 2) {
        return 1
    }
    let result = fib(n - 1) + fib(n - 2)
    console.log(result)
    return result

}

console.log('fib')
console.log(fib(4))

//------------------------------

function printList(list : any): any {
    if (list.next === null) {
        console.log(list.value)
        return
    }
    console.log(list.value)
    return printList(list.next)
}

console.log('printlist')

let list1 = {
    value: 1,
    next: {
        value: 2,
        next: {
            value: 3,
            next: {
                value: 4,
                next: null
            }
        }
    }
};

printList(list1)

//------------------------------

function printListReverse(list : any): any {
    if(list.next) {
        printListReverse(list.next)
    }
    console.log(list.value)
}

console.log('printlistreverse')

let listreverse = {
    value: 1,
    next: {
        value: 2,
        next: {
            value: 3,
            next: {
                value: 4,
                next: null
            }
        }
    }
};

printListReverse(listreverse)

// Task 06
// написать функцию, которая повторяет функционал метода flat массива на всю глубину.

function flatAlike(arr: any): any {
    let result: any = []
    for (let i=0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            result = [...result, ...flatAlike(arr[i])]
        } else {
            result = [...result, arr[i]]
        }
    }
    return result
}

console.log('flatalike')
console.log(flatAlike([1, 2, [3, 4, [5, 6]]]))

// just a plug
export default () => {};