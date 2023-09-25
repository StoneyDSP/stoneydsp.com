export default function handler(request, response) {
  const {
    msg = "get a life you twat"
  } = response.query;
  
  response.status(200).json({
    body: request.body,
    query: request.query,
    cookies: request.cookies,
  });
}
