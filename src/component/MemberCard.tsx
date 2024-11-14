import { Member } from "../Interfaces";
import { Link } from "react-router-dom";

interface MemberCardInterface {
  member: Member;
  deletedCard: (id: string) => void;
}

export default function MemberCard({ member, deletedCard }: MemberCardInterface) {
  return (
    <div className="bg-white m-3 p-3 rounded-md">
      <div className="flex justify-between items-center">
        <h3 className="text-md font-bold">{member.name}</h3>
        <span className="text-xs text-gray-500">{member.age}yo</span>
      </div>
      <p className="mt-1 text-sm text-gray-600">{member.email}</p>
      <div className="options flex gap-3 justify-between mt-1">
        <span className="text-sm text-gray-500">{member.phone}</span>
        <div className="flex gap-2">
          <span className="cursor-pointer" onClick={() => deletedCard(member.id)}>
            <i className="fa-solid fa-trash fa-md text-red-600"></i>
          </span>
          <Link to={`/update/${member.id}`}>
            <span>
              <i className="fa-solid fa-pen-to-square fa-md text-borderColor"></i>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

