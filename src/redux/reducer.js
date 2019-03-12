const initialState = {
  bikeSearch: [],
  cart: [],
  reviews: [],
  favorites: [],
  user: {},
  order: {}
}

const GET_BIKE_SEARCH = 'GET_BIKE_SEARCH',
      LOGGED_IN = 'LOGGED_IN',
      LOGGED_OUT = 'LOGGED_OUT',
      GET_REVIEWS = 'GET_REVIEWS',
      GET_FAVORITES = 'GET_FAVORITES',
      GET_CART = 'GET_CART',
      GET_ORDER = 'GET_ORDER'

export default function reducer (state = initialState, action) {
  switch(action.type) {
    case GET_BIKE_SEARCH:
      return {...state, bikeSearch: action.payload}
    case LOGGED_IN:
      return {...state, user: action.payload}
    case LOGGED_OUT:
      return {...state, user: null}
    case GET_REVIEWS:
      return {...state, reviews: action.payload}
    case GET_FAVORITES:
      return {...state, favorites: action.payload}
    case GET_ORDER:
      return {...state, order: action.payload}
    case GET_CART:
      return {...state, cart: action.payload}
    default:
      return {...state}
  }
}

export function getCart (cart) {
  return {
    type: GET_CART, payload: cart
  }
}

export function getBikeSearch (bikeSearch) {
  return {
    type: GET_BIKE_SEARCH, payload: bikeSearch
  }
}

export function logIn (user) {
  return {
    type: LOGGED_IN, payload: user
  }
}

export function logOut () {
  return {
    type: LOGGED_OUT
  }
}

export function getReviews (reviews) {
  return {
    type: GET_REVIEWS, payload: reviews
  }
}

export function getFavorites (favorites) {
  // console.log(favorites)
  return {
    type: GET_FAVORITES, payload: favorites
  }
}

export function getOrder (order) {
  return {
    type: GET_ORDER, payload: order
  }
}
