const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isButton()) {
        interaction.client.guilds.cache.get('1153503678653800490').members.cache.get(interaction.user.id).roles.add('1153547346085433435'); // TODO: add vfms sserver ids and role ids
        interaction.client.guilds.cache.get('1153503678653800490').members.cache.get(interaction.user.id).roles.add('1153547483125927979');
        interaction.reply('Welcome, you have been given your roles in the main server. Please join the server below to continue (do not share this invite with anyone else): https://discord.gg/9cEWYtjfGb')
      }
    
  },
};
