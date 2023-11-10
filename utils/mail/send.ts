import { FormData } from '@/components/elements/form/contact'

// export function sendEmail(data: FormData) {
//   console.log(data)
// }

export function sendEmail(data: FormData) {
  const apiEndpoint = '/api/mail'

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
