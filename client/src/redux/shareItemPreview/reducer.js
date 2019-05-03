//Actions
import { ViewerContext } from '../../context/ViewerProvider';
const UPDATE_ITEM = 'UPDATE_ITEM';
const RESET_IMAGE = 'RESET_IMAGE';
const RESET_ITEM = 'RESET_ITEM';

//Action creators
export const updateItem = item => ({
  type: UPDATE_ITEM,
  payload: item
});

export const resetImage = () => ({
  type: RESET_IMAGE
});

export const resetItem = () => ({
  type: RESET_ITEM
});

//Initial State

const initialState = {
  title: 'Name your item',
  description: 'Describe your item',
  imageurl: 'https://via.placeholder.com/350x250.png?text=Please+select+image',
  tags: [],
  itemowner: {},
  created: new Date()
};

export default (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case UPDATE_ITEM:
      return {
        ...state,
        ...action.payload
      };

    case RESET_ITEM:
      return {
        ...initialState
      };

    case RESET_IMAGE:
      return {
        ...state,
        imageurl: initialState.imageurl
      };
    default:
      return state;
  }
};
