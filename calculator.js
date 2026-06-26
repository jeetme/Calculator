const inputBtn = document.querySelectorAll('.input-btn')
const displayBox = document.querySelector('.display-box')

inputBtn.forEach(button => {
    button.addEventListener('click', event => {
        event.preventDefault()
        append(button.dataset.value)
        button.blur()
    })
})

const allowedKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "+", "-", "*", "/", "(", ")", ".", "Enter", "Backspace", "Delete", "ArrowLeft", "ArrowRight", "c", "C"]

document.addEventListener('keydown', event => {
    if(!allowedKeys.includes(event.key)) {
        event.preventDefault()
        return
    }

    if(event.key === "Enter") {
        calculate()
        return
    }

    if(event.key === "C" || event.key === "c") {
        event.preventDefault()
        clearAll()
        return
    }

    if("1234567890+-/*().".includes(event.key)) {
        event.preventDefault()
        append(event.key)
    }

    if(document.activeElement !== displayBox) {
        displayBox.focus()
        const len = displayBox.value.length
        displayBox.setSelectionRange(len, len)
    }
})

function append(input) {
    if(displayBox.value === 'Error') {
        displayBox.value = ''
    }

    const lastChar = displayBox.value.at(-1)
    if(lastChar === ")" && (input === "(" ||  !isNaN(input))) {
        displayBox.value += '*'
    }
    if(!isNaN(displayBox.value.at(-1)) && input === "(") {
        displayBox.value += '*'
    }
    
    displayBox.value += input
}

function pop() {
    displayBox.value = displayBox.value.slice(0, -1)
}

function clearAll() {
    displayBox.value = ''
}

function calculate() {
    try {
        if(displayBox.value === '') {
            return
        }
        displayBox.value = eval(displayBox.value)
    } catch (error) {
        displayBox.value = 'Error'
    }
}