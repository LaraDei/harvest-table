/* eslint-disable eqeqeq */


export const findItem = (items=[], itemId) => 
items.find(item => item.id == itemId) 


export const getItemsForUser = (items=[], userId) => (
  (!userId)
    ? items
    : items.filter(item => item.user_id == userId)
)

  