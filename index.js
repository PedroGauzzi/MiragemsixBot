/*

 _Este bot foi criado pelo Rony caso vá usar_
  ⚠️ _Não retire os créditos do canal_ ⚠️

                🌐 Canal 🌐

  Rony / Spectrum : https://youtube.com/@Spectrum_bots

                ⚙️ REST API ⚙️
                
                 *EM BREVE*
*/


/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  📦 MÓDULOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, Browsers, DisconnectReason } = require('@whiskeysockets/baileys')
const pino = require('pino')
const readline = require('readline')

/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ⚙️ CONFIGS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

const prefix = '!'
let jaPareou = false

/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ⚒️ FUNCOES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

const esperar = async (tempo) => {
    return new Promise(funcao => setTimeout(funcao, tempo));
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))

/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  🤖 BOT E CONEXÃO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

    async function ligarbot() {
    
    const { state, saveCreds } = await useMultiFileAuthState('./sessao')
    const { version, isLatest } = await fetchLatestBaileysVersion()
    
    const client = makeWASocket({
      version,
      auth: state,
      logger: pino({ level: 'silent' }),
      browser: Browsers.ubuntu('Chrome'),
      printQRInTerminal: false
      })



/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ♻️ DADOS DA CONEXÃO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

client.ev.on('creds.update', saveCreds)

client.ev.on('chats.set', () => {
console.log('setando conversas...')
})

client.ev.on('contacts.set', () => {
console.log('setando contatos...')
})

/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  📧 MENSAGENS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

client.ev.on('messages.upsert', async ({ messages }) => {
try {

const info = messages[0]
if (!info.message) return 
if (info.key.fromMe) return

const key = {
    remoteJid: info.key.remoteJid,
    id: info.key.id, 
    participant: info.key.participant 
}
await client.readMessages([key])
if (info.key && info.key.remoteJid == 'status@broadcast') return

const altpdf = Object.keys(info.message)
const type = altpdf[0] == 'senderKeyDistributionMessage' ? altpdf[1] == 'messageContextInfo' ? altpdf[2] : altpdf[1] : altpdf[0]

const body = (type === 'conversation') ?
info.message.conversation : (type == 'imageMessage') ?
info.message.imageMessage.caption : (type == 'videoMessage') ?
info.message.videoMessage.caption : (type == 'extendedTextMessage') ?
info.message.extendedTextMessage.text : (type == 'buttonsResponseMessage') ?
info.message.buttonsResponseMessage.selectedButtonId : (info.message.listResponseMessage && info.message.listResponseMessage.singleSelectReply.selectedRowId.startsWith(prefix) && info.message.listResponseMessage.singleSelectReply.selectedRowId) ? info.message.listResponseMessage.singleSelectReply.selectedRowId : (type == 'templateButtonReplyMessage') ?
info.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (info.message.buttonsResponseMessage?.selectedButtonId || info.message.listResponseMessage?.singleSelectReply.selectedRowId || info.text) : ''

const from = info.key.remoteJid
const isCmd = body.startsWith(prefix)
const comando = isCmd ? body.slice(1).trim().split(/ +/).shift().toLocaleLowerCase() : null
const separar = body.trim().split(/ +/).slice(1)
const x = separar.join(' ')

const texto_exato = (type === 'conversation') ? info.message.conversation : (type === 'extendedTextMessage') ? info.message.extendedTextMessage.text : ''
const texto = texto_exato.slice(0).trim().split(/ +/).shift().toLowerCase()


/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  🔰 FUNÇÕES DO BOT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

async function escrever (texto) {
await client.sendPresenceUpdate('composing', from) 
await esperar(1000)   
client.sendMessage(from, { text: texto }, {quoted: info})
}

const enviar = (texto) => {
client.sendMessage(from, { text: texto }, {quoted: info})
}


/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  🎮 COMANDOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

switch(comando) {

case 'escrever':
escrever('ola, estou escrevendo como humano')
break

case 'responda':
enviar('ola')
break

case 'menu':
const menu = `
╔═══════════════════╗
   🤖 𝙏𝙀𝘾 𝙆𝙊𝘿𝙀 𝘽𝙊𝙏 🤖
╚═══════════════════╝

✨ 𝙈𝙀𝙉𝙐 𝘿𝙀 𝘾𝙊𝙈𝘼𝙉𝘿𝙊𝙎 ✨

📌 ┃ INFORMAÇÕES
┃ ➤ ${prefix}menu
┃ ➤ ${prefix}ping
┃ ➤ ${prefix}info
┃ ➤ ${prefix}dono

════════════════
📌 Prefixo: ${prefix}
👨‍💻 Criador: Rony
⚡ Versão: 2.0.0
════════════════
`
escrever(menu)
break

case 'ping':
enviar(`🏓 Pong`)
break

case 'info':
const info = `
╔═ 🤖 INFO BOT 🤖 ══╗
║
║ 🤖 Nome: Tec Kode Bot
║ ⚡ Versão: 2.0.0
║ 👨‍💻 Criador: Tec Kode
║ 🧠 Linguagem: Node.js
║ 📦 Biblioteca: Baileys
║ 📆 Criado em: 2026
║
║ 📢 Canal: https://youtube.com/@Spectrum_bots
║ 💬 Suporte: https://chat.whatsapp.com/GKtazVKJLgeCoU5dkZdT24?mode=gi_t
║
║ "Automatizando seu grupo ⚡"
║
╚═══════════════╝
`
escrever(info)
break

case 'dono':
const dono = `
╔═ 👑 DONO DO BOT 👑 ══╗
║
║ 👑 Nome: Rony (Spectrum)
║ 💻 Função: Desenvolvedor
║ 📞 WhatsApp: wa.me/5582994174972
║ 📺 YouTube: https://youtube.com/@Spectrum_bots
║ 🌐 GitHub: https://github.com/Rony-S
║
║ "Criador da máquina 🤖⚡"
║
╚══════════════════╝
`
escrever(dono)
break

}





} catch (erro) {
console.log(erro)
}})


/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  🌐 CONEXAO DO BOT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

client.ev.on('connection.update', async (update) => {
  const { connection, lastDisconnect, qr } = update

  if (qr && !client.authState.creds.registered && !jaPareou) {
  
  jaPareou = true
  const Pergunta = await question('Por Favor Me diga Seu número\n')
  const Numero = Pergunta.replace(/[^0-9]/g, '')

  let codigo = await client.requestPairingCode(Numero)
  codigo = codigo?.match(/.{1,4}/g)?.join("-") || codigo
  console.log(`Codigo de Pareamento: ${codigo}`)
  }
  
  if (connection === 'open') {
    console.log('✅ Bot conectado com sucesso')
  }
  
  if (connection === 'close') {
    const statusCode = lastDisconnect?.error?.output?.statusCode
    console.log('❌ Conexão fechada. Código:', statusCode)

    if (statusCode !== DisconnectReason.loggedOut) {
      console.log('🔄 Reconectando sem refazer pairing...')
      ligarbot()
    } else {
      console.log('🚪 Deslogado. Apague a pasta sessao e pareie novamente.')
    }
  }
})
}

ligarbot()