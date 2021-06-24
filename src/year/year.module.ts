import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Year } from './entities/year.entity';
import { YearController } from './year.controller';
import { YearService } from './year.service';

@Module({
  imports: [TypeOrmModule.forFeature([Year])],
  controllers: [YearController],
  providers: [YearService],
})
export class YearModule {}
