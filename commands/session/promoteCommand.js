const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('promote')
    .setDescription('promotes a user')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('The user you want to promote')
        .setRequired(true))
    .addRoleOption(option => 
        option
        .setName('role')
        .setDescription('the role you want to promote them to')
        .setRequired(true)),
  async execute(interaction) {
    if ( !interaction.member.roles.cache.has('1153546820694327327') ) { return; }

    const id = interaction.options.getUser('user').id;
    const gm = interaction.guild.members.cache.get(interaction.options.getUser('user').id);

    gm.roles.cache.add(interaction.options.getRole('role'));

    obj = '{time: ' + interaction.createdAt + '}';
    fs.writeFile('logs.json', obj, err => {
    if (err) {
        console.error(err);
    } else {
        console.log('written');
      // file written successfully
    }
    });

    // TODO: give roblox group rank
    
    await interaction.reply({ content: 'Promotion given!', ephemeral: true });
  },
};
