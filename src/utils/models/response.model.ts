export class Response {
    success: boolean
    code: number
    content: ResponseContent
}

export class ResponseContent {
    data?: any
    message: string
}