import React from 'react';

import { NetWatcherServiceConsumer } from '../netwatcher-service-context';

const withNetWatcherService = () => (Wrapped) => {

  return (props) => {
    return (
      <NetWatcherServiceConsumer>
        {
          (netwatcherService) => {
            return (
              <Wrapped {...props} netwatcherService={netwatcherService} />
            );
          }
        }
      </NetWatcherServiceConsumer>
    );
  };
};

export default withNetWatcherService;