const express = require('express');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const app = express();
const port = 30005;
const dbName = 'bookstore_books';
const token = '7294956308:AAEVRMW8f53H-Vj0FR65fBt-6uyiaoyfj_o';
const TelegramBot = require('node-telegram-bot-api');
const uri = 'mongodb://localhost:27017/bookstore_books';
const bot = new TelegramBot(token, { polling: true });

const client = new MongoClient(uri);
const userStates = {};


app.post('/', function (req, res) {
    res.send('Hello World!');
});

// app.listen(port, function () {
//     console.log(`Example app listening on port ${port}!`);
// });

const books =  [
    {
        title: 'Dế Mèn Phiêu Lưu Ký',
        author: 'Tô Hoài',
        status: 'có sẵn',
        borrowedBooks: [],
    },
    {
        title: 'Số Đỏ',
        author: 'Vũ Trọng Phụng',
        status: 'không có sẵn',
        borrowedBooks: [],
    },
    {
        title: 'Nhật Ký Trong Tù',
        author: 'Hồ Chí Minh',
        status: 'có sẵn',
        borrowedBooks: [],
    },
    {
        title: 'Chí Phèo',
        author: 'Nam Cao',
        status: 'không có sẵn',
        borrowedBooks: [],
    },
    {
        title: 'Tắt Đèn',
        author: 'Ngô Tất Tố',
        status: 'không có sẵn',
        borrowedBooks: [],
    },
    {
        title: 'Lão Hạc',
        author: 'Nam Cao',
        status: 'có sẵn',
        borrowedBooks: [],
    },
    {
        title: 'Tuyển Tập Truyện Ngắn',
        author: 'Nguyễn Công Hoan',
        status: 'có sẵn',
        borrowedBooks: [],
    },
    {
        title: 'Đất Rừng Phương Nam',
        author: 'Đoàn Giỏi',
        status: 'có sẵn',
        borrowedBooks: [],
    },
    {
        title: 'Hồi Ký',
        author: 'Nguyễn Ái Quốc',
        status: 'không có sẵn',
        borrowedBooks: [],
    },
    {
        title: 'Kính Vạn Hoa',
        author: 'Nguyễn Nhật Ánh',
        status: 'có sẵn',
        borrowedBooks: [],
    },
];



async function initMongo() {
    try {
        await client.connect();
        db = client.db(dbName);
        
        console.log("Đã kết nối tới MongoDB");
    } catch (error) {
        console.error("Lỗi kết nối tới MongoDB:", error);
    }
}

initMongo();

const users = [
    { userId: '', name: '', borrowedBooks: [] },
    { userId: '', name: '', borrowedBooks: [] },
    { userId: '', name: '', borrowedBooks: [] },
    { userId: '', name: '', borrowedBooks: [] },
    { userId: '', name: '', borrowedBooks: [] },
];

bot.onText(/\/start/, (msg) => {
    const nameUser = msg.from.first_name;
    const idUser = msg.from.id
    bot.sendMessage(
        msg.chat.id,
        'Welcome ' + nameUser + ' to the Book CamLansuc bot! Type a book you want to hire.'
    );
});

async function handleUserInput(textUser) {
    try {
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection('books');
        const query = await collection.insertMany(books);
        console.log(`${query.insertedCount} documents were inserted`);
        // Kiểm tra xem title có trùng với textUser không
        const result = await collection.findOne({ title: new RegExp(textUser, 'i') });
        const outputUser = result.title;

        if (result) {
            console.log(`Tìm thấy sách: ${result.title}`);
            return `${outputUser}`;
        } else {
            console.log('Không tìm thấy sách nào với tiêu đề này.');
            return 'Không tìm thấy sách nào với tiêu đề này.';
        }
        // return outputUser;
    } catch (error) {
        console.error(error);
        return 'Có lỗi xảy ra khi tìm kiếm sách.';
    } finally {
        await client.close();
    }
}

