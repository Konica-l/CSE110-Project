const now = new Date()
//MONTHS ARE ZERO INDEXED
export default [
    /* {
      id: 0,
      title: 'All Day Event very long title',
      allDay: true,
      start: new Date(2015, 3, 0),
      end: new Date(2015, 3, 1),
    }, */
    {
      id: 1,
      title: 'Long Event',
      start: new Date(2024, 10, 7),
      end: new Date(2024, 10, 10),
    },
  
    {
      id: 2,
      title: 'DTS STARTS',
      start: new Date(2024, 10, 19),
      end: new Date(2024, 10, 20),
    },
    {
      id: 14,
      title: 'Today',
      start: new Date(new Date().setHours(new Date().getHours() - 3)),
      end: new Date(new Date().setHours(new Date().getHours() + 3)),
    },

]