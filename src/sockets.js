import io from 'socket.io-client';
const ENDPOINT = 'http://localhost:8080';
export default io(ENDPOINT);

// const url = "https://kevvlar.herokuapp.com/socket.io";
// const url = "https://kevvlar.herokuapp.com";
// const url = "http://localhost:8080";
