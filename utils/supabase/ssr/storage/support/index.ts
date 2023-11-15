export default function supportsLocalStorage(){
  try {
      return 'localStorage' in window && window['localStorage'] !== null;
  } catch(e) {
      return false;
  }
}
