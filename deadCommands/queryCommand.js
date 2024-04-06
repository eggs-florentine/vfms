/* const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const fs = require('node:fs');
const uri = "mongodb+srv://reflqctnl:Z7dYtNMRSq0sYoKC@vfms.bizx1qj.mongodb.net/?retryWrites=true&w=majority";
const { MongoClient, ServerApiVersion } = require('mongodb');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('query')
        .setDescription('queries the logs database')
        .addStringOption(option =>
            option
                .setName('collection')
                .setDescription('the collection you want to query')
                .addChoices(
                    { name: 'da (all disciplinary action)', value: 'da' },
                    { name: 'hr (onboarding)', value: 'hr' },
                    { name: 'appeals', value: 'appeals' },
                    { name: 'certifications (all certification denials and acceptances)', value: 'certifications' }
                )
                .setRequired(true))
        .addStringOption(option => option
            .setName('query')
            .setDescription('the query to query the database with (bot channel has guide in pinned messages)')
            .setRequired(true)),
    async execute(interaction) {
        if (!interaction.member.roles.cache.has('1153546820694327327')) { interaction.reply('You do not have permission to run this command!'); return; }


        obj = '{\"time\": \"' + interaction.createdAt + '\"}';
        fs.writeFile('logs.json', obj, err => {
            if (err) {
                console.error(err);
            } else {
                console.log('written');
                // file written successfully
            }
        });

        const client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });


        try {
            await client.connect();
            console.log('connected')
            client.db("vfms").collection(interaction.options.getString('collection')).insertOne({ name: interaction.options.getUser('user').id, staff: interaction.user.id, time: interaction.createdAt });
        } catch (e) {
            console.log(e);
        } finally {
            await client.close();
        }

        const acknowledge = new ButtonBuilder()
            .setCustomId('ack')
            .setLabel('Acknowledge')
            .setStyle(ButtonStyle.Secondary)

        const row = new ActionRowBuilder()
            .addComponents(acknowledge);

        try {
            await interaction.options.getUser('user').send({ content: welcome, components: [row] });
        } catch {
            interaction.reply('The user cannot be DMed messages.');
            return;
        }


        const embed = new EmbedBuilder()
            .setTitle('Command usage')
            .setDescription('A command marked as important has been used by <@' + interaction.user.id + '>')
            .addFields({ name: 'Command', value: '/onboard ' + 'user: <@' + interaction.options.getUser('user').id + '>' })

        interaction.guild.channels.cache.get('1206541620779024404').send({ embeds: [embed] });

        await interaction.reply({ content: 'onboarded!', ephemeral: true });
    },
};
*/