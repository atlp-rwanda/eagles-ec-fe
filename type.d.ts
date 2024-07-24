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
  email: string;
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

export type Review = {
  id: number;
  userId: string;
  productId: number;
  reviewId: number;
  rating: number;
  feedback: string;
};

export type Wish = {
  id: number;
  productId: number;
};
export interface UserCart {
  id: number;
  userId: number;
  items: CartItem[];
  total: string;
  quantity: number;
  product: number;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartState {
  isLoading: boolean;
  data: UserCart | null;
  error: boolean | string;
}

export type DispatchType = (args: ArticleAction) => ArticleAction;
