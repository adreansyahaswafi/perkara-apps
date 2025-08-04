import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useRef } from "react";
import { CalendarDateRangeIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";

const Calendar = ({
    title = 'Calendar',
    data = [
        { title: "Meeting", start: "2025-02-01T10:00:00", end: "2025-02-01T11:00:00", },
        { title: "Workshop", start: "2025-02-06T14:00:00", end: "2025-02-06T16:00:00", },
    ],
    initialDate = new Date(),
    callback = () => null
}) => {
    const calendarRef = useRef(null);
    const containerRef = useRef(null);
    // const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
    // const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        const observer = new ResizeObserver(() => {
            if (calendarRef.current) {
                calendarRef.current.getApi().updateSize();
            }
        });

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Function to navigate to the previous month
    const goToPrevMonth = () => {
        if (calendarRef.current) {
            calendarRef.current.getApi().prev();
        }
    };

    // Function to navigate to the next month
    const goToNextMonth = () => {
        if (calendarRef.current) {
            calendarRef.current.getApi().next();
        }
    };

    // Function to navigate to today
    const goToToday = () => {
        if (calendarRef.current) {
            calendarRef.current.getApi().today();
            callback(format(new Date(calendarRef.current.getApi()?.currentData?.dateProfile?.currentDate), 'yyyy'))
        }
    };
    return (
        <div className="p-5 mt-4 shadow-md border-t-3 border-t-cyan-400 rounded bg-white" ref={containerRef}>
            <div className="relative h-12">
                <div className="px-6 py-2 flex absolute bg-cyan-400 w-full top-[-40px] flex-col rounded text-left">
                    <div className="text-xl text-white flex items-center gap-2 font-bold">
                        <CalendarDateRangeIcon className="h-5 text-white" />
                        {title}
                    </div>
                </div>
            </div>
            <FullCalendar
                initialDate={initialDate}
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                customButtons={{
                    prevMonth: {
                        text: "⏮ Prev",
                        click: goToPrevMonth,
                    },
                    nextMonth: {
                        text: "Next ⏭",
                        click: goToNextMonth,
                    },
                    todayButton: {
                        text: "📅 Today",
                        click: goToToday,
                    },
                }}
                headerToolbar={{
                    left: "prevMonth,todayButton,nextMonth",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                // datesSet={handleDatesSet} // Detects month and year changes
                eventClassNames="cursor-pointer !bg-cyan-400 border border-2 border-sky-300 !text-black px-2"
                dayCellClassNames="!h-28 hover:bg-gray-300 hover:text-white"
                viewClassNames="bg-white w-full"
                events={data}
                dayHeaderFormat={{ weekday: "long" }}
                slotLabelFormat={{ hour: "2-digit", minute: "2-digit", hour12: false }}
                eventTimeFormat={{ hour: "2-digit", minute: "2-digit", hour12: false }}
                height="auto"
            />
        </div>
    );
};

export default Calendar;
