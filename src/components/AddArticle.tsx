import * as React from "react";

import { IArticle } from "../../type";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  saveArticle: (article: IArticle | any) => void;
};

const AddArticle: React.FC<Props> = ({ saveArticle }) => {
  // Initialize the state with an empty IArticle object
  const [article, setArticle] = React.useState<IArticle>({ title: "", body: "" });

  const handleArticleData = (e: React.FormEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;
    setArticle((prevArticle) => ({
      ...prevArticle,
      [id]: value,
    }));
  };

  const addNewArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (article.title && article.body) {
      saveArticle(article);
      // Reset form after submission
      setArticle({ title: "", body: "" });
    }
  };

  return (
    <form onSubmit={addNewArticle} className="Add-article">
      <input
        type="text"
        id="title"
        placeholder="Title"
        value={article.title}
        onChange={handleArticleData}
      />
      <input
        type="text"
        id="body"
        placeholder="Description"
        value={article.body}
        onChange={handleArticleData}
      />
      <button type="submit" disabled={!article.title || !article.body}>
        Add article
      </button>
    </form>
  );
};

export default AddArticle;
