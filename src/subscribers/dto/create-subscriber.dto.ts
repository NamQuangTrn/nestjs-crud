import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateSubscriberDto {
  @IsNotEmpty({ message: 'email khong duoc de trong' })
  @IsEmail({}, { message: 'email khong dung dinh dang' })
  email: string;

  @IsNotEmpty({ message: 'ten khong duoc de trong' })
  name: string;

  @IsNotEmpty({ message: 'ten khong duoc de trong' })
  @IsArray({ message: 'skills phai co dang array' })
  @IsString({ each: true, message: 'skills la string' })
  skills: string;
}
