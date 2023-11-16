import { useEffect } from "react";

import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";
import { useInView } from "react-intersection-observer";

const Home = () => {
  const { ref, inView } = useInView();
  const { data: posts, fetchNextPage, hasNextPage } = useGetRecentPosts();

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  if (!posts) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {posts?.pages.map((item) => (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {item?.documents.map((post) => (
                <PostCard key={post.$id} post={post} />
              ))}
            </ul>
          ))}
        </div>
      </div>

      {hasNextPage && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Home;
