import Navbar from '../navbar/Navbar'
import {Calendar, Views, momentLocalizer} from 'react-big-calendar'
import {useMemo, useState} from 'react'
import events from 'events'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'



/*export default function CalendarConstruct({
  localizer = mlocalizer,
  ...props
}) {
  const {views} = useMemo( 
    () => ({
      components: {
        timeSlotWrapper: ColoredDateCellWrapper,
      },
      views: Object.keys(Views).map((k) => Views[k]),
    }),
    []
  )
}
return (
    <div>
      <Navbar />
      <h1>Calendar</h1>
      <div id = "calendar">
        <Calendar
            localizer = {mlocalizer}
            events = {events}
            startAccessor= "start"
            endAccessor= "end"
            views = {views}
            style = {{ height: 800 }}
          />
      </div>
    </div>
)*/

const localizer = momentLocalizer(moment)


const CalendarConstruct = (props) => (
    <div>
      <Navbar />
      <h1>Calendar</h1>
      <div id = "calendar">
        <Calendar
            localizer = {localizer}
            //events = {myEventsList}
            startAccessor= "start"
            endAccessor= "end"
            style = {{ height: 800 }}
          />
      </div>
    </div>
)

export default CalendarConstruct