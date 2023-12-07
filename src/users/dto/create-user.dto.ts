import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from 'class-validator';
import mongoose from 'mongoose';
class Company {
  @IsNotEmpty()
  _id: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  name: string;
}
export class CreateUserDto {
  @IsNotEmpty({ message: 'ten khong duoc de trong' })
  name: string;

  @IsEmail({}, { message: 'email khong dung dinh dang' })
  @IsNotEmpty({ message: 'email khong duoc de trong' })
  email: string;

  @IsNotEmpty({ message: 'mat khau khong duoc de trong' })
  password: string;

  @IsNotEmpty({ message: 'tuoi khong duoc de trong' })
  age: number;

  @IsNotEmpty({ message: 'gioi tinh khong duoc de trong' })
  gender: string;

  @IsNotEmpty({ message: 'dia chi khong duoc de trong' })
  address: string;

  @IsNotEmpty({ message: 'khong duoc de trong' })
  role: string;

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Company)
  company: Company;
}
export class RegisterUserDto {
  @IsNotEmpty({ message: 'ten khong duoc de trong' })
  name: string;

  @IsEmail({}, { message: 'email khong dung dinh dang' })
  @IsNotEmpty({ message: 'email khong duoc de trong' })
  email: string;

  @IsNotEmpty({ message: 'mat khau khong duoc de trong' })
  password: string;

  @IsNotEmpty({ message: 'tuoi khong duoc de trong' })
  age: number;

  @IsNotEmpty({ message: 'gioi tinh khong duoc de trong' })
  gender: string;

  @IsNotEmpty({ message: 'dia chi khong duoc de trong' })
  address: string;
}
