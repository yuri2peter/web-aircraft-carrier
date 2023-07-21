import { SERVER_ORIGIN } from 'src/configs';
import axiosServices from 'src/utils/axios';

export async function requestApi(path: string, params = {}) {
  const { data } = await axiosServices.post(
    SERVER_ORIGIN + '/api/' + path,
    params
  );
  return data;
}
