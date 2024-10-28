import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schemas';

export enum Category {
  ADVENTURE = 'Adventure',
  CLASSICS = 'Classics',
  CRIME = 'Crime',
  FANTASY = 'Fantasy',
}

@Schema({
  timestamps: true,
})
export class Book {
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  author: string;
  @Prop()
  price: string;
  @Prop()
  category: Category;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;
  @Prop()
   userName: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
