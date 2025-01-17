import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
    args: { firebaseId: v.string(), role: v.string() },
    handler: async (ctx, { firebaseId, role }) =>  {
    if (!firebaseId || !role) {
      throw new Error("Todos os campos são obrigatórios.");
    }
  
    await ctx.db.insert("users", { firebaseId, role});
},
});

export const get = mutation({
    args: { firebaseId: v.string()},
    handler: async (ctx, { firebaseId }) => {
      const agentes = await ctx.db
        .query("users")
        .filter((q) => q.eq(q.field("firebaseId"), firebaseId))
        .unique()

      return agentes;
    },
  });

  export const update = mutation({
    args: { id: v.id("users"), firebaseId: v.string(), role: v.string() },
    handler: async (ctx, { id, firebaseId, role}) => {

        await ctx.db.patch( id, { firebaseId, role });

        return "user atualizado"
    },
  });

