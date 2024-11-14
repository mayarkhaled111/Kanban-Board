import { useEffect, useState } from "react";
import MemberCard from "./MemberCard";
import { Member } from "../Interfaces";
import { toast } from "react-toastify";

interface Card {
    columnName: string;
}

export default function Card({ columnName }: Card) {
    const [members, setMembers] = useState<Member[]>([]);

    useEffect(() => {
        const storedData = localStorage.getItem("myData");
        if (storedData) {
            const FirstContactData: Member[] = JSON.parse(storedData);
            const filteredData: Member[] = FirstContactData.filter((member) => member?.column?.toLocaleLowerCase() === columnName.toLocaleLowerCase())
            setMembers(filteredData);
        }
    }, []);

    function delCard(id: string): void {
        // update members[] after delete the member
        const MembersAfterDelete = members.filter((member) => member.id !== id);
        setMembers(MembersAfterDelete);

        // update local storage after delete the member
        const storedData = localStorage.getItem("myData");
        if (storedData) {
            const allMembers: Member[] = JSON.parse(storedData);
            const newData = allMembers.filter((member) => member.id !== id);
            localStorage.setItem("myData", JSON.stringify(newData));
        }
        toast.info('Deleted done');
    }


    return (
        <div>
            <div className="flex justify-between m-3">
                <p className="font-bold">{columnName}</p>
                <p className="bg-white w-6 h-6 rounded-full flex justify-center items-center">{members.length}</p>
            </div>
        {members.length > 0 ? (
          <>
            
            {members.map((member) => (
              <MemberCard key={member.id} member={member} deletedCard={delCard} />
            ))}
          </>
        ) : (
          <p className="text-red-500 m-3 text-sm bg-white p-3 rounded-md">No {columnName} members found.</p>
        )}
      </div>
      
    )
}
