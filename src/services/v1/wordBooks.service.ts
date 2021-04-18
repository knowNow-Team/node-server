import HttpException from '../../exceptions/HttpException';
import { resMessage, statusCode } from '../../utils';
import { WordBookDto } from '../../dtos/wordBooks.dto';
import { IWordBook } from '../../interfaces/wordBooks.interface';
import WordBookModel from '../../models/wordBooks.model';

const WORDBOOK = '단어장';

class WordBookService {
  public WordBookModel = new WordBookModel().getModel();

  public async findAllWordbook(userId: number): Promise<IWordBook[]> {
    const wordBooks: IWordBook[] = await this.WordBookModel.find({ userId });
    return wordBooks;
  }

  public async findWordbookById(wordbookId: string, userId: number): Promise<IWordBook> {
    const findWordBook = await this.WordBookModel.findOne({ _id: wordbookId, userId });
    if (!findWordBook) throw new HttpException(statusCode.NOT_FOUND, resMessage.NO_X(WORDBOOK));
    return findWordBook;
  }

  public async deleteWordbookData(wordbookId: string, userId: number): Promise<IWordBook> {
    const deleteWordBookById = await this.WordBookModel.findOneAndDelete({ _id: wordbookId, userId });
    if (!deleteWordBookById) throw new HttpException(statusCode.NOT_FOUND, resMessage.NO_X(WORDBOOK));

    return deleteWordBookById;
  }

  public async updateWordbook(wordbookId: string, userId: number, wordBookData: IWordBook): Promise<IWordBook> {
    const updateWordBookById = await this.WordBookModel.findOneAndUpdate(
      { _id: wordbookId, userId },
      { ...wordBookData },
    );
    if (!updateWordBookById) throw new HttpException(statusCode.NOT_FOUND, resMessage.NO_X(WORDBOOK));
    return updateWordBookById;
  }
}

export default WordBookService;
