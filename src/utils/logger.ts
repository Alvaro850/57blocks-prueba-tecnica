import moment from 'moment';
import colors from 'colors/safe'

export class Logger {
    error = (functionName: string, message: string) => {
        try {
            console.log(`[${colors.red("ERROR")}]`, `${colors.gray(moment().format("MMMM Do YYYY, h:mm:ss a"))} - [${colors.red(functionName)}]: ${colors.red(message)}`)
        } catch (error) {
            console.log(error)
            throw new Error(error.message);
        }
    }
    info = (functionName: string, message: string) => {
        try {
            console.log(`[${colors.blue("INFO")}]`, `${colors.gray(moment().format("MMMM Do YYYY, h:mm:ss a"))} - [${colors.blue(functionName)}]: ${colors.blue(message)}`)
        } catch (error) {
            console.log(error)
            throw new Error(error.message);
        }
    }
    debug = (functionName: string, message: string) => {
        try {
            console.log(`[${colors.green("DEBUG")}]`, `${colors.gray(moment().format("MMMM Do YYYY, h:mm:ss a"))} - [${colors.green(functionName)}]: ${colors.green(message)}`)
        } catch (error) {
            console.log(error)
            throw new Error(error.message);
        }
    }
}