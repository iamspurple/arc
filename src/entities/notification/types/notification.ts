import { OrderCreateEntity } from "@/entities/order/types/order";
import { ContactWayType, StatusType } from "@/entities/order";

export type EmailSenderParams = {
	to: string;
	subject: string;
	message: string;
};

export type TelegramSenderParams = {
	message: string;
};

export type CreateTelegramTemplateForAdmin = {
	number: string;
	createdAt: string;
} & OrderCreateEntity;

export type EmailTemplateParam = {
	number: string;
} & OrderCreateEntity;
