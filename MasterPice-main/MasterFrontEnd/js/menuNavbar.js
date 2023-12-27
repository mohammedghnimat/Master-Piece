const btnOpen = document.getElementById('btn-nav-open')
const btnClose = document.getElementById('close-nav')
const navbar = document.getElementById('navbar')
btnOpen.addEventListener('click' , ()=>{
    navbar.style.display = "block"
    btnOpen.style.display = "none"
})
btnClose.addEventListener('click' , ()=>{
    navbar.style.display = "none"
    btnOpen.style.display = "block"
})