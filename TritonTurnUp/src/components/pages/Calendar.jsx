import Navbar from '../navbar/Navbar'
import {Calendar, Views, dayjsLocalizer} from 'react-big-calendar'
import {Fragment, useMemo, useState} from 'react'
import myEvents from './events'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
dayjs.extend(timezone)



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
const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  })

const localizer = dayjsLocalizer(dayjs)

export default function Dayjs({ ...props }) {
  const { components,defaultDate, max } = useMemo(
    () => ({
      components: {
        timeSlotWrapper: ColoredDateCellWrapper,
      },
      defaultDate: new Date().toLocaleDateString(),
      max: dayjs().endOf('day').subtract(1,'hours').toDate(),
    }),
    []
  )

  return (
    <Fragment>
      <Navbar />
      <div className='height600' {...props}> 
        <Calendar
          components={components}
          defaultDate={defaultDate}
          events={myEvents}
          localizer = {localizer}
          max={max}
          showMultiDayTimes
          style = {{height: 600}}
          step={60}
        />
      </div>
    </Fragment>
  )
}