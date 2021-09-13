const status = document.getElementById('status')

const rawHomeScore = document.getElementById('raw-home-score')
const rawVisitorScore = document.getElementById('raw-visitor-score')
const rawHomeSets = document.getElementById('raw-home-sets')
const rawVisitorSets = document.getElementById('raw-visitor-sets')
const rawSet = document.getElementById('raw-set')

const toggleAlertOff = document.getElementById('toggle-alert-off')
const toggleAlertOn = document.getElementById('toggle-alert-on')
const toggleAlertModeHome = document.getElementById('toggle-alert-mode-home')
const toggleAlertModeVisitor = document.getElementById('toggle-alert-mode-visitor')
const toggleAlertModeNeutral = document.getElementById('toggle-alert-mode-neutral')
const alertInput = document.getElementById('alert-input')
const alertClear = document.getElementById('alert-clear')
const alertCredits = document.getElementById('credits')
const alertDisplay = document.getElementById('alert-display')
const alertPreview = document.getElementById('alert-preview')

const toggleDisplayLive = document.getElementById('toggle-display-live')
const toggleDisplayStart = document.getElementById('toggle-display-start')
const toggleDisplaySetScore = document.getElementById('toggle-display-set-score')
const toggleDisplayFinal = document.getElementById('toggle-display-final')

let statusObject = undefined

const socket = io()

socket.on('connect', () => {
    socket.emit('status-request', 'status')
})

function StatusUpdate() {
    SetAlertModeToggle(statusObject.alert_mode)
    SetAlertVisibilityToggle(statusObject.alert_visibility)
    alertPreview.innerText = statusObject.alert_text
    SetDisplayToggle(statusObject.display_mode)
}

function ClearAlertModeToggles() {
    toggleAlertModeHome.classList.remove('toggled')
    toggleAlertModeNeutral.classList.remove('toggled')
    toggleAlertModeVisitor.classList.remove('toggled')
}

function SetAlertModeToggle(newState) {
    ClearAlertModeToggles()
    switch (newState)
    {
        case "home":
            toggleAlertModeHome.classList.add('toggled')
            break
        case "visitor":
            toggleAlertModeVisitor.classList.add('toggled')
            break
        case "neutral":
            toggleAlertModeNeutral.classList.add('toggled')
            break
        default:
            break
    }
}

function AlertModeStatusChange(newState) {
    socket.emit('alert-mode-status', newState)
}

toggleAlertModeHome.onclick = () => {AlertModeStatusChange('home')}
toggleAlertModeVisitor.onclick = () => {AlertModeStatusChange('visitor')}
toggleAlertModeNeutral.onclick = () => {AlertModeStatusChange('neutral')}

function ClearAlertVisibilityToggles() {
    toggleAlertOff.classList.remove('toggled')
    toggleAlertOn.classList.remove('toggled')
}

function SetAlertVisibilityToggle(newState) {
    ClearAlertVisibilityToggles()
    switch (newState)
    {
        case "on":
            toggleAlertOn.classList.add('toggled')
            break
        case "off":
            toggleAlertOff.classList.add('toggled')
            break
        default:
            break
    }
}

function AlertVisibilityStatusChange(newState) {
    socket.emit('alert-visibility-status', newState)
}

toggleAlertOn.onclick = () => {AlertVisibilityStatusChange('on')}
toggleAlertOff.onclick = () => {AlertVisibilityStatusChange('off')}

alertClear.onclick = () => {alertInput.value = ''}
alertDisplay.onclick = () => {
    if (alertInput.value.length > 0)
    {
        socket.emit('alert-text-status', alertInput.value)
        alertInput.value = ''
    }
}
alertCredits.onclick = () => {
    if (alertInput.value.length > 0)
    {
        let creditLines = alertInput.value.split('*')
        let time = 0
        creditLines.forEach(line => {
            let credit = line.trim()
            if (credit.length > 0) {
                setTimeout(() => {
                    socket.emit('alert-text-status', credit)
                    setTimeout(() => {
                        socket.emit('alert-visibility-status', 'off')
                    }, 4500)
                }, time)
                time = time + 5000
            }
        })
    }
    alertInput.value = ''
}

function ClearDisplayToggles() {
    toggleDisplayLive.classList.remove('toggled')
    toggleDisplayStart.classList.remove('toggled')
    toggleDisplaySetScore.classList.remove('toggled')
    toggleDisplayFinal.classList.remove('toggled')
}

function SetDisplayToggle(newState) {
    ClearDisplayToggles()
    switch (newState)
    {
        case "live":
            toggleDisplayLive.classList.add('toggled')
            break
        case "start":
            toggleDisplayStart.classList.add('toggled')
            break
        case "sets":
            toggleDisplaySetScore.classList.add('toggled')
            break
        case "final":
            toggleDisplayFinal.classList.add('toggled')
            break
        default:
            break
    }
}

function DisplayStatusChange(newState) {
    socket.emit('display-mode-status', newState)
}

toggleDisplayLive.onclick = () => {DisplayStatusChange('live')}
toggleDisplayStart.onclick = () => {DisplayStatusChange('start')}
toggleDisplaySetScore.onclick = () => {DisplayStatusChange('sets')}
toggleDisplayFinal.onclick = () => {DisplayStatusChange('final')}