import { CONVERSATION_REPOSITORY, USERS_REPOSITORY } from 'src/constants';
import { Conversation } from './conversation.model';
import { Inject, Injectable, Param } from '@nestjs/common';
import { User } from '../users/user.model';

@Injectable()
export class ConversationService {
  constructor(
    @Inject(CONVERSATION_REPOSITORY)
    private conversationModel: typeof Conversation,
    @Inject(USERS_REPOSITORY)
    private userModel: typeof User,
  ) {}

  async getUserConversations(@Param('id') id: number) {
    const user = await this.userModel.findByPk(id);

    console.log(user);

    const conversations = await user.$get('conversations' as keyof User);

    return conversations;
  }
}
