export const excludePswd = (entity, keys) => {
  for (let key of keys) {
    delete entity[key]
  }
  return entity
}

export const excludePswdEntities = (entities, keys) => {
  const entittiesWOPswd = entities.map(entity => {
    for (let key of keys) {
      delete entity[key]
    }
    return entity
  })

  return entittiesWOPswd
}
