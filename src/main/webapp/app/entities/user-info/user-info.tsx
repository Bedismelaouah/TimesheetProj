import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './user-info.reducer';
import { IUserInfo } from 'app/shared/model/user-info.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUserInfoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const UserInfo = (props: IUserInfoProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { userInfoList, match, loading } = props;
  return (
    <div>
      <h2 id="user-info-heading" data-cy="UserInfoHeading">
        <Translate contentKey="timesheet2App.userInfo.home.title">User Infos</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="timesheet2App.userInfo.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="timesheet2App.userInfo.home.createLabel">Create new User Info</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {userInfoList && userInfoList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="timesheet2App.userInfo.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="timesheet2App.userInfo.firstname">Firstname</Translate>
                </th>
                <th>
                  <Translate contentKey="timesheet2App.userInfo.lastname">Lastname</Translate>
                </th>
                <th>
                  <Translate contentKey="timesheet2App.userInfo.email">Email</Translate>
                </th>
                <th>
                  <Translate contentKey="timesheet2App.userInfo.phone">Phone</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {userInfoList.map((userInfo, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${userInfo.id}`} color="link" size="sm">
                      {userInfo.id}
                    </Button>
                  </td>
                  <td>{userInfo.firstname}</td>
                  <td>{userInfo.lastname}</td>
                  <td>{userInfo.email}</td>
                  <td>{userInfo.phone}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${userInfo.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${userInfo.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${userInfo.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="timesheet2App.userInfo.home.notFound">No User Infos found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ userInfo }: IRootState) => ({
  userInfoList: userInfo.entities,
  loading: userInfo.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
