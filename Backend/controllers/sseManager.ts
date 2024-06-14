interface SSEConnection {
    [userCode: string]: (data: any) => void;
}

class SSEManager {
    private connections: SSEConnection = {};

    public addConnection(userCode: string, sendSSE: (data: any) => void) {
        this.connections[userCode] = sendSSE;
        console.log(`${userCode} connected`);
    }

    public removeConnection(userCode: string) {
        delete this.connections[userCode];
        console.log(`${userCode} disconnected`);
    }

    public notify(userCode: string, message: string) {
      console.log(this.connections)
        if (this.connections[userCode]) {
            this.connections[userCode](message);
        }
    }
}

export default new SSEManager();
