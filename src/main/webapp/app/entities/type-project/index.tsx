import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TypeProject from './type-project';
import TypeProjectDetail from './type-project-detail';
import TypeProjectUpdate from './type-project-update';
import TypeProjectDeleteDialog from './type-project-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TypeProjectUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TypeProjectUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TypeProjectDetail} />
      <ErrorBoundaryRoute path={match.url} component={TypeProject} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={TypeProjectDeleteDialog} />
  </>
);

export default Routes;
