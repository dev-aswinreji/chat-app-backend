import { OnModuleInit } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from "socket.io"

@WebSocketGateway({
    cors: {
        origin: "https://himitsu.vercel.app",
    },
})
export class MyGateWay implements OnModuleInit {

    @WebSocketServer()
    server: Server
    private userSocketMap: Record<string, string> = {}

    onModuleInit() {
        this.server.on('connection', (socket) => {
            console.log('connected socket')
            const userId: string | undefined = Array.isArray(socket.handshake.query?.userId)
                ? socket.handshake.query?.userId[0] // Take the first element if it's an array
                : socket.handshake.query?.userId; // Use it directly if it's a string

            if (userId !== undefined) this.userSocketMap[userId] = socket.id

            this.server.emit("getOnlineUsers", Object.keys(this.userSocketMap))

            socket.on("disconnect", () => {
                if (userId !== undefined)
                    delete this.userSocketMap[userId]
                this.server.emit("getOnlineUsers", Object.keys(this.userSocketMap))
            })
        })
    }

    // @SubscribeMessage('getOnlineUsers')
    // onNewMessage(@MessageBody() body: any) {
    //     this.server.emit('onMessage', {
    //         msg: "New Message",
    //         content: body
    //     })
    // }
    getReceiverSocketId(receiverId: string, newMessage: any) {
        const receiverSocketId = this.userSocketMap[receiverId]
        if (receiverSocketId)
            this.server.to(receiverSocketId).emit("newMessage", newMessage)
    }

}
