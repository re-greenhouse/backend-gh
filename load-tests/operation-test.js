import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'localhost/api/v1';
const AUTH_TOKEN = 'place_your_token_here';


export let options = {
    vus: 83,
    duration: '1m',
};

export default function () {
  // Endpoint to test
  let endpoint = '/crops';

  // Make a GET request using the authorization token
  let res = http.get(`${BASE_URL}${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${AUTH_TOKEN}`,
    },
  });

  // Check that the response status is 200
  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(1);
}
