class ErrorMiddleware {
    static handleError(err, req, res, next) {
        const statusCode = err.statusCode || 500;
        const message = err.message || 'Internal Server Error';
        const details = err.details || null;

        res.status(statusCode).json({
            status: 'error',
            statusCode,
            message,
            details,
        });
    }

    static notFound(req, res, next) {
        res.status(404).json({
            status: 'error',
            statusCode: 404,
            message: 'Not Found',
        });
    }
}

module.exports = ErrorMiddleware;