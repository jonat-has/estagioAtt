import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
    args: { descricao: v.string(),
        estudante: v.id("estudante"),
        orientador: v.id("orientador"),
        empresa: v.id("empresa"),
        agente: v.id("agente"),
        ativo: v.boolean() },
       
    handler: async (ctx, { agente, descricao, empresa,estudante,orientador, ativo }) =>  {
    if (!agente || !descricao || !empresa || !estudante || !orientador) {
      throw new Error("Todos os campos são obrigatórios.");
    }
  
    // Insere o estagio na tabela
    await ctx.db.insert("estagio", { agente, descricao, empresa, estudante,orientador, ativo });
},
});


  export const remove = mutation({
    args: { id: v.id("estagio") },
    handler: async (ctx, { id }) => {

      await ctx.db.delete( id )

      return "estagio excluido" 
    },
  });

  export const update = mutation({
    args: {
        id: v.id("estagio"),
        descricao: v.string(),
        estudante: v.id("estudante"),
        orientador: v.id("orientador"),
        empresa: v.id("empresa"),
        agente: v.id("agente"),
        ativo: v.boolean() },
    handler: async (ctx, { id, agente, descricao, empresa, estudante,orientador, ativo}) => {

        await ctx.db.patch( id, { agente, descricao, empresa, estudante,orientador, ativo });

        return "estagio atualizado"
    },
  });

  export const get = query({
    args: {},
    handler: async (ctx) => {
      // Obtem a lista de estágios
      const estagios = await ctx.db
        .query("estagio")
        .order("desc")
        .take(100);
  
      // Enriquecer os dados manualmente
      return Promise.all(
        estagios.map(async (estagio) => {
          const agente = await ctx.db.get(estagio.agente);
          const orientador = await ctx.db.get(estagio.orientador);
          const empresa = await ctx.db.get(estagio.empresa);
          const estudante = await ctx.db.get(estagio.estudante);
  
          return {
            ...estagio,
            agente_nome: agente?.nome || null,
            orientador_nome: orientador?.nome || null,
            empresa_nome: empresa?.nome || null,
            estudante_nome: estudante?.nome || null,
          };
        }),
      );
    },
  });
  
  export const getById = query({
    args: { id: v.id("estagio") },
    handler: async (ctx, { id }) => {

        const estagio = await ctx.db
            .get(id)

        return estagio;
    }
  })