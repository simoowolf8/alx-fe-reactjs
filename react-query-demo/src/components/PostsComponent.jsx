import { useQuery } from "react-query";

// Fetch function to get posts from JSONPlaceholder API
const fetchPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

function PostsComponent() {
  // Use the useQuery hook to fetch posts with additional options
  const { data, error, isLoading, isError, refetch, isFetching } = useQuery(
    "posts",
    fetchPosts,
    {
      // Cache the data for 10 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes

      // Keep data from the previous query when refetching
      keepPreviousData: true,

      // Refetch data when the window regains focus
      refetchOnWindowFocus: true,

      // Refetch data when the data is considered stale
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Posts</h1>
      <button onClick={() => refetch()} disabled={isFetching}>
        {isFetching ? "Refetching..." : "Refetch Posts"}
      </button>
      <ul>
        {data.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostsComponent;
