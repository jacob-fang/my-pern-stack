import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

// creates a SQL connection using our env variables
// this sql function we export is used as a tagged template literal, which allows us to write SQL queries safely
export const sql = neon(
// 'postgresql://neondb_owner:npg_6F1UoQutGxsb@ep-white-hat-a8iz3lnc-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require'
  `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
);