import { QueryClient, QueryClientProvider } from "react-query";
import PostsComponent from "./PostsComponent"; // Adjust the import path if necessary

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PostsComponent />
    </QueryClientProvider>
  );
}

export default App;
