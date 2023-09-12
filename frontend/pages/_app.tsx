import { AppProps } from "next/app";
// import '/src/styles/global.scss';

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;
