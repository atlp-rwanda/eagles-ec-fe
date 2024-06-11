import * as React from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import "./App.css";
import { Dispatch } from "redux";

import { ArticleState, IArticle } from "../type";

import Article from "./components/Article";
import AddArticle from "./components/AddArticle";
import { addArticle, removeArticle } from "./store/actionCreators";

const App: React.FC = () => {
  const articles: readonly IArticle[] = useSelector(
    (state: ArticleState) => state.articles,
    shallowEqual,
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch: Dispatch<any> = useDispatch();

  const saveArticle = React.useCallback(
    (article: IArticle) => dispatch(addArticle(article)),
    [dispatch],
  );

  return (
    <main>
      <AddArticle saveArticle={saveArticle} />
      {articles.map((article: IArticle) => (
        <Article
          key={article.id}
          article={article}
          removeArticle={removeArticle}
        />
      ))}
    </main>
  );
};

export default App;
