
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
    if (!allowedKeys.includes(event.key)) {
        event.preventDefault()
        return
    }

    if (displayBox.value === 'Error') {
        displayBox.value = ''
    }

    if (event.key === "Enter") {
        calculate()
        return
    }

    if (event.key === "C" || event.key === "c") {
        event.preventDefault()
        clearAll()
        return
    }

    if (document.activeElement !== displayBox) {
        displayBox.focus()
        const len = displayBox.value.length
        displayBox.setSelectionRange(len, len)
    }
})

function append(input) {
    if (displayBox.value === 'Error') {
        displayBox.value = ''
    }

    displayBox.value += input
}

function clearAll() {
    displayBox.value = ''
}

function calculate() {
    try {
        if (displayBox.value === '') {
            return
        }
        const finalExp = displayBox.value.replace(/(\d)\(/g, '$1*(').replace(/\)\(/g, ')*(')
        displayBox.value = eval(finalExp)
    } catch (error) {
        displayBox.value = 'Error'
    }
}