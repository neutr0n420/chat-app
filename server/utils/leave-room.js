function leaveRoom (userId, chatRoomUsers){
    return chatRoomUsers.filter((user)=> user.id !=userId)
}
module.exports = leaveRoom