const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('node:fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('query')
    .setDescription('query the logs database'),
   async execute(interaction) {
    await interaction.reply({ content: 'Decision issued!', ephemeral: true });
  }
}
