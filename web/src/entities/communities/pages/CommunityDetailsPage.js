import React from 'react';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { Breadcrumb } from 'react-bulma-components';
import { Link, useParams } from 'react-router-dom';

import { LoadingIndicator, Page } from '../../../core/components';
import CommunityMembersTable from '../components/CommunityMembersTable';
import useCommunity from './useCommunity';

const CommunityDetailsPage = () => {
  const { id } = useParams();
  const community = useCommunity(id);

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
