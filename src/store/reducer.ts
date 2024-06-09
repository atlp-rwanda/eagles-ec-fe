/* eslint-disable no-case-declarations */
import { ArticleAction, ArticleState, IArticle } from "../../type";

import * as actionTypes from './actionTypes';

// Define the initial state
const initialState: ArticleState = {
  articles: [],
};

const generateUniqueId = () => Math.floor(Math.random() * 1e9);

const reducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state: ArticleState = initialState,
  action: ArticleAction,
): ArticleState => {
  switch (action.type) {
    case actionTypes.ADD_ARTICLE:
      const newArticle: IArticle = {
        id: generateUniqueId(),
        title: action.article.title,
        body: action.article.body,
      };
      return {
        ...state,
        articles: state.articles.concat(newArticle),
      };
    case actionTypes.REMOVE_ARTICLE:
      const updatedArticles: IArticle[] = state.articles.filter(
        (article) => article.id !== action.article.id,
      );
      return {
        ...state,
        articles: updatedArticles,
      };
    default:
      return state;
  }
};

export default reducer;
