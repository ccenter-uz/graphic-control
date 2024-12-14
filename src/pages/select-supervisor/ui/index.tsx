import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { API_MAP } from "@shared/constants/apiMap";
import { schedulesApi } from "@shared/lib/baseApi";
import { HttpStatusCode } from "@shared/model/httpStatus";
import BackLink from "@shared/ui/back-link";
import BaseContainer from "@shared/ui/base-cotainer";
import BaseLink from "@shared/ui/base-link";
import HeaderContainer from "@shared/ui/header-container";
import HeaderTitle from "@shared/ui/header-title";
import { Loader } from "@shared/ui/loader";

interface ISupervisor {
  id: string;
  full_name: string;
}

export const SelectSupervisor = () => {
  const { t } = useTranslation();
  const token = localStorage.getItem("GCToken") as string;
  const [loading, setLoading] = useState<boolean>(false);
  const [supervisors, setSupervisors] = useState([]);
  const [ATSnumber, setATSnumber] = useState<string>("");
  const getAllSupervisors = async () => {
    try {
      setLoading(true);
      const res = await schedulesApi.get(`${API_MAP.GET_ALL_SUPERVISORS}`, {
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === HttpStatusCode.OK) {
        setATSnumber(res.data[0].type);
        setSupervisors(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllSupervisors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <BaseContainer>
      <HeaderContainer className="flex items-center ">
        <BackLink to="/new-preference" />
        <HeaderTitle>{t("select-supervisor.title")}</HeaderTitle>
      </HeaderContainer>
      <div className=" grid gap-4 px-6">
        {loading ? (
          <Loader />
        ) : (
          <>
            <HeaderTitle className="text-center mt-4">
              {ATSnumber} - КЦ
            </HeaderTitle>
            {supervisors?.map((item: ISupervisor) => {
              return (
                <BaseLink
                  key={item?.id}
                  to={`${item?.id}`}
                  title={item?.full_name}
                  isBlue={true}
                />
              );
            })}
          </>
        )}
      </div>
    </BaseContainer>
  );
};
