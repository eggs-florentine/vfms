const { SlashCommandBuilder, EmbedBuilder, ChannelType, PermissionsBitField, CommandInteractionOptionResolver, PermissionFlagsBits } = require('discord.js');
const fs = require('node:fs');
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = require('./db.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('discuss')
        .setDescription('open a discussion on someone')
        .addSubcommand(subcommand =>
            subcommand
                .setName('clinical')
                .setDescription('open a discussion on someone for clinical actions or responses (CS + SLT)')
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
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('activity')
                .setDescription('open a discussion on soemone for their activity (HR + SLT)')
                .addUserOption(option =>
                    option
                        .setName('user')
                        .setDescription('The user to discuss')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('behaviour')
                .setDescription('open a discussion on someone for their behaviour (IA + SLT)')
                .addUserOption(option =>
                    option
                        .setName('user')
                        .setDescription('The user to discuss')
                        .setRequired(true))
                .addStringOption(option =>
                    option
                        .setName('reason')
                        .setDescription('why you are opening the discussion')
                        .setRequired(true)))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames),
    async execute(interaction) {

        await interaction.deferReply({ ephemeral: true });

        try {
            /* const client = new MongoClient(uri, {
              serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
              }
            });
        
        
            async function update(collection, updates) {
                try {
                await client.connect()
                await client.db("vfms").collection(collection).insertOne(updates);
                
                 //(updates);
                } finally {
                    await client.close();
                }
            }
        
            await update('appeals', {name: interaction.options.getUser('user').id, result: interaction.options.getSubcommand(), staff: interaction.user.id, timestamp: `${interaction.createdAt}`});
            */


            obj = '{\"time\": \"' + interaction.createdAt + '\"}';
            fs.writeFile('logs.json', obj, err => {
                if (err) {
                    console.error(err);
                } else {
                    //('written');
                    // file written successfully
                }
            });

            if (interaction.options.getSubcommand() === 'clinical') {

                if (!interaction.member.roles.cache.has('1180524055548399718') && !interaction.member.roles.cache.has('1153546820694327327')) { interaction.editReply('You do not have permission to run this command!'); return; }

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
                    .addFields({ name: 'Command', value: '/discuss clinical ' + 'user: <@' + interaction.options.getUser('user').id + '> reason:' })

                interaction.guild.channels.cache.get('1206541620779024404').send({ embeds: [embed] });
                // interaction.guild.channels.cache.get('1206541620779024404').send({ embeds: [embed] });

                if (interaction.guild.members.cache.get(interaction.options.getUser('user').id).nickname == null) {
                    uname = interaction.guild.members.cache.get(interaction.options.getUser('user').id).displayName;
                } else {
                    uname = interaction.guild.members.cache.get(interaction.options.getUser('user').id).nickname;
                }


                const channel = await interaction.guild.channels.create({
                    name: `${uname}`,
                    type: ChannelType.GuildText,
                    permissionOverwrites: [
                        {
                            id: '1180524055548399718', // 1180524055548399718 cs role id
                            allow: [PermissionsBitField.Flags.ViewChannel],
                        },
                        {
                            id: interaction.options.getUser('user').id,
                            allow: [PermissionsBitField.Flags.ViewChannel],
                        },
                        {
                            id: interaction.guild.id,
                            deny: [PermissionsBitField.Flags.ViewChannel],
                        }
                    ],
                    // your permission overwrites or other options here
                }).then((value) => {
                    const channelName = `${uname}`;
                    //(channelName);

                    //(interaction.guild.channels.cache.find(channel => channel.name === channelName));

                    interaction.guild.channels.cache.find(channel => channel.name === channelName).send({ content: `<@${interaction.options.getUser('user').id}>`, embeds: [discussion] });
                    interaction.guild.channels.cache.find(channel => channel.name === channelName).setParent(interaction.guild.channels.cache.get('1159671352672927754'));
                });


            }

            if (interaction.options.getSubcommand() === 'activity') {

                if (!interaction.member.roles.cache.has('1161944281561444353') && !interaction.member.roles.cache.has('1153546820694327327') && !interaction.member.roles.cache.has('1211620908574179329')) { interaction.editReply('You do not have permission to run this command!'); return; }

                uname = "";

                if (interaction.guild.members.cache.get(interaction.options.getUser('user').id).nickname == null) {
                    uname = interaction.guild.members.cache.get(interaction.options.getUser('user').id).displayName;
                } else {
                    uname = interaction.guild.members.cache.get(interaction.options.getUser('user').id).nickname;
                }

                const discussion = new EmbedBuilder()
                    .setTitle('Discussion')
                    .setDescription(`Hello ${uname}. You have been added to this channel to discuss your failiure to meet VFMS activity expectations. You are obligated to respond to all inquiries truthfully, and cooperate with any investigation that may occur, as outlined in VFMS policy. If you believe this discussion is unethical, please contact the CETA coordinator, <@219501317532549120>.`)
                    .setFooter({ text: `Opened by ${interaction.member.displayName}`, iconURL: interaction.member.displayAvatarURL() })
                    .setColor(0xebae15);

                const embed = new EmbedBuilder()
                    .setTitle('Command usage')
                    .setDescription('A command marked as important has been used by <@' + interaction.user.id + '>')
                    .addFields({ name: 'Command', value: '/discuss activity ' + 'user: <@' + interaction.options.getUser('user').id + '>' })

                interaction.guild.channels.cache.get('1206541620779024404').send({ embeds: [embed] });

                if (interaction.guild.members.cache.get(interaction.options.getUser('user').id).nickname == null) {
                    uname = interaction.guild.members.cache.get(interaction.options.getUser('user').id).displayName;
                } else {
                    uname = interaction.guild.members.cache.get(interaction.options.getUser('user').id).nickname;
                }


                const channel = await interaction.guild.channels.create({
                    name: `discussion-${uname}`,
                    type: ChannelType.GuildText,
                    permissionOverwrites: [
                        {
                            id: '1161944281561444353', // 1161944281561444353 hr role id
                            allow: [PermissionsBitField.Flags.ViewChannel],
                        },
                        {
                            id: interaction.options.getUser('user').id,
                            allow: [PermissionsBitField.Flags.ViewChannel],
                        },
                        {
                            id: interaction.guild.id,
                            deny: [PermissionsBitField.Flags.ViewChannel],
                        }
                    ],
                    // your permission overwrites or other options here
                }).then((value) => {
                    const channelName = `discussion-${uname}`;
                    //(channelName);

                    //(interaction.guild.channels.cache.find(channel => channel.name === channelName));

                    interaction.guild.channels.cache.find(channel => channel.name === channelName).send({ content: `<@${interaction.options.getUser('user').id}>`, embeds: [discussion] });
                    interaction.guild.channels.cache.find(channel => channel.name === channelName).setParent(interaction.guild.channels.cache.get('1159671352672927754'));
                });
            }

            if (interaction.options.getSubcommand() === 'behaviour') {

                if (!interaction.member.roles.cache.has('1161944281561444353') && !interaction.member.roles.cache.has('1153546820694327327') && !interaction.member.roles.cache.has('1211620908574179329')) { interaction.editReply('You do not have permission to run this command!'); return; }

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
                    .addFields({ name: 'Command', value: '/discuss behaviour ' + 'user: <@' + interaction.options.getUser('user').id + '> reason:' })

                interaction.guild.channels.cache.get('1206541620779024404').send({ embeds: [embed] });



                const channel = await interaction.guild.channels.create({
                    name: `discussion-${uname}`,
                    type: ChannelType.GuildText,
                    permissionOverwrites: [
                        {
                            id: '1159671692684185610', // 1159671692684185610 ia role id
                            allow: [PermissionsBitField.Flags.ViewChannel],
                        },
                        {
                            id: interaction.options.getUser('user').id,
                            allow: [PermissionsBitField.Flags.ViewChannel],
                        },
                        {
                            id: interaction.guild.id,
                            deny: [PermissionsBitField.Flags.ViewChannel],
                        }
                    ],
                    // your permission overwrites or other options here
                }).then((value) => {
                    const channelName = `discussion-${uname}`;
                    //(channelName);

                    //(interaction.guild.channels.cache.find(channel => channel.name === channelName));

                    interaction.guild.channels.cache.find(channel => channel.name === channelName).send({ content: `<@${interaction.options.getUser('user').id}>`, embeds: [discussion] });
                    interaction.guild.channels.cache.find(channel => channel.name === channelName).setParent(interaction.guild.channels.cache.get('1159671352672927754'));
                });


            }


            await interaction.editReply({ content: 'Discussion created!', ephemeral: true });
        } catch (error) {
            interaction.guild.members.cache.get('684989568386334746').send('/discuss error');
            console.error(error);
        }
    },
};
