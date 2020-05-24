import React from 'react';
import { AsyncStorage } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

const NOTIFICATION_KEY = 'MobileFlashcard:notifications';
const CHANNEL_ID = 'QuizReminder';

export function resetNotfication() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

function createNotification() {
  return {
    title: '👋Mobile Flashcards funny Quiz remider  👋',
    body: " Don't forget to take a quiz for today, keep going!",
    ios: {
      sound: true
    },
    android: {
      channelId: CHANNEL_ID,
      sticky: false,
      color: 'black'
    }
  };
}

function createChannel() {
  return {
    name: 'Quiz Reminder',
    description: 'This is a daily reminder for you to make a quiz on the mobile flashcards app.',
    sound: true,
    priority: 'high'
  };
}

export function makeNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
    
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
  
          if (status === 'granted') {
            Notifications.createChannelAndroidAsync(CHANNEL_ID, createChannel())
              .then(val => console.log('channel return:', val))
              .then(() => {
                Notifications.cancelAllScheduledNotificationsAsync();

                const tomorrow = new Date();
            

                tomorrow.setDate(tomorrow.getDate() + 1);
                tomorrow.setHours(3);
                tomorrow.setMinutes(30);

                Notifications.scheduleLocalNotificationAsync(
                  createNotification(),
                  {
                    time: tomorrow,
                    //daily notification
                    repeat: 'day'
                  }
                );

                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
              })
              .catch(err => {
                console.log('err', err);
              });
          }
        });
      }
    });
}