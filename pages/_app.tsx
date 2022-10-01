import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { ApolloProvider } from "@apollo/client";

import client from '../apollo-client'
import "../styles/globals.css";
import Header from "../components/Header";

const MyApp = ({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) => {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={pageProps.session}>
        <div className="h-screen overflow-y-scroll bg-slate-200">
          <Header />
          <Component {...pageProps} />
        </div>
      </SessionProvider>
    </ApolloProvider>
  );
};

export default MyApp;
