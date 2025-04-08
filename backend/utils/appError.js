class AppError extends Error {
    constructor (message, statuscode){
        super(message, statuscode)

        this.status_code = statuscode
        this.status = `${statuscode}`.startsWith('4') ? 'fail' : 'error'
        this.messageRet = message

        Error.captureStackTrace(this, this.constructor)
    }
}

export default AppError