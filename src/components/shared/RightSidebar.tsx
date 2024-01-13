import { useGetTopCreators } from "@/lib/react-query/queriesAndMutations";
import UserCard from "./UserCard";

const RightSidebar = () => {
  const {
    data: creators,
    isLoading: isUserLoading,
    isError: isErrorCreators,
  } = useGetTopCreators();

  console.log("creators", creators);

  return (
    <div className="rightsidebar">
      <div className="flex flex-col gap-11">
      <h3 className="body-bold md:h3-bold">Top Creators</h3>

        <div className="flex flex-wrap gap-6">
          {creators?.documents.map((creator) => (
              <UserCard key={creator.$id} name={creator.name} image={creator.imageUrl} onClick={() => null} />
          ))}
          {creators?.documents.map((creator) => (
              <UserCard key={creator.$id} name={creator.name} image={creator.imageUrl} onClick={() => null} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
