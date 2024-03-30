const { EmbedBuilder, SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('review')
        .setDescription('submit a biweekly performance review for a team member (LT+)')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
    async execute(interaction) {

        if (!interaction.member.roles.cache.has('1211620908574179329')) { interaction.reply('You do not have permission to run this command!'); return; }


        try {
            const modal = new ModalBuilder()
                .setCustomId('prm')
                .setTitle('Review a member\'s performance');

            const userInput = new TextInputBuilder()
                .setCustomId('userInput')
                .setLabel('Who are you reviewing?')
                .setStyle(TextInputStyle.Short);

            const teamInput = new TextInputBuilder()
                .setCustomId('teamInput')
                .setLabel('What is their team?')
                .setStyle(TextInputStyle.Short);

            const scoreInput = new TextInputBuilder()
                .setCustomId('scoreInput')
                .setLabel('How helpful are they in team operations?')
                .setStyle(TextInputStyle.Paragraph);

            const narrativeInput = new TextInputBuilder()
                .setCustomId('narrativeInput')
                .setLabel('Describe their overall performance')
                .setStyle(TextInputStyle.Paragraph);

            const row1 = new ActionRowBuilder()
                .addComponents(userInput)

            const row2 = new ActionRowBuilder()
                .addComponents(scoreInput)

            const row3 = new ActionRowBuilder()
                .addComponents(narrativeInput)

            const row4 = new ActionRowBuilder()
                .addComponents(teamInput)


            modal.addComponents(row1, row2, row3, row4);

            await interaction.showModal(modal);
        } catch (error) {
            await interaction.reply('Something went wrong!');
        }
    },
};


