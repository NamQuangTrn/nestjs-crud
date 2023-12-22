import { IsArray, IsBoolean, IsMongoId, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreateRoleDto {
  @IsNotEmpty({ message: 'name khong duoc de trong' })
  name: string;

  @IsNotEmpty({ message: 'description khong duoc de trong' })
  description: string;

  @IsNotEmpty({ message: 'isActive khong duoc de trong' })
  @IsBoolean({ message: 'isActive co dang boolean' })
  isActive: boolean;

  @IsNotEmpty({ message: 'permission khong duoc de trong' })
  @IsMongoId({ each: true, message: 'permission la mongo object id' })
  @IsArray({ message: 'permission phai co dang array' })
  permission: mongoose.Schema.Types.ObjectId[];
}
