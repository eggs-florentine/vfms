const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("vehicle")
    .setDescription("Get information on a vehicle.")
    .addStringOption((o) =>
      o
        .setName("vehicle")
        .setDescription("The vehicle you want to search up")
        .setChoices(
          { name: "Engine 1", value: "E-1" },
          { name: "Engine 2", value: "E-2" },
          { name: "Emergency Paramedic 1", value: "MED-1" },
          { name: "Emergency Paramedic 2", value: "MED-2" },
          { name: "Advanced Life Support", value: "ALS-1" },
          { name: "Tech Rescue 1", value: "TR-1" },
          { name: "Hazmat 1", value: "HM-1" },
          { name: "Ladder 1", value: "L-1" },
          { name: "Tanker 2", value: "TA-2" },
          { name: "Wildlands 2", value: "WLD-2" },
          { name: "Team Leader 1", value: "TL-1" },
          { name: "Team Leader 2", value: "TL-2" },
          { name: "Rescue 1", value: "R-1" },
          { name: "Paramedic Specialist", value: "TGO-1" },
          { name: "Supervisor 1", value: "S-1" },
          { name: "Supervisor 2", value: "S-2" },
          { name: "EMS Supervisor 3", value: "S-3" },
          { name: "Paramedic SUV", value: "SUV-1" },
          { name: "Air and Light Support", value: "AL-3" },
          { name: "VFRS Command", value: "CMD-1" },
          { name: "Fire Investigations", value: "FI-1" },
          { name: "Engine 3", value: "E-3" },
          { name: "Rescue Engine 1", value: "RE-1" }
        )
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const { member } = interaction;
    const vehicle = interaction.options.getString("vehicle");

    const embed = new EmbedBuilder()
      .setColor("#990000")
      .setFooter({ text: `Vehicle Directory` });

    if (vehicle === "E-1") {
      embed.setTitle("Engine 1");
      embed.setDescription(
        `**Callsign:** E-1\n**Station:** Station 1\n**Livery:** Engine 1\n**Vehicle Name:** Fire Engine\n**Rank:** Member`
      );

      interaction.reply({ embeds: [embed], ephemeral: true });
    }

    if (vehicle === "E-2") {
      embed.setTitle("Engine 2");
      embed.setDescription(
        `**Callsign:** E-2\n**Station:** Station 2\n**Livery:** Engine 2\n**Vehicle Name:** Fire Engine\n**Rank:** Member`
      );

      interaction.reply({ embeds: [embed], ephemeral: true });
    }

    if (vehicle === "MED-1") {
      embed.setTitle("Emergency Paramedic 1");
      embed.setDescription(
        `**Callsign:** MED-1\n**Station:** Station 1\n**Livery:** Emergency Paramedic\n**Vehicle Name:** Bullhorn Ambulance\n**Rank:** Member`
      );

      interaction.reply({ embeds: [embed], ephemeral: true });
    }

    if (vehicle === "MED-2") {
      embed.setTitle("Emergency Paramedic 2");
      embed.setDescription(
        `**Callsign:** MED-2\n**Station:** Station 2\n**Livery:** Emergency Paramedic\n**Vehicle Name:** Bullhorn Ambulance\n**Rank:** Member`
      );

      interaction.reply({ embeds: [embed], ephemeral: true });
    }

    if (vehicle === "ALS-1") {
      if (member.roles.cache.has("1153613177821609994")) {
        embed.setTitle("Advanced Life Support 1");
        embed.setDescription(
          `**Callsign:** ALS-1\n**Station:** Station 1\n**Livery:** Advanced Life Support\n**Vehicle Name:** Bullhorn Ambulance\n**Rank:** ACP Certified`
        );

        interaction.reply({ embeds: [embed], ephemeral: true });
      } else {
        interaction.reply({
          embeds: [embed.setDescription("Sorry but you are not ACP Certified")],
          ephemeral: true,
        });
      }
    }

    if (vehicle === "TR-1") {
      embed.setTitle("Tech Rescue 1");
      embed.setDescription(
        `**Callsign:** TR-1\n**Station:** Station 1\n**Livery:** Tech Rescue 1\n**Vehicle Name:** Heavy Rescue\n**Rank:** Member`
      );

      interaction.reply({ embeds: [embed], ephemeral: true });
    }

    if (vehicle === "HM-1") {
      if (member.roles.cache.has("1153547483125927979")) {
        embed.setTitle("Hazmat 1");
        embed.setDescription(
          `**Callsign:** HM-1\n**Station:** Station 1\n**Livery:** Hazmat 1\n**Vehicle Name:** Heavy Rescue\n**Rank:** Supervisors`
        );

        interaction.reply({ embeds: [embed], ephemeral: true });
      } else {
        interaction.reply({
          embeds: [embed.setDescription("Sorry but you are not a Supervisor")],
          ephemeral: true,
        });
      }
    }

    if (vehicle === "L-1") {
      embed.setTitle("Ladder 1");
      embed.setDescription(
        `**Callsign:** L-1\n**Station:** Station 1\n**Livery:** Ladder 1\n**Vehicle Name:** Ladder Truck\n**Rank:** Member`
      );

      interaction.reply({ embeds: [embed], ephemeral: true });
    }

    if (vehicle === "WLD-2") {
      if (member.roles.cache.has("1206477803092967424")) {
        embed.setTitle("Wildlands 2");
        embed.setDescription(
          `**Callsign:** WLD-2\n**Station:** Station 2\n**Livery:** Wildlands 2\n**Vehicle Name:** Brush Falcon Advance+\n**Rank:** NFPA Certified`
        );

        interaction.reply({ embeds: [embed], ephemeral: true });
      } else {
        interaction.reply({
          embeds: [
            embed.setDescription("Sorry but you are not NFPA Certified"),
          ],
          ephemeral: true,
        });
      }
    }

    if (vehicle === "TL-1") {
      if (member.roles.cache.has("1153547413055877192")) {
        embed.setTitle("Team Leader 1");
        embed.setDescription(
          `**Callsign:** TL-1\n**Station:** Station 1\n**Livery:** Team Leader 1\n**Vehicle Name:** Falcon Advance\n**Rank:** Team Leader`
        );

        interaction.reply({ embeds: [embed], ephemeral: true });
      } else {
        interaction.reply({
          embeds: [embed.setDescription("Sorry but you are not a Team leader")],
          ephemeral: true,
        });
      }
    }

    if (vehicle === "TL-2") {
      if (member.roles.cache.has("1153547413055877192")) {
        embed.setTitle("Team Leader 2");
        embed.setDescription(
          `**Callsign:** TL-2\n**Station:** Station 2\n**Livery:** Team Leader 2\n**Vehicle Name:** Utility Falcon Advance\n**Rank:** Team Leader`
        );

        interaction.reply({ embeds: [embed], ephemeral: true });
      } else {
        interaction.reply({
          embeds: [embed.setDescription("Sorry but you are not a Team leader")],
          ephemeral: true,
        });
      }
    }

    if (vehicle === "R-1") {
      if (member.roles.cache.has("1206845903374262322")) {
        embed.setTitle("Rescue 1");
        embed.setDescription(
          `**Callsign:** R-1\n**Station:** Station 1\n**Livery:** Rescue 1\n**Vehicle Name:** Squad Falcon Advance+\n**Rank:** Senior Member`
        );

        interaction.reply({ embeds: [embed], ephemeral: true });
      } else {
        interaction.reply({
          embeds: [
            embed.setDescription("Sorry but you are not a Senior Member"),
          ],
          ephemeral: true,
        });
      }
    }

    if (vehicle === "TGO-1") {
      if (member.roles.cache.has("1153613177821609994")) {
        embed.setTitle("Paramedic Specialist");
        embed.setDescription(
          `**Callsign:** TGO-1\n**Station:** Station 1\n**Livery:** Paramedic Specialist\n**Vehicle Name:** Chevlon Caminon\n**Rank:** ACP Certified`
        );

        interaction.reply({ embeds: [embed], ephemeral: true });
      } else {
        interaction.reply({
          embeds: [embed.setDescription("Sorry but you are not ACP Certified")],
          ephemeral: true,
        });
      }
    }

    if (vehicle === "S-1") {
      if (member.roles.cache.has("1153547483125927979")) {
        embed.setTitle("Supervisor 1");
        embed.setDescription(
          `**Callsign:** S-1\n**Station:** Station 1\n**Livery:** Supervisor 1\n**Vehicle Name:** Chevlon Caminon\n**Rank:** Supervisor`
        );

        interaction.reply({ embeds: [embed], ephemeral: true });
      } else {
        interaction.reply({
          embeds: [embed.setDescription("Sorry but you are not a Supervisor")],
          ephemeral: true,
        });
      }
    }

    if (vehicle === "S-2") {
      if (member.roles.cache.has("1153547483125927979")) {
        embed.setTitle("Supervisor 2");
        embed.setDescription(
          `**Callsign:** S-2\n**Station:** Station 2\n**Livery:** Supervisor 2\n**Vehicle Name:** Chevlon Caminon\n**Rank:** Supervisor`
        );

        interaction.reply({ embeds: [embed], ephemeral: true });
      } else {
        interaction.reply({
          embeds: [embed.setDescription("Sorry but you are not a Supervisor")],
          ephemeral: true,
        });
      }
    }

    if (vehicle === "S-3") {
      if (member.roles.cache.has("1153547483125927979")) {
        embed.setTitle("EMS Supervisor");
        embed.setDescription(
          `**Callsign:** S-3\n**Station:** Any Station\n**Livery:** EMS Supervisor\n**Vehicle Name:** Chevlon Caminon\n**Rank:** Supervisor`
        );

        interaction.reply({ embeds: [embed], ephemeral: true });
      } else {
        interaction.reply({
          embeds: [embed.setDescription("Sorry but you are not a Supervisor")],
          ephemeral: true,
        });
      }
    }

    if (vehicle === "TA-2") {
      embed.setTitle("Tanker 2");
      embed.setDescription(
        `**Callsign:** TA-2\n**Station:** Station 2\n**Livery:** Tanker 2\n**Vehicle Name:** Heavy Tanker\n**Rank:** Member`
      );

      interaction.reply({ embeds: [embed], ephemeral: true });
    }

    if (vehicle === "AL-3") {
      if (member.roles.cache.has("1211620908574179329")) {
        embed.setTitle("Air and Light Support");
        embed.setDescription(
          `**Callsign:** AL-3\n**Station:** Any Station\n**Livery:** Air and Light Support\n**Vehicle Name:** Special Operations Unit\n**Rank:** Leadership Team`
        );

        interaction.reply({ embeds: [embed], ephemeral: true });
      } else {
        interaction.reply({
          embeds: [
            embed.setDescription("Sorry but you are not a Leadership Team"),
          ],
          ephemeral: true,
        });
      }
    }

    if (vehicle === "SUV-1") {
      embed.setTitle("Paramedic SUV");
      embed.setDescription(
        `**Callsign:** SUV-1\n**Station:** Station 1\n**Livery:** Paramedic SUV\n**Vehicle Name:** Paramedic SUV\n**Rank:** Member`
      );

      interaction.reply({ embeds: [embed], ephemeral: true });
    }

    if (vehicle === "CMD-1") {
      if (member.roles.cache.has("1153546820694327327")) {
        embed.setTitle("VFRS Command");
        embed.setDescription(
          `**Callsign:** N/A\n**Station:** Any Station\n**Livery:** VFRS Command\n**Vehicle Name:** 2020 Falcon Interceptor Utility\n**Rank:** Senior Leadership Team`
        );

        interaction.reply({ embeds: [embed], ephemeral: true });
      } else {
        interaction.reply({
          embeds: [
            embed.setDescription(
              "Sorry but you are not a Senior Leadership Team"
            ),
          ],
          ephemeral: true,
        });
      }
    }

    if (vehicle === "FI-1") {
      if (member.roles.cache.has("1211620908574179329")) {
        embed.setTitle("Fire Investigations");
        embed.setDescription(
          `**Callsign:** N/A\n**Station:** Station 1\n**Livery:** Fire Investigations\n**Vehicle Name:** Chevlon Commuter Van\n**Rank:** Leadership Team`
        );

        interaction.reply({ embeds: [embed], ephemeral: true });
      } else {
        interaction.reply({
          embeds: [
            embed.setDescription("Sorry but you are not a Leadership Team"),
          ],
          ephemeral: true,
        });
      }
    }

    if (vehicle === "E-3") {
      if (member.roles.cache.has("1154903537566896220")) {
        embed.setTitle("Engine 3");
        embed.setDescription(
          `**Callsign:** E-3\n**Station:** Any Station\n**Livery:** Engine 3\n**Vehicle Name:** Fire Engine\n**Rank:** Server Booster`
        );

        interaction.reply({ embeds: [embed], ephemeral: true });
      } else {
        interaction.reply({
          embeds: [
            embed.setDescription("Sorry but you are not a server booster"),
          ],
          ephemeral: true,
        });
      }
    }

    if (vehicle === "RE-1") {
      if (member.roles.cache.has("1154903537566896220")) {
        embed.setTitle("Rescue Engine 1");
        embed.setDescription(
          `**Callsign:** RE-1\n**Station:** Station 1\n**Livery:** Rescue Engine 1\n**Vehicle Name:** Fire Engine\n**Rank:** Server Booster`
        );

        interaction.reply({ embeds: [embed], ephemeral: true });
      } else {
        interaction.reply({
          embeds: [
            embed.setDescription("Sorry but you are not a server booster"),
          ],
          ephemeral: true,
        });
      }
    }
  },
};
