import { Module } from "@nestjs/common";
import { MyGateWay } from "./gateway";

@Module({
    providers: [MyGateWay],
    exports: [MyGateWay]
})

export class GatewayModule { }