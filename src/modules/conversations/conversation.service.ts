import { CONVERSATION_REPOSITORY, USERS_REPOSITORY } from 'src/constants';
import { Inject, Injectable, Param } from '@nestjs/common';
import { User } from '../users/user.model';
import { Conversation } from './conversation.model';

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

    const conversations = await user.$get('conversations' as keyof User);

    return conversations;
  }

  async create(
    @Param('user_creator_id') user_creator_id: number,
    @Param('user_invited_id') user_invited_id: number,
  ) {
    const conversation = await this.conversationModel.create();

    const user_creator = await this.userModel.findByPk(user_creator_id);
    const user_invited = await this.userModel.findByPk(user_invited_id);

    await user_creator.$add('conversation', conversation);
    await user_invited.$add('conversation', conversation);

    return {
      message: `Nova conversa criada com ${user_creator.username} e ${user_invited.username}`,
      conversation,
    };
  }

  async addMoreUsersToConversation(
    @Param('conversation_id') conversation_id: number,
    @Param('users_id') ...users_id: number[]
  ) {
    const conversation = await this.conversationModel.findByPk(conversation_id);

    const users = await this.userModel.findAll({
      where: { id: users_id },
    });

    conversation.$add('user', users);

    await conversation.update(
      { type: 'Group' },
      { where: { type: 'Conversation' } },
    );

    return {
      message: `Usuários adicionados: ${users.map((user) => user.username)}`,
      conversation,
    };
  }

  async removeUsersFromConversation(
    @Param('conversation_id') conversation_id: number,
    @Param('users_id') ...users_id: number[]
  ) {
    const conversation = await this.conversationModel.findByPk(conversation_id);

    const users = await this.userModel.findAll({
      where: { id: users_id },
    });

    conversation.$remove('user', users);

    return {
      message: `Usuários removidos: ${users.map((user) => user.username)}`,
      conversation,
    };
  }
}
