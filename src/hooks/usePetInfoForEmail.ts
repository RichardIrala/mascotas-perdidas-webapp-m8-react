import { petReportInfoIdState, petReportInfoState } from "atoms";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
// Investigar sobre la alerta que me sucede específicamente por este hook
export function usePetInfoForEmail(id: number) {
  const [petReportInfoId, setPetReportInfoId] =
    useRecoilState(petReportInfoIdState);
  useEffect(() => {
    setPetReportInfoId(id);
  }, []);

  const petInfoForEmail = useRecoilValue(petReportInfoState);
  return petInfoForEmail;
}
