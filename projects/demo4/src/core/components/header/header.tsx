import reactLogo from '@assets/react.svg';
import './header.css';
import { AppContext } from '@context/context';
import { use } from 'react';

interface Props {
  children?: React.ReactNode;
}
export const Header: React.FC<Props> = ({ children }) => {
  const { title } = use(AppContext);
  return (
    <header className="header">
      <div className="header-main">
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <h1>{title}</h1>
      </div>
      {children && <div className="header-children">{children}</div>}
    </header>
  );
};
