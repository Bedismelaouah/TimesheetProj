import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './user-info.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUserInfoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const UserInfoDetail = (props: IUserInfoDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { userInfoEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="userInfoDetailsHeading">
          <Translate contentKey="timesheet2App.userInfo.detail.title">UserInfo</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{userInfoEntity.id}</dd>
          <dt>
            <span id="firstname">
              <Translate contentKey="timesheet2App.userInfo.firstname">Firstname</Translate>
            </span>
          </dt>
          <dd>{userInfoEntity.firstname}</dd>
          <dt>
            <span id="lastname">
              <Translate contentKey="timesheet2App.userInfo.lastname">Lastname</Translate>
            </span>
          </dt>
          <dd>{userInfoEntity.lastname}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="timesheet2App.userInfo.email">Email</Translate>
            </span>
          </dt>
          <dd>{userInfoEntity.email}</dd>
          <dt>
            <span id="phone">
              <Translate contentKey="timesheet2App.userInfo.phone">Phone</Translate>
            </span>
          </dt>
          <dd>{userInfoEntity.phone}</dd>
        </dl>
        <Button tag={Link} to="/user-info" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/user-info/${userInfoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ userInfo }: IRootState) => ({
  userInfoEntity: userInfo.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoDetail);
