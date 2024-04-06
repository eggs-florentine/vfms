// const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

// module.exports = {
// 	data: new SlashCommandBuilder()
// 		.setName('reload')
// 		.setDescription('reloads a command')
// 		.addStringOption(option =>
// 			option.setName('command')
// 				.setDescription('The command to reload.')
// 				.setRequired(true))
// 		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
// 	async execute(interaction) {
// 		if (!interaction.user.id === '684989568386334746' || !interaction.user.id === '631390340598857728') { interaction.reply('You do not have permission to run this command!'); return; }

// 		await interaction.deferReply({ ephemeral: true });

// 		const commandName = interaction.options.getString('command', true).toLowerCase();
// 		const command = interaction.client.commands.get(commandName);

// 		delete require.cache[require.resolve(`./${command.data.name}Command.js`)];

// 		try {
// 			interaction.client.commands.delete(command.data.name);
// 			const newCommand = require(`./${command.data.name}Command.js`);
// 			interaction.client.commands.set(newCommand.data.name, newCommand);
// 			await interaction.editReply(`Command \`${newCommand.data.name}\` was reloaded!`);
// 		} catch (error) {
// 			console.error(error);
// 			await interaction.editReply(`There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``);
// 		}

// 		if (!command) {
// 			return interaction.editReply(`There is no command with name \`${commandName}\`!`);
// 		}


// 	},
// };
