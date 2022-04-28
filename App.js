import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Navigation} from './src/infrastructure/navigation';

const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Navigation />
    </QueryClientProvider>
  );
};

export default App;
