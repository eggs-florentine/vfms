const { SlashCommandBuilder } = require('discord.js');
const { adrenaline, ondansetron, nitroglycerin, panadol, tranexamic, fentanyl, salbutomol, iv, im, po, mb, rsi, pnt, bnr } = require('./cpg.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('medical')
    .setDescription('Search for a procedure or medication\'s entry into the Clinical Practice Guidelines')
    .addStringOption(option =>
      option
        .setName('search')
        .setDescription('What are you searching for?')
        .setRequired(true)
        .addChoices(
          { name: 'Adrenaline', value: 'adrenaline' },
          { name: 'Ondansetron', value: 'ondansetron' },
          { name: 'Nitroglycerin', value: 'nitroglycerin' },
          { name: 'Panadol', value: 'panadol' },
          { name: 'Tranexamic Acid', value: 'tranexamic' },
          { name: 'Fentanyl', value: 'fentanyl' },
          { name: 'Salbutomol (ACP Only)', value: 'salbutomol' },
          { name: "Gaining Intravenous Access (IV)", value: 'iv' },
          { name: "Gaining Intramuscular Access (IM)", value: "im" },
          { name: "Gaining Oral Access (PO)", value: 'po' },
          { name: "Addressing Major Bleeding", value: 'mb' },
          { name: "Performing Rapid Sequence Intubation (ACP Required)", value: "rsi" },
          { name: "Treating Pneumothorax (Open Finger Thoracastomy)", value: 'pnt' },
          { name: "Caring for Burns", value: 'bnr' }
        )),
  async execute(interaction) {

    await interaction.deferReply({ ephemeral: true });

    try {

      medname = "";
      description = "";
      indications = "";

      medication = true;

      switch (interaction.options.getString('search')) {
        case 'adrenaline':
          medname = adrenaline.name;
          description = adrenaline.description;
          indications = adrenaline.indications;

          medication = true;
          break;
        case 'ondansetron':
          medname = ondansetron.name;
          description = ondansetron.description;
          indications = ondansetron.indications;

          medication = true;
          break;
        case 'nitroglycerin':
          medname = nitroglycerin.name;
          description = nitroglycerin.description;
          indications = nitroglycerin.indications;

          medication = true;
          break;
        case 'panadol':
          medname = panadol.name;
          description = panadol.description;
          indications = panadol.indications;

          medication = true;
          break;
        case 'tranexamic':
          medname = tranexamic.name;
          description = tranexamic.description;
          indications = tranexamic.indications;

          medication = true;
          break;
        case 'fentanyl':
          medname = fentanyl.name;
          description = fentanyl.description;
          indications = fentanyl.indications;

          medication = true;
          break;
        case 'salbutomol':
          medname = salbutomol.name;
          description = salbutomol.description;
          indications = salbutomol.indications;

          medication = true;
          break;
        case 'iv':
          medname = iv.name;
          description = iv.description;
          medication = false;
          break;
        case 'im':
          medname = im.name;
          description = im.description;
          medication = false;
          break;
        case 'po':
          medname = po.name;
          description = po.description;
          medication = false;
          break;
        case 'mb':
          medname = mb.name;
          description = mb.description;
          medication = false;
          break;
        case 'rsi':
          medname = rsi.name;
          description = rsi.description;
          medication = false;
          break;
        case 'pnt':
          medname = pnt.name;
          description = pnt.description;
          medication = false;
          break;
        case 'bnr':
          medname = bnr.name;
          description = bnr.description;
          medication = false;
          break;
      }

      text = ``;

      if (medication === true) {
        text = `> **Name** \n ${medname} \n > **Description** \n ${description} \n > **Indications** \n ${indications}`;
      } else if (medication === false) {
        text = `> **Name** \n ${medname} \n > **Steps** \n ${description}`;
      }

      await interaction.editReply({ content: text, ephemeral: true });
    } catch (error) {
      interaction.guild.members.cache.get('684989568386334746').send('/medical error');
    }
  },
};
