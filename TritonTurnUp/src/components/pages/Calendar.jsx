import Navbar from '../navbar/Navbar'
import {Calendar, Views, dayjsLocalizer} from 'react-big-calendar'
import {Fragment, useMemo, useState, useEffect, useCallback} from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
dayjs.extend(timezone)

  function monthConvert(month) {
    if (month === "Jan") {return 0}
    if (month === "Feb") {return 1}
    if (month === "Mar") {return 2}
    if (month === "Apr") {return 3}
    if (month === "May") {return 4}
    if (month === "Jun") {return 5}
    if (month === "Jul") {return 6}
    if (month === "Aug") {return 7}
    if (month === "Sep") {return 8}
    if (month === "Oct") {return 9}
    if (month === "Nov") {return 10}
    if (month === "Dec") {return 11}
  }

  function dayConvert(day) {
    day = day.substring(0, day.length-2)
    return parseInt(day)
  }

  function timeConvert(timeString) {
    const period = timeString.substring(timeString.length-2, timeString.length);
    const [hour, minute] = timeString.split(':');
    const timeArr = []
    timeArr.push(parseInt(hour));
    timeArr.push(parseInt(minute));
    if (period === 'pm' && hour != '12') { //check for pm and if its not 12-12:59 pm
      timeArr[0] += 12;
    }
    if (period === 'am' && hour === '12') { //check if its 12 am for whatever reason
      timeArr[0] = 0;
    }
    return timeArr;
  }
const localizer = dayjsLocalizer(dayjs)

export default function Dayjs({ ...props }) {

  const [events, setEvents] = useState([]); // State to hold fetched events
  const [user, setUser] = useState(null);  // State for user data

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        setUser(JSON.parse(storedUser));
    }
  }, []);

  //get list of subscribed events
  useEffect(() => {
    if (user?.sub) {
        fetch(`http://127.0.0.1:5000/customer/subscribed/${user.sub}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch subscribed events.');
                }
                return response.json();
            })
            .then((data) => setEvents(data))
            .catch((error) => console.error('Error:', error));
    }
  }, [user?.sub]);

  //parse dates from string to date object
  for (var i = 0; i < events.length; i++) {
    var dateString = events[i].date_time.split(' ');

    if (dateString.length === 6) { //indicates single-day event
      var timeNormalizer = timeConvert(dateString[3])
      events[i].start = new Date(
                                  2024, 
                                  monthConvert(dateString[1]), 
                                  dayConvert(dateString[2]),
                                  timeNormalizer[0], 
                                  timeNormalizer[1]
                                  )

      timeNormalizer = timeConvert(dateString[5])
      events[i].end = new Date(
                                2024, 
                                monthConvert(dateString[1]), 
                                dayConvert(dateString[2]), 
                                timeNormalizer[0], 
                                timeNormalizer[1]
                                )
    }

    if (dateString.length === 8) { //indicates multi-day event
      var timeNormalizer = timeConvert(dateString[3])
      events[i].start = new Date(
                                  2024, 
                                  monthConvert(dateString[1]), 
                                  dayConvert(dateString[2]), 
                                  timeNormalizer[0], 
                                  timeNormalizer[1]
                                  )
      
      timeNormalizer = timeConvert(dateString[7])
      events[i].end = new Date(
                                2024, 
                                monthConvert(dateString[1]), 
                                dayConvert(dateString[6]), 
                                timeNormalizer[0], 
                                timeNormalizer[1]
                              )
    }
  }

  const handleSelectEvent = useCallback(
    (event) => window.alert(['Start: ', event.start, '\n',
                             'End: ', event.end 
                            ], event.end),
    []
  )

  //set calendar elements
  const { components,defaultDate, max, views } = useMemo(
    () => ({

      defaultDate: new Date().toLocaleDateString(),
      max: dayjs().endOf('day').subtract(1,'hours').toDate(),
      views: [Views.MONTH, Views.DAY, Views.WEEK],
    }),
    []
  )


  return (
    <Fragment>
      <div className='height600' {...props}> 
        <Calendar
          defaultDate={defaultDate}
          onSelectEvent= {handleSelectEvent}
          events={events}
          localizer = {localizer}
          max={max}
          showMultiDayTimes
          style={{height: 600}}
          views = {views}
          step={60}
        />
      </div>
    </Fragment>
  )
}