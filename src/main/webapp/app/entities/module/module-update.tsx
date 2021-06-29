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
import { IProject } from 'app/shared/model/project.model';
import { getEntities as getProjects } from 'app/entities/project/project.reducer';
import { getEntity, updateEntity, createEntity, reset } from './module.reducer';
import { IModule } from 'app/shared/model/module.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IModuleUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ModuleUpdate = (props: IModuleUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { moduleEntity, userInfos, projects, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/module');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getUserInfos();
    props.getProjects();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...moduleEntity,
        ...values,
        userInfo: userInfos.find(it => it.id.toString() === values.userInfoId.toString()),
        project: projects.find(it => it.id.toString() === values.projectId.toString()),
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
          <h2 id="timesheet2App.module.home.createOrEditLabel" data-cy="ModuleCreateUpdateHeading">
            <Translate contentKey="timesheet2App.module.home.createOrEditLabel">Create or edit a Module</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : moduleEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="module-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="module-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="module-name">
                  <Translate contentKey="timesheet2App.module.name">Name</Translate>
                </Label>
                <AvField
                  id="module-name"
                  data-cy="name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="module-description">
                  <Translate contentKey="timesheet2App.module.description">Description</Translate>
                </Label>
                <AvField id="module-description" data-cy="description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label for="module-userInfo">
                  <Translate contentKey="timesheet2App.module.userInfo">User Info</Translate>
                </Label>
                <AvInput id="module-userInfo" data-cy="userInfo" type="select" className="form-control" name="userInfoId">
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
              <AvGroup>
                <Label for="module-project">
                  <Translate contentKey="timesheet2App.module.project">Project</Translate>
                </Label>
                <AvInput id="module-project" data-cy="project" type="select" className="form-control" name="projectId">
                  <option value="" key="0" />
                  {projects
                    ? projects.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/module" replace color="info">
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
  projects: storeState.project.entities,
  moduleEntity: storeState.module.entity,
  loading: storeState.module.loading,
  updating: storeState.module.updating,
  updateSuccess: storeState.module.updateSuccess,
});

const mapDispatchToProps = {
  getUserInfos,
  getProjects,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ModuleUpdate);
