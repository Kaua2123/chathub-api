import { CONVERSATION_REPOSITORY, USERS_REPOSITORY } from 'src/constants';
import { Inject, Injectable, Param } from '@nestjs/common';
import { User } from '../users/user.model';
import { Conversation } from './conversation.model';

@Injectable()
export class ConversationService {
  constructor(
    @Inject(CONVERSATION_REPOSITORY) // algo a ver com isso
    private conversationModel: typeof Conversation,
    @Inject(USERS_REPOSITORY)
    private userModel: typeof User,
  ) {}
  // ALGO ERRADO NA INJEÇAO DE DEPEMDEIMCIA (conversationModel)
  async getUserConversations(@Param('id') id: number) {
    const user = await this.userModel.findByPk(id);

    const conversations = await user.$get('conversations' as keyof User);

    return conversations;
  }

  async create(
    @Param('user_creator_id') user_creator_id: number,
    @Param('user_invited_id') user_invited_id: number,
  ) {
    console.log(this.conversationModel.create, Conversation.create);
    const conversation = await this.conversationModel.create();

    const user_creator = await this.userModel.findByPk(user_creator_id);
    const user_invited = await this.userModel.findByPk(user_invited_id);

    await user_creator.$add('conversation', conversation);
    await user_invited.$add('conversation', conversation);

    return {
      message: `New conversation created with ${user_creator.username} and ${user_invited.username}`,
      conversation,
    };
  }

  // receber 2 ou mais ids de usuarios que participaraão da conversa
  // ir adicionando eles na conversa com conversation.add
}
