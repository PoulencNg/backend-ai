const express = require('express');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017/bookstore_books';
const TelegramBot = require('node-telegram-bot-api');
const token = '7268145020:AAHiBhdjeuAn7j0KtboaBIFLo4NkxK3fajI';
const bot = new TelegramBot(token, { polling: true });
const app = express();
const port = 3000;
const client = new MongoClient(url);
const db = 'bookstore_books';
const collection = 'books';

const userStates = {};
app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});

//Connect MongoDB
async function setupCountersCollection() {
    const client = new MongoClient(url);

    try {
        await client.connect(); // Kết nối tới MongoDB
        console.log('Connected to MongoDB');
        const dbName = 'bookstore_books';

        const db = client.db(dbName); // Khởi tạo `db` sau khi kết nối thành công

        // Tạo collection nếu chưa tồn tại
        await db.createCollection('counters');

        // Kiểm tra nếu tài liệu đã tồn tại
        const counter = await db
            .collection('counters')
            .findOne({ _id: 'book_id' });
        if (!counter) {
            // Nếu không tồn tại, thêm tài liệu khởi tạo
            await db
                .collection('counters')
                .insertOne({ _id: 'book_id', seq: 0 });
            console.log('Inserted initial counter document');
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close(); // Đảm bảo đóng kết nối sau khi thực hiện xong
    }
}
setupCountersCollection().catch(console.dir);


function getNextSequence(name) {
    const db = 'bookstore_books';

    const ret = db.counters.findAndModify(
      {
        query: { _id: name },
        update: { $inc: { seq: 1 } },
        new: true
      }
    );
    return ret.seq;
  }
  getNextSequence();
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    status: String,
});
const Book = mongoose.model('Book', bookSchema);

