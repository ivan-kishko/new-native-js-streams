import {log} from "util";

console.log('lesson 4');

// http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D
// https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/


// Task 01
// Создайте промис, который постоянно находиться в состоянии pending.
// В конструкторе промиса выведите в консоль сообщение "Promise is created".
const promise = new Promise((res, rej) => {
    console.log('Promise is created')
})
console.log(promise)


// Task 02
// Создайте промис, который после создания сразу же переходит в состояние resolve
// и возвращает строку 'Promise Data'
// Получите данные промиса и выведите их в консоль
const promise1 = Promise.resolve('Promise data')
promise1.then(res => {
    console.log(res)
})


// Task 03
// Создайте промис, который после создания сразу же переходит в состояние rejected
// и возвращает строку 'Promise Error'
// Получите данные промиса и выведите их в консоль
const promise2 = Promise.reject('Promise Error')
promise2.catch(err => {
    console.log(err)
})


// Task 04
// Создайте промис, который переходит в состояние resolved через 3с.
// (Используйте setTimeout)
// и возвращает строку 'Promise Data'
// Получите данные промиса и выведите их в консоль
const promise3 = new Promise(res => {
    setTimeout(() => {
        res('Promise Data')
    }, 3000)
})

promise3.then(res => {
    console.log(res)
})


// Task 05
// Создайте литерал объекта handlePromise со следующими свойствами:
// promise, resolve, reject, onSuccess, onError
// Проинициализируйте первые три свойства null,
// а последние два функциями, которые принимают один параметр и выводят
// в консоль сообщения: первая - `Promise is resolved with data: ${paramName}`
// вторая - `Promise is rejected with error: ${paramName}`
// Создайте три обработчика события click для кнопок "Create Promise", "Resolve Promise", "Reject Promise".
// Первый обработчик, создает промис, заполняет первые три свойства,
// описаного выше объекта: свойство promise получает новый созданный промис,
// свойства resolve и reject получают ссылки на соответствующие функции
// resolve и reject. Следующие два обработчика запускают методы resolve и reject.
type PromiseType = {
    promise: null | Promise<any>
    resolve: null | Function
    reject: null | Function
    onSuccess: (arg: string) => void
    onError: (arg: string) => void
}

export const handlePromise: PromiseType = {
    promise: null,
    resolve: null,
    reject: null,
    onSuccess(arg: string) {
        console.log(`Promise is resolved with data: ${arg}`)
    },
    onError(arg: string) {
        console.log(`Promise is rejected with error: ${arg}`)
    }
}

export const createPromise = () => {
    const newPromise = new Promise((res, rej) => {
        handlePromise.resolve = res
        handlePromise.reject = rej
    })
    handlePromise.promise = newPromise
    handlePromise.promise
        // shorthand
        // .then(handlePromise.onSuccess)
        // .catch(handlePromise.onError)
        .then(res => {
            handlePromise.onSuccess(res)
        })
        .catch(err => {
            handlePromise.onError(err)
        })
    console.log(handlePromise)
}

export const resolvePromise = () => {
    handlePromise.resolve && handlePromise.resolve('resolved')
}

export const rejectPromise = () => {
    handlePromise.reject && handlePromise.reject('rejected')
}


// Task 06
// Создайте промис, который через 1 с возвращает строку "My name is".
// Создайте функцию onSuccess, которая получает один параметр,
// прибавляет к нему Ваше имя и возвращает новую строку из функции
// Создайте функцию print, которая выводит в консоль значение своего параметра
// Добавьте два метода then и передайте созданные функции.

const namePromise = new Promise(res => {
    setTimeout(() => {
        res('My name is')
    }, 3000)
})

const onSuccess = (paramName: any) => {
    return `${paramName} Ivan`
}

const print = (param: any) => {
    console.log(param)
}

namePromise.then(res => {
    console.log(onSuccess(res))
})

namePromise.then(res => {
    print(res)
})

// Task 7
// Создайте три промиса. Первый промис возвращает объект { name: "Anna" } через 2с,
// второй промис возвращает объект {age: 16} через 3 с, а третий {city: ''} через 4с.
// Получите результаты работы промисов, объедините свойства объектов
// и выведите в консоль {name, age, city}
type NewObjType = {
    name: string | any
    age: number | any
    city: string | any
}
let newObj: NewObjType = {
    name: '',
    age: '',
    city: ''
}

const randomPromise1 = new Promise<{name: string}>(res => {
    setTimeout(() => {
        res({name: 'Anna'})
    }, 2000)
})

const randomPromise2 = new Promise<{age: number}>(res => {
    setTimeout(() => {
        res({age: 16})
    }, 3000)
})

const randomPromise3 = new Promise<{city: string}>(res => {
    setTimeout(() => {
        res({city: 'Minsk'})
    }, 4000)
})

randomPromise1.then(res => {
    newObj.name = res.name
})

randomPromise2.then(res => {
    newObj.age = res.age
})

randomPromise3.then(res => {
    newObj.city = res.city
    console.log(`${newObj.name} ${newObj.age} ${newObj.city}`)
})

// just a plug
export default () => {
};