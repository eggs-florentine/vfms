const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Sends a note in the sessions channel to explain session-specific information.')
    .addStringOption(option => 
      option
        .setName('content')
        .setDescription('Content to send')
        .setRequired(true)),
  async execute(interaction) {
    await interaction.reply({ content: 'pong!', ephemeral: true });
  },
};
