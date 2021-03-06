import config from '../config'
import TokenService from './token-service'



const ListingsApiService = {
  getListings() {
    return fetch(`${config.API_ENDPOINT}/listings`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
        )
  },
  searchListings(term) {
    return fetch(`${config.API_ENDPOINT}/listings?q=${term}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
        )
  },

  getListing(listingId) {
    return fetch(`${config.API_ENDPOINT}/listings/${listingId}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(res => {
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      })
  },

  postListing(listing) {  
    return fetch(`${config.API_ENDPOINT}/listings`, {
      method: 'POST',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: listing,
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  deleteListing(itemId) {
    return fetch(`${config.API_ENDPOINT}/listings/${itemId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
}

export default ListingsApiService