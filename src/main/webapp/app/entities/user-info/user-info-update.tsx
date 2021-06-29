import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './user-info.reducer';
import { IUserInfo } from 'app/shared/model/user-info.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IUserInfoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const UserInfoUpdate = (props: IUserInfoUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { userInfoEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/user-info');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...userInfoEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="timesheet2App.userInfo.home.createOrEditLabel" data-cy="UserInfoCreateUpdateHeading">
            <Translate contentKey="timesheet2App.userInfo.home.createOrEditLabel">Create or edit a UserInfo</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : userInfoEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="user-info-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="user-info-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="firstnameLabel" for="user-info-firstname">
                  <Translate contentKey="timesheet2App.userInfo.firstname">Firstname</Translate>
                </Label>
                <AvField id="user-info-firstname" data-cy="firstname" type="text" name="firstname" />
              </AvGroup>
              <AvGroup>
                <Label id="lastnameLabel" for="user-info-lastname">
                  <Translate contentKey="timesheet2App.userInfo.lastname">Lastname</Translate>
                </Label>
                <AvField id="user-info-lastname" data-cy="lastname" type="text" name="lastname" />
              </AvGroup>
              <AvGroup>
                <Label id="emailLabel" for="user-info-email">
                  <Translate contentKey="timesheet2App.userInfo.email">Email</Translate>
                </Label>
                <AvField id="user-info-email" data-cy="email" type="text" name="email" />
              </AvGroup>
              <AvGroup>
                <Label id="phoneLabel" for="user-info-phone">
                  <Translate contentKey="timesheet2App.userInfo.phone">Phone</Translate>
                </Label>
                <AvField id="user-info-phone" data-cy="phone" type="text" name="phone" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/user-info" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  userInfoEntity: storeState.userInfo.entity,
  loading: storeState.userInfo.loading,
  updating: storeState.userInfo.updating,
  updateSuccess: storeState.userInfo.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoUpdate);
