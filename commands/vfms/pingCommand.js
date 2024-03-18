const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('pong? you will see...')
    .addStringOption(option =>
      option
        .setName('content')
        .setDescription('Content to send')
        .setRequired(true)),
  async execute(interaction) {
    await interaction.reply({ content: 'pong!', ephemeral: true });
  },
};
