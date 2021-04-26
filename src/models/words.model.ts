import { model, Schema, Document, Model } from 'mongoose';
import { IWord, EWordClass } from '../interfaces/words.interface';

export default class WordModel {
  private model: Model<IWord & Document>;

  constructor() {
    const WordSchema: Schema = new Schema(
      {
        _id: { type: Schema.Types.ObjectId },
        word: { type: String, required: true },
        meaning: { type: [String], required: true },
        wordClass: { type: String, required: true, enum: Object.values(EWordClass) },
        phonics: { type: String, required: true },
        // pronounceVoicePath: { type: String, required: true },
      },
      {
        timestamps: true,
      },
    );
    this.model = model<IWord & Document>('Words', WordSchema);
  }
  public getModel(): Model<IWord & Document> {
    return this.model;
  }
}
