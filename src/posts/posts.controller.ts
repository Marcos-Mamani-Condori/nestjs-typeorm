import { Body, Controller, Get, Post } from '@nestjs/common';
import { createPostDto } from './dto/createPost.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor (
        private postsService: PostsService
    ){}
    @Post()
    createPost(
        @Body() post: createPostDto
    ){
        return this.postsService.createPost(post);
    }

    @Get()
    getPosts(){
        return this.postsService.getPosts()
    }
}
