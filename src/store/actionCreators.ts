import { ArticleAction, DispatchType, IArticle } from "../../type";

import * as actionTypes from "./actionTypes";

// Generic function to create an action
function createArticleAction(type: string, article: IArticle): ArticleAction {
  return {
    type,
    article,
  };
}

// Simulate HTTP request and dispatch action
export function simulateHttpRequest(action: ArticleAction) {
  return (dispatch: DispatchType) => {
    setTimeout(() => {
      dispatch(action);
    }, 500);
  };
}

// Action creator for adding an article
export function addArticle(article: IArticle) {
  const action = createArticleAction(actionTypes.ADD_ARTICLE, article);
  return simulateHttpRequest(action);
}

// Action creator for removing an article
export function removeArticle(article: IArticle) {
  const action = createArticleAction(actionTypes.REMOVE_ARTICLE, article);
  return simulateHttpRequest(action);
}
