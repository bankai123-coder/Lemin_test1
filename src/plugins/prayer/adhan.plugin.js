const { PrayerTimes, Coordinates } = require('adhan');
const moment = require('moment');
const { createButtonMessage, createButton } = require('../../utils/buttons');

module.exports = {
    name: 'adhan',
    description: 'Prayer times and Adhan system',
    commands: ['prayer', 'adhan'],
    enabled: true,

    async execute(sock, msg, args) {
        const chat = msg.key.remoteJid;

        if (!args.length) {
            const buttons = [
                createButton('Prayer Times', 'prayer_times'),
                createButton('Set Location', 'prayer_location')
            ];

            await sock.sendMessage(chat, createButtonMessage(
                '🕌 Prayer Times System\nWhat would you like to do?',
                buttons,
                'Choose an option'
            ));
            return;
        }

        // Example coordinates (Mecca)
        const coordinates = new Coordinates(21.422510, 39.826168);
        const prayerTimes = new PrayerTimes(coordinates, Date.now());

        const times = {
            fajr: moment(prayerTimes.fajr).format('HH:mm'),
            dhuhr: moment(prayerTimes.dhuhr).format('HH:mm'),
            asr: moment(prayerTimes.asr).format('HH:mm'),
            maghrib: moment(prayerTimes.maghrib).format('HH:mm'),
            isha: moment(prayerTimes.isha).format('HH:mm')
        };

        await sock.sendMessage(chat, { 
            text: `Prayer Times:\n\n` +
                 `Fajr: ${times.fajr}\n` +
                 `Dhuhr: ${times.dhuhr}\n` +
                 `Asr: ${times.asr}\n` +
                 `Maghrib: ${times.maghrib}\n` +
                 `Isha: ${times.isha}`
        });
    }
};