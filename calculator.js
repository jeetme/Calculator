const inputBtn = document.querySelectorAll('.input-btn')
const displayBox = document.querySelector('.display-box')

inputBtn.forEach(button => {
    button.addEventListener('click', () => {
        append(button.dataset.value)
    })
})

function append(input) {
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
        displayBox.value = eval(displayBox.value)
    } catch (error) {
        displayBox.value = 'Error'
    }
}