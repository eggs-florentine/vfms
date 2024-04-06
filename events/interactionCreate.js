const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (!interaction.isCommand()) return;
    const { member } = interaction;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
      } else {
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
      }

      const errorEmbed = new EmbedBuilder()
      .setColor("#990000")
      .setTitle("Error")
      .setDescription(`Time: <t:${interaction.createdTimestamp}:f>\n\n\`\`\`${error}\`\`\``)
      .setFooter({text:"Bot Auto Error Logging"})

      const channel = await client.channels.fetch("1222773490449514627")
      channel.send({embeds:[embed]})
    }
  },
};
