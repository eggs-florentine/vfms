const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('node:fs');
const uri = "mongodb+srv://reflqctnl:Z7dYtNMRSq0sYoKC@vfms.bizx1qj.mongodb.net/?retryWrites=true&w=majority";
const { MongoClient, ServerApiVersion } = require('mongodb');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('deny-certification')
    .setDescription('denies a user from either NFPA or ACP certification')
    .addStringOption(option =>
      option
        .setName('certification')
        .setDescription('what to deny the user from')
        .addChoices(
          { name: 'National Fire Protection Association', value: 'NFPA 1001' },
          { name: 'Advanced Care Paramedic', value: 'Advanced Care Paramedic' },
        )
        .setRequired(true))
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('The user you want to deny')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames),
  async execute(interaction) {

    await interaction.deferReply({ ephemeral: true });

    try {
      const client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });


      /* try {
        await client.connect();
        console.log('connected')
        client.db("vfms").collection('certifications').insertOne({ name: interaction.options.getUser('user').id, result: 'denied', staff: interaction.user.id, time: interaction.createdAt, certification: interaction.options.getString('certification') });
      } catch (e) {
        console.log(e);
      } finally {
        await client.close();
      }
      */

      if (!interaction.member.roles.cache.has('1211620908574179329') && !interaction.member.roles.cache.has('1153546820694327327') && !interaction.member.roles.cache.has('1180524055548399718')) { interaction.editReply('You do not have permission to run this command!'); return; }

      const id = interaction.options.getUser('user').id;
      const gm = interaction.guild.members.cache.get(interaction.options.getUser('user').id);

      obj = '{\"time\": \"' + interaction.createdAt + '\"}';
      fs.writeFile('logs.json', obj, err => {
        if (err) {
          console.error(err);
        } else {
          // file written successfully
        }
      });

      const embed = new EmbedBuilder()
        .setTitle('Command usage')
        .setDescription('A command marked as important has been used by <@' + interaction.user.id + '>')
        .addFields({ name: 'Command', value: '/deny-certification ' + 'user: <@' + interaction.options.getUser('user').id + '> certification: ' + interaction.options.getString('certification') })

      try {
        interaction.guild.channels.cache.get('1206541620779024404').send({ embeds: [embed] });
      } catch {
        interaction.reply('The user cannot be DMed messages.');
        return;
      }


      const certified = new EmbedBuilder()
        .setTitle('Certification Application Result')
        .setDescription('This is a notification to inform you you have failed your ' + interaction.options.getString('certification') + ' examination. If you believe this was unfair, or you wish to obtain more reasoning behind your denial, please open a ticket and a member of the Clinical Support team will look into your submission. This was issued by ' + interaction.member.displayName + '.')
        .setColor(0xeb4034)

      try {
        await interaction.options.getUser('user').send({ embeds: [certified] });
      } catch {
        interaction.editReply('The user cannot be DMed messages.');
        return;
      }

      await interaction.editReply({ content: 'Denial issued!', ephemeral: true });
    } catch (error) {
      interaction.guild.members.cache.get('684989568386334746').send('/medical error');
    }
  },
};