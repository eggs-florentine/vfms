// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const { sendContentToChannel, sendEmbedsToChannel, addRoleByName, removeRoleByName, getChannelByName, getRoleByName, getMemberByName } = require('./InteractionManager.js')
const { token } = require('./config.json');
const uri = "mongodb+srv://reflqctnl:Z7dYtNMRSq0sYoKC@vfms.bizx1qj.mongodb.net/?retryWrites=true&w=majority";
const { MongoClient, ServerApiVersion } = require('mongodb');
const cron = require('node-cron');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

global.latestDaSubmission = "";

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }
}


// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);

  /* cron.schedule('* * 18 * * Sunday', () => {
    const guild = client.guilds.cache.get('1153503678653800490');
    const embe = new EmbedBuilder()
      .setTitle('Check weekly activity!')
      .setDescription('Please check the weekly activity of VFMS staff members using /activity week. If they are not on LOA and have not met the quota, open a discussion channel on them under the category Discipline and Standards. ')
      .setColor(0xf2a90a)
    guild.channels.cache.get('1161943785685647381').send({ embeds: [embe] });
  });

  cron.schedule('* * 10,11,12,13,14,15 * * *', () => {
    const guild = client.guilds.cache.get('1153503678653800490');
    const emb = new EmbedBuilder()
      .setTitle('Host group shifts!')
      .setDescription('Group shifts are a easy and simple way for VFMS staff to boost activity on the team and play with others. Please ensure you are available for the next 1 hour if you choose to host a group shift.')
      .setColor(0x2b3099)

    guild.channels.cache.get('1153610799596716062').send({ embeds: [emb] });
  }); */
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }





  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
    } else {
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  }
}
  ,)



/*
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isButton()) { return; }

  const modal = new ModalBuilder()
  .setCustomId('div')
  .setTitle('Division Request Form')

  const divisionInput = new TextInputBuilder()
    .setCustomId('divisionInput')
    .setLabel('What division are you applying for? (PR/OP/HR)')
    .setStyle(TextInputStyle.Short)
  
  const reasonInput = new TextInputBuilder()
    .setCustomId('reasonInput')
    .setLabel('Why should you, and why do you want to, join that division?')
    .setStyle(TextInputStyle.Paragraph)

  const firstRow = new ActionRowBuilder()
    .addComponents(divisionInput)

  const secondRow = new ActionRowBuilder()
    .addComponents(reasonInput)

  modal.addComponents(firstRow, secondRow);

  await interaction.showModal(modal);
})
*/

