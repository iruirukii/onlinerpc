const { Client, MessageAttachment, RichPresence, MessageEmbed } = require('discord.js-selfbot-v13'); // Define Client Constructor And The MessageAttachment Constructor
const exp = require('express'); // Define The Express Package
const req = require("node-fetch");
const s = exp(); // Make New Express Server
const bot = new Client({
  checkUpdate: false
}); // Define The User
const ganti = [
  "Text 1",
  "Text 2",
  "Text 3",
  "Text 4",
  "Text 5",
  "Text 6",
  "Text 7",
  "Text 8",
  "Text 9",
  "Dan Seterusnya",
]; // Ganti Ke Teks Yang Mau Ganti²
const prefix = "?"
const textUtama = "{jam}.{menit} WIB"
const textDua = "ZyxzAntiBoren" // Contoh Kalo Pake Bulan, Tanggal, Jam / Menit
const textTiga = "Unranked" // Contoh Kalo Ganti-Ganti
const textEmpat = "ZyxzAntiBoren"
const type = "PLAYING" // Type :: PLAYING, LISTENING, WATCHING, STREAMING ( Besar Semua )
const gambarGede = "https://cdn.discordapp.com/attachments/1077963981207126036/1102337108464635994/896e0ad35109cb86273693350ccdd559.jpg"
const gambarKecil = "https://cdn.discordapp.com/attachments/1077963981207126036/1094273613517037598/708fa5dc53611d889b23cd71a211b4d3.jpg"
const labelButtonSatu = "TikTok"
const labelButtonDua = "Discord"
const linkButtonSatu = "https://tiktok.com/@zzy_cx0"
const linkButtonDua = "https://discord.gg/3fQwGJ9DWb"
const autoRespond = "Halo banh....ap cb?🗿🍻\n- Auto Respond"

s.all('/', (req, res) => { // Build The Express Server
  res.send("Ready Dek") // Print Text "Ready Dek"
})

s.listen(8080, () => { // Make The Express Servers Listen To 8080 Port
  console.log("Port : 8080") // Console "Port : 8080"
})

bot.on('debug', (a) => {
  if(a.startsWith("Hit a 429")) process.kill(1)
})

bot.on('ready', async () => { // If The User Was Ready
  setInterval(() => { // Create New Interval Function
    function dim(m, y) { // Create "dim" Function
      return new Date(y, m, 0).getDate() // Get The Day Count On Specific Month
    }
    function getOrdinalNum(n) { // Create New Function
      return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : ''); // Get The Ordinal Of Number
    }
    const gonta = ganti[Math.floor(Math.random() * ganti.length)]; // Pick Random Value From The Array
    const date = new Date() // Get New Date
    let tanggal = getOrdinalNum(date.getDate()) // Get The Current Dates
    let lD = dim(date.getMonth() + 1, date.getFullYear()) // Define The Day Counts On Current Month
    let H = date.getHours() // Get The Current Hours
    let hours = (H + 7) % 24// Convert Current Hours To WIB
    let M = date.getMinutes() // Get The Current Minutes
    let minutes = (M + 0) // Do Absolutely Nothing
    let months = date.getMonth()
    let dy = date.getDate()
    let year = date.getFullYear()
    let monthst = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "Desember"
    ]
    let month = monthst[months]
    if (hours < 10) hours = `0${hours}` // If The Hours Length Is 1 Digit, It Add Zero Behind It
    if (minutes < 10) minutes = `0${minutes}` // If The Minutes Length Is 1 Digit, It Add Zero Behind It
    if (dy == lD) tanggal = `Last` // If Current Dates And Last Dates Is Same, It Will Change The Dates To "Last"
    let hasilSatu = textUtama.replace(/{tanggal}/g, tanggal).replace(/{menit}/g, minutes).replace(/{ganti}/g, gonta).replace(/{jam}/g, hours).replace(/{bulan}/g, month).replace(/{tahun}/g, year)
    let hasilDua = textDua.replace(/{tanggal}/g, tanggal).replace(/{menit}/g, minutes).replace(/{ganti}/g, gonta).replace(/{jam}/g, hours).replace(/{bulan}/g, month).replace(/{tahun}/g, year)
    let hasilTiga = textTiga.replace(/{tanggal}/g, tanggal).replace(/{menit}/g, minutes).replace(/{ganti}/g, gonta).replace(/{jam}/g, hours).replace(/{bulan}/g, month).replace(/{tahun}/g, year)
    let hasilEmpat = textEmpat.replace(/{tanggal}/g, tanggal).replace(/{menit}/g, minutes).replace(/{ganti}/g, gonta).replace(/{jam}/g, hours).replace(/{bulan}/g, month).replace(/{tahun}/g, year)
    let pr = new RichPresence() // Creates New RPC
      .setName(`${hasilSatu}`) // RPC Name
      .setType(`${type}`.toUpperCase()) // RPC Type
      .setApplicationId("993210680859701369") // RPC Application ID
      .setAssetsLargeImage(`${gambarGede}`) // RPC Small Image ID
      .setAssetsSmallImage(`${gambarKecil}`) // RPC Large Image ID
      .setAssetsLargeText(`${hasilEmpat}`) // RPC Extra Text
      .setAssetsSmallText(`DC - ${bot.user.tag}`)
      .setState(`${hasilDua}`) // RPC State
      .setDetails(`${hasilTiga}`) // RPC Details
      .setStartTimestamp(Date.now()) // RPC Timestamp
      .addButton(`${labelButtonSatu}`, `${linkButtonSatu}`) // Add New Button
      .addButton(`${labelButtonDua}`, `${linkButtonDua}`)
    bot.user.setActivity(pr.toJSON()) // Activate The RPC
  }, 30 * 1000)
    bot.user.setStatus("dnd")
  console.log(`${bot.user.tag} Is Ready!\nTranslate Command : ${prefix}translate <text> | <language code>`) // Console "Client Is Ready!"
})

bot.on('messageCreate', async (msg) => {
  if(msg.content.includes(`<@${bot.user.id}>`) && !msg.author.bot) return msg.reply({ content: `${autoRespond}` })
  if(
    !msg.content.toLowerCase().startsWith(prefix) ||
    msg.author.id != bot.user.id
  ) return
  const [cmd, ...args] = msg.content
  .slice(prefix.length)
  .trim()
  .split(/ +/g)
  if(cmd.toLowerCase() == "translate" || cmd.toLowerCase() == "tl") {
    let arguments = args.join(" ").split(" | ")
    if(!arguments[0] || !arguments[1]) return msg.reply({ content: "Contoh Command :\n.tl Hello | id"})
    const params = new URLSearchParams({
      to: arguments[1].toLowerCase(),
      text: arguments[0]
    })
    const results = await req("https://api.popcat.xyz/translate?" + params);
    const result = await results.json();
    msg.delete().then(() => msg.channel.send({ content: `${result.translated}` }))
  }
})

bot.login(process.env.token) // Login To The User