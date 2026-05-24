import {
  pgTable,
  uuid,
  text,
  integer,
} from "drizzle-orm/pg-core";

import { documents } from "./documents";

export const documentChunks = pgTable(
  "document_chunks",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    documentId: uuid("document_id")
      .references(() => documents.id, {
        onDelete: "cascade",
      })
      .notNull(),
    content: text("content").notNull(),
    pageNumber: integer("page_number"),
    chunkIndex: integer("chunk_index")
      .notNull(),
  }
);