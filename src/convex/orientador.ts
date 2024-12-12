import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
    args: { nome: v.string(), departamento: v.string() },
    handler: async (ctx, { nome, departamento }) =>  {
    if (!nome || !departamento) {
      throw new Error("Todos os campos são obrigatórios.");
    }
  
    // Insere o orientador na tabela
    await ctx.db.insert("orientador", { nome, departamento});
},
});


  export const remove = mutation({
    args: { id: v.id("orientador") },
    handler: async (ctx, { id }) => {

      await ctx.db.delete( id )

      return "orientador excluido" 
    },
  });

  export const update = mutation({
    args: { id: v.id("orientador"), nome: v.string(), departamento: v.string() },
    handler: async (ctx, { id, nome, departamento}) => {

        await ctx.db.patch( id, { nome, departamento });

        return "orientador atualizado"
    },
  });

  export const get = query({
    args: {},
    handler: async (ctx) => {
      const orientadors = await ctx.db
        .query("orientador")
        .order("desc")
        .take(100);

      return orientadors;
    },
  });

  export const getById = query({
    args: { id: v.id("orientador") },
    handler: async (ctx, { id }) => {

        const orientador = await ctx.db
            .get(id)

        return orientador;
    }
  })