// const uri = "mongodb+srv://reflqctnl:Z7dYtNMRSq0sYoKC@vfms.bizx1qj.mongodb.net/?retryWrites=true&w=majority";
// import { MongoClient, ServerApiVersion } from 'mongodb'

// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });

// async function update(collection, updates) {
//     try {
//         await client.connect();
//         console.log('connected')
//         await client.db("vfms").collection(collection).insertOne(updates);
//     } catch (e) {
//         console.log(e);
//     } finally {
//         await client.close();
//     }
// }

// console.log('updating');
// update('appeals', { name: 'reflqctnl', result: 'accept', staff: 'couchpotato4252' });