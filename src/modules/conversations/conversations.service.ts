import {
  BLOCKED_USERS_REPOSITORY,
  CONVERSATION_REPOSITORY,
  USERS_REPOSITORY,
} from 'src/constants';
import { Body, Inject, Injectable, Param } from '@nestjs/common';
import { User } from '../users/user.model';
import { Conversation } from './conversation.model';
import { BlockedUsers } from '../blocked-users/blocked-users.model';
import { Op } from 'sequelize';

import { NotAllowed } from '../blocked-users/errors/not-allowed';
import { ConversationNotFound } from './errors/conversation-not-found';
import { UserNotFound } from '../users/errors/user-not-found';
import { CannotCreateAConversationWithYourself } from './errors/cannot-create-a-conversation-with-yourself';
import { ConversationAlreadyExists } from './errors/conversation-already-exists';
import { UserAlreadyInConversation } from './errors/user-already-in-conversation';
import { UpdateNameDto } from './dto/UpdateNameDto';

@Injectable()
export class ConversationsService {
  constructor(
    @Inject(CONVERSATION_REPOSITORY)
    private conversationModel: typeof Conversation,
    @Inject(USERS_REPOSITORY)
    private userModel: typeof User,
    @Inject(BLOCKED_USERS_REPOSITORY)
    private blockedUserModel: typeof BlockedUsers,
  ) {}

  async getUserConversations(@Param('id') id: number) {
    const user = await this.userModel.findByPk(id);

    if (!user) throw new UserNotFound();

    const conversations = await user.$get('conversations' as keyof User, {
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'image'],
        },
      ],
    });

    if (!conversations) throw new ConversationNotFound();

    return conversations;
  }

  async show(
    @Param('user_id') user_id: number,
    @Param('conversation_id') conversation_id: number,
  ) {
    const user = await this.userModel.findByPk(user_id);

    const conversations = await user.$get('conversations' as keyof User, {
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'image', 'image_url'],
        },
      ],
      where: {
        id: conversation_id,
      },
    });

    if (!conversations) throw new ConversationNotFound();

    return conversations;
  }

  async create(
    @Param('user_creator_id') user_creator_id: number,
    @Param('user_invited_id') user_invited_id: number,
  ) {
    const user_creator = await this.userModel.findByPk(user_creator_id);
    const user_invited = await this.userModel.findByPk(user_invited_id);

    if (!user_creator || !user_invited) throw new UserNotFound();
    if (user_creator_id == user_invited_id)
      throw new CannotCreateAConversationWithYourself();

    const blockedUser = await this.blockedUserModel.findOne({
      where: {
        [Op.or]: [
          {
            UserId: user_creator_id,
            user_who_blocked_id: user_invited_id,
          },
          {
            UserId: user_invited_id,
            user_who_blocked_id: user_creator_id,
          },
        ],
      },
    });

    if (blockedUser) throw new NotAllowed();

    const hasConversation = await this.conversationModel.findOne({
      where: {
        [Op.or]: [
          {
            creator_id: user_creator_id,
            invited_id: user_invited_id,
            type: 'conversation',
          },
          {
            creator_id: user_invited_id,
            invited_id: user_creator_id,
            type: 'conversation',
          },
        ],
      },
    });

    if (hasConversation) throw new ConversationAlreadyExists();

    const participantsArray = [user_creator.id, user_invited.id];

    const conversation = await this.conversationModel.create({
      creator_id: user_creator_id,
      invited_id: user_invited_id,
      participants: participantsArray.toString(),
    });

    if (!conversation) throw new ConversationNotFound();

    await user_creator.$add('conversation', conversation);
    await user_invited.$add('conversation', conversation);

    return {
      message: `Nova conversa criada com ${user_creator.username} e ${user_invited.username}`,
      conversation,
    };
  }

  async addMoreUsersToConversation(
    @Param('conversation_id') conversation_id: number,
    @Param('user_id') user_id: number,
    @Param('users_id') ...users_id: number[]
  ) {
    const conversation = await this.conversationModel.findByPk(conversation_id);

    if (!conversation) throw new ConversationNotFound();

    const users = await this.userModel.findAll({
      where: { id: users_id },
    });

    if (!users) throw new UserNotFound();

    const replaced = conversation.participants.replaceAll('"', '');
    const conversationParticipantsArray = replaced.split(',');

    users.map(async (user) => {
      if (conversationParticipantsArray.includes(user.username)) {
        throw new UserAlreadyInConversation();
      }

      conversationParticipantsArray.push(user.id.toString());
    });

    const blockedUsersPromise = users.map(async (user) => {
      const blockedUser = await this.blockedUserModel.findOne({
        where: {
          [Op.or]: [
            {
              UserId: user.id,
              user_who_blocked_id: user_id,
            },
            {
              UserId: user_id,
              user_who_blocked_id: user.id,
            },
          ],
        },
      });

      if (blockedUser) throw new NotAllowed();
      return blockedUser;
    });

    await Promise.all(blockedUsersPromise);

    const conversationParticipantsString =
      conversationParticipantsArray.toString();

    await conversation.update(
      { type: 'Group', participants: conversationParticipantsString },
      { where: { type: 'Conversation' } },
    );

    conversation.$add('user', users);

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

    if (!conversation) throw new ConversationNotFound();

    const users = await this.userModel.findAll({
      where: { id: users_id },
    });

    if (!users) throw new UserNotFound();

    const replaced = conversation.participants.replaceAll('"', '');
    const conversationParticipantsArray = replaced.split(',');

    users.map((user) => {
      const index = conversationParticipantsArray.findIndex(
        (value) => value === user.username,
      );

      conversationParticipantsArray.splice(index, 1);
    });

    const conversationParticipantsString =
      conversationParticipantsArray.toString();

    await conversation.update({
      participants: conversationParticipantsString,
    });

    conversation.$remove('user', users);

    return {
      message: `Usuários removidos: ${users.map((user) => user.username)}`,
      conversation,
    };
  }

  async updateNameFromConversation(
    @Param('id') id: number,
    @Body() updateNameDto: UpdateNameDto,
  ) {
    const { name } = updateNameDto;
    const conversation = await this.conversationModel.findByPk(id);

    if (!conversation) throw new ConversationNotFound();

    const updatedConversation = await conversation.update({
      name,
    });

    return updatedConversation;
  }

  async delete(@Param('id') id: number) {
    const conversation = await this.conversationModel.findByPk(id);

    if (!conversation) throw new ConversationNotFound();

    await conversation.destroy();
  }
}
