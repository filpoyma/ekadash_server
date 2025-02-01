import { Http } from '../../front/src/http';
import { API_PREF } from '../../front/src/api';

test('the data is peanut butter', async () => {
  const data = await Http.get(`${API_PREF}/englishText?_id=${123}`);
  expect(data).toBe({});
});
