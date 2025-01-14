import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true, // Automatically adds createdAt and updatedAt fields
})
export class BookCategory extends Document {
  @Prop({ required: true, unique: true }) // Add constraints for better data integrity
  categoryName: string;
}

export const BookCategorySchema = SchemaFactory.createForClass(BookCategory);
