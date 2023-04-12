import { useEffect } from "react";
import api from "../services/api";

const valor = [
  {
    id: "4c1e342d-d1d3-11ed-bdec-0242ac170002",
    observation: "",
    check: "0",
    regulation_text: {
      id: "9781ea23-0c64-11ed-8083-0242ac170002",
      text: "No local, observa-se que a ligação eqüipotencial local não tem qualquer ligação com a terra, seja diretamente, seja por intermédio de massas ou de elementos condutores?",
      regulationsubitem: {
        description_subitem: "5.1.3.4.2",
        regulationitem: {
          name_item: "PROTEÇÃO PARA GARANTIR SEGURANÇA",
          regulation: {
            regulation: "NBR 5410 - SISTEMA ELÉTRICO",
            regulation_tag: [
              {
                id: "88905cf0-d295-11ed-9859-0242ac170002",
                tag: {
                  tag: "Mecânica",
                  tag_image: null,
                },
              },
              {
                id: "1794dbe3-d295-11ed-9859-0242ac170002",
                tag: {
                  tag: "Instalações de Gás",
                  tag_image: null,
                },
              },
            ],
          },
        },
      },
    },
  },
  {
    id: "4c204616-d1d3-11ed-bdec-0242ac170002",
    observation: "",
    check: "0",
    regulation_text: {
      id: "9781eba3-0c64-11ed-8083-0242ac170002",
      text: "No local, nota-se que o tanque de óleo combustível, para alimentação do motor do gerador, são instalados em local externo da edificação, protegido contra intempéries, provido de drenagem, suspiro, aterramento e meios de coleta de resíduos ou vazamentos, e atendem os requisitos das NBR 7821 e NFPA 37?",
      regulationsubitem: {
        description_subitem: "4.4.7",
        regulationitem: {
          name_item: "Condições Gerais ",
          regulation: {
            regulation:
              "NBR 13859 - PROTEÇÃO CONTRA INCÊNDIO EM SUBESTAÇÕES ELÉTRICAS DE DISTRIBUIÇÃO",
            regulation_tag: [],
          },
        },
      },
    },
  },
  {
    id: "4c21767b-d1d3-11ed-bdec-0242ac170002",
    observation: "",
    check: "0",
    regulation_text: {
      id: "978356fe-0c64-11ed-8083-0242ac170002",
      text: "No local, o grupo motogerador possui botão de arranque manual?",
      regulationsubitem: {
        description_subitem: "4.4.1",
        regulationitem: {
          name_item: "COMPOSIÇÃO",
          regulation: {
            regulation: "NBR 10898 - Sistema de iluminação de emergência. ",
            regulation_tag: [],
          },
        },
      },
    },
  },
  {
    id: "4c2242be-d1d3-11ed-bdec-0242ac170002",
    observation: "",
    check: "0",
    regulation_text: {
      id: "9783573a-0c64-11ed-8083-0242ac170002",
      text: "No local, o projeto do sistema de iluminação de emergência previu as duas situações de emergência, falta ou falha de energia elétrica fornecida pela concessionária ou desligamento voluntário em caso de incêndio na área afetada ou em todas as áreas com materiais combustíveis?",
      regulationsubitem: {
        description_subitem: "8.1.1",
        regulationitem: {
          name_item: "PROJETO E INSTALAÇÃO DO SISTEMA",
          regulation: {
            regulation: "NBR 10898 - Sistema de iluminação de emergência. ",
            regulation_tag: [],
          },
        },
      },
    },
  },
  {
    id: "4c2315cc-d1d3-11ed-bdec-0242ac170002",
    observation: "",
    check: "0",
    regulation_text: {
      id: "978357ab-0c64-11ed-8083-0242ac170002",
      text: "No local, em casos em que há a necessidade de apresentação de projeto de arquitetura em atendimento ao disposto no art. 1º, pode-se notar que a análise do órgão competente incide apenas sobre os elementos de solução em acessibilidade projetados e sua repercussão na segurança e habitabilidade da edificação?",
      regulationsubitem: {
        description_subitem: "Art 2° § 2º",
        regulationitem: {
          name_item: "DECRETO Nº 22.705 DE 07 DE MARÇO DE 2003",
          regulation: {
            regulation:
              "DECRETO 22705:2003 - Acessibilidade - define as condições obrigatórios para adaptação dos condomínio",
            regulation_tag: [],
          },
        },
      },
    },
  },
];
export function Create() {
  useEffect(() => {
    api
      .get("")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.message));
  }, []);
  return (
    <div>
      {valor?.map((Form, index) => (
        <div key={index}>
          <p>
            {
              Form?.regulation_text?.regulationsubitem?.regulationitem
                ?.regulation?.regulation
            }
          </p>
          <p>{Form?.regulation_text?.regulationsubitem?.description_subitem}</p>
          <p>{Form?.regulation_text?.text}</p>
        </div>
      ))}
    </div>
  );
}
