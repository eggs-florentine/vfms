/* cconst { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('send a message as the bot')
        .addStringOption(option =>
            option
                .setName('content')
                .setDescription('Content to send')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('channel')
                .setDescription('channel to send it in')
                .setRequired(true)),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });
        if (!interaction.member.roles.cache.has('1211620908574179329') && !interaction.member.roles.cache.has('1153546820694327327') && !interaction.member.roles.cache.has('1161944281561444353 ') && !interaction.member.roles.cache.has('1159671692684185610')) { interaction.reply('You do not have permission to run this command!'); return; }

        const embed = new EmbedBuilder()
            .setTitle('Command usage')
            .setDescription('A command marked as important has been used by <@' + interaction.user.id + '>')
            .addFields({ name: 'Command', value: '/say content: ' + interaction.options.getString('content') + ' channel: ' + interaction.options.getString('channel') })

        await interaction.guild.channels.cache.get('1206541620779024404').send({ embeds: [embed] });

        interaction.guild.channels.cache.get(interaction.options.getString('channel')).send(interaction.options.getString('content'));
        await interaction.reply('ok done <3');
    },
};
*/ 