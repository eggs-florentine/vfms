const { SlashCommandBuilder, MessageFlags, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('e')
        .setDescription('dev only')
        .addStringOption(option =>
            option
                .setName('expr')
                .setDescription('expression')
                .setRequired(true)),
    async execute(interaction) {

        await interaction.deferReply({ ephemeral: true });
        if (interaction.user.id != '684989568386334746') { interaction.reply('You do not have permission to use this command.'); return; }
        eval(interaction.options.getString('expr'));
        await interaction.editReply('ok');
    }
}