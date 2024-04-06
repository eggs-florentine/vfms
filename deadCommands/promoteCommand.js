/* const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');
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
    if ( !interaction.member.roles.cache.has('1153546820694327327') ) { interaction.reply('You do not have permission to run this command!'); return; }

    const id = interaction.options.getUser('user').id;
    const gm = interaction.guild.members.cache.get(interaction.options.getUser('user').id);

    gm.roles.add(interaction.options.getRole('role'));

    obj = '{\"time\": \"' + interaction.createdAt + '\"}';
    fs.writeFile('logs.json', obj, err => {
    if (err) {
        console.error(err);
    } else {
        console.log('written');
      // file written successfully
    }
    });

    // TODO: give roblox group rank

    const embed = new EmbedBuilder()
        .setTitle('Command usage')
        .setDescription('A command marked as important has been used by <@' + interaction.user.id + '>')
        .addFields({name: 'Command', value: '/promote ' + 'user: <@' + interaction.options.getUser('user').id + '> role:' + interaction.options.getRole('role').name})

    await interaction.guild.channels.cache.get('1206541620779024404').send({embeds: [embed]});

    if (interaction.options.getRole('role').name === 'advanced care paramedic') {
      gm.roles.add(interaction.guild.roles.cache.get('862644795272200212'));
      // remove supervisor role 
      axios.patch('https://groups.roblox.com/v1/groups/33802420/users/3045485924', {
        roleId: '105282939' 
      }).then(response => console.log(response.data))
      .catch(error => console.error(error));
    }
    
    await interaction.reply({ content: 'Promotion given!', ephemeral: true });
  },
};
*/ 