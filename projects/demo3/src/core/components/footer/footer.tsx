import './footer.css';

export const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <p className="read-the-docs">
                Proyecto con TS - React - Vite - Vitest
            </p>
            <p>
                <a
                    href="https://react.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Made with ❤️ by React
                </a>
            </p>
        </footer>
    );
};
