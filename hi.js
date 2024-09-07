bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    const database = client.db(dbName); // Thay đổi 'myDatabase' thành tên database của bạn
    const collection = database.collection(collectionName);
    const userMessage = "Đắc nhân tâm";
    // const queryFind = await collection.findOne({ title: text });
  //   if (queryFind) {
  //     console.log('Tìm thấy sách:', queryFind.title);
  // } else {
  //     console.log('Không tìm thấy sách.');
  // }
    // const result = await collection.findOne(queryFind);
  
    const Hi = "hi";
    if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
        bot.sendMessage(msg.from.id, "Hello " + msg.from.first_name + " 🎉🎉");
        bot.sendMessage(msg.from.id, "Tell me a book do you wanna hire 📚 📚");
        console.log("userInput là : " + userMessage, "result là + " + result);
        // console.log(collection.title);

        // collection

    } else {
      bot.sendMessage(msg.chat.id, `Bạn vừa tìm kiếm sách: ${result.title}`);

    }
    // Gọi function tìm kiếm dữ liệu trong MongoDB
  
    // Kiểm tra kết quả và phản hồi cho người dùng  
  //   if (result == userInput) {
  //     bot.sendMessage(chatId, `Tìm thấy: ${result.title}`);
  //   } else {
  //     bot.sendMessage(chatId, "Không tìm thấy dữ liệu nào khớp.");
  //   }
  // }
  })
  // Kết nối đến MongoDB khi bot khởi động

  