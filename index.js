// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const { token } = require('./config.json');


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
    interaction.client.guilds.cache.get('809897578195058690').members.cache.get(interaction.user.id).roles.add('862644795272200212'); // TODO: add vfms sserver ids and role ids
    interaction.reply('Welcome, you have been given your roles.')
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
    const user = interaction.fields.getTextInputValue('userInput');
    const reason = interaction.fields.getTextInputValue('reasonInput');
    const extra = interaction.fields.getTextInputValue('extraInput');
    color = 0x00000;

    switch (global.latestDaSubmission) {
      case 'Termination':
        color = 0xf54936;
        break;
      case 'Demotion':
        color = 0xf58c36;
        break;
      case 'Suspension':
        color = 0xf5bf36;
        break;
      case 'Formal Written Warning':
        color = 0xd967db;
        break;
      case 'Documentation':
        color = 0xed7ecf;
        break;
    }

    const embed = new EmbedBuilder()
      .setTitle(global.latestDaSubmission)
      .setDescription('Issued by <@' + interaction.user.id + '> \n \n \n')
      .addFields(
        {name: 'User', value: user},
        {name: 'Reason', value: reason},
        {name: 'Notes', value: extra}
      )
      .setColor(color)
    
    interaction.guild.channels.cache.get('1206541451786461224').send({embeds: [embed]});

    interaction.reply('Issued DA!');
  }
})



// Log in to Discord with your client's token
client.login(token);
