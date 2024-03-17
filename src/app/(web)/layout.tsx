import '@/scss/global.scss';
import 'react-toastify/dist/ReactToastify.css';

import type { Metadata } from 'next';
import { Source_Code_Pro } from 'next/font/google';
import { Slide, ToastContainer } from 'react-toastify';

import { CreateTeamContextProvider } from '../hooks/context/registerContext';

const sourceCode = Source_Code_Pro({
  subsets: ['latin'],
  weight: ['200', '400', '600', '900'],
});

export const metadata: Metadata = {
  title: 'Cicada 3301',
  description: 'There is a message hidden in this page',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={sourceCode.className}
        style={{
          background: 'rgb(7 13 14)',
          color: 'white',
          width: '100dvw',
          overflowX: 'hidden',
        }}
      >
        <main>
          <CreateTeamContextProvider>{children}</CreateTeamContextProvider>
          <ToastContainer
            autoClose={3000}
            position="top-right"
            closeOnClick
            transition={Slide}
            toastClassName={'toast-custom'}
            progressClassName={'toast-progress-custom'}
            closeButton={false}
          />
        </main>
      </body>
    </html>
  );
}
