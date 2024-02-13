const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = require('./config.json');

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function update(collection, updates) {
    try {
    await client.connect()
    await client.db("vfms").collection(collection).insertOne(updates);
    console.log(updates);
    } finally {
        await client.close();
    }
}

export async function logAppeal(user, result, staff, time) {
    await update('appeals', {name: user, result: result, staff: staff, timestamp: time});
}

export async function logDa(user, type, reason, notes, staff, time) {
    await update('da', {user: user, type: type, reason: reason, notes: notes, staff: staff, time: time});
}

export async function logCertification(user, type, staff, time) {
    await update('certifications', {user: user, type: type, staff: staff, time: time});
}

export async function logOnboard(user, staff, time) {
    await update('hr', {user: user, staff: staff, time: time, command: 'onboard'});
}

export async function logPromote(user, staff, time, role) {
    await update('hr', {user: user, staff: staff, time: time, role: role, command: 'promote'});
}