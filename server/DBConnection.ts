// import { MongoClient } from 'mongodb';
//
// const url = 'mongodb://localhost:27017';
// const dbName = 'mydb';
//
// async function main() {
//     const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
//
//     try {
//         // Kết nối đến MongoDB server
//         await client.connect();
//         console.log('Kết nối thành công đến server MongoDB');
//
//         const db = client.db(dbName);
//
//         // Thực hiện một số thao tác trên database, ví dụ: lấy danh sách các collection
//         const collections = await db.collections();
//         console.log('Các collection trong database:', collections.map(c => c.collectionName));
//     } catch (err) {
//         console.error('Lỗi kết nối:', err);
//     } finally {
//         // Đóng kết nối
//         await client.close();
//     }
// }
//
// main().catch(console.error);
