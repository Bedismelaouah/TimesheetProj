import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './module.reducer';
import { IModule } from 'app/shared/model/module.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IModuleProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Module = (props: IModuleProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { moduleList, match, loading } = props;
  return (
    <div>
      <h2 id="module-heading" data-cy="ModuleHeading">
        <Translate contentKey="timesheet2App.module.home.title">Modules</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="timesheet2App.module.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="timesheet2App.module.home.createLabel">Create new Module</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {moduleList && moduleList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="timesheet2App.module.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="timesheet2App.module.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="timesheet2App.module.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="timesheet2App.module.userInfo">User Info</Translate>
                </th>
                <th>
                  <Translate contentKey="timesheet2App.module.project">Project</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {moduleList.map((module, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${module.id}`} color="link" size="sm">
                      {module.id}
                    </Button>
                  </td>
                  <td>{module.name}</td>
                  <td>{module.description}</td>
                  <td>{module.userInfo ? <Link to={`user-info/${module.userInfo.id}`}>{module.userInfo.id}</Link> : ''}</td>
                  <td>{module.project ? <Link to={`project/${module.project.id}`}>{module.project.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${module.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${module.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${module.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="timesheet2App.module.home.notFound">No Modules found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ module }: IRootState) => ({
  moduleList: module.entities,
  loading: module.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Module);
