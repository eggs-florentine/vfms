const { EmbedBuilder, SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('logra')
    .setDescription('Logs a SCOPE Ride Along'),
  async execute(interaction) {


    const modal = new ModalBuilder()
      .setCustomId('ram')
      .setTitle('Explain your ride along');

    const userInput = new TextInputBuilder()
      .setCustomId('userInput')
      .setLabel('What is the roblox username of the trainee?')
      .setStyle(TextInputStyle.Short);

    const summaryInput = new TextInputBuilder()
      .setCustomId('summaryInput')
      .setLabel('Summarize your R/A')
      .setStyle(TextInputStyle.Paragraph);

    const row1 = new ActionRowBuilder()
      .addComponents(userInput)

    const row2 = new ActionRowBuilder()
      .addComponents(summaryInput)

    modal.addComponents(row1, row2);

    await interaction.showModal(modal);
  },
};


