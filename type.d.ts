export interface IArticle {
  id?: number;
  title: string;
  body: string;
}

export type ArticleState = {
  articles: IArticle[];
};

export type ArticleAction = {
  type: string;
  article: IArticle;
};

export type UserData = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export type RegisterError = {
  error: string;
};

export type RegisterState = {
  isLoading: boolean;
  data: [];
  error: string | null;
};

export type DispatchType = (args: ArticleAction) => ArticleAction;
