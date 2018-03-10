const url = 'mongodb://localhost:27017/TodoApp'
const {MongoClient, ObjectID} = require('mongodb')
MongoClient.connect(url, (err, client)=>{
  if(err){return  console.log('unable to connect')}

  const db = client.db('TodoApp')
  db.collection('Todos').findOneAndUpdate({
    _id: new ObjectID('5aa2f42ad62cf112c020c817')
  },{
    $set:{completed: true}
  },{
    returnOriginal: false
  }).then((result) => {console.log(result)})
  client.close()
})
