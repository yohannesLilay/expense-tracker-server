import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

/** Services */
import { UsersService } from './users.service';
import { IsEmailUniqueValidator } from './entities/is-email-uniqe.validator';

/** Controllers */
import { UsersController } from './users.controller';

/** Schemas */
import { User, UserSchema } from './users.schema';

@Module({
  controllers: [UsersController],
  providers: [UsersService, IsEmailUniqueValidator],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  exports: [UsersService],
})
export class UsersModule {}
