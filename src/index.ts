import express from 'express';
import './utils/envs';
import helmet from 'helmet';
import ResponseOperation from './utils/response';
import { responseMessages } from './utils/constants/response.constant';
import { AppCodes } from './utils/enums/app-codes.enum'
import { Logger } from './utils/logger';
import { context } from './utils/constants/module.constant';
import { router } from './routes'
const app = express();
const port = process.env.PORT
const logger = new Logger()
app.set('trust proxy', true)
app.use(helmet())
app.get('/', async (req: express.Request, res: express.Response) => {
    logger.debug(context[process.env.LANGUAGE].APP, `${responseMessages[process.env.LANGUAGE].RES_API_GET}`)
    res.send(new ResponseOperation(true, responseMessages[process.env.LANGUAGE].RES_API_WORKING, AppCodes.COD_RESPONSE_SUCCESS))
    return
})
app.use('/api', router)
app.listen(port,()=> {
    logger.info(context[process.env.LANGUAGE].APP, `Server is running on ${process.env.URL}${port}`)
})