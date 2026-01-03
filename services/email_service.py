from flask_mail import Message

def send_meeting_email(mail, recipient, name, date, time):
    msg = Message(
        subject="Gold Leaf Ghostwriting: Meeting Scheduled",
        sender="your_email@gmail.com",
        recipients=[recipient],
        body=f"Hi {name},\n\nYour meeting has been scheduled on {date} at {time}.\n\nThank you!"
    )
    mail.send(msg)
