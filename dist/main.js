"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
require("./config/jwt.config");
const app_module_1 = require("./app.module");
const validation_pipe_1 = require("./pipes/validation.pipe");
const http_exception_filter_1 = require("./filter/http-exception.filter");
async function startMain() {
    const PORT = process.env.PORT || 5050;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalFilters(new http_exception_filter_1.GlobalExceptionFilter());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Todo API')
        .setVersion('1.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter JWT token',
        in: 'header'
    }, 'JWT-auth')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/swagger', app, document);
    app.useGlobalPipes(new validation_pipe_1.ValidationPipe());
    await app.listen(PORT, () => console.log(`Start back (${PORT}-port)`));
}
startMain();
//# sourceMappingURL=main.js.map