async function selectFieldFromMongo(fieldName) {

    try {
        // Connect to the MongoDB client
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection('books');
        let textUser;
        const result = await collection.findOne({ title: textUser });
        // Query to retrieve all documents, but only include the specified field
        const projection = { [fieldName]: 1 }; // `{ fieldName: 1 }` includes the field in the result

        // Fetch the documents with the specified field
        const documents = await collection.find({}, { projection }).toArray();
        // const targetUser = textUser; 
        const books =  [
            {
                title: 'Dế Mèn Phiêu Lưu Ký',
                author: 'Tô Hoài',
                status: 'có sẵn',
                borrowedBooks: [],
            },
            {
                title: 'Số Đỏ',
                author: 'Vũ Trọng Phụng',
                status: 'không có sẵn',
                borrowedBooks: [],
            },
            {
                title: 'Nhật Ký Trong Tù',
                author: 'Hồ Chí Minh',
                status: 'có sẵn',
                borrowedBooks: [],
            },
            {
                title: 'Chí Phèo',
                author: 'Nam Cao',
                status: 'không có sẵn',
                borrowedBooks: [],
            },
            {
                title: 'Tắt Đèn',
                author: 'Ngô Tất Tố',
                status: 'không có sẵn',
                borrowedBooks: [],
            },
            {
                title: 'Lão Hạc',
                author: 'Nam Cao',
                status: 'có sẵn',
                borrowedBooks: [],
            },
            {
                title: 'Tuyển Tập Truyện Ngắn',
                author: 'Nguyễn Công Hoan',
                status: 'có sẵn',
                borrowedBooks: [],
            },
            {
                title: 'Đất Rừng Phương Nam',
                author: 'Đoàn Giỏi',
                status: 'có sẵn',
                borrowedBooks: [],
            },
            {
                title: 'Hồi Ký',
                author: 'Nguyễn Ái Quốc',
                status: 'không có sẵn',
                borrowedBooks: [],
            },
            {
                title: 'Kính Vạn Hoa',
                author: 'Nguyễn Nhật Ánh',
                status: 'có sẵn',
                borrowedBooks: [],
            },
        ];
    //   await collection.deleteMany({});

        const inputText = 'Số Đỏ';
        let foundBook = null;
        books.forEach(book => {
            if (book.title === inputText) {
                foundBook = book;
            }
        });
        if (foundBook) {
            console.log('Sách đã tìm thấy:', foundBook.title);
        } else {
            console.log('Không tìm thấy sách.' ,foundBook);
        }
        // Display or return the documents
        console.log("Titles:", inputText);
        // return foundTitle;
    } catch (error) {
        console.error("Error retrieving documents:", error);
        return null;
    } finally {
        // Close the MongoDB client connection
        await client.close();
    }
}

// Example usage of the function
const fieldName = "title"; // Replace with the field you want to select
selectFieldFromMongo(fieldName).then(documents => {
    if (documents) {
        console.log("Fetched documents:", documents);
    } else {
        console.log("No documents found.");
    }
});


let selectedBook = null;

// Lắng nghe tin nhắn từ người dùng
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const inputText = msg.text;
    const userID = msg.from.id;
    const chatID = msg.from.first_name;


    if (inputText.startsWith('/y')) {
        if (selectedBook && selectedBook.status === 'có sẵn') {
            try {
                // Kết nối tới MongoDB
                await client.connect();
                const database = client.db('bookstore_books');  // Thay bằng tên cơ sở dữ liệu của bạn
                const collection = database.collection('books');  // Thay bằng tên collection của bạn

                // Cập nhật trạng thái của sách
                const result = await collection.updateOne(
                    { title: selectedBook.title },
                    { 
                        $set: { status: 'đã cho thuê' },
                        $push: { borrowedBooks: { userID, chatID } }
                    }
                );
                // console.log(`borrow : `, selectedBook.borrowedBooks[9]);
               
        
                console.log('Cập nhật thành công!');
                // console.log(books);
                if (result.matchedCount > 0) {
                    bot.sendMessage(chatId, `Bạn đã thuê thành công cuốn sách: ${selectedBook.title}. Trạng thái sách hiện tại: "đã cho thuê".`);
                } else {
                    bot.sendMessage(chatId, 'Không tìm thấy cuốn sách để cập nhật.');
                }
            } catch (error) {
                bot.sendMessage(chatId, 'Có lỗi xảy ra khi cập nhật sách.');
                console.error(error);
            } finally {
                await client.close();
            }
        } else {
            bot.sendMessage(chatId, 'Sách không có sẵn hoặc đã được thuê.');
        }
        selectedBook = null; // Reset sau khi xử lý
    } else if (inputText.startsWith('/n')) {
        bot.sendMessage(chatId, 'Bạn đã hủy yêu cầu thuê sách.');
        selectedBook = null; // Reset sau khi xử lý
    } else {
        // Tìm kiếm sách dựa trên tiêu đề mà người dùng nhập vào
        selectedBook = books.find(book => book.title.toLowerCase() === inputText.toLowerCase());

        if (selectedBook) {
            // Kiểm tra trạng thái của sách
            if (selectedBook.status === 'đã cho thuê' && selectedBook.status === "có sẵn")  {
                // Gửi tin nhắn hỏi người dùng có muốn thuê sách không
                bot.sendMessage(chatId, `Sách "${selectedBook.title}" có sẵn. Bạn có muốn thuê không? Nhấn /y để thuê, /n để hủy.`);
            } else {
                bot.sendMessage(chatId, `Sách "${selectedBook.title}" đã được thuê hoặc không có sẵn.`);
            }
        } else {
            bot.sendMessage(chatId, 'Không tìm thấy sách nào với tiêu đề bạn nhập.');
        }
    }
});



// Gọi hàm để cập nhật trạng thái của sách
