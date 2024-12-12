import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
    args: { nome: v.string(), cnpj: v.string(), endereco: v.string(), email: v.string(), telefone: v.string() },
    handler: async (ctx, { nome, cnpj, endereco, email, telefone }) =>  {
    if (!nome || !cnpj || !endereco || !email || !telefone) {
      throw new Error("Todos os campos são obrigatórios.");
    }
  
    // Insere o empresa na tabela
    await ctx.db.insert("empresa", {nome, cnpj, endereco, email, telefone});
},
});


  export const remove = mutation({
    args: { id: v.id("empresa") },
    handler: async (ctx, { id }) => {

      await ctx.db.delete( id )

      return "empresa excluido" 
    },
  });

  export const update = mutation({
    args: { id: v.id("empresa"), nome: v.string(), cnpj: v.string(), endereco: v.string(), email: v.string(), telefone: v.string()},
    handler: async (ctx, { id, nome, cnpj, endereco, email, telefone}) => {

        await ctx.db.patch( id, { nome, cnpj, endereco, email, telefone });

        return "empresa atualizado"
    },
  });

  export const get = query({
    args: {},
    handler: async (ctx) => {
      const empresas = await ctx.db
        .query("empresa")
        .order("desc")
        .take(100);

      return empresas;
    },
  });

  export const getById = query({
    args: { id: v.id("empresa") },
    handler: async (ctx, { id }) => {

        const empresa = await ctx.db
            .get(id)

        return empresa;
    }
  })