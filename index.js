"use strict";

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

function log(param) {
    console.log(param)
}

const calculator = $('.calculator')
const keys = $('.calculator__keys')
const display = $('.calculator__display')

keys.addEventListener('click', e => {
    if (e.target.matches('button')){
        const key = e.target
        const action = key.dataset.action
        const keyContent = key.textContent
        const displayNumber = display.textContent
        let lastChar = displayNumber.charAt(displayNumber.length - 1)

        if(!action) {
            //log('number key!')
            
            if (displayNumber === '0') {
                display.textContent = keyContent
            } else {
                display.textContent = displayNumber + keyContent
            }
        }

        if(
            action === 'add' ||
            action === 'subtract'||
            action === 'multiply' ||
            action === 'divide'
        ) {
            //log('Operator!')
            display.textContent = displayNumber + keyContent
            if(lastChar === '+' || lastChar === '-' || lastChar === 'x' || lastChar === '÷') {
                let newDisplayNumber = displayNumber.substring(0, displayNumber.length - 1) + keyContent
                display.textContent = newDisplayNumber
            }
        }
        

        if(action === 'decimal') {
            //log('Decimal key')
            display.textContent = displayNumber + '.'
        }

        if(action === 'clear') {
            //log('Clear key')
            display.textContent = '0'
        }

        if(action === 'calculate') {
            //log('Calculate key')
            let inputString = display.textContent
            let numbers = inputString.split(/\+|\-|\x|\÷/g)
            let operators = inputString.replace(/[0-9]|\./g, '').split('')

            let divide = operators.indexOf('÷')
            while (divide != -1) {
                numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1])
                operators.splice(divide, 1)
                divide = operators.indexOf('÷')
            }
            
            let multiply = operators.indexOf('x')
            while (multiply != -1) {
                numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1])
                operators.splice(multiply, 1)
                multiply = operators.indexOf('x')
            }

            let subtract = operators.indexOf('-')
            while (subtract != -1) {
                numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1])
                operators.splice(subtract, 1)
                subtract = operators.indexOf('-')
            }

            let add = operators.indexOf('+')
            while (add != -1){
                numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]))
                operators.splice(add, 1)
                add = operators.indexOf('+')
            }

            display.textContent = Math.round(Number(numbers[0]) * 10000000000) / 10000000000
            

        }

    }
})

