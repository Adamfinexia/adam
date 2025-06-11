
import emailjs from 'emailjs-com';

export const sendEmailToTeam = (teamEmails, message, project, date) => {
  teamEmails.forEach(email => {
    emailjs.send('your_service_id', 'your_template_id', {
      to_email: email,
      message,
      project,
      date
    }, 'your_public_key')
    .then(response => {
      console.log('SUCCESS!', response.status, response.text);
    }, err => {
      console.error('FAILED...', err);
    });
  });
};
