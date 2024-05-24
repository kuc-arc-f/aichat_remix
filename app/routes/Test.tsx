import type { MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  Link,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/node";

//
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
//
export const action = async ({
  params,
  request,
}: ActionFunctionArgs) => {
  let formData = await request.formData();
  let title = formData.get("title");
  const data = {
    title: title
  }
//console.log("title=", title);
console.log(data);
  return json({ ret: 'OK', data: data })
}
//
async function validateForm(form: any) {
  const { username } = form;

  // バリデーションルールを定義
  const errors = {};
  if (!username) {
    //@ts-ignore
    errors.username = 'Username is required';
  }
  // バリデーションエラーがないかを確認
  if (Object.keys(errors).length > 0) {
    // エラーがある場合はエラーメッセージを表示し、フォームの送信を中止
    console.log('Validation errors:', errors);
    return false;
  }
  // バリデーションが成功した場合はtrueを返す
  return true;
}
//
export default function Index() {
//  const { form, handleSubmit } = useForm();
  const actionData = useActionData<typeof action>();
  if(actionData){
console.log("ret=", actionData.ret);
console.log(actionData.data);
    //location.href= '/';
  }
  //
  return (
  <div className="container mx-auto my-2 px-8 bg-white" >
    <div>{/* link_div */}
      Link:
      <a href="/testvalid1" className="ms-2">[ TestValid1 ]</a>
      <a href="/testvalid2" className="ms-2">[ TestValid2 ]</a>
    </div>
    <hr className="my-2" />
    <h1 className="text-4xl font-bold">Test.tsx</h1>
    <hr />
    <Form method="post" name="form3" id="form3" 
    className="remix__form">
      <label className="text-2xl font-bold">
        <div>title:</div>
        <input  className="input_text"
        name="title" id="title" type="text" required />
      </label>
      <div>
        <button type="submit" className="btn my-2"
        >Save</button>
      </div>
    </Form>
  </div>
  );
}
/*
*/
