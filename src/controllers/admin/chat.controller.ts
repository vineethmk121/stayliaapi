import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { makeApiResponce } from '../../libraries/responce';
import chatModel from '../../models/admin/chat.model';
import conversationModel from '../../models/admin/conversaion.model';
import conversationData from '../../libraries/interfaces';
import chatData from '../../libraries/interfaces';
export default {
    async getConversation(req: Request, res: Response, next: NextFunction) {
        try {
            let message: conversationData = await conversationModel
                .find({ $or: [{ loginId: req.body.loginId }, { receiverId: req.body.loginId }] })
                .populate('loginId')
                .populate('receiverId')
                .lean();
            if (message) {
                let result = makeApiResponce('Operation successfully', 1, StatusCodes.OK, message);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async getAllMessage(req: Request, res: Response, next: NextFunction) {
        try {
            let message: chatData['message'] = await chatModel.find({ conversationId: req.body.conversationId }).populate('senderId', ['-password']).populate('receiverId', ['-password']);
            if (!message) {
                let result = makeApiResponce('No message', 1, StatusCodes.OK, message);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            } else {
                let result = makeApiResponce('Operation Successfully', 1, StatusCodes.OK, message);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async sendMsg(req: any, res: Response, next: NextFunction) {
        try {
            let message: conversationData['message'] = await conversationModel
                .find({ $or: [{ $and: [{ loginId: req.body.loginId }, { receiverId: req.body.receiverId }] }, { $and: [{ loginId: req.body.receiverId }, { receiverId: req.body.loginId }] }] })
                .populate('senderId', ['-password'])
                .populate('receiverId', ['-password'])
                .lean();
            if (message.length > 0) {
                const getConversationId = message[0]._id;
                let getId = getConversationId;
                const sendMessage = new chatModel(req.body);
                sendMessage.senderId = req.body.loginId;
                sendMessage.conversationId = getId;
                await sendMessage.save();
                let result = makeApiResponce('Operation Successfully', 1, StatusCodes.OK, message);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            } else {
                const conversation = new conversationModel(req.body);
                conversation.lastMessage = req.body.message;
                await conversation.save();
                let getId = conversation._id;
                const sendMessage = new chatModel(req.body);
                sendMessage.senderId = req.body.loginId;
                sendMessage.conversationId = getId;
                await sendMessage.save();
                return res.json(sendMessage);
            }
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async messageCounter(req: Request, res: Response, next: NextFunction) {
        try {
            let message: chatData['message'] = await chatModel
                .find({ conversationId: req.body.conversationId })
                .populate('senderId', ['-password'])
                .populate('receiverId', ['-password'])
                .count()
                .lean();
            if (!message) {
                let result = makeApiResponce('No message', 1, StatusCodes.OK, message);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            } else {
                let result = makeApiResponce('Operation Successfully', 1, StatusCodes.OK, message);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    }
};
