import requester from '../../../../core/requester';


const addMember = async (token, id, memberId, coordinates) => requester({
  method: 'POST',
  path: `/communities/${id}/add-member/${memberId}?coordinates=${+coordinates}`,
  token
});

export default addMember;
