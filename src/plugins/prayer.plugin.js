module.exports = {
    name: 'prayer',
    description: 'Prayer times and Islamic features',
    commands: ['prayer', 'adhan'],
    enabled: true,

    async execute(sock, msg, args) {
        const command = args[0] || msg.message?.conversation?.slice(1).split(' ')[0];
        const chat = msg.key.remoteJid;

        switch (command) {
            case 'prayer':
                const now = new Date();
                const prayerTimes = {
                    fajr: '05:30',
                    dhuhr: '12:15',
                    asr: '15:45',
                    maghrib: '18:20',
                    isha: '19:45'
                };

                await sock.sendMessage(chat, { 
                    text: `🕌 *Prayer Times*\n\n🌅 Fajr: ${prayerTimes.fajr}\n☀️ Dhuhr: ${prayerTimes.dhuhr}\n🌤️ Asr: ${prayerTimes.asr}\n🌅 Maghrib: ${prayerTimes.maghrib}\n🌙 Isha: ${prayerTimes.isha}\n\n📅 Date: ${now.toDateString()}\n\n*Note: Times are approximate. Please check local mosque for exact times.*`
                });
                break;

            case 'adhan':
                await sock.sendMessage(chat, { 
                    text: `🕌 *Adhan Settings*\n\nAdhan notifications: ✅ Enabled\nLocation: Default\n\nTo customize your location and prayer times, contact the bot owner.\n\n🤲 May Allah accept your prayers.`
                });
                break;
        }
    }
};