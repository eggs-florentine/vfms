const { SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, ComponentType } = require('discord.js');
const fs = require('node:fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('da')
    .setDescription('issues disciplinary action on a staff member')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('the user you want to give DA')
        .setRequired(true)),
  async execute(interaction) {
    // if ( !interaction.member.roles.cache.has('1153546820694327327') ) { interaction.reply('You do not have permission to run this command!'); return; }

    const select = new StringSelectMenuBuilder()
    .setCustomId('da')
    .setPlaceholder('What type of DA are you issuing?')
    .addOptions(
        new StringSelectMenuOptionBuilder()
            .setLabel('Documentation')
            .setDescription('Issue a documentation.')
            .setValue('Documentation'),
        new StringSelectMenuOptionBuilder()
            .setLabel('Formal Written Warning')
            .setDescription('Issue a FWW.')
            .setValue('Formal Written Warning'),
        new StringSelectMenuOptionBuilder()
            .setLabel('Suspension')
            .setDescription('Issue a suspension.')
            .setValue('Suspension'),
        new StringSelectMenuOptionBuilder()
            .setLabel('Demotion')
            .setDescription('Issue a demotion.')
            .setValue('Demotion'),
        new StringSelectMenuOptionBuilder()
            .setLabel('Termination')
            .setDescription('Issue a termination.')
            .setValue('Termination')
    );

    const row = new ActionRowBuilder()
        .addComponents(select);

    const response = await interaction.reply({components: [row], ephemeral: true})

    const collector = response.createMessageComponentCollector({ componentType: ComponentType.StringSelect, time: 3_600_000 });

    collector.on('collect', async i => {
	    const selection = i.values[0];
        global.latestDaSubmission = selection;
    });

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
        .addFields({name: 'Command', value: '/da ' + 'user: <@' + interaction.options.getUser('user').id + '>'})

    interaction.guild.channels.cache.get('851246677959770142').send({embeds: [embed]});


  },
};
