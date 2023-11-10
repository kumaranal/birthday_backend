const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const schedule = require('node-schedule');

const BirthdayPersonInfo=require('../models/data.models')



const checkBirthdays = schedule.scheduleJob('0 0 * * *', async () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
  
    // Query the database for birthdays with the same date and month
    const matchingBirthdays = await BirthdayPersonInfo.find({
        $and: [
        { day: currentDay },
        { month: currentMonth }
        ]
    });
    // console.log(matchingBirthdays)
  
    // Send emails to people with matching birthdays
    if (matchingBirthdays.length > 0) {
      const transporter = nodemailer.createTransport({
        // Configure your email service and authentication
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: 'somerealemail@gmail.com',
          pass: 'realpasswordforaboveaccount'
        }
      });
  
      matchingBirthdays.forEach(async (person) => {
        const mailOptions = {
          from: 'your.email@gmail.com', // Replace with your email
          to: person.email, // Replace with the recipient's email
          subject: ' Birthday reminder!',
          text: `Happy birthday to, ${person.name}!`,
        };
  
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error(`Error sending birthday email to ${person.name}: ${error}`);
          } else {
            console.log(`Birthday email sent to ${person.name}: ${info.response}`);
          }
        });
      });
    }
  });
  