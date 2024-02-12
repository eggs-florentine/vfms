const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const fs = require('node:fs');

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
    if ( !interaction.member.roles.cache.has('1153547413055877192') &&  !interaction.member.roles.cache.has('1153546820694327327') ) { return; }

    const id = interaction.options.getUser('user').id;
    const gm = interaction.guild.members.cache.get(interaction.options.getUser('user').id);

    const welcome = "Welcome to the VFMS Staff Team. \n \n You have been selected by Division Leadership to represent the Vancouver Fire and Medical Services team of supervisors. \n Ensure you read the entirety of #⁠⁠staff-resources before you go on-duty. \n \n You now need to start logging your shifts. You can run the /shift command in ⁠⁠staff-spam. As stated on the application, you require 1 hour per week to keep your position. \n \n Please click the button below to acknowledge this message and be given your roles.";


    obj = '{\"time\": \"' + interaction.createdAt + '\"}';
    fs.writeFile('logs.json', obj, err => {
    if (err) {
        console.error(err);
    } else {
        console.log('written');
      // file written successfully
    }
    });

    const acknowledge = new ButtonBuilder()
        .setCustomId('ack')
        .setLabel('Acknowledge')
        .setStyle(ButtonStyle.Secondary)
    
    const row = new ActionRowBuilder()
        .addComponents(acknowledge);

    await interaction.options.getUser('user').send({content: welcome, components: [row]});

    await interaction.reply({ content: 'onboarded!', ephemeral: true});
  },
};
