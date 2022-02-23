import { NestFactory } from '@nestjs/core'; 
import { AppModule } from './app.module';
//Let's make it a NestExpressApplication
import { NestExpressApplication } from '@nestjs/platform-express';
//We need join to synthesize the directory path which will contain templates
import { join } from 'path';
//We need nunjucks as render engine 
import * as nunjucks from 'nunjucks';
async function bootstrap() {
//create a Nest application with Express under the hood
const app = await NestFactory.create<NestExpressApplication>(AppModule, );
  const express = app.getHttpAdapter().getInstance();
/*We also need to get directory name views (create it in project root directory),
which is the root directory for our template files*/ 
  const views = join(__dirname, '..', 'views');
  nunjucks.configure(views, { express })
const staticAssets = join(__dirname, '..', 'static'); 
app.useStaticAssets(staticAssets);
  await app.listen(3000); 
}
bootstrap();