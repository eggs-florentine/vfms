const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
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
            {name: 'NFPA 1001', value: 'NFPA 1001'},
            {name: 'Advanced Care Paramedic', value: 'Advanced Care Paramedic'},
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

    if (interaction.options.getString('certification') === 'NFPA 1001') { gm.roles.add(interaction.guild.roles.cache.get('843336886897737748')); } // 1206477803092967424 nfpa deployment

    if (interaction.options.getString('certification') === 'Advanced Care Paramedic') { gm.roles.add(interaction.guild.roles.cache.get('862644795272200212')); } // 1153613177821609994 acc deployment

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
        .addFields({name: 'Command', value: '/certify ' + 'user: <@' + interaction.options.getUser('user').id + '> certification: ' + interaction.options.getString('certification')})

    interaction.guild.channels.cache.get('851246677959770142').send({embeds: [embed]});

    const certified = new EmbedBuilder()
        .setTitle('Congratulations on being certified!')
        .setDescription('This is a notification to inform you you have been certified with the ' + interaction.options.getString('certification') + '! Congratulations. This was issued by ' + interaction.member.displayName + '.')
        .setColor(0x0faf4f)
    
    await interaction.options.getUser('user').send({embeds: [certified]});

    await interaction.reply({ content: 'Certification issued!', ephemeral: true });
  },
};
