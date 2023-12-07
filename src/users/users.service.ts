import { User } from './../decorator/customize';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User as UserM, UserDocument } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from './users.interface';
import aqp from 'api-query-params';
import { isEmpty } from 'class-validator';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserM.name) private userModel: SoftDeleteModel<UserDocument>,
  ) {}
  getHashPassword = (plainPassword: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(plainPassword, salt);
    return hash;
  };

  async create(createUserDto: CreateUserDto, @User() user: IUser) {
    const { name, email, age, gender, address, role, company } = createUserDto;
    const isExist = await this.userModel.findOne({ email });
    if (isExist) throw new BadRequestException(`email ${email} da ton tai`);
    const hashPassword = this.getHashPassword(createUserDto.password);
    let newUser = await this.userModel.create({
      name,
      email,
      age,
      gender,
      address,
      password: hashPassword,
      role,
      company,
      createdBy: {
        _id: user._id,
        email: user.email,
      },
    });
    return newUser;
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, projection, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;
    let { sort } = aqp(qs);
    let offset = (+currentPage - 1) * +limit;
    let defaultLimit = +limit ? +limit : 10;
    const totalItems = (await this.userModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);
    if (isEmpty(sort)) {
      // @ts-ignore: Unreachable code error
      sort = '-updatedAt';
    }
    const result = await this.userModel
      .find(filter)
      .skip(offset)
      .limit(defaultLimit)
      // @ts-ignore: Unreachable code error
      .sort(sort)
      .select('-password')
      .populate(population)
      .exec();

    return {
      meta: {
        current: currentPage,
        pageSize: limit,
        pages: totalPages,
        total: totalItems,
      },
      result,
    };
  }

  async findOne(id: string) {
    console.log(mongoose.Types.ObjectId.isValid(id));
    if (!mongoose.Types.ObjectId.isValid(id)) return `loi roi dcm`;
    return await this.userModel
      .findOne({
        _id: id,
      })
      .select('-password');
  }
  findOneByUsername(username: string) {
    return this.userModel.findOne({
      email: username,
    });
  }
  isValidPassword(password: string, hash: string) {
    return compareSync(password, hash);
  }

  async update(updateUserDto: UpdateUserDto, user: IUser) {
    const update = await this.userModel.updateOne(
      { _id: updateUserDto._id },
      {
        ...UpdateUserDto,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
    return update;
  }

  async remove(id: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) return `not found user`;
    await this.userModel.updateOne(
      { _id: id },
      { deletedBy: { _id: user._id, email: user.email } },
    );
    return this.userModel.softDelete({ _id: id });
  }
  async register(user: RegisterUserDto) {
    const { name, email, age, gender, address } = user;
    const isExist = await this.userModel.findOne({ email });
    if (isExist) throw new BadRequestException(`email ${email} da ton tai`);
    const hashPassword = this.getHashPassword(user.password);
    const newUserRegister = await this.userModel.create({
      name,
      email,
      password: hashPassword,
      age,
      gender,
      address,
      role: 'user',
    });

    return newUserRegister;
  }
  async updateUserToken(refreshToken: string, _id: string) {
    return await this.userModel.updateOne({ _id }, { refreshToken });
  }
  async findUserByToken(refreshToken: string) {
    return await this.userModel.findOne({ refreshToken });
  }
}
