import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITypeProject, defaultValue } from 'app/shared/model/type-project.model';

export const ACTION_TYPES = {
  FETCH_TYPEPROJECT_LIST: 'typeProject/FETCH_TYPEPROJECT_LIST',
  FETCH_TYPEPROJECT: 'typeProject/FETCH_TYPEPROJECT',
  CREATE_TYPEPROJECT: 'typeProject/CREATE_TYPEPROJECT',
  UPDATE_TYPEPROJECT: 'typeProject/UPDATE_TYPEPROJECT',
  PARTIAL_UPDATE_TYPEPROJECT: 'typeProject/PARTIAL_UPDATE_TYPEPROJECT',
  DELETE_TYPEPROJECT: 'typeProject/DELETE_TYPEPROJECT',
  RESET: 'typeProject/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITypeProject>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type TypeProjectState = Readonly<typeof initialState>;

// Reducer

export default (state: TypeProjectState = initialState, action): TypeProjectState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TYPEPROJECT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TYPEPROJECT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_TYPEPROJECT):
    case REQUEST(ACTION_TYPES.UPDATE_TYPEPROJECT):
    case REQUEST(ACTION_TYPES.DELETE_TYPEPROJECT):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_TYPEPROJECT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_TYPEPROJECT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TYPEPROJECT):
    case FAILURE(ACTION_TYPES.CREATE_TYPEPROJECT):
    case FAILURE(ACTION_TYPES.UPDATE_TYPEPROJECT):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_TYPEPROJECT):
    case FAILURE(ACTION_TYPES.DELETE_TYPEPROJECT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_TYPEPROJECT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_TYPEPROJECT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_TYPEPROJECT):
    case SUCCESS(ACTION_TYPES.UPDATE_TYPEPROJECT):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_TYPEPROJECT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_TYPEPROJECT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/type-projects';

// Actions

export const getEntities: ICrudGetAllAction<ITypeProject> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TYPEPROJECT_LIST,
  payload: axios.get<ITypeProject>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ITypeProject> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TYPEPROJECT,
    payload: axios.get<ITypeProject>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ITypeProject> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TYPEPROJECT,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITypeProject> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TYPEPROJECT,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<ITypeProject> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_TYPEPROJECT,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITypeProject> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TYPEPROJECT,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
