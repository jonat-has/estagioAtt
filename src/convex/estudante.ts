import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createEstudante = mutation({
    args: { nome: v.string(), matricula: v.string(), curso: v.string() },
    handler: async (ctx, { nome, matricula, curso }) =>  {
    if (!nome || !matricula || !curso) {
      throw new Error("Todos os campos são obrigatórios.");
    }
  
    // Insere o estudante na tabela
    await ctx.db.insert("estudante", { nome, matricula, curso });
},
});


  export const removeEstudante = mutation({
    args: { id: v.id("estudante") },
    handler: async (ctx, { id }) => {

      await ctx.db.delete( id )

      return "estudante excluido" 
    },
  });

  export const updateEstudante = mutation({
    args: { id: v.id("estudante"), nome: v.string(), matricula: v.string(), curso: v.string() },
    handler: async (ctx, { id, nome, matricula, curso}) => {

        await ctx.db.patch( id, { nome, matricula, curso });

        return "estudante atualizado"
    },
  });

  export const getEstudantes = query({
    args: {},
    handler: async (ctx) => {
      const estudantes = await ctx.db
        .query("estudante")
        .order("desc")
        .take(100);

      return estudantes;
    },
  });

  export const getById = query({
    args: { id: v.id("estudante") },
    handler: async (ctx, { id }) => {

        const estudante = await ctx.db
            .get(id)

        return estudante;
    }
  })