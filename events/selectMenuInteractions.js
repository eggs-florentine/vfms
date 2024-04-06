const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isAnySelectMenu()) {
        const modal = new ModalBuilder()
          .setCustomId('dam')
          .setTitle('Elaborate on your disciplinary action');
    
        const userInput = new TextInputBuilder()
          .setCustomId('userInput')
          .setLabel('What is the roblox username of the receiver?')
          .setStyle(TextInputStyle.Short);
    
        const reasonInput = new TextInputBuilder()
          .setCustomId('reasonInput')
          .setLabel('Why are you issuing DA?')
          .setStyle(TextInputStyle.Paragraph);
    
        const extraInput = new TextInputBuilder()
          .setCustomId('extraInput')
          .setLabel('Any extra information? Put N/A if none.')
          .setStyle(TextInputStyle.Short);
    
        const row1 = new ActionRowBuilder()
          .addComponents(userInput)
    
        const row2 = new ActionRowBuilder()
          .addComponents(reasonInput)
    
        const row3 = new ActionRowBuilder()
          .addComponents(extraInput)
    
        modal.addComponents(row1, row2, row3);
    
        await interaction.showModal(modal);
      }
    
  },
};
