const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('node:fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('appeal')
    .setDescription('make a decision on an appeal')
    .addSubcommand(subcommand =>
		subcommand
			.setName('accept')
			.setDescription('accept an appeal')
            .addUserOption(option =>
                option
                  .setName('user')
                  .setDescription('The user who submitted the appeal')
                  .setRequired(true)))
    .addSubcommand(subcommand =>
            subcommand
                .setName('deny')
                .setDescription('deny an appeal')
                .addUserOption(option =>
                    option
                      .setName('user')
                      .setDescription('The user who submitted the appeal')
                      .setRequired(true))
                .addStringOption(option => option.setName('notes').setDescription('notes e.g reason for denial or banned from appealing')))
                
    ,
  async execute(interaction) {

    obj = '{\"time\": \"' + interaction.createdAt + '\"}';
    fs.writeFile('logs.json', obj, err => {
    if (err) {
        console.error(err);
    } else {
        console.log('written');
      // file written successfully
    }
    });

    if (!interaction.member.roles.cache.has('1153546820694327327')) { return; }
    if (interaction.options.getSubcommand() === 'accept') { 
        
        const accept = new EmbedBuilder()
        .setTitle('<:vfms:1153668810814013530> Notification of Appeal Acceptance')
        .setDescription('Hello (user). Your recent appeal against your VFMS permanent suspension has been **accepted**. Welcome back to the team! Please take the following measures.')
        .setColor(0x0faf4f)
        .addFields(
            { name: 'Review the rules, regulations and guidelines', value: 'After appealing your removal, you are held to an even higher standard than our regular members for a certain period of time after your appeal. We strongly encourage you review the guidelines again to prevent Disciplinary Action.'},
            { name: 'Be patient and await your re-entry into the team', value: 'A member of the Senior Leadership Team will contact you once your suspension is removed and you can rejoin the team.'},
            { name: 'Rejoin the VFMS group and begin playing', value: 'After your suspension, you were kicked from the Roblox group. Once a member of the Senior Leadership Team tells you you have been unsuspended, you need to rejoin the roblox group and wait a bit to play on VFMS again!'},
        )

        interaction.options.getUser('user').send({embeds: [accept]});
    }

    if (interaction.options.getSubcommand() === 'deny') { 
        
        const deny = new EmbedBuilder()
        .setTitle('<:vfms:1153668810814013530> Notification of Appeal Denial')
        .setDescription('Hello (user). Your recent appeal against your VFMS permanent suspension has been **denied**. More information on your denial and notes  the reviewing staff member gave you are available below.')
        .setColor(0xdd2f20)
        .addFields(
            { name: 'Notes', value: 'notes'},
        )

        interaction.options.getUser('user').send({embeds: [deny]});
    }

    

    await interaction.reply({ content: 'Decision issued!', ephemeral: true });
  },
};
