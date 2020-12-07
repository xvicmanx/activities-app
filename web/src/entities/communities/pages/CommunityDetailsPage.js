import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { Breadcrumb } from 'react-bulma-components';
import { Link, useParams } from 'react-router-dom';

import { fetchCommunity } from '../redux/CommunitiesActions';
import { readToken } from '../../users/redux/UsersActions';
import { LoadingIndicator, Page } from '../../../core/components';
import CommunityMembersTable from '../components/CommunityMembersTable';

const CommunityDetailsPage = () => {
  const { id } = useParams();
  const { Communities } = useSelector((state) => state);
  const dispatch = useDispatch();
  const token = readToken();

  useEffect(() => {
    dispatch(fetchCommunity(token, id));
  }, [dispatch, token, id]);

  const { community } = Communities;

  if (!community) {
    return <LoadingIndicator />;
  }

  return (
    <Page title={`Detalles de comunidad: ${community.name}`} icon={faBuilding}>
      <div>
        <Breadcrumb
          renderAs={Link}
          hrefAttr="to"
          items={[
            {
              name: 'Comunidades',
              url: '/communities',
            },
            {
              name: community.name,
              url: `/communities/${community.id}`,
              active: true,
            },
          ]}
        />
        <CommunityMembersTable
          communityId={community.id}
          members={community.members}
        />
      </div>
    </Page>
  );
};

export default CommunityDetailsPage;
