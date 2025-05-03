"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateData = validateData;
const http_status_codes_1 = require("http-status-codes");
const zod_1 = require("zod");
function validateData(schema) {
    return (req, res, next) => {
        try {
            schema
                .parseAsync(req.body)
                .then(() => next())
                .catch((error) => {
                if (error instanceof zod_1.ZodError) {
                    const errorMessages = error.errors.map((issue) => ({
                        message: `${issue.path.join('.')}: ${issue.message}`,
                    }));
                    res
                        .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                        .json({ error: 'Invalid data', details: errorMessages });
                }
                else {
                    res
                        .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                        .json({ error: 'Internal Server Error' });
                }
            });
        }
        catch (error) {
            res
                .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: 'Internal Server Error' });
        }
    };
}
//# sourceMappingURL=validationMiddleware.js.map