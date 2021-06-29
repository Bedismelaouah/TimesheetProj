import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUserInfo } from 'app/shared/model/user-info.model';
import { getEntities as getUserInfos } from 'app/entities/user-info/user-info.reducer';
import { getEntity, updateEntity, createEntity, reset } from './role.reducer';
import { IRole } from 'app/shared/model/role.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRoleUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RoleUpdate = (props: IRoleUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { roleEntity, userInfos, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/role');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getUserInfos();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...roleEntity,
        ...values,
        userInfo: userInfos.find(it => it.id.toString() === values.userInfoId.toString()),
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
          <h2 id="timesheet2App.role.home.createOrEditLabel" data-cy="RoleCreateUpdateHeading">
            <Translate contentKey="timesheet2App.role.home.createOrEditLabel">Create or edit a Role</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : roleEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="role-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="role-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="roleLabel" for="role-role">
                  <Translate contentKey="timesheet2App.role.role">Role</Translate>
                </Label>
                <AvField id="role-role" data-cy="role" type="text" name="role" />
              </AvGroup>
              <AvGroup>
                <Label for="role-userInfo">
                  <Translate contentKey="timesheet2App.role.userInfo">User Info</Translate>
                </Label>
                <AvInput id="role-userInfo" data-cy="userInfo" type="select" className="form-control" name="userInfoId">
                  <option value="" key="0" />
                  {userInfos
                    ? userInfos.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/role" replace color="info">
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
  userInfos: storeState.userInfo.entities,
  roleEntity: storeState.role.entity,
  loading: storeState.role.loading,
  updating: storeState.role.updating,
  updateSuccess: storeState.role.updateSuccess,
});

const mapDispatchToProps = {
  getUserInfos,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RoleUpdate);
