let socket_io = io.connect('http://localhost:3000');
const chat = document.querySelector('.chat-form')
const Input = document.querySelector('.chat-input')

chat.addEventListener('submit', event => {
    event.preventDefault()
    Input.value = ''
})

function messageEntered() {
    console.log('uso');
    socket_io.emit('chat', 'test');
}