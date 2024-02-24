import fetch from 'node-fetch';

const handler = async function (m, { conn }) {
    const args = m.text.split(' ');
    try {
        if (args.length > 0) {
            m.reply('*Downloading*');
            const url = args[0];
            let res = await (await fetch(`https://api.lolhuman.xyz/api/instagram?apikey=5c168427edb54007b897cefe&url=${url}`)).json(); 

            if (!res.result || res.result.length === 0) throw "Error 404";
            conn.sendFile(m.chat, res.result[0], '', '', m);

            for (let imgs of res.result) {   
                let ban = m.mentionedJid[0] || m.sender || conn.parseMention(args[0]) || (args[0].replace(/[@.+-]/g, '').replace(' ', '') + '@s.whatsapp.net') || '';

                if (ban) {
                    conn.sendFile(m.chat, imgs, '', null);
                }
            }
        }
    } catch (error) {
        console.log(error);
        m.reply('حدث خطأ أثناء معالجة طلبك.');
    }
};

handler.customPrefix =  /^(?:https?:\/\/)?(?:www\.)?(?:instagram\.com\/)(?:tv\/|p\/|reel\/)(?:\S+)?$/ig;
handler.command = new RegExp();

export default handler;
