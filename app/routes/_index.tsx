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
  useSubmit
} from "@remix-run/react";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { z } from 'zod';
import {useState, useEffect}  from 'react';
import React from 'react'
import {chatAaction} from './Home/Action';

//
import { marked } from 'marked';
import LoadBox from '../components/LoadBox';
import ErrorDialogBox from '../components/ErrorDialogBox';
import LibConfig from './lib/LibConfig';
//
let answer: string = "";
let initDisplay = false;
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
  const retObj = { ret: LibConfig.NG_CODE, errors: {} };
  try {
    let formData = await request.formData();
    const data = await chatAaction(formData);
//console.log(data); 
    return json(data);
  } catch (e) {
    console.error(e);
    return json(retObj);
  }
}
//
export default function Index() {
  const submit = useSubmit();
  const actionData = useActionData<typeof action>();
  const [updatetime, setUpdatetime] = useState<string>("");  
  //
  useEffect(() => {
    if(actionData){
      if(actionData.ret){
console.log("#errors=none", new Date().toString());
console.log("ret=", actionData.ret);
        if(actionData.ret === 'OK'){
console.log("ret=OK");
          initDisplay = false;
          const s = marked.parse(actionData.data);
          //@ts-ignore 
          answer = s 
          setUpdatetime(new Date().toString() + String(Math.random()));
        }
      }
      if (actionData?.errors &&
        Object.keys(actionData?.errors).length > 0) {
console.log("#errors.len > 0", new Date().toString());
console.log(actionData?.errors);
        initDisplay = false;
        setUpdatetime(new Date().toString() + String(Math.random()));
        //alert("NG, Error");
        const dlg = document.getElementById('errorModalDialog');
        if(dlg) {
          //@ts-ignore
          dlg.showModal();
        }
      }
    }
  }, [actionData]);
  //
  const handleSubmit = (event: any) => {
    event.preventDefault();
    initDisplay = true;
    setUpdatetime(new Date().toString() + String(Math.random()));
    console.log("#handleSubmit.start");
//alert("handleSubmit");
    submit(event.currentTarget); // フォームの送信をトリガー
  };
  /**
  *
  * @param
  *
  * @return
  */
  const clearText = async function(){
    try {
      location.reload();
    } catch (error) {
      console.error(error);
    } 
  }
  //
  return (
  <>
    {initDisplay ? (<LoadBox />) : null}
    <div className="container mx-auto my-2 px-8 bg-white">
      <h1 className="text-4xl font-bold">AI-Chat!</h1>
      <hr className="my-2" />
      <form method="post" name="form1" id="form1" onSubmit={handleSubmit}>
        <div className="flex flex-row">
          <div className="flex-1 text-center pt-1">
            <textarea
              className="border border-gray-400 rounded-md px-3 py-2 w-full resize-none focus:outline-none focus:border-blue-500"
              name="input_text" id="input_text" rows={3} />
          </div>
          <div className="text-center pt-1">
            <button className="bg-blue-600 text-white font-bold ms-2 py-2 px-4 rounded"
            >Send</button>
            <br />
          </div>
        </div>
      </form>
      {/* error */}
      {actionData?.errors?.input_text ? (
          <em className="error_message">{actionData?.errors.input_text}</em>
      ) : null}
      {/* cancel */}
      <div>
        <button 
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white ms-2 mt-1 py-0.5 px-4 border border-blue-500 hover:border-transparent rounded"
        onClick={()=>clearText()}>Clear</button>
      </div>
      {/* answer */}
      <hr className="my-2" />
      answer :<br />
      {answer ? (
        <div className="bg-sky-100 p-2 rounded"
        dangerouslySetInnerHTML={{ __html: answer}} />
      ) : null}
    </div>
    {/* dialog */}
    <ErrorDialogBox message={`NG, Check!`} />
  </>
  );
}
