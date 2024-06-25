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
export type errorLink = {
  error?: string;
};
export type ResetError = {
  error?: string;
};

export type RegisterState = {
  isLoading: boolean;
  data: [];
  error: string | null;
};

export type emailType = {
  email: string;
};

type passwordType = {
  password: string;
  confirmPassword: string;
};

export type Profile = {
  profileImage: string;
  fullName: string;
  gender: string;
  birthdate: string;
  preferredLanguage: string;
  preferredCurrency: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};
export type DispatchType = (args: ArticleAction) => ArticleAction;
