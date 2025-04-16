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

const maxWidth = parentBlock.clientWidth - childBlock.clientWidth
const maxHeight = parentBlock.clientHeight - childBlock.clientHeight

let x = Math.random() * maxWidth
let y = Math.random() * maxHeight

let dx = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? 1 : -1)
let dy = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? 1 : -1)

let angle = 0

const moveWingman = () => {
    x += dx
    y += dy

    if (x <= 0 || x >= maxWidth) {
        dx *= -1
        randomizeDirection()
    }
    if (y <= 0 || y >= maxHeight) {
        dy *= -1
        randomizeDirection()
    }


    if (Math.random() < 0.01) {
        randomizeDirection()
    }

    childBlock.style.left = `${x}px`
    childBlock.style.top = `${y}px`

    angle = Math.atan2(dy, dx) * (30 / Math.PI)
    childBlock.style.transform = `rotate(${angle}deg)`

    requestAnimationFrame(moveWingman)
}

function randomizeDirection() {
    dx += (Math.random() - 0.5) * 1
    dy += (Math.random() - 0.5) * 1
}

moveWingman()





const progress = document.querySelector('#progress')
const start = document.querySelector('#start')
const stop = document.querySelector('#stop')
const reset = document.querySelector('#reset')

let timer;
let percentage = 0

start.onclick = () => {
    if (!timer){
        timer = setInterval(() => {
            if (percentage < 100) {
                percentage += 1
                progress.style.width = `${percentage}%`
                progress.innerHTML = `${percentage}%`
            } else {
                clearInterval(timer)
                timer = null
            }
        }, 100)
    }
}

stop.onclick = () => {
    clearInterval(timer)
    timer = null
}

reset.onclick = () => {
    clearInterval(timer)
    timer = null
    percentage = 0
    progress.style.width = `0%`
    progress.innerHTML = `0%`
}

//ANY REQUEST
const anyRequest = new XMLHttpRequest()

anyRequest.open('GET','../data/any.json')
anyRequest.setRequestHeader('Content-type','application/json')
anyRequest.send()

anyRequest.onload = ()  => {
    if (anyRequest.status >= 200 && anyRequest.status < 300){
        const data = JSON.parse(anyRequest.response)
        console.log(data.name)
        console.log(data.age)
        console.log(data.position)
        console.log(data.teams)
    }else {
        console.log('ERROR')
    }

}

//CHARACTERS REQUEST

const characters = document.querySelector('.characters-list')
const personRequest = new XMLHttpRequest()
personRequest.open('GET', '../data/characters.json')
personRequest.setRequestHeader('Content-type', 'application/json')
personRequest.send()

personRequest.onload = () => {
    const objectPerson = JSON.parse(personRequest.response)
    objectPerson.forEach((person) => {
        const personCard = document.createElement('div')
        personCard.setAttribute('class', 'person-card')
        personCard.innerHTML = `
            <div class="person-photo">
                <img src="${person.photo}" alt="${person.name}" class="person-img">  
            </div>
            <h2 class="person-name">${person.name}</h2>
            <span class="person-age">Возраст: ${person.age} </span>
            <h3 class="person-universe">Вселенная: ${person.universe}</h3>
        `
        characters.append(personCard)
    })
}
