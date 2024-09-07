const express = require('express');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;
const dbName = 'bookstore_books';
const token = '7268145020:AAHiBhdjeuAn7j0KtboaBIFLo4NkxK3fajI';
const TelegramBot = require('node-telegram-bot-api');
const uri = 'mongodb://localhost:27017/bookstore_books';
const bot = new TelegramBot(token, { polling: true });

const client = new MongoClient(uri);
const userStates = {};



app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});

const books = [
    { title: 'Dế Mèn Phiêu Lưu Ký', author: 'Tô Hoài', status: 'có sẵn', borrowedBooks: [] },
    { title: 'Số Đỏ', author: 'Vũ Trọng Phụng', status: 'không có sẵn', borrowedBooks: [] },
    { title: 'Nhật Ký Trong Tù', author: 'Hồ Chí Minh', status: 'có sẵn' , borrowedBooks: []},
    { title: 'Chí Phèo', author: 'Nam Cao', status: 'không có sẵn' , borrowedBooks: []},
    { title: 'Tắt Đèn', author: 'Ngô Tất Tố', status: 'không có sẵn' , borrowedBooks: []},
    { title: 'Lão Hạc', author: 'Nam Cao', status: 'có sẵn', borrowedBooks: [] },
    { title: 'Tuyển Tập Truyện Ngắn', author: 'Nguyễn Công Hoan', status: 'có sẵn', borrowedBooks: [] },
    { title: 'Đất Rừng Phương Nam', author: 'Đoàn Giỏi', status: 'có sẵn', borrowedBooks: [] },
    { title: 'Hồi Ký', author: 'Nguyễn Ái Quốc', status: 'không có sẵn', borrowedBooks: [] },
    { title: 'Kính Vạn Hoa', author: 'Nguyễn Nhật Ánh', status: 'có sẵn', borrowedBooks: [] }
  ];
  
  const insertBooks = async () => {
    try {
      await client.connect();
      console.log('Connected to database');
      
      const db = client.db(dbName);
      const collection = db.collection('books');
      await collection.deleteMany({});
      const result = await collection.insertMany(books);
      console.log(`${result.insertedCount} documents were inserted`);
    } catch (err) {
      console.error(err);
    } finally {
      await client.close();
    }
  };
  
  insertBooks();



  const users = [
    { userId: '', name: '', borrowedBooks: [] },
    { userId: '', name: '', borrowedBooks: [] },
    { userId: '', name: '', borrowedBooks: [] },
    { userId: '', name: '', borrowedBooks: [] },
    { userId: '', name: '', borrowedBooks: [] },

  ];

  const createCollectionAndInsertUsers = async () => {
  
    try {
      await client.connect();
      console.log('Connected to database');
  
      const db = client.db(dbName);
      const collection = db.collection('users'); // Tạo collection 'users'
  
      // Xóa dữ liệu cũ nếu có
      await collection.deleteMany({});
  
      // Thêm dữ liệu mới vào collection
      const result = await collection.insertMany(users);
      console.log(`${result.insertedCount} documents were inserted`);
    } catch (err) {
      console.error(err);
    } finally {
      await client.close();
    }
  };
  
  createCollectionAndInsertUsers();


  async function main() {
  }