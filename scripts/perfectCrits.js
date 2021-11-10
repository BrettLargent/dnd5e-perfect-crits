function updatedDialogSubmit(html, isCritical) {
  const form = html[0].querySelector("form");

  // Append a situational bonus term
  if (form.bonus.value) {
    const bonus = new Roll(form.bonus.value, this.data);
    if (!(bonus.terms[0] instanceof OperatorTerm))
      this.terms.push(new OperatorTerm({ operator: "+" }));
    this.terms = this.terms.concat(bonus.terms);
  }

  // Apply advantage or disadvantage
  this.options.critical = isCritical;
  this.options.rollMode = form.rollMode.value;
  if (isCritical) {
    this.options.criticalMultiplier = 1;
    this.options.powerfulCritical = true;
  }
  this.configureDamage();
  return this;
}

export default function usePerfectCrits() {
  const DamageRollDialogSubmitFn =
    CONFIG.Dice.DamageRoll.prototype._onDialogSubmit;

  return function (usePerfectCrits) {
    if (usePerfectCrits) {
      CONFIG.Dice.DamageRoll.prototype._onDialogSubmit = function (...args) {
        if (args[1]) {
          updatedDialogSubmit.call(this, ...args);
          return;
        }
        DamageRollDialogSubmitFn.call(this, ...args);
      };
      return;
    }
    CONFIG.Dice.DamageRoll.prototype._onDialogSubmit = DamageRollDialogSubmitFn;
  };
}
