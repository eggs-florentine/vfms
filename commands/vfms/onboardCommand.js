const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const fs = require('node:fs');
const uri = "mongodb+srv://reflqctnl:Z7dYtNMRSq0sYoKC@vfms.bizx1qj.mongodb.net/?retryWrites=true&w=majority";
const { MongoClient, ServerApiVersion } = require('mongodb');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('onboard')
    .setDescription('onboards supervisors')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('The user you want to onboard')
        .setRequired(true)),
  async execute(interaction) {
    if (!interaction.member.roles.cache.has('1211620908574179329') && !interaction.member.roles.cache.has('1153546820694327327') && !interaction.member.roles.cache.has('1161944281561444353')) { interaction.reply('You do not have permission to run this command!'); return; }

    await interaction.deferReply({ ephemeral: true });

    const id = interaction.options.getUser('user').id;
    const gm = interaction.guild.members.cache.get(interaction.options.getUser('user').id);

    const welcome = ":tada: **Welcome to the VFMS Staff Team** \n \n You have been selected by Division Leadership to represent the Vancouver Fire and Medical Services team of supervisors. \n Ensure you read the entirety of **#⁠⁠staff-resources** before you go on-duty. \n \n You now need to start logging your shifts. You can run the `/shift` command in ⁠**⁠staff-spam**. As stated on the application, you require 1 hour per week to keep your position. \n \n Please click the button below to acknowledge this message and be given your roles.";


    obj = '{\"time\": \"' + interaction.createdAt + '\"}';
    fs.writeFile('logs.json', obj, err => {
      if (err) {
        console.error(err);
      } else {
        console.log('written');
        // file written successfully
      }
    });

    /* const client = new MongoClient(urde i, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

    try {
      await client.connect();
      console.log('connected')
      client.db("vfms").collection('hr').insertOne({ name: interaction.options.getUser('user').id, staff: interaction.user.id, time: interaction.createdAt });
    } catch (e) {
      console.log(e);
    } finally {
      await client.close();
    } */

    const acknowledge = new ButtonBuilder()
      .setCustomId('ack')
      .setLabel('Acknowledge')
      .setStyle(ButtonStyle.Secondary)

    const row = new ActionRowBuilder()
      .addComponents(acknowledge);

    try {
      await interaction.options.getUser('user').send({ content: welcome, components: [row] })
        .catch((error) => {
          console.error(error);
          return;
        });
    } catch {
      interaction.reply('The user cannot be DMed messages.');
      return;
    }


    const embed = new EmbedBuilder()
      .setTitle('Command usage')
      .setDescription('A command marked as important has been used by <@' + interaction.user.id + '>')
      .addFields({ name: 'Command', value: '/onboard ' + 'user: <@' + interaction.options.getUser('user').id + '>' })

    interaction.guild.channels.cache.get('1206541620779024404 ').send({ embeds: [embed] }).catch((error) => {
      console.error(error);
      return;
    });

    await interaction.editReply({ content: 'onboarded!', ephemeral: true }).catch((error) => {
      console.error(error);
      return;
    });
  },
};
