import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;

  //PRODUCT
  PRODUCTS_MS_HOST: string;
  PRODUCTS_MS_PORT: number;

  //ORDER
  ORDER_MS_HOST: string;
  ORDER_MS_PORT: number;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),

    PRODUCTS_MS_PORT: joi.number().required(),
    PRODUCTS_MS_HOST: joi.string().required(),

    ORDER_MS_PORT: joi.number().required(),
    ORDER_MS_HOST: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config Validation Error ENV ${error.message}`);
}

const enVars: EnvVars = value;

export const envs: EnvVars = {
  PORT: enVars.PORT,

  PRODUCTS_MS_HOST: enVars.PRODUCTS_MS_HOST,
  PRODUCTS_MS_PORT: enVars.PRODUCTS_MS_PORT,

  ORDER_MS_HOST: enVars.ORDER_MS_HOST,
  ORDER_MS_PORT: enVars.ORDER_MS_PORT,
};
