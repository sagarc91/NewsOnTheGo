import { ApiCall } from '../constants'

export const fetchNews = async () => {
    try {
      const response = await fetch(ApiCall.FETCH_NEWS)
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error ::', error)
      return []
    }
  }