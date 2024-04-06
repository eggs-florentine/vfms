function getMemberByName(interaction, name) {
    try {
        return interaction.guild.members.cache.find(u => u.username === name);
    } catch {
        console.error('getUserByName did not find the interaction');
    }
}

function getRoleByName(interaction, name) {
    try {
        return interaction.guild.roles.cache.find(r => r.name === name);
    } catch {
        console.error('');
    }
}

function getChannelByName(interaction, name) {
    try {
        return interaction.guild.channels.cache.find(c => c.name === name);
    } catch {
        console.error('');
    }
}

function addRoleByName(interaction, member, name) {
    try {
        member.roles.add(interaction.guild.roles.cache.find(r => r.name === name));
    } catch {
        console.error('');
    }
}

function removeRoleByName(interaction, member, name) {
    try {
        member.roles.remove(interaction.guild.roles.cache.find(r => r.name === name));
    } catch {
        console.error('');
    }
}

function sendEmbedsToChannel(embed, channelName, interaction) {
    try {
        getChannelByName(interaction, channelName).send({ embeds: embed });
    } catch {
        console.error('');
    }
}

function sendContentToChannel(content, channelName, interaction) {
    try {
        getChannelByName(interaction, channelName).send(content);
    } catch {
        console.error('');
    }
}

module.exports = { sendContentToChannel, sendEmbedsToChannel, addRoleByName, removeRoleByName, getChannelByName, getRoleByName, getMemberByName };

