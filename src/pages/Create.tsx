import { useEffect, useState } from "react";
import api from "../services/api";
import { set, get, keys, del, clear } from "idb-keyval";
import { CardCreate } from "../components/CardCreate";
import { isConstructorDeclaration } from "typescript";
interface Form {
  id: string;
  title: string;
  observation: string;
  check: boolean | undefined;
  // form: FormItem[];
  foto?: string;
  regulation_text: {
    id: string;
    text: string;
    regulationsubitem: {
      description_subitem: string;
      regulationitem: {
        name_item: string;
        regulation: any;
      };
    };
  };
  isSaved?: boolean;
}

export function Create() {
  const [hasSavedForm, setHasSavedForm] = useState(false);
  const [form, setForm] = useState<Form[]>([]);
  const [data, setData] = useState<Form[]>([]);
  const [savedForm, setSavedForm] = useState<Form[]>([]);
  const originalForm: Form[] = form;

  useEffect(() => {
    async function getData() {
      const savedForm = await Promise.all(
        form.map((_, index) => get(`Form-${index}`))
      );
      if (savedForm.length !== 0) {
        const newForm = savedForm.filter(Boolean);
        if (newForm.length > 0) {
          const updatedForm = form.map((item) => {
            const savedItem = newForm.find((i) => i.id === item.id);
            return savedItem ? { ...item, ...savedItem } : item;
          });
          setForm(updatedForm);
        }
      } else {
        api
          .get("/checklist/inspection/d501441c-51bf-4a4f-a7ca-581b7f6ddf52")
          .then((response) => {
            setForm(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    getData();
  }, [form]);

  // useEffect(() => {
  //   api
  //     .get("/checklist/inspection/d501441c-51bf-4a4f-a7ca-581b7f6ddf52")
  //     .then((response) => {
  //       setForm(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  // useEffect(() => {
  //   async function loadState() {
  //     const savedForm = await get("form");
  //     if (savedForm) {
  //       setForm(savedForm);
  //     }
  //   }
  //   loadState();
  // }, []);

  // useEffect(() => {
  //   async function fetchSavedForm() {
  //     if (!hasSavedForm) {
  //       const savedForm = await Promise.all(
  //         form.map((_, index) => get(`Form-${index}`))
  //       );

  //       const newForm = savedForm.filter(Boolean);
  //       if (newForm.length > 0) {
  //         const updatedForm = form.map((item) => {
  //           const savedItem = newForm.find((i) => i.id === item.id);
  //           return savedItem ? { ...item, ...savedItem } : item;
  //         });
  //         setForm(updatedForm);
  //       }
  //     }
  //   }
  //   fetchSavedForm();
  // }, [hasSavedForm]);

  // async function handleSaveForm() {
  //   const savedQuestionKeys = (await keys()).filter(
  //     (key) => typeof key === "string" && key.startsWith("Form-")
  //   );
  //   const savedForm = await Promise.all(
  //     savedQuestionKeys.map((key) => get(key))
  //   );

  //   const updatedForm = originalForm.map((item) => {
  //     const savedItem = savedForm.find((i) => i.id === item.id);
  //     return savedItem ? { ...item, ...savedItem } : item;
  //   });

  //   const Form = { form: updatedForm };

  //   let forms = await get("Forms");
  //   if (Array.isArray(forms)) {
  //     forms.push(Form);
  //   } else {
  //     forms = [forms, Form];
  //   }
  //   await set("Forms", forms);

  //   await Promise.all(savedQuestionKeys.map((key) => del(key)));

  //   // setTitle("");
  //   setForm(originalForm);

  //   setHasSavedForm(true);
  //   setSavedForm([...savedForm, Form]);
  // }

  async function handleClearData() {
    await clear();
    setSavedForm([]);
  }

  async function handleSaveQuestion(index: any): Promise<void> {
    const newForm: Form[] = [...form];
    newForm[index] = form[index];
    setForm(newForm);
    newForm[index].isSaved = true;
    await set(`Form-${index}`, form[index]);
  }

  return (
    <div>
      <button onClick={handleClearData}>limpar</button>
      {form?.map((data, index) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          key={data.id}
        >
          <CardCreate
            key={data.id}
            text={data?.regulation_text?.text}
            description_subitem={
              data?.regulation_text?.regulationsubitem?.description_subitem
            }
            regulation={
              data?.regulation_text?.regulationsubitem?.regulationitem
                ?.regulation?.regulation
            }
            observation={data.observation}
            observationChange={(e) => {
              const newForm = [...form];
              newForm[index].observation = e.target.value;
              setForm(newForm);
            }}
            check={data?.check}
            checkChange={(e) => {
              const newForm = [...form];
              newForm[index].check = e.target.checked;
              setForm(newForm);
            }}
            imageChange={(e) => {
              if (e.target.files) {
                const newForm = [...form];
                newForm[index].foto = URL.createObjectURL(e.target.files[0]);
                setForm(newForm);
              }
            }}
            onClick={() => handleSaveQuestion(index)}
            isSaved={!!data.isSaved}
          />
        </div>
      ))}
    </div>
  );
}
