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
let positionX = 0,positionY = 0

const maxWidth =  parentBlock.clientWidth - childBlock.clientWidth
const maxHeight =  parentBlock.clientHeight - childBlock.clientHeight

let moveRight = maxWidth
let moveTop = maxHeight

const moveBlock = () => {
    if (positionX < maxWidth){
        positionX += 2
        childBlock.style.left = `${positionX}px`
        requestAnimationFrame(moveBlock)
    }else if(positionX >= maxWidth && positionY < maxHeight){
        positionY += 2
        childBlock.style.top = `${positionY}px`
        requestAnimationFrame(moveBlock)
    }else if(positionY >= maxHeight && moveRight > 0){
        moveRight -= 2
        childBlock.style.left = `${moveRight}px`
        requestAnimationFrame(moveBlock)
    }else if (moveRight <= 0 && moveTop > 0){
        moveTop -= 2
        childBlock.style.top = `${moveTop}px`
        requestAnimationFrame(moveBlock)
    }else if(moveTop <= 0){
        positionY = 0
        positionX = 0
        moveRight = maxWidth
        moveTop = maxHeight
        requestAnimationFrame(moveBlock)
    }


}
moveBlock()



const seconds = document.querySelector('#seconds')

const start = document.querySelector('#start')
const stop = document.querySelector('#stop')
const reset = document.querySelector('#reset')

let timer;
let count = 0

start.onclick = () => {
    if (!timer){
        timer = setInterval(() => {
            count += 1
            seconds.innerHTML = count
        },1000)
    }
}

stop.onclick = () => {
    clearInterval(timer)
    timer = 0
}

reset.onclick = () => {
    clearInterval(timer)
    timer = null
    count = 0
    seconds.innerHTML = count
};

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
