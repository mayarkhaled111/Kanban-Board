import { useNavigate } from "react-router-dom";
import Card from "./Card";

export default function Board() {
  let navigate = useNavigate();

  function navigateTo() {
    navigate('/add')
  }
  return (
    <>
      <h1 className="my-6 text-3xl text-borderColor text-center">Kanban Board</h1>
      <div className="container flex-wrap flex justify-between items-start pt-10 bg-background md:h-[70vh] w-[90%] my-5">
        <div className="my-3 md:w-[24%] w-full border-r-2 border-borderColor px-2  ">
          <div className="border-CardBackGround border-2 rounded-xl md:h-[400px] overflow-scroll scrollbar-thin scrollbar-thumb-customThumb scrollbar-track-customTrack">
            <Card columnName="Unclaimed"></Card>
          </div>
        </div>
        <div className="my-3 md:w-[24%] w-full border-CardBackGround border-2 rounded-xl md:h-[400px] bg-CardBackGround overflow-scroll scrollbar-thin scrollbar-thumb-customThumb scrollbar-track-customTrack">
          <Card columnName="First Contact"></Card>
        </div>
        <div className="my-3 md:w-[24%] w-full border-CardBackGround border-2 rounded-xl bg-CardBackGround overflow-scroll scrollbar-thin scrollbar-thumb-customThumb scrollbar-track-customTrack">
          <Card columnName="Preparing Work Offer"></Card>
        </div>
        <div className="my-3 md:w-[24%] w-full border-CardBackGround border-2 rounded-xl  bg-CardBackGround overflow-scroll scrollbar-thin scrollbar-thumb-customThumb scrollbar-track-customTrack">
          <Card columnName="Send to Therapist"></Card>
        </div>
      </div>
      <div className="text-center mb-6">
        <button type="button" className=" w-[50%] text-borderColor bg-CardBackGround hover:bg-CardBackGround focus:ring-4 focus:ring-CardBackGround font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-CardBackGround dark:hover:bg-CardBackGround focus:outline-none dark:focus:ring-CardBackGround" onClick={navigateTo}> Add Member
        </button>
      </div>
    </>

  )
}
