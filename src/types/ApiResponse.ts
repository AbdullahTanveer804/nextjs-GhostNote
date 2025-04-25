import { IMessage } from "@/models/userModel"

export interface IApiResponse {
    success: boolean
    message: string
    isAcceptingMessages?: boolean
    messages?: Array<IMessage>
}