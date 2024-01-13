import { Button } from "../ui/button";

interface Props {
  name: string;
  image: string;
  onClick: () => void;
}

const UserCard = ({ name, image, onClick }: Props) => (
  <div className="border-[#1f1f22] border-[1px] px-[24px] py-[34px] flex flex-col flex-1 gap-[10px] rounded-[20px]">
    <img src={image} alt={name} className="w-[54px] h-[54px] rounded-full" />
    <span className="font-bold text-white text-[14px]">{name}</span>
    <Button variant="ghost" onClick={onClick}>
      Follow
    </Button>
  </div>
);

export default UserCard;
