import HttpException from '../../exceptions/HttpException';
import { resMessage, statusCode } from '../../utils';
import { WordbookDto } from '../../dtos/wordbooks.dto';
import { IWordbook } from '../../interfaces/wordbooks.interface';
import WordbookModel from '../../models/wordbooks.model';
import { IWord } from '../../interfaces/tests.interface';

const WORDBOOK = '단어장';

class WordbookService {
  public WordbookModel = new WordbookModel().getModel();

  public async findAllWordbook(userId: number): Promise<IWordbook[]> {
    const wordbooks: IWordbook[] = await this.WordbookModel.find({ owner: userId });
    return wordbooks;
  }

  public async findWordbookById(wordbookId: string, userId: number): Promise<IWordbook> {
    const findWordbook = await this.WordbookModel.findOne({ _id: wordbookId, owner: userId }).populate('words');
    if (!findWordbook) throw new HttpException(statusCode.NOT_FOUND, resMessage.NO_X(WORDBOOK));
    return findWordbook;
  }

  public async deleteWordbookData(wordbookId: string, userId: number): Promise<IWordbook> {
    const deleteWordbookById = await this.WordbookModel.findOneAndDelete({ _id: wordbookId, owner: userId });
    if (!deleteWordbookById) throw new HttpException(statusCode.NOT_FOUND, resMessage.NO_X(WORDBOOK));

    return deleteWordbookById;
  }

  public async updateWordbook(wordbookId: string, userId: number, wordbookData: IWordbook): Promise<IWordbook> {
    await this.WordbookModel.findOneAndUpdate({ _id: wordbookId, owner: userId }, { ...wordbookData });
    const updateWordbookById = await this.WordbookModel.findOne({ _id: wordbookId, owner: userId });
    if (!updateWordbookById) throw new HttpException(statusCode.NOT_FOUND, resMessage.NO_X(WORDBOOK));

    return updateWordbookById;
  }

  public async addWordbook(userId: number, wordbookData: WordbookDto): Promise<IWordbook> {
    const wordbooks: IWordbook = await this.WordbookModel.create({ ...wordbookData });
    return wordbooks;
  }
}

export default WordbookService;