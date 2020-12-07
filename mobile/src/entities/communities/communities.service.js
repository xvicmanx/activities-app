import requester from '../../requester';

const fetchCommunities = async (token) => {
  return await requester({ path: `/communities/list-for-user`, token });
};

const fetchCommunityById = async (comunityId, token) => {
  return await requester({ path: `/communities/find/${comunityId}`, token });
};

export default {
  fetchCommunities,
  fetchCommunityById,
};
