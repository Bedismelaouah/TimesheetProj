import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './module.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IModuleDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ModuleDetail = (props: IModuleDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { moduleEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="moduleDetailsHeading">
          <Translate contentKey="timesheet2App.module.detail.title">Module</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{moduleEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="timesheet2App.module.name">Name</Translate>
            </span>
          </dt>
          <dd>{moduleEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="timesheet2App.module.description">Description</Translate>
            </span>
          </dt>
          <dd>{moduleEntity.description}</dd>
          <dt>
            <Translate contentKey="timesheet2App.module.userInfo">User Info</Translate>
          </dt>
          <dd>{moduleEntity.userInfo ? moduleEntity.userInfo.id : ''}</dd>
          <dt>
            <Translate contentKey="timesheet2App.module.project">Project</Translate>
          </dt>
          <dd>{moduleEntity.project ? moduleEntity.project.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/module" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/module/${moduleEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ module }: IRootState) => ({
  moduleEntity: module.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ModuleDetail);
