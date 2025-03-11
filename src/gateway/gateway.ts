import { OnModuleInit } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from "socket.io"

@WebSocketGateway({
    cors: {
        origin: "http://localhost:5173"

    }
})
export class MyGateWay implements OnModuleInit {

    @WebSocketServer()
    server: Server

    onModuleInit() {
        const userSocketMap = {}
        this.server.on('connection', (socket) => {
            const userId: string | undefined = Array.isArray(socket.handshake.query?.userId)
                ? socket.handshake.query?.userId[0] // Take the first element if it's an array
                : socket.handshake.query?.userId; // Use it directly if it's a string

            if (userId !== undefined) userSocketMap[userId] = socket.id

            this.server.emit("getOnlineUsers", Object.keys(userSocketMap))

            socket.on("disconnect", () => {
                console.log('disconnected', socket.id)
                if (userId !== undefined)
                    delete userSocketMap[userId]
                this.server.emit("getOnlineUsers", Object.keys(userSocketMap))
            })
        })
    }

    // @SubscribeMessage('getOnlineUsers')
    // onNewMessage(@MessageBody() body: any) {
    //     console.log(body, 'body')
    //     this.server.emit('onMessage', {
    //         msg: "New Message",
    //         content: body
    //     })
    // }


}