titleRegex= new RegExp("(?<=\\* Event \\* )(.*?)+\\w")
dateRegex= new RegExp("(?<=\\n(Sun|Mon|Tue|Wed|Thu|Fri|Sat|Sun), )(.*) [1-9]?\\w(?=,)")
timeRegex= new RegExp("(?<=, )[1-9]?\\w (AM|PM) to [1-9]?\\w (AM|PM)")
descRegex= new RegExp("(?<=\\*People\\* )[1-9]?\\w (.*?)?\\w(?=   )")
function RGParse() {
  let calendar=CalendarApp.getDefaultCalendar()
  let calName= calendar.getName()
  let emails=GmailApp.search('from:donotreply@rockgympro.com subject:booking confirmed')
  for (var i = 0; i < emails.length; i++) {
    if(emails[i].isUnread()){
      message=emails[i].getMessages()[0].getPlainBody()
      let title= message.match(titleRegex)[0]
      let date=message.match(dateRegex)[0]
      let time=message.match(timeRegex)[0]
      let description=message.match(descRegex)[0]
      Logger.log(date)
      let event=calendar.createEventFromDescription(`${title} on ${date} from ${time}`)
      //Change Location as needed
      event.setLocation('')
      event.setDescription(description)
      emails[i].markRead()
    }
  }
}
