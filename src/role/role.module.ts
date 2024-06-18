import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission, Role } from '@app/models';

@Module({
  controllers: [RoleController],
  providers: [RoleService],
  imports: [
    TypeOrmModule.forFeature(
      [Role, Permission]
    ),
  ],
  exports: [RoleService]
})
export class RoleModule {}
