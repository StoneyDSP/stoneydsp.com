import { type SupportedStorage } from '@supabase/supabase-js'
import supportsLocalStorage from './support'

const customStorageAdapter: SupportedStorage = {
  getItem: (key) => {
    console.log('getting item from custom storage adapter: %s', key)
    if (!supportsLocalStorage()) {
      // Configure alternate storage
      console.log('oops, we need to configure custom storage!')
      return null
    }
    return globalThis.localStorage.getItem(key)
  },
  setItem: (key, value) => {
    if (!supportsLocalStorage()) {
      // Configure alternate storage here
      return
    }
    globalThis.localStorage.setItem(key, value)
  },
  removeItem: (key) => {
    if (!supportsLocalStorage()) {
      // Configure alternate storage here
      return
    }
    globalThis.localStorage.removeItem(key)
  },
}

export default customStorageAdapter
