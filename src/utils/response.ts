import { Response, ResponseContent } from "./models/response.model";


/**
 * Implementa un formato de respuesta para las operaciones realizadas.
 */
export default class ResponseOperation<T> {
    public success: boolean;
    public code: number;
    public content: ResponseContent;

    /**
     * Implementa formato de respuesta para las operaciones realizadas.
     * @param success Indica si el servicio fue éxitoso.
     * @param message Mensaje de respuesta de la operación.
     * @param code Código de respuesta de la operación.
     * @param data Almacena la información como resultado de la operación.
     */
    constructor(success: boolean, message: string, code: number,  data?: any) {
        this.success = success;
        this.code = code;
        this.content = {
            message,
            data
        };
    }

    public getResponse() {
        let response: Response
        if (!this.success) {
            response =  {
                success: this.success,
                code: this.code,
                content: {
                    message: this.content.message
                }
            };
        } else {
            response =  {
                success: this.success,
                code: this.code,
                content: {
                    message: this.content.message,
                    data: this.content.data
                }
            };
        }
        return response;
    }
}