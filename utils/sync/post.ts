export type TestData = {
  itemA: string,
  itemB: string,
  itemC: string,
};

export function sendPost(data: FormData) {
  const apiEndpoint = '/api/supabase'

  fetch(apiEndpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((response) => {
      alert(response.message)
    })
    .catch((err) => {
      alert(err)
    })
}
