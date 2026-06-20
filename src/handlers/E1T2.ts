import { randomInt } from "node:crypto";
import { Composer } from "grammy";
import type { Ctx } from "../bot.js";

const composer = new Composer<Ctx>();

composer.command("flip3", async (ctx) => {
  const flips = Array.from({ length: 3 }, () =>
    randomInt(0, 2) === 0 ? "Heads" : "Tails",
  );
  await ctx.reply(flips.join(", "));
});

export default composer;