import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
    args: { nome: v.string(), contato: v.string() },
    handler: async (ctx, { nome, contato }) =>  {
    if (!nome || !contato) {
      throw new Error("Todos os campos são obrigatórios.");
    }
  
    // Insere o agente na tabela
    await ctx.db.insert("agente", { nome, contato});
},
});


  export const remove = mutation({
    args: { id: v.id("agente") },
    handler: async (ctx, { id }) => {

      await ctx.db.delete( id )

      return "agente excluido" 
    },
  });

  export const update = mutation({
    args: { id: v.id("agente"), nome: v.string(), contato: v.string() },
    handler: async (ctx, { id, nome, contato}) => {

        await ctx.db.patch( id, { nome, contato });

        return "agente atualizado"
    },
  });

  export const get = query({
    args: {},
    handler: async (ctx) => {
      const agentes = await ctx.db
        .query("agente")
        .order("desc")
        .take(100);

      return agentes;
    },
  });

  export const getById = query({
    args: { id: v.id("agente") },
    handler: async (ctx, { id }) => {

        const agente = await ctx.db
            .get(id)

        return agente;
    }
  })