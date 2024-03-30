const { SlashCommandBuilder, EmbedBuilder, ChannelType, PermissionsBitField, CommandInteractionOptionResolver, PermissionFlagsBits } = require('discord.js');
const fs = require('node:fs');
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = require('./db.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('discuss')
        .setDescription('open a discussion on someone')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The user to discuss')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('why you are opening the discussion')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
    async execute(interaction) {

        await interaction.deferReply({ ephemeral: true });

        try {
            uname = "";

            if (interaction.guild.members.cache.get(interaction.options.getUser('user').id).nickname == null) {
                uname = interaction.guild.members.cache.get(interaction.options.getUser('user').id).displayName;
            } else {
                uname = interaction.guild.members.cache.get(interaction.options.getUser('user').id).nickname;
            }

            const discussion = new EmbedBuilder()
                .setTitle('Discussion')
                .setDescription(`Hello ${uname}. You have been added to this channel to discuss ${interaction.options.getString('reason')}. You are obligated to respond to all inquiries truthfully, and cooperate with any investigation that may occur, as outlined in VFMS policy. If you believe this discussion is unethical, please contact the CETA coordinator, <@219501317532549120>.`)
                .setFooter({ text: `Opened by ${interaction.member.displayName}`, iconURL: interaction.member.displayAvatarURL() })
                .setColor(0xebae15);

            const embed = new EmbedBuilder()
                .setTitle('Command usage')
                .setDescription('A command marked as important has been used by <@' + interaction.user.id + '>')
                .addFields({ name: 'Command', value: '/discuss ' + 'user: <@' + interaction.options.getUser('user').id + '> reason:' })

            interaction.guild.channels.cache.get('1222771874384187393').send({ embeds: [embed] });
            // interaction.guild.channels.cache.get('1222771874384187393').send({ embeds: [embed] });

            if (interaction.guild.members.cache.get(interaction.options.getUser('user').id).nickname == null) {
                uname = interaction.guild.members.cache.get(interaction.options.getUser('user').id).displayName;
            } else {
                uname = interaction.guild.members.cache.get(interaction.options.getUser('user').id).nickname;
            }
            console.log(uname);


            const channel = await interaction.guild.channels.create({
                name: `${uname}`,
                type: ChannelType.GuildText,
                permissionOverwrites: [
                    {
                        id: '1211827865054740480',
                        allow: [PermissionsBitField.Flags.ViewChannel],
                    },
                    {
                        id: interaction.options.getUser('user').id,
                        allow: [PermissionsBitField.Flags.ViewChannel],
                    },
                    {
                        id: interaction.guild.id,
                        deny: [PermissionsBitField.Flags.ViewChannel],
                    },
                    {
                        id: interaction.member.id,
                        allow: [PermissionsBitField.Flags.ViewChannel],
                    },
                    {
                        id: '1210811844667641877',
                        allow: [PermissionsBitField.Flags.ViewChannel],
                    },
                ],
                // your permission overwrites or other options here
            }).then((value) => {
                const channelName = `${uname}`;
                //(channelName);

                //(interaction.guild.channels.cache.find(channel => channel.name === channelName));


            });
            interaction.guild.channels.cache.get(interaction.guild.channels.cache.find(channel => channel.name === uname).id).send({ content: `<@${interaction.options.getUser('user').id}>`, embeds: [discussion] });
            interaction.guild.channels.cache.get(interaction.guild.channels.cache.find(channel => channel.name === uname).id).setParent(interaction.guild.channels.cache.get('1222774216219164722'));

        } catch (error) {
            const er = new EmbedBuilder()
                .setTitle('/discuss')
                .setDescription('A new error has ocurred in the command /discuss.')
                .addFields({ name: 'Exception', value: error })
            interaction.guild.channels.cache.get('1222773490449514627').send({ embeds: [er] });
            console.error(error);
        }
    },
};
