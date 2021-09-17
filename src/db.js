 import mongo from 'mongodb'
 const uri= "mongodb+srv://antonio:antonio@cluster0.ksyz5.mongodb.net/Football?retryWrites=true&w=majority"

var DATABASE = "Football"
var db = null;

let client = new mongo.MongoClient(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
export default () => {
    return new Promise((resolve, reject) => {
        // ako smo inicijalizirali bazu i klijent je još uvijek spojen
        if (db && client.isConnected()) {
            resolve(db);
        } else {
            client.connect((err) => {
                if (err) {
                    reject('Spajanje na bazu nije uspjelo:' + err);
                } else {
                    console.log('Database connected successfully!');
                    db = client.db('fipugram');
                    resolve(db);
                }
            });
        }
    });
};