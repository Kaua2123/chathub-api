import { Inject, Injectable, Param } from '@nestjs/common';
import { CONVERSATION_REPOSITORY, USERS_REPOSITORY } from 'src/constants';
import { User } from '../users/user.model';
import { Conversation } from '../conversations/conversation.model';
import { UserNotFound } from '../users/errors/user-not-found';

@Injectable()
export class ImagesService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly userModel: typeof User,
    @Inject(CONVERSATION_REPOSITORY)
    private readonly conversationModel: typeof Conversation,
  ) {}

  async addUserImage(@Param('id') id: number, file: Express.Multer.File) {
    const user = await this.userModel.findByPk(id);

    if (!user) throw new UserNotFound();

    const updatedUser = await user.update(
      { image: file.filename },
      { where: { image: '' } },
    );

    return updatedUser;
  }
}
