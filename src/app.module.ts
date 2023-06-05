import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { OtpService } from './service/otp.service';
import { OtpController } from './controller/otp.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env', // by default .env is read
    }),
  ],
  controllers: [AppController, OtpController],
  providers: [AppService, OtpService],
})
export class AppModule {}
