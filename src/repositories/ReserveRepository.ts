import { AppDataSource } from "../data-source";
import { Reserve } from "../models/Reserve";


export const ReserveRepository = AppDataSource.getRepository(Reserve)