// Book.insertMany([
//     { title: 'Đắc nhân tâm', author: 'Dale Carnegie', status: 'Còn trống' },
//     {
//         title: 'Nhà giả kim',
//         author: 'Paulo Coelho',
//         status: 'Đã có người thuê',
//     },
//     {
//         title: 'Harry Potter và Hòn đá Phù thủy',
//         author: 'J.K. Rowling',
//         status: 'Còn trống',
//     },
//     {
//         title: 'Cuộc sống bí mật của Walter Mitty',
//         author: 'James Thurber',
//         status: 'Còn trống',
//     },
//     {
//         title: 'Lược sử thời gian',
//         author: 'Stephen Hawking',
//         status: 'Đã có người thuê',
//     },
//     {
//         title: 'Trăm năm cô đơn',
//         author: 'Gabriel García Márquez',
//         status: 'Còn trống',
//     },
//     {
//         title: 'Chiến tranh và hòa bình',
//         author: 'Leo Tolstoy',
//         status: 'Còn trống',
//     },
//     { title: 'Bố già', author: 'Mario Puzo', status: 'Đã có người thuê' },
//     { title: 'Kẻ sát nhân mù', author: 'Margaret Atwood', status: 'Còn trống' },
//     { title: 'Đồi gió hú', author: 'Emily Brontë', status: 'Còn trống' },
//     {
//         title: 'Phía đông vườn địa đàng',
//         author: 'John Steinbeck',
//         status: 'Đã có người thuê',
//     },
//     { title: 'Mật mã Da Vinci', author: 'Dan Brown', status: 'Còn trống' },
//     {
//         title: 'Chuyện người tù',
//         author: 'Aleksandr Solzhenitsyn',
//         status: 'Còn trống',
//     },
//     {
//         title: 'Anh em nhà Karamazov',
//         author: 'Fyodor Dostoevsky',
//         status: 'Còn trống',
//     },
//     {
//         title: 'Tội ác và hình phạt',
//         author: 'Fyodor Dostoevsky',
//         status: 'Đã có người thuê',
//     },
//     {
//         title: 'Chúa tể của những chiếc nhẫn',
//         author: 'J.R.R. Tolkien',
//         status: 'Còn trống',
//     },
//     {
//         title: 'Người tình Sputnik',
//         author: 'Haruki Murakami',
//         status: 'Đã có người thuê',
//     },
//     {
//         title: 'Bắt trẻ đồng xanh',
//         author: 'J.D. Salinger',
//         status: 'Còn trống',
//     },
//     {
//         title: 'Hoàng tử bé',
//         author: 'Antoine de Saint-Exupéry',
//         status: 'Còn trống',
//     },
//     {
//         title: 'Mặt trời cũng mọc',
//         author: 'Ernest Hemingway',
//         status: 'Đã có người thuê',
//     },
//     { title: 'Kẻ xa lạ', author: 'Albert Camus', status: 'Còn trống' },
//     { title: 'Đồi thỏ', author: 'Richard Adams', status: 'Còn trống' },
//     {
//         title: 'Chuyện dài bất tận',
//         author: 'Michael Ende',
//         status: 'Đã có người thuê',
//     },
//     {
//         title: 'Nghệ thuật yêu đương',
//         author: 'Erich Fromm',
//         status: 'Còn trống',
//     },
//     {
//         title: 'Cái chết của Ivan Ilyich',
//         author: 'Leo Tolstoy',
//         status: 'Còn trống',
//     },
//     { title: 'Lolita', author: 'Vladimir Nabokov', status: 'Đã có người thuê' },
//     { title: '1984', author: 'George Orwell', status: 'Còn trống' },
//     {
//         title: 'Thiên thần và ác quỷ',
//         author: 'Dan Brown',
//         status: 'Đã có người thuê',
//     },
//     {
//         title: 'Tâm lý học đám đông',
//         author: 'Gustave Le Bon',
//         status: 'Còn trống',
//     },
//     { title: 'Sóng ngầm', author: 'Susanna Kaysen', status: 'Còn trống' },
//     {
//         title: 'Khế ước xã hội',
//         author: 'Jean-Jacques Rousseau',
//         status: 'Đã có người thuê',
//     },
//     {
//         title: 'Sự thật về vụ án',
//         author: 'Haruki Murakami',
//         status: 'Còn trống',
//     },
//     { title: 'Căn phòng đỏ', author: 'August Strindberg', status: 'Còn trống' },
//     {
//         title: 'Tình yêu thời thổ tả',
//         author: 'Gabriel García Márquez',
//         status: 'Đã có người thuê',
//     },
//     {
//         title: 'Những người khốn khổ',
//         author: 'Victor Hugo',
//         status: 'Còn trống',
//     },
//     { title: 'Người mẹ', author: 'Maxim Gorky', status: 'Còn trống' },
//     {
//         title: 'Moby-Dick',
//         author: 'Herman Melville',
//         status: 'Đã có người thuê',
//     },
//     {
//         title: 'Cuốn theo chiều gió',
//         author: 'Margaret Mitchell',
//         status: 'Còn trống',
//     },
//     {
//         title: 'Thế giới mới dũng cảm',
//         author: 'Aldous Huxley',
//         status: 'Còn trống',
//     },
//     {
//         title: 'Cánh buồm đỏ thắm',
//         author: 'Alexander Grin',
//         status: 'Đã có người thuê',
//     },
//     { title: 'Tấm thảm', author: 'Terry Pratchett', status: 'Còn trống' },
//     { title: 'Tình yêu và tội lỗi', author: 'Goethe', status: 'Còn trống' },
//     {
//         title: 'Đồi cỏ hoa',
//         author: 'Peter S. Beagle',
//         status: 'Đã có người thuê',
//     },
//     {
//         title: 'Hội chợ phù hoa',
//         author: 'William Makepeace Thackeray',
//         status: 'Còn trống',
//     },
//     {
//         title: 'Người đàn bà hoàn hảo',
//         author: 'Oscar Wilde',
//         status: 'Còn trống',
//     },
//     { title: 'Sóng vỗ', author: 'Virginia Woolf', status: 'Đã có người thuê' },
//     {
//         title: 'Mặt trời không bao giờ tắt',
//         author: 'William Faulkner',
//         status: 'Còn trống',
//     },
//     { title: 'Đỉnh gió hú', author: 'Emily Brontë', status: 'Còn trống' },
//     {
//         title: 'Bắt gọn',
//         author: 'Raymond Chandler',
//         status: 'Đã có người thuê',
//     },
//     {
//         title: 'Sự trỗi dậy của loài người',
//         author: 'H.G. Wells',
//         status: 'Còn trống',
//     },
//     {
//         title: 'Tâm lý học của tình yêu',
//         author: 'Sigmund Freud',
//         status: 'Còn trống',
//     },
//     {
//         title: 'Tầm nhìn của Plato',
//         author: 'Plato',
//         status: 'Đã có người thuê',
//     },
//     { title: 'Chí Phèo', author: 'Nam Cao', status: 'Còn trống' },
//     { title: 'Tuổi thơ dữ dội', author: 'Phùng Quán', status: 'Còn trống' },
//     {
//         title: 'Những cây cầu ở quận Madison',
//         author: 'Robert James Waller',
//         status: 'Đã có người thuê',
//     },
//     { title: 'Bố con cá gai', author: 'Lý Tử Hoa', status: 'Còn trống' },
//     { title: 'Cuộc đời của Pi', author: 'Yann Martel', status: 'Còn trống' },
//     { title: 'Lão Hạc', author: 'Nam Cao', status: 'Đã có người thuê' },
//     { title: 'Không gia đình', author: 'Hector Malot', status: 'Còn trống' },
//     {
//         title: 'Những người đàn bà nhỏ bé',
//         author: 'Louisa May Alcott',
//         status: 'Còn trống',
//     },
//     {
//         title: 'Đảo giấu vàng',
//         author: 'Robert Louis Stevenson',
//         status: 'Đã có người thuê',
//     },
//     { title: 'Đêm trắng', author: 'Fyodor Dostoevsky', status: 'Còn trống' },
//     {
//         title: 'Thép đã tôi thế đấy',
//         author: 'Nikolai Ostrovsky',
//         status: 'Còn trống',
//     },
// ]);

