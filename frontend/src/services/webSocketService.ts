class WebSocketService {
  socket: WebSocket | null;
  listeners: Function[];

  constructor() {
    this.socket = null;
    this.listeners = [];
  }

  connect(): void {
    this.socket = new WebSocket('ws://localhost:3000');

    this.socket.onopen = () => {
      console.log('WebSocket connection open');
    };

    this.socket.onmessage = (event) => {
      this.listeners.forEach(listener => listener(event.data));
    };

    this.socket.onerror = (error) => {
      console.error('Error WebSocket:', error);
    };

    this.socket.onclose = () => {
      console.log('WebSocket connection close');
    };
  }

  addListener(listener: Function): void {
    this.listeners.push(listener);
  }

  sendMessage(message: string): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      console.log('Sending message:', message);
      this.socket.send(message);
    } else {
      console.error('WebSocket connection is not open');
    }
  }

  close(): void {
    if (this.socket) {
      this.socket.close();
    }
  }
}

export default WebSocketService;