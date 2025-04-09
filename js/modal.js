//MODAl WINDOW
const modal = document.querySelector('.modal')
const modalOpenButton = document.querySelector('#btn-get')
const modalCloseButton = document.querySelector('.modal_close')
const openModal = () => {
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden'
    window.removeEventListener('scroll',scrollEnd)
}

const closeModal = () => {
    modal.style.display = 'none'
    document.body.style.overflow = ''
}

modalOpenButton.onclick =  openModal
modalCloseButton.onclick =  closeModal

modal.onclick = (event) => {
    if (event.target === modal){
        closeModal()
    }
}

const autoModal = () => {
    setInterval(() => {
        if (modal.style.display !== 'block'){
            openModal()
        }
    },10000)
}
autoModal()

const scrollEnd = () => {
    if (window.innerHeight + window.scrollY > document.body.offsetHeight){
        openModal()
    }
}
window.addEventListener('scroll',scrollEnd)