import { type SupportedStorage } from '@supabase/supabase-js'

function supportsLocalStorage(){
  try {
      return 'localStorage' in window && window['localStorage'] !== null;
  } catch(e) {
      return false;
  }
}

export const customStorageAdapter: SupportedStorage = {
  getItem: (key) => {
    if (!supportsLocalStorage()) {
      // Configure alternate storage
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
