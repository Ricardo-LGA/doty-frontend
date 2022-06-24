import React, { useEffect, useState, useContext } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { Disclosure } from "@headlessui/react";
import api from "../../apis/api";

const steps = [
  {
    status: "complete",
  },
  {
    status: "",
  },
  {
    status: "",
  },
];

function AdopterDashboard() {
  const { setTitle } = useOutletContext();
  const authContext = useContext(AuthContext);
  const [progressoBarrinha, setProgressoBarrinha] = useState(0);
  const { id } = useParams();
  const [adopterInfo, setAdopterInfo] = useState({});

  useEffect(() => {
    async function getAdopter() {
      try {
        const response = await api.get(
          `/adoptionProcess/process/${authContext.loggedInUser.user._id}`
        );
        setAdopterInfo(response.data);
        console.log(response);
      } catch (err) {
        console.error(err);
      }
    }
    getAdopter();
  }, []);

  useEffect(() => {
    setTitle(`Olá, ${authContext.loggedInUser.user.name.split(" ", 1)}! `);
    document.title = "Doty - Meus processos";
  });

  useEffect(() => {
    const progressoBarra = steps.filter((step) => step.status === "complete");
    setProgressoBarrinha(progressoBarra.length);
  }, []);

  return (
    <div>
      <div className="flex flex-col">
        <div>Seu processo:</div>
        <div>
          <div>
            <div class="overflow-hidden bg-gray-400 rounded-full">
              <div
                class={`w-${progressoBarrinha}/3 h-2 bg-[#219653] rounded-full`}
              />
            </div>
            <ol class="grid grid-cols-3 mt-4 text-sm font-medium text-gray-500">
              <li class="flex items-center justify-start text-blue-600">
                <path stroke-linecap="round" stroke-linejoin="round" />
              </li>
              <li class="flex items-center justify-center text-blue-600">
                <path stroke-linecap="round" stroke-linejoin="round" />
                <path stroke-linecap="round" stroke-linejoin="round" />
              </li>
              <li class="flex items-center justify-end">
                <path stroke-linecap="round" stroke-linejoin="round" />
              </li>
            </ol>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col w-full">
            <div className="border-2 py-4 px-6 rounded-md mt-5">
              <Disclosure>
                <Disclosure.Button className="flex flex-col text-[14px] mb-4 font-[400]">
                  Formulário
                  <p className="text-xs text-gray-400">
                    Etapa inicial de adoção
                  </p>
                </Disclosure.Button>
                <Disclosure.Panel className="text-[#3B56AA] font-[600]">
                  Animal escolhido:{" "}
                  <p className="text-gray-600 font-[400] text-sm">
                    {adopterInfo?.petId}
                  </p>
                  Se já teve animais e quantos:{" "}
                  <p className="text-gray-600 font-[400] text-sm">
                    {adopterInfo?.process?.["0"].everHadAPet}
                  </p>
                  Ambiente onde o animal irá morar:{" "}
                  <p className="text-gray-600 font-[400] text-sm">
                    {adopterInfo?.process?.["0"].houseType}
                  </p>
                  Espaço do local:{" "}
                  <p className="text-gray-600 font-[400] text-sm">
                    {adopterInfo?.process?.["0"].petAccess}
                  </p>
                  Horas que passa em casa:{" "}
                  <p className="text-gray-600 font-[400] text-sm">
                    {adopterInfo?.process?.["0"].timeSpentAtHome}
                  </p>
                  Acesso do animal no local:{" "}
                  <p className="text-gray-600 font-[400] text-sm">
                    {adopterInfo?.process?.["0"].petAccess}
                  </p>
                </Disclosure.Panel>
              </Disclosure>
            </div>
            <div className="border-2 py-4 px-6 rounded-md mt-10">
              <Disclosure>
                <Disclosure.Button className="flex flex-col text-[14px]">
                  Entrevista
                  <p className="text-xs text-gray-400 mb-4">
                    Segunda etapa da adoção
                  </p>
                </Disclosure.Button>
                <Disclosure.Panel className="ml-2 text-gray-400 font-[400]">
                  <div className="border-2 rounded-md text-sm mt-2 flex flex-col">
                    Selecione o dia e horário de sua preferência para conversar
                    com a <p>{adopterInfo?.guardianId}</p>
                    <input
                      className="border-2 w-11/12 lg:w-8/12 xl:w-6/12 mb-1 ml-1 pl-1 rounded-md"
                      placeholder="Inserir data no formato DD/MM/AAAA"
                    ></input>
                    <input
                      className="border-2 w-11/12 lg:w-8/12 xl:w-6/12 mb-1 ml-1 pl-1 rounded-md"
                      placeholder="Inserir horário no formato '00:00hrs'"
                    ></input>
                  </div>
                  <button className="bg-gray-800 text-white rounded-md mt-2 px-4 py-2">
                    Enviar Horário para Aprovação
                  </button>
                </Disclosure.Panel>
              </Disclosure>
            </div>
            <div className="border-2 py-4 px-6 rounded-md my-10">
              <Disclosure>
                <Disclosure.Button className="flex flex-col">
                  Visita e Retirada
                  <p className="text-xs text-gray-400">
                    Ultima etapa da adoção
                  </p>
                </Disclosure.Button>
                <Disclosure.Panel className="text-gray-500">
                  Domingo ela não vai (vai, vai)
                  <p> Domingo ela não vai não (vai, vai, vai)</p>
                  Olha, domingo ela não vai (vai, vai)
                  <p>Domingo ela não vai não (vai, vai, vai)</p>
                </Disclosure.Panel>
              </Disclosure>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdopterDashboard;
