import { CalendarDaysIcon, ListBulletIcon } from "@heroicons/react/24/outline"

const ScheduleButton = ({ setCalendar, isCalendar, title }) => {
    return (
        <button onClick={setCalendar} type="button" className="btn text-sm w-32 justify-center cursor-pointer hover:bg-cyan-400 hover:text-white text-cyan-400 flex items-center gap-1 hover-animation bg-white border-[1px] border-cyan-400 rounded p-3">
            {!isCalendar ? <CalendarDaysIcon className="h-5 " /> : <ListBulletIcon className="h-5" />}
            {!isCalendar ? title : 'Table'}
        </button>
    )
}
export default ScheduleButton;