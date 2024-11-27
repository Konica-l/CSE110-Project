import Navbar from '../navbar/Navbar'
import {Calendar, Views, dayjsLocalizer} from 'react-big-calendar'
import {Fragment, useMemo, useState} from 'react'
import myEvents from './events'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
dayjs.extend(timezone)

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