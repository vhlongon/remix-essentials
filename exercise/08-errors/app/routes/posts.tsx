import { Outlet } from "@remix-run/react";
import { ErrorFallback } from "~/components";

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <ErrorFallback>
      Somethine went wrong with the posts: ${error.message}
    </ErrorFallback>
  );
};

const Posts = () => {
  return <Outlet />;
};

export default Posts;
