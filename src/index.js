const {
  Client,
  GatewayIntentBits,
  Partials
} = require("discord.js");

// ================================
// CONFIGURAÇÃO DO BOT
// ================================

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ],

  partials: [
    Partials.GuildMember
  ]
});

// ================================
// BOT ONLINE
// ================================

client.once("ready", () => {
  console.log(`🤖 Bot conectado como ${client.user.tag}`);
});

// ================================
// MEMBRO ENTROU
// ================================

client.on("guildMemberAdd", async (member) => {

  console.log(`📥 ${member.user.tag} entrou no servidor.`);

});

// ================================
// MEMBRO SAIU
// ================================

client.on("guildMemberRemove", async (member) => {

  console.log(`📤 ${member.user.tag} saiu do servidor.`);

  // --------------------------------
  // CANAL DA MENSAGEM
  // --------------------------------

  const CANAL_SAIDAS_ID = "1544837262817366126"
const canal = member.guild.channels.cache.get(CANAL_SAIDAS_ID);
  
  if (!canal) {
    console.log("❌ Canal #saidas não encontrado.");
    return;
  }

  // --------------------------------
  // MENSAGEM
  // --------------------------------

  const mensagem = `
╔══════════════════════════════════════╗
  🚨 **MEMBRO DESCONECTADO** 🚨
╚══════════════════════════════════════╝

💔 **QUE PENA... VOCÊ SAIU.** 😭

A equipe acaba de receber a notícia e já estamos tomando as devidas providências...

⏳ **Sentimos sua falta por exatos 3 segundos.**

...

Pronto. Passou. 👍😂

🕊️ **Seu desaparecimento será lembrado para sempre.**
Ou pelo menos até alguém mandar uma figurinha nova no chat. 🤡

📢 **MAS TEMOS UMA BOA NOTÍCIA!**

Sua saída proporcionou um benefício importantíssimo para a comunidade:

✨ **MAIS ESPAÇO PRA RESENHA!** ✨

📈 Espaço no servidor: **+1**
📈 Resenha: **+37%**
📈 Palhaçada: **+999%**
📉 Saudade: **0,0007%**
📉 Chance de alguém realmente sentir sua falta: **em análise...** 🤣

🫡 A administração agradece profundamente pelos seus serviços prestados.

Você participou de discussões completamente desnecessárias,
riu de coisas que não tinham graça,
mandou mensagens que provavelmente deveriam ter sido apagadas
e tomou decisões que nem você sabe explicar.

**Um verdadeiro patrimônio histórico.** 🗿🤡

📜 **SEU LEGADO JAMAIS SERÁ ESQUECIDO!**

Principalmente porque agora temos uma nova história pra contar:

> 🗣️ **"Rapaz, tinha um membro aqui..."**
>
> — "Qual?"
>
> 🗣️ **"Não lembro."**
>
> — "Ah."
>
> 🗣️ **"Mas ele saiu."**
>
> 🤣🤣🤣🤡

🎭 **CERIMÔNIA OFICIAL DE DESPEDIDA:**

🥀 1 segundo de silêncio...

...

🔊 **VOLTA A RESENHA!** 😂

👋 Adeus, **${member.user.username}**.

Foi bom enquanto você estava aqui.

Ou pelo menos **foi alguma coisa.** 🤡

🚪 Caso bata saudade, a porta continua aberta.

Só não demora muito pra voltar porque daqui a pouco
**ninguém mais vai lembrar que você existiu.** 😭🤣

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🤖 **SISTEMA DE SAÍDA AUTOMÁTICA**

📋 Função: Detectar membros abandonando o barco.
🎭 Função secundária: Fingir que a administração se importa.
💔 Saudade gerada: **0,7%**
🤡 Resenha liberada: **100%**
😂 Clima após a saída: **INEXPLICAVELMENTE MELHOR**

**Obrigado por sair.**
— *Atenciosamente, ninguém.* 🤡🤣

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

  try {

    const partes = mensagem.match(/[\s\S]{1,1900}/g) || [];

    for (const parte of partes) {
        await canal.send(parte);
    }

    console.log(`✅ Mensagem de saída enviada para ${member.user.tag}`);

} catch (error) {

    console.error("❌ Não foi possível enviar a mensagem:", error);

}

// 💌 MENSAGEM NO PV

try {

    console.log(`💌 Tentando enviar PV para ${member.user.tag}...`);

    await member.user.send(`
🌟 **EI, VOCÊ AÍ.**

Então você realmente saiu do servidor... 😭

A administração gostaria de informar que:

💗 **Ninguém pediu sua saída, mas obrigado pela contribuição.** 😂

Sua ausência será registrada no sistema como:

📋 **Motivo da saída:**
> "Saiu porque quis."

📊 **Impacto no servidor:**
> **Praticamente nenhum.** 🤡

💗 **Saudade:**
> **0,0007%**

🎉 **Resenha liberada:**
> **+100%**

Enfim...

Foi bom enquanto durou.

Ou pelo menos foi alguma coisa. 😂😭

🌟 **Até nunca... ou até voltar escondido.**

— Atenciosamente, ninguém. 🤡
`);

    console.log(`💌 PV enviado com sucesso para ${member.user.tag}!`);

} catch (error) {

    console.error(`❌ NÃO FOI POSSÍVEL ENVIAR PV PARA ${member.user.tag}.`);
    console.error("Motivo:", error);

}

});

// ==============================
// LOGIN
// ==============================

client.login(process.env.DISCORD_TOKEN);
