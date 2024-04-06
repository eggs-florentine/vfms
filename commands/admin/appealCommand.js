const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('node:fs');
const uri = "mongodb+srv://reflqctnl:Z7dYtNMRSq0sYoKC@vfms.bizx1qj.mongodb.net/?retryWrites=true&w=majority";
const { MongoClient, ServerApiVersion } = require('mongodb');


module.exports = {
  data: new SlashCommandBuilder()
    .setName('appeal')
    .setDescription('make a decision on an appeal')
    .addSubcommand(subcommand =>
      subcommand
        .setName('accept')
        .setDescription('accept an appeal')
        .addUserOption(option =>
          option
            .setName('user')
            .setDescription('The user who submitted the appeal')
            .setRequired(true))
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('deny')
        .setDescription('deny an appeal')
        .addUserOption(option =>
          option
            .setName('user')
            .setDescription('The user who submitted the appeal')
            .setRequired(true))
        .addStringOption(option => option.setName('notes').setDescription('notes e.g reason for denial or banned from appealing').setRequired(true)))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)

  ,
  async execute(interaction) {

    await interaction.deferReply({ ephemeral: true });

    try {
      obj = '{\"time\": \"' + interaction.createdAt + '\"}';
      fs.writeFile('logs.json', obj, err => {
        if (err) {
          console.error(err);
        } else {
          console.log('written');
          // file written successfully
        }
      });

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
        client.db("vfms").collection('appeals').insertOne({ name: interaction.options.getUser('user').id, result: interaction.options.getSubcommand(), staff: interaction.user.id, time: interaction.createdAt });
      } catch (e) {
        console.log(e);
      } finally {
        await client.close();
      } */

      if (!interaction.member.roles.cache.has('1211620908574179329') && !interaction.member.roles.cache.has('1153546820694327327')) { interaction.editReply('You do not have permission to run this command!'); return; }

      if (interaction.options.getSubcommand() === 'accept') {

        const accept = new EmbedBuilder()
          .setTitle('<:vfms:1153668810814013530> Notification of Appeal Acceptance')
          .setDescription('Hello. Your recent appeal against your VFMS permanent suspension has been **accepted**. Welcome back to the team! Please take the following measures.')
          .setColor(0x0faf4f)
          .addFields(
            { name: 'Review the rules, regulations and guidelines', value: 'After appealing your removal, you are held to an even higher standard than our regular members for a certain period of time after your appeal. We strongly encourage you review the guidelines again to prevent Disciplinary Action.' },
            { name: 'Be patient and await your re-entry into the team', value: 'A member of the Senior Leadership Team will contact you once your suspension is removed and you can rejoin the team.' },
            { name: 'Rejoin the VFMS group and begin playing', value: 'After your suspension, you were kicked from the Roblox group. Once a member of the Senior Leadership Team tells you you have been unsuspended, you need to rejoin the roblox group and wait a bit to play on VFMS again!' },
          )

        const embed = new EmbedBuilder()
          .setTitle('Command usage')
          .setDescription('A command marked as important has been used by <@' + interaction.user.id + '>')
          .addFields({ name: 'Command', value: '/appeal accept ' + 'user: <@' + interaction.options.getUser('user').id + '>' })

        interaction.guild.channels.cache.get('1206541620779024404').send({ embeds: [embed] });

        try {
          interaction.options.getUser('user').send({ embeds: [accept] });
        } catch {
          await interaction.editReply('The user cannot be DMed messages.');
          return;
        }
      }

      if (interaction.options.getSubcommand() === 'deny') {

        const deny = new EmbedBuilder()
          .setTitle('<:vfms:1153668810814013530> Notification of Appeal Denial')
          .setDescription('Hello. Your recent appeal against your VFMS permanent suspension has been **denied**. More information on your denial and notes  the reviewing staff member gave you are available below.')
          .setColor(0xdd2f20)
          .addFields(
            { name: 'Notes', value: interaction.options.getString('notes') },
          )

        const embed = new EmbedBuilder()
          .setTitle('Command usage')
          .setDescription('A command marked as important has been used by <@' + interaction.user.id + '>')
          .addFields({ name: 'Command', value: '/appeal deny ' + 'user: <@' + interaction.options.getUser('user').id + '>' })

        interaction.guild.channels.cache.get('1206541620779024404').send({ embeds: [embed] });


        try {
          interaction.options.getUser('user').send({ embeds: [deny] });
        } catch {
          await interaction.editReply('The user cannot be DMed messages.');
          return;
        }
      }



      await interaction.editReply({ content: 'Decision issued!', ephemeral: true });
    } catch (error) {
      interaction.guild.members.cache.get('684989568386334746').send('/appeal error');
    }
  },
}; 
