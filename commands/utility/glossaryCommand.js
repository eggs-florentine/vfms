const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('node:fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('glossary')
    .setDescription('see all commands'),
  async execute(interaction) {
        const gloss = new EmbedBuilder()
        .setTitle('Commands Glossary')
        .setDescription('This is a glossary of all commands implemented in the VFMS bot.')
        .setColor(0x0faf4f)
        .addFields(
            { name: '/appeal accept/deny', value: '*leadership+* denies or accepts an appeal'},
            { name: '/onboard', value: '*tl+* onboards new supervisors'},
            { name: '/promote', value: '*leadership+* promotes a user'},
            { name: '/certify', value: '*cs* certifies a user with a given certification'}
        )

        interaction.reply({embeds: [gloss], ephemeral: true});
  },
};
