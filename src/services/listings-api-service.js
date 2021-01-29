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

  getListing(listingId) {
    return fetch(`${config.API_ENDPOINT}/listings/${listingId}`, {
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

  postListing(listing) {  
    //const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    return fetch(`${config.API_ENDPOINT}/listings`, {
      method: 'POST',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
        // 'Access-Control-Allow-Origin': 'http://localhost:3000'
      },
      body: listing,
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  deleteListing(listing) {
    return fetch(`${config.API_ENDPOINT}/listings/${listing.id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(listing),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
}

export default ListingsApiService