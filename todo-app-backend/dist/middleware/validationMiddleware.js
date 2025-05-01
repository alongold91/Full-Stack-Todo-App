"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateData = validateData;
const http_status_codes_1 = require("http-status-codes");
const zod_1 = require("zod");
// Update the parameter type to be more inclusive
function validateData(schema) {
    return (req, res, next) => {
        try {
            // Since you have async refinements, you should use parseAsync
            schema.parseAsync(req.body)
                .then(() => next())
                .catch((error) => {
                if (error instanceof zod_1.ZodError) {
                    const errorMessages = error.errors.map((issue) => ({
                        message: issue.message
                    }));
                    res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: 'Invalid data', details: errorMessages });
                }
                else {
                    res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
                }
            });
        }
        catch (error) {
            // This catch block handles synchronous errors that might occur before parseAsync
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
        }
    };
}
