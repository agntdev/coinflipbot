import { randomInt } from "node:crypto";
import { Composer } from "grammy";
import type { Ctx } from "../bot.js";

const composer = new Composer<Ctx>();

composer.command("flip", async (ctx) => {
  const result = randomInt(0, 2) === 0 ? "Heads" : "Tails";
  await ctx.reply(result);
});

export default composer;