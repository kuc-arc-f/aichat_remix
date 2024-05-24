import LibConfig from '../../lib/LibConfig';
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { z } from 'zod';
import { GoogleGenerativeAI } from "@google/generative-ai";

//
export const chatAaction = async (formData: any) => {
  const retObj = { ret: LibConfig.NG_CODE, data: "",  errors: {} };
  try {
    //console.log("VITE_API_KEY=", import.meta.env.VITE_API_KEY)
    let input_text = formData.get("input_text");
    const item = {
      input_text: input_text,
    }
    const zodFormData = z.object({
      input_text: z
        .string()
        .min(1, { message: '1文字以上入力してください。' }),
    });
    zodFormData.parse(item);
    // send Text
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const result = await model.generateContent(input_text);
    const response = await result.response;
    const text = response.text();
console.log(text);
    retObj.ret = LibConfig.OK_CODE;
    retObj.data = text;
    return retObj;
  } catch (e) {
    console.error(e.flatten().fieldErrors);
    retObj.errors = e.flatten().fieldErrors;
    return retObj;
  }
}