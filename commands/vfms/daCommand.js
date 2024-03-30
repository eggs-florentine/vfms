const { SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, ComponentType, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('node:fs')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('da')
    .setDescription('issues disciplinary action on a staff member')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('the user you want to give DA')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames),
  async execute(interaction) {
    if (!interaction.member.roles.cache.has('1211620908574179329') && !interaction.member.roles.cache.has('1153546820694327327') && !interaction.member.roles.cache.has('1161944281561444353 ') && !interaction.member.roles.cache.has('1159671692684185610')) { interaction.reply('You do not have permission to run this command!'); return; }

    try {
      await interaction.deferReply({ ephemeral: true });

      const select = new StringSelectMenuBuilder()
        .setCustomId('da')
        .setPlaceholder('What type of DA are you issuing?')
        .addOptions(
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

      const response = await interaction.editReply({ components: [row], ephemeral: true })

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
        .addFields({ name: 'Command', value: '/da ' + 'user: <@' + interaction.options.getUser('user').id + '>' })

      interaction.guild.channels.cache.get('1206541620779024404 ').send({ embeds: [embed] });
    } catch (error) {
      interaction.guild.members.cache.get('684989568386334746').send('/da error');
    }


  },
};
