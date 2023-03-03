export const excludePswdFromUser = (user, keys) => {
  for (let key of keys) {
    delete user[key]
  }
  return user
}

export const excludePswdFromUsers = (users, keys) => {
  const usersWOPswd = users.map(user => {
    for (let key of keys) {
      delete user[key]
      console.log(user)
    }
    return user
  })

  return usersWOPswd
}
