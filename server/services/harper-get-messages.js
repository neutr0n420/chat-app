// let axios = require('axios')

// function harperGetMessages(room){
//     const dbUrl = process.env.HARPERDB_URL
//     const dbPass = process.env.HARPERDB_PW
//     if(!dbUrl || !dbPass){
//         return null
//     }
//     let data = JSON.stringify({
//         operation: 'sql',
//         sql: `SELECT * FROM realtime_chat_app.messages WHERE room = ${room} LIMIT 100`
//     })
//     let config = {
//         method: 'post',
//         url: dbUrl,
//         headers:{
//             'Content-Type': 'application/json',
//             Authorization: dbPass,
//         },
//         dataSQL: data,
//     }
//     return new Promise((resolve, reject)=>{
//         axios(config)
//             .then(function(response){
//                 console.log(response.data)
//                 resolve(JSON.stringify(response.data));
//             })
//             .catch(function(error){
//                 reject(error)
//             })
//     })
// }
// module.exports = harperGetMessages;