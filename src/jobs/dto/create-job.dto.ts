import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import mongoose from 'mongoose';
class Company {
  @IsNotEmpty()
  _id: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  logo: string;
}
export class CreateJobDto {
  @IsNotEmpty({ message: 'ten khong duoc de trong' })
  name: string;

  @IsNotEmpty({ message: 'skill khong duoc de trong' })
  @IsArray({ message: 'array khong dung dinh dang' })
  @IsString({ each: true, message: 'skill dinh dang string' })
  skills: string[];

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Company)
  company: Company;

  @IsNotEmpty({ message: 'location khong duoc de trong' })
  location: string;

  @IsNotEmpty({ message: 'salary khong duoc de trong' })
  salary: number;

  @IsNotEmpty({ message: 'soluong khong duoc de trong' })
  quantity: number;

  @IsNotEmpty({ message: 'trinh do khong duoc de trong' })
  level: string;

  @IsNotEmpty({ message: 'mo ta khong duoc de trong' })
  description: string;

  @IsNotEmpty({ message: 'ngay bat dau khong duoc de trong' })
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'dinh dang la date' })
  startDate: Date;

  @IsNotEmpty({ message: 'ngay ket thuc khong duoc de trong' })
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'dinh dang la date' })
  endDate: Date;

  @IsNotEmpty({ message: 'isactive khong duoc de trong' })
  @IsBoolean({ message: 'isActive phai co dinh dang la boolean ' })
  isActive: boolean;
}
