import { Link } from "react-router-dom";

interface PropTypes {
  link: string;
  children: React.ReactNode;
}
const LinkToUpdatePage = ({ link, children }: PropTypes) => (
  <Link to={link}>{children}</Link>
);

export default LinkToUpdatePage;
