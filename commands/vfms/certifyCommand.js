const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('node:fs');
const uri = "mongodb+srv://reflqctnl:Z7dYtNMRSq0sYoKC@vfms.bizx1qj.mongodb.net/?retryWrites=true&w=majority";
const { MongoClient, ServerApiVersion } = require('mongodb');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('certify')
    .setDescription('certifies a user with either NFPA or ACP certification')
    .addStringOption(option =>
      option
        .setName('certification')
        .setDescription('what to certify the user with')
        .addChoices(
          { name: 'National Fire Protection Association', value: 'NFPA 1001' },
          { name: 'Advanced Care Paramedic', value: 'Advanced Care Paramedic' },
        )
        .setRequired(true))
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('The user you want to certify')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames),
  async execute(interaction) {

    if (!interaction.member.roles.cache.has('1211620908574179329') && !interaction.member.roles.cache.has('1153546820694327327') && !interaction.member.roles.cache.has('1180524055548399718')) { interaction.reply('You do not have permission to run this command!'); return; }

    await interaction.deferReply({ ephemeral: true });

    try {
      const id = interaction.options.getUser('user').id;
      const gm = interaction.guild.members.cache.get(interaction.options.getUser('user').id);

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
        client.db("vfms").collection('certifications').insertOne({ name: interaction.options.getUser('user').id, result: 'accepted', staff: interaction.user.id, time: interaction.createdAt, certification: interaction.options.getString('certification') });
      } catch (e) {
        console.log(e);
      } finally {
        await client.close();
      } */

      if (interaction.options.getString('certification') === 'NFPA 1001') { gm.roles.add(interaction.guild.roles.cache.get('1206477803092967424')); } // 1206477803092967424 nfpa deployment

      if (interaction.options.getString('certification') === 'Advanced Care Paramedic') { gm.roles.add(interaction.guild.roles.cache.get('1153613177821609994')); } // 1153613177821609994 acc deployment

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
        .addFields({ name: 'Command', value: '/certify ' + 'user: <@' + interaction.options.getUser('user').id + '> certification: ' + interaction.options.getString('certification') + '' })

      try {
        interaction.guild.channels.cache.get('1206541620779024404').send({ embeds: [embed] });
      } catch {
        interaction.editReply('The user cannot be DMed messages.');
        return;
      }


      const certified = new EmbedBuilder()
        .setTitle('Congratulations on being certified!')
        .setDescription('This is a notification to inform you you have been certified with the ' + interaction.options.getString('certification') + '! Congratulations. This was issued by ' + interaction.member.displayName + '.')
        .setColor(0x0faf4f)

      try {
        await interaction.options.getUser('user').send({ embeds: [certified] });
      } catch {
        interaction.editReply('The user cannot be DMed messages.')
        return;
      }


      await interaction.editReply({ content: 'Certification issued!', ephemeral: true });
    } catch (error) {
      interaction.guild.members.cache.get('684989568386334746').send('/certify error');
    }
  },
}; 