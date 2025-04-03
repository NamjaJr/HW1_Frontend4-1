const gmailInput = document.querySelector('#gmail_input')
const gmailButton = document.querySelector('#gmail_button')
const gmailResult = document.querySelector('#gmail_result')

const regExp = /^[a-zA_Z0-9.+%-]+@gmail\.com$/

gmailButton.onclick = () => {
    if (regExp.test(gmailInput.value)){
        gmailResult.innerHTML = 'OK'
        gmailResult.style.color = 'green'
    }else {
        gmailResult.innerHTML = 'ERROR'
        gmailResult.style.color = 'red'
    }
}



const parentBlock = document.querySelector('.parent_block')
const childBlock = document.querySelector('.child_block')
let blockPosition = 0

const moveBlock = () => {
    blockPosition += 2
    childBlock.style.left =` ${blockPosition}px`
    if (blockPosition < parentBlock.clientWidth - childBlock.offsetWidth){
        requestAnimationFrame(moveBlock)
    }
}
moveBlock()