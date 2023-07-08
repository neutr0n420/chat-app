const axios = require('axios')
require('dotenv').config()
function harperSaveMessage(message, username, room){
    const dbUrl = process.env.HARPERDB_URL
    const dbPass = process.env.HARPERDB_PW
    console.log(dbUrl, dbPass)
    // console.log("Hello from the function")
    if(!dbUrl || !dbPass){
        console.log("Hello this is not executing?")
        return null
    }
    let dataDB = JSON.stringify({
        operation: 'insert',
        schema: 'realtime_chat_app',
        table: 'messages',
        records: [
            {
                message,
                username,
                room
            },
        ]
    })
    
    let config = {
        method: 'post',
        url: dbUrl,
        Headers: {
            'Content-Type': 'application/json', 
            'Authorization': dbPass,
        },
        data: dataDB
    }
    return new Promise((resolve, reject) => {
        console.log('Hello world')
        axios(config)
          .then(function (response) {
            console.log("Hello world")
            console.log(response.data)
            resolve(JSON.stringify(response.data));
          })
          .catch(function (error) {
            reject(error);
          });
      });
    }




module.exports = harperSaveMessage;