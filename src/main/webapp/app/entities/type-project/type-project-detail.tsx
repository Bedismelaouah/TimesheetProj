import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './type-project.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITypeProjectDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TypeProjectDetail = (props: ITypeProjectDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { typeProjectEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="typeProjectDetailsHeading">
          <Translate contentKey="timesheet2App.typeProject.detail.title">TypeProject</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{typeProjectEntity.id}</dd>
          <dt>
            <span id="type">
              <Translate contentKey="timesheet2App.typeProject.type">Type</Translate>
            </span>
          </dt>
          <dd>{typeProjectEntity.type}</dd>
        </dl>
        <Button tag={Link} to="/type-project" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/type-project/${typeProjectEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ typeProject }: IRootState) => ({
  typeProjectEntity: typeProject.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TypeProjectDetail);
