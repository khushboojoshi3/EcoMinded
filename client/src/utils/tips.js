const powerSavingTips = [
  "Use LED light bulbs - they use up to 75% less energy than traditional incandescent bulbs.",
  "Keep your fridge and freezer full - it takes less energy to cool a full appliance than an empty one.",
  "Turn off lights when you leave a room - even if you'll be back soon, it's a simple way to save energy.",
  "Adjust your thermostat - lowering it by just a few degrees in the winter can save a lot of energy.",
  "Clean your air conditioner filters regularly - clogged filters make your unit work harder, using more energy.",
  "Use natural light - open curtains and blinds to let sunlight in instead of relying on artificial light.",
  "Use a laptop instead of a desktop computer - they use significantly less energy.",
  "Unplug electronics when not in use - even when turned off, electronics still use energy if they're plugged in.",
  "Use a clothesline instead of a dryer - it's a simple way to save energy and make your clothes smell great.",
  "Install a low-flow showerhead - it can reduce water and energy usage.",
  "Use a power strip - it makes it easy to turn off multiple electronics at once and prevent phantom energy usage.",
  "Use a microwave instead of an oven - microwaves use up to 80% less energy than ovens.",
  "Take shorter showers - it saves water and energy used to heat the water.",
  "Use a slow cooker - they use less energy than ovens and can cook food for longer periods of time.",
  "Use a smart thermostat - it can automatically adjust the temperature based on your habits and preferences.",
  "Plant trees or install shading devices - they can help reduce the amount of direct sunlight and heat that enters your home.",
  "Turn off your computer at night - it can save up to 6220 rupees per year on energy costs.",
  "Use a programmable timer for outdoor lights - it ensures that they only stay on when necessary.",
  "Use a toaster oven instead of a regular oven - it uses less energy and heats up faster.",
  "Use a ceiling fan - it can help circulate air and reduce the amount of time your AC needs to run.",
];

export const getTips = () => {
    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
    const i = Math.floor(Math.random() * 20);
    arr.splice(i, 1);
    const j = Math.floor(Math.random() * 19);
    return [powerSavingTips[arr[i]],powerSavingTips[arr[j]]];
}