client.on(Events.InteractionCreate, async interaction => {
  if (interaction.isButton()) {
    /* interaction.client.guilds.cache.get('1153503678653800490').members.cache.get(interaction.user.id).roles.add('1153547483125927979'); // TODO: add vfms sserver ids and role ids
    interaction.client.guilds.cache.get('1153503678653800490').members.cache.get(interaction.user.id).roles.add('1153547346085433435');
    interaction.reply('Welcome, you have been given your roles.') */
  }

  if (interaction.isAnySelectMenu()) {
    const modal = new ModalBuilder()
      .setCustomId('dam')
      .setTitle('Elaborate on your disciplinary action');

    const userInput = new TextInputBuilder()
      .setCustomId('userInput')
      .setLabel('What is the roblox username of the receiver?')
      .setStyle(TextInputStyle.Short);

    const reasonInput = new TextInputBuilder()
      .setCustomId('reasonInput')
      .setLabel('Why are you issuing DA?')
      .setStyle(TextInputStyle.Paragraph);

    const extraInput = new TextInputBuilder()
      .setCustomId('extraInput')
      .setLabel('Any extra information? Put N/A if none.')
      .setStyle(TextInputStyle.Short);

    const row1 = new ActionRowBuilder()
      .addComponents(userInput)

    const row2 = new ActionRowBuilder()
      .addComponents(reasonInput)

    const row3 = new ActionRowBuilder()
      .addComponents(extraInput)

    modal.addComponents(row1, row2, row3);

    await interaction.showModal(modal);
  }

  if (interaction.isModalSubmit()) {

    if (interaction.customId === 'ram') {
      const log = new EmbedBuilder()
        .setDescription('An R/A was completed by <@' + interaction.user.id + '> on **' + interaction.fields.getTextInputValue('userInput') + '**. \n \n **Summary:** ' + interaction.fields.getTextInputValue('summaryInput'))

      interaction.guild.channels.cache.get('1158989155053875220').send({ embeds: [log] }); // todo: switch to ra-logs channel

      await interaction.reply('Submitted log!');
      return;
    }


    const user = interaction.fields.getTextInputValue('userInput');
    const reason = interaction.fields.getTextInputValue('reasonInput');
    const extra = interaction.fields.getTextInputValue('extraInput');
    color = 0x00000;

    daDescription = '';

    switch (global.latestDaSubmission) {
      case 'Termination':
        color = 0xf54936;
        // interaction.guild.members.cache.find(interaction.guild.members.cache.find(m => m.nickname === user).id).roles.remove(interaction.guild.roles.cache.get('1153547346085433435'));
        // interaction.guild.members.cache.find(interaction.guild.members.cache.find(m => m.nickname === user).id).roles.remove(interaction.guild.roles.cache.get('1153547483125927979'));
        daDescription = 'The supervisor\'s actions were so severe that their position will be revoked. They may not reapply unless they successfully submit a letter of appeal to the Clinical Education Coordinator.';
        break;
      case 'Demotion':
        color = 0xf58c36;
        daDescription = 'The supervisor will be given a lower rank within the VFMS ranking structure.';
        break;
      case 'Suspension':
        color = 0xf5bf36;
        daDescription = 'An even more severe action that revokes the supervisor\'s authority/position for a period of time (typically 3-7 days).';
        break;
      case 'Formal Written Warning':
        color = 0xd967db;
        daDescription = 'A formal written warning signifies that the supervisor was found to have broken a policy and that they were spoken to about it. It can be used against the supervisor for further escalation if similar infractions occur later on.';
        break;
    }

    description = `You are receiving a ${global.latestDaSubmission} as a result of ${reason}. \n \n [This document](https://docs.google.com/document/d/1XTX2LoUyGFTruiCuTS5CMc_vwwTEHwf1w_gnejOCPAc/edit?usp=sharing) covers your right to appeal and file a complaint against anyone who participated in the investigation. \n \n Filing a formal appeal or complaint are the only ways to dispute this. Any attempts at appealing the action via a reply to this message will not be responded to.`

    const author = 'Issued by ' + interaction.user.displayName;

    const notification = new EmbedBuilder()
      .setTitle('<:vfms:1153668810814013530> Notification of Disciplinary Action')
      .setDescription(description)
      .setColor(color)
      .setAuthor({ name: author })

    const embed = new EmbedBuilder()
      .setTitle(global.latestDaSubmission)
      .setDescription('Issued by <@' + interaction.user.id + '> \n \n \n')
      .addFields(
        { name: 'User', value: user },
        { name: 'Reason', value: reason },
        { name: 'Notes', value: extra }
      )
      .setColor(color)

    /* const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });


    try {
      await client.connect();
      console.log('connected')
      client.db("vfms").collection('da').insertOne({ name: interaction.options.getUser('user').id, staff: interaction.user.id, type: global.latestDaSubmission, reason: reason, notes: extra, time: interaction.createdAt });
    } catch (e) {
      console.log(e);
    } finally {
      await client.close();
    } */

    interaction.guild.channels.cache.get('1206541451786461224').send({ embeds: [embed] });

    try {
      interaction.guild.members.cache.find(m => m.nickname === user).send({ embeds: [notification] });
    } catch {
      interaction.reply('The user cannot be DMed messages.');
      return;
    }


    interaction.reply('Issued DA!');
  }
})



// Log in to Discord with your client's token
client.login(token);
