const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isModalSubmit()) {
      if (interaction.customId === "ram") {
        const log = new EmbedBuilder().setDescription(
          "An R/A was completed by <@" +
            interaction.user.id +
            "> on **" +
            interaction.fields.getTextInputValue("userInput") +
            "**. \n \n **Summary:** " +
            interaction.fields.getTextInputValue("summaryInput")
        );

        interaction.guild.channels.cache
          .get("1158989155053875220")
          .send({ embeds: [log] }); // todo: switch to ra-logs channel

        await interaction.reply("Submitted log!");
        return;
      } else if (interaction.customId === "prm") {
        await interaction.deferReply({ ephemeral: true });
        const log = new EmbedBuilder()
          .setTitle("Performance Review")
          .setDescription(`Entered by <@${interaction.member.id}>`)
          .addFields(
            {
              name: "Team",
              value: interaction.fields.getTextInputValue("teamInput"),
            },
            {
              name: "Username",
              value: interaction.fields.getTextInputValue("userInput"),
            },
            {
              name: "Helpfulness in Team Operations",
              value: interaction.fields.getTextInputValue("scoreInput"),
            },
            {
              name: "Overall Performance",
              value: interaction.fields.getTextInputValue("narrativeInput"),
            }
          );

        await interaction.guild.channels.cache
          .find((c) => c.name === "leadership")
          .send({ embeds: [log] });
        await interaction.editReply("Submitted review!");
        return;
      }

      const user = interaction.fields.getTextInputValue("userInput");
      const reason = interaction.fields.getTextInputValue("reasonInput");
      const extra = interaction.fields.getTextInputValue("extraInput");
      color = 0x00000;

      daDescription = "";

      switch (global.latestDaSubmission) {
        case "Termination":
          color = 0xf54936;
          // interaction.guild.members.cache.find(interaction.guild.members.cache.find(m => m.nickname === user).id).roles.remove(interaction.guild.roles.cache.get('1153547346085433435'));
          // interaction.guild.members.cache.find(interaction.guild.members.cache.find(m => m.nickname === user).id).roles.remove(interaction.guild.roles.cache.get('1153547483125927979'));
          daDescription =
            "The supervisor's actions were so severe that their position will be revoked. They may not reapply unless they successfully submit a letter of appeal to the Clinical Education Coordinator.";
          break;
        case "Demotion":
          color = 0xf58c36;
          daDescription =
            "The supervisor will be given a lower rank within the VFMS ranking structure.";
          break;
        case "Suspension":
          color = 0xf5bf36;
          daDescription =
            "An even more severe action that revokes the supervisor's authority/position for a period of time (typically 3-7 days).";
          break;
        case "Formal Written Warning":
          color = 0xd967db;
          daDescription =
            "A formal written warning signifies that the supervisor was found to have broken a policy and that they were spoken to about it. It can be used against the supervisor for further escalation if similar infractions occur later on.";
          break;
      }

      description = `You are receiving a ${global.latestDaSubmission} as a result of ${reason}. \n \n [This document](https://docs.google.com/document/d/1XTX2LoUyGFTruiCuTS5CMc_vwwTEHwf1w_gnejOCPAc/edit?usp=sharing) covers your right to appeal and file a complaint against anyone who participated in the investigation. \n \n Filing a formal appeal or complaint are the only ways to dispute this. Any attempts at appealing the action via a reply to this message will not be responded to.`;

      const author = "Issued by " + interaction.user.displayName;

      const notification = new EmbedBuilder()
        .setTitle(
          "<:vfms:1153668810814013530> Notification of Disciplinary Action"
        )
        .setDescription(description)
        .setColor(color)
        .setAuthor({ name: author });

      const embed = new EmbedBuilder()
        .setTitle(global.latestDaSubmission)
        .setDescription("Issued by <@" + interaction.user.id + "> \n \n \n")
        .addFields(
          { name: "User", value: user },
          { name: "Reason", value: reason },
          { name: "Notes", value: extra }
        )
        .setColor(color);

      /* const client = new MongoClient(uri, {
          serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
          }
        });
    
    
        try {
          await client.connect();
          console.log('connected')
          client.db("vfms").collection('da').insertOne({ name: interaction.options.getUser('user').id, staff: interaction.user.id, type: global.latestDaSubmission, reason: reason, notes: extra, time: interaction.createdAt });
        } catch (e) {
          console.log(e);
        } finally {
          await client.close();
        } */

      interaction.guild.channels.cache
        .get("1206541451786461224")
        .send({ embeds: [embed] });

      try {
        interaction.guild.members.cache
          .find((m) => m.nickname === user)
          .send({ embeds: [notification] });
      } catch {
        interaction.reply("The user cannot be DMed messages.");
        return;
      }

      interaction.reply("Issued DA!");
    }
  },
};
