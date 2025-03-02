class WebSocketService {
  socket: WebSocket | null;
  listeners: { [key: string]: Array<(message: any) => void> };

  constructor() {
    this.socket = null;
    this.listeners = {};
  }

  connect(): void {
    this.socket = new WebSocket('ws://localhost:3000');

    this.socket.onopen = () => {
      console.log('WebSocket connection open');
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (this.listeners[data.type]) {
        this.listeners[data.type].forEach((callback) => callback(data.message));
      }
    };

    this.socket.onerror = (error) => {
      console.error('Error WebSocket:', error);
    };

    this.socket.onclose = () => {
      console.log('WebSocket connection closed');
    };
  }

  addListener(dataType: string, callback: (message: any) => void): void {
    if (!this.listeners[dataType]) {
      this.listeners[dataType] = [];
    }
    this.listeners[dataType].push(callback);
  }

  sendMessage(message: object): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      const jsonMessage = JSON.stringify(message);
      this.socket.send(jsonMessage);
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
