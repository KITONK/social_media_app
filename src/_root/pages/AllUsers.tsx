import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import Loader from "@/components/shared/Loader";
import { multiFormatDateString } from "@/lib/utils";
import { useGetUsers } from "@/lib/react-query/queriesAndMutations";

const AllUsers = () => {
  const { ref, inView } = useInView();
  const { data: users, fetchNextPage, hasNextPage } = useGetUsers();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (!users) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h3 className="h3-bold md:h2-bold w-full">All Users</h3>
      </div>

      <div className="flex flex-wrap w-full max-w-5xl mt-[40px]">
        {users &&
          users.pages.map((item, index) => (
            <div key={`user-${index}`} className="flex flex-wrap w-full gap-[24px]">
              {item?.documents?.map((creator) => (
                <div key={creator.$id} className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-[12px]">
                    <img
                      src={creator.imageUrl}
                      alt={creator.name}
                      className="w-[48px] h-[48px] rounded-[100%] object-contain"
                    />
                    <div className="flex flex-col">
                      <p className="body-bold">{creator.name}</p>
                      <p className="small-regular text-light-3">@{creator.username}</p>
                    </div>
                  </div>
                  <p>Joined {multiFormatDateString(creator.$createdAt)}</p>
                </div>
              ))}
            </div>
          ))}
      </div>

      {hasNextPage && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default AllUsers;
