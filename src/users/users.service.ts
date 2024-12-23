import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from "./dto/create-user.dto";
import { updateUserDto } from './dto/update-user.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './profile.entity';
@Injectable()
export class UsersService {
    
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile> 
    ) {}
    
    createUser(User: CreateUserDto) {
    const userfound = this.userRepository.findOne({
        where: {
            username: User.username,
        }
    })
    if (userfound){
        return new HttpException('el usuario ya existe', HttpStatus.CONFLICT)    
    }
    const newUser = this.userRepository.create(User)
    return this.userRepository.save(newUser)
    }
    
    getUsers() {
        return this.userRepository.find({relations: ['posts', 'profile']})
    }

    getUser(id: number){
        return  this.userRepository.findOne({
            where: {id: id},
    relations: ['posts'],
        }
    )
    }

    DeleteUser(id: number) {
        return this.userRepository.delete({id: id})
    }
    updateUser(id: number, user: updateUserDto){
        return this.userRepository.update({id}, user)
    }
    async createProfile(id: number, profile: CreateProfileDto){
        const userFound = await this.userRepository.findOne({
            where: {id,}
        });
        if(!userFound){
            return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
        }

        const newProfile = this.profileRepository.create(profile)
        const savedProfile = await this.profileRepository.save(newProfile)

        userFound.profile = savedProfile;
        return this.userRepository.save(userFound);
    } 
}