// Gọi hàm để thực hiện truy vấn

// Gọi hàm kết nối

async function getBookByTitle(title) {
    bot.on('message', async (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text.trim(); // Lấy và làm sạch nội dung tin nhắn của người dùng

        // Kiểm tra trạng thái của người dùng
        if (!userStates[chatId]) {
            userStates[chatId] = 'waitingForGreeting'; // Mặc định trạng thái là chờ đợi chào hỏi
        }

        if (userStates[chatId] === 'waitingForGreeting') {
            if (text.toLowerCase() === 'hi') {
                bot.sendMessage(
                    chatId,
                    'Chào bạn! Nhập tên sách mà bạn muốn thuê:'
                );
                userStates[chatId] = 'waitingForBookTitle'; // Cập nhật trạng thái
            } else {
                bot.sendMessage(chatId, 'Vui lòng nhập "hi" để bắt đầu.');
            }
        } else if (userStates[chatId] === 'waitingForBookTitle') {
            const query = { title: title };

            if (text.toLowerCase() === 'hi') {
                const books = await collection.findOne(query);
                bot.sendMessage(chatId, `Books : ` + books);
                bot.sendMessage(
                    chatId,
                    `Tìm thấy sách: ${books.title}, tác giả: ${books.author}, tình trạng: ${books.status}`
                );
            } else {
                bot.sendMessage(chatId, `Books : ` + collection.title);
            }

            // Reset trạng thái sau khi tìm kiếm xong
            userStates[chatId] = 'waitingForGreeting';
        } else {
            bot.sendMessage(chatId, 'Có lỗi xảy ra. Vui lòng thử lại.');
        }
    });
}
getBookByTitle();
