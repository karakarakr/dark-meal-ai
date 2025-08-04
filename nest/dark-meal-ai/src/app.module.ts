import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AbcModule } from './abc/abc.module';
import { TestModule } from './test/test.module';
import { RecipesModule } from './recipes/recipes.module';
import { UsersModule } from './users/users.module';
import { AbcModule } from './abc/abc.module';

@Module({
  imports: [AbcModule, UsersModule, RecipesModule, TestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
