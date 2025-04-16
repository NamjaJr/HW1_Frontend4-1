//PHONE CHECKER

const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneResult = document.querySelector('#phone_result')

const regExp =/^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)){
        phoneResult.innerHTML = 'OK'
        phoneResult.style.color = 'green'
    }else {
        phoneResult.innerHTML = 'ERROR'
        phoneResult.style.color = 'red'
    }
}

//TAB SLIDER
const tabContentBlocks = document.querySelectorAll('.tab_content_block')
const tabContentItems = document.querySelectorAll('.tab_content_item')
const tabsParent = document.querySelector('.tab_content_items')
const hideTabContent = () => {
    tabContentBlocks.forEach((item) => {
        item.style.display = 'none'
    })
    tabContentItems.forEach(item => {
        item.classList.remove('tab_content_item_active')
    })
}

const showTabContent = (index = 0) => {
    tabContentBlocks[index].style.display = 'block'
    tabContentItems[index].classList.add('tab_content_item_active')
}

hideTabContent()
showTabContent(2)

tabsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')){
        tabContentItems.forEach((item,index) => {
            if (event.target === item){
                hideTabContent()
                showTabContent(index)
            }
        })
    }
}

let index = 0

const auto = () => {
    setInterval(() =>{
        index++
        if (index > tabContentItems.length - 1){
            index = 0
        }
        hideTabContent()
        showTabContent(index)
    },3000)
}
auto()


//CONVERTER

const somInput = document.querySelector('#som')
const usdInput = document.querySelector('#usd')
const krwInput = document.querySelector('#krw')


const converter = (element,targetElement,targetElement2) => {
    element.oninput = () => {
        const request = new XMLHttpRequest()
        request.open('GET','../data/converter.json')
        request.setRequestHeader('Content-type','application/json')
        request.send()

        request.onload = () => {
            const data = JSON.parse(request.response)
            if (element.id === "som") {
                targetElement.value = (element.value / data.usd).toFixed(2);
                targetElement2.value = (element.value / data.krw).toFixed(2);
            }
            if (element.id === "usd") {
                targetElement.value = (element.value * data.usd).toFixed(2);
                targetElement2.value = ((element.value * data.usd) / data.krw).toFixed(2);
            }
            if (element.id === "krw") {
                targetElement.value = (element.value * data.krw).toFixed(2);
                targetElement2.value = ((element.value * data.krw) / data.usd).toFixed(2);
            }
            if (element.value === "") {
                targetElement.value = "";
                targetElement2.value = "";
            }
        }
    }
}
converter(somInput,usdInput,krwInput)
converter(usdInput,somInput,krwInput)
converter(krwInput,somInput,usdInput)

