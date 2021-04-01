let homeColor = null
let visitorColor = null

const homeTeam = document.getElementById('event-home-team')
const visitorTeam = document.getElementById('event-visiting-team')
const comPort = document.getElementById('event-com-port');

const homeMascot = document.getElementById('event-home-mascot')
const visitorMascot = document.getElementById('event-visiting-mascot')

const homeLogo = document.getElementById('event-home-logo');
const homeLogoLabel = document.getElementById('event-home-logo-label');

const visitorLogo = document.getElementById('event-visitor-logo');
const visitorLogoLabel = document.getElementById('event-visitor-logo-label');

function homeColorSelector(button, color){
    Array.from(document.getElementsByClassName('home')).forEach(btn => {
        btn.classList.remove('selected')
    })

    button.classList.add('selected')

    homeColor = color

    return false
}

function visitorColorSelector(button, color){
    Array.from(document.getElementsByClassName('visitor')).forEach(btn => {
        btn.classList.remove('selected')
    })

    button.classList.add('selected')

    visitorColor = color

    return false
}

function UpdateHomeLogo() {
    if (homeLogo.files.length > 0) {
        let filename = homeLogo.files[0].name
        homeLogoLabel.innerText = `Selected ${filename}`
    }
    else {
        homeLogoLabel.innerText = 'Select a Home Logo...'
    }
}

homeLogo.onchange = UpdateHomeLogo

function UpdateVisitorLogo() {
    if (visitorLogo.files.length > 0) {
        let filename = visitorLogo.files[0].name
        visitorLogoLabel.innerText = `Selected ${filename}`
    }
    else {
        visitorLogoLabel.innerText = 'Select a Visitor Logo...'
    }
}

visitorLogo.onchange = UpdateVisitorLogo


function validateSetup() {
    let valid = true

    homeTeam.labels[0].classList.remove('red')
    if (homeColor == null) {
        valid = false
        homeTeam.labels[0].classList.add('red')
    }

    if (homeTeam.value.length == 0) {
        valid = false
        homeTeam.labels[0].classList.add('red')
    }

    if (homeMascot.value.length == 0) {
        valid = false
        homeTeam.labels[0].classList.add('red')
    }

    if (homeLogo.value.length == 0) {
        valid = false
        homeTeam.labels[0].classList.add('red')
    }

    visitorTeam.labels[0].classList.remove('red')
    if (visitorColor == null) {
        valid = false
        visitorTeam.labels[0].classList.add('red')
    }

    if (visitorTeam.value.length == 0) {
        valid = false
        visitorTeam.labels[0].classList.add('red')
    }

    if (visitorMascot.value.length == 0) {
        valid = false
        visitorTeam.labels[0].classList.add('red')
    }

    if (visitorLogo.value.length == 0) {
        valid = false
        visitorTeam.labels[0].classList.add('red')
    }

    comPort.labels[0].classList.remove('red')
    if (comPort.value.length == 0) {
        valid = false
        comPort.labels[0].classList.add('red')
    }

    return valid
}

function setup(e) {
    e.preventDefault()
    if (validateSetup()) {
        payload = new FormData()

        payload.append('home_team', homeTeam.value)
        payload.append('visitor_team', visitorTeam.value)

        payload.append('home_mascot', homeMascot.value)
        payload.append('visitor_mascot', visitorMascot.value)

        payload.append('home_color', homeColor)
        payload.append('visitor_color', visitorColor)

        payload.append('home_logo', homeLogo.files[0])
        payload.append('visitor_logo', visitorLogo.files[0])

        payload.append('com_port', comPort.value)

        // let u = new URL(window.location.href)
        // let key = u.searchParams.get('key') 

        fetch(`/init`, {
            method: 'POST',
            cache: 'no-cache',
            body: payload
        }).then(res => {
            window.location.href = `/overlay`
        })
    }
}

document.getElementById('event-form').onsubmit = setup