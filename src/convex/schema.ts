import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    estudante: defineTable({
        nome: v.string(),
        matricula: v.string(),
        curso: v.string()
    }),
    orientador: defineTable({
        nome: v.string(),
        departamento: v.string(),
    }),
    agente: defineTable({
      nome: v.string(),
      contato: v.string(),
    }),
    empresa: defineTable({
        nome: v.string(),
        cnpj: v.string(),
        endereco: v.string(),
        email: v.string(),
        telefone: v.string(),
      }),
    estagio: defineTable({
        descricao: v.string(),
        estudante: v.id("estudante"),
        orientador: v.id("orientador"),
        empresa: v.id("empresa"),
        agente: v.optional(v.id("agente")),
        ativo: v.boolean(),
        pdf: v.id("_storage")
      }),
    users: defineTable({
      firebaseId: v.string(),
      role: v.string()

    })
});