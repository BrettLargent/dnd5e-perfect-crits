import UsePerfectCrits from "./perfectCrits.js";

Hooks.once("init", () => {
  const usePerfectCrits = UsePerfectCrits();
  game.settings.register("dnd5e-perfect-crits", "usePerfectCrits", {
    name: "Use Perfect Crits",
    hint: "Choose whether to use perfect crits",
    scope: "client", // This specifies a client-stored setting
    config: true, // This specifies that the setting appears in the configuration view
    type: Boolean,
    choices: {
      // If choices are defined, the resulting setting will be a select menu
      true: "Yes",
      false: "No",
    },
    default: true, // The default value for the setting
    onChange: (value) => {
      usePerfectCrits(value);
    },
  });
  usePerfectCrits(game.settings.get("dnd5e-perfect-crits", "usePerfectCrits"));
});
