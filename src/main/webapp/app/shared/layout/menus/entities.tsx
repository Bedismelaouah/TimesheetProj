import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    data-cy="entity"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/project">
      <Translate contentKey="global.menu.entities.project" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/type-project">
      <Translate contentKey="global.menu.entities.typeProject" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/client">
      <Translate contentKey="global.menu.entities.client" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/module">
      <Translate contentKey="global.menu.entities.module" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/user-info">
      <Translate contentKey="global.menu.entities.userInfo" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/role">
      <Translate contentKey="global.menu.entities.role" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
