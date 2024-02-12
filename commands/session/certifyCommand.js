const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('certify')
    .setDescription('certifies a user with either NFPA or ACP certification')
    .addStringOption(option => 
      option
          .setName('certification')
          .setDescription('what to certify the user with')
          .addChoices(
            {name: 'NFPA 1001', value: 'nfpa'},
            {name: 'Advanced Care Paramedic', value: 'acc'},
          )
          .setRequired(true))
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('The user you want to certify')
        .setRequired(true)),
  async execute(interaction) {


    if ( !interaction.member.roles.cache.has('1200642758046658560') &&  !interaction.member.roles.cache.has('1200642570095706222') ) { interaction.reply('You do not have permission to run this command!'); return; }

    const id = interaction.options.getUser('user').id;
    const gm = interaction.guild.members.cache.get(interaction.options.getUser('user').id);

    if (interaction.options.getString('certification') === 'nfpa') { gm.roles.add(interaction.guild.roles.cache.get('843336886897737748')); } // 1206477803092967424 nfpa deployment

    if (interaction.options.getString('certification') === 'acc') { gm.roles.add(interaction.guild.roles.cache.get('862644795272200212')); } // 1153613177821609994 acc deployment

    obj = '{\"time\": \"' + interaction.createdAt + '\"}';
    fs.writeFile('logs.json', obj, err => {
    if (err) {
        console.error(err);
    } else {
      // file written successfully
    }
    });

    await interaction.reply({ content: 'Certification issued!', ephemeral: true });
  },
};
