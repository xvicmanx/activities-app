import { requester } from './requester';

const fetchCommunityInfo = async (token) => {
  return await requester({ path: `/communities/list-for-user`, token });
};

const fetchCommunityInfoById = async (comunityId, token) => {
  return await requester({ path: `/communities/find/${comunityId}`, token });
};

export default {
  fetchCommunityInfo,
  fetchCommunityInfoById,
};
