import socketIOClient from 'socket.io-client'

const socket = socketIOClient('ws://localhost:8000')

export default socket
