let landingPage = document.querySelector(".landing-page");
let backgroundOption = true
let yes = document.querySelector(".yes")
let no = document.querySelector(".no")
let backgroundInterval;
yes.onclick = () => {
    backgroundInterval = setInterval(() => {
        landingPage.style.backgroundImage = 'url("imgs/' + `${Math.ceil(Math.random() * 10)}.jpg` + '")';
    }, 1000)
}
no.onclick = () => {
    clearInterval(backgroundInterval);
    backgroundOption = false
}


let setting = document.querySelector(".setting")
let settingBox = document.querySelector(".setting-box")
setting.onclick = () => {
    settingBox.classList.toggle("open");
}


let mainColors = localStorage.getItem("color_option")
if (mainColors !== null) {
    document.documentElement.style.setProperty("--main-color", localStorage.getItem("color_option"))
}


const colorsList = document.querySelectorAll(".color-list li")
colorsList.forEach(li => {
    li.addEventListener("click", (e) => {
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color)
        document.querySelector(".yes").style.backgroundColor = e.target.dataset.color
        document.querySelector(".no").style.backgroundColor = e.target.dataset.color
        localStorage.setItem("color_option", e.target.dataset.color)
        handleActive(e)
    });
});

const randomBackEl = document.querySelectorAll(".random-bg span")
randomBackEl.forEach(span => {
    span.addEventListener("click", (ev1) => {
        handleActive(ev1)
    });
});


let ourSkills = document.querySelector(".skills")
window.onscroll = function () {
    let skillsOffsetTop = ourSkills.offsetTop;
    let skillsOuterHeight = ourSkills.offsetHeight;
    let windowHeight = this.innerHeight;
    let windowScrollTop = this.pageYOffset;
    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span")
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        })
    }
}


let ourGallery = document.querySelectorAll(".gallery img")
ourGallery.forEach(img => {
    img.addEventListener("click", (e) => {
        let overlay = document.createElement("div")
        overlay.className = "popup-overlay"
        document.body.appendChild(overlay)
        let popupBox = document.createElement("div")
        popupBox.className = "popup-box"
        if (img.alt !== null) {
            let imgHeading = document.createElement("h3")
            let imgText = document.createTextNode(img.alt)
            imgHeading.appendChild(imgText)
            popupBox.appendChild(imgHeading)
        }
        let popupImage = document.createElement("img")
        popupImage.src = img.src
        popupBox.appendChild(popupImage)
        document.body.appendChild(popupBox)
        let closeBtn = document.createElement("span")
        let closeBtnText = document.createTextNode("x")
        closeBtn.appendChild(closeBtnText)
        closeBtn.className = "close-button"
        popupBox.appendChild(closeBtn)
    })
})


document.addEventListener("click", function (e) {
    if (e.target.className == 'close-button') {
        e.target.parentNode.remove()
        document.querySelector(".popup-overlay").remove()
    }
})


let allBullets = document.querySelectorAll(".nav-bullets .bullet")
let allLinks = document.querySelectorAll(".links  a")

function scrollToSomeWhere(element) {
    element.forEach(ele => {
        ele.addEventListener("click", (e) => {
            e.preventDefault()
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth"
            })
        })
    })
}
scrollToSomeWhere(allBullets)
scrollToSomeWhere(allLinks)


function handleActive(ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active")
    })
    ev.target.classList.add("active");
}


let bulletsSpan = document.querySelectorAll(".bullets-option span")
let bulletsContainer = document.querySelector(".nav-bullets")
let bulletLocalItem = localStorage.getItem("bullets-option")
if (bulletLocalItem !== null) {
    bulletsSpan.forEach(span => {
        span.classList.remove("active")
    })
    if (bulletLocalItem === "block") {
        bulletsContainer.style.display = 'block'
        document.querySelector(".bullets-option .yes").classList.add("active")
    } else {
        bulletsContainer.style.display = 'none'
        document.querySelector(".bullets-option .no").classList.add("active")
    }
}
bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        if (span.dataset.display === 'show') {
            bulletsContainer.style.display = 'block'
            localStorage.setItem("bullet-option", "block")
        } else {
            bulletsContainer.style.display = 'none'
        }
        handleActive(e)
    })
})


document.querySelector(".reset-options").onclick = () => {
    // localStorage.clear();
    localStorage.removeItem("bullets-option")
    localStorage.removeItem("color_option")
    localStorage.removeItem("background_option")
    window.location.reload();
}


let toggleBtn = document.querySelector(".toggle-menu")
let tLinks = document.querySelector(".links")
toggleBtn.onclick = function (e) {
    e.stopPropagation()
    this.classList.toggle("menu-active")
    tLinks.classList.toggle("open")
}
document.addEventListener("click", (e) => {
    if (e.target !== toggleBtn && e.target !== tLinks) {
        if (tLinks.classList.contains("open")) {
            toggleBtn.classList.toggle("menu-active")
            tLinks.classList.toggle("open")
        }
    }
})

tLinks.onclick = function (e) {
    e.stopPropagation()
}