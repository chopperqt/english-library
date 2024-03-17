import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * Контроллер удаления, получения, добавления параметров в адресную строку
 */
export function ParamsController() {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  const currentParams = new URLSearchParams(search);

  /**
   * Событие добавления параметра, в адресную строку
   * @param param - Название параметра
   * @param value - Значение параметра
   */
  const setParam = (param: string, value: string) => {
    currentParams.set(param, value);

    navigate(`${pathname}?${currentParams.toString()}`);
  };

  const setSearch = (params: string) => {
    navigate(`/library${params}`);
  };

  /**
   * Событие добавления параметров, в адресную строку
   * @param params - Объект с ключами и значениями
   */
  const setParams = (params: { [key: string]: any }) => {
    const normalizedParams = Object.entries(params);

    normalizedParams.map(([key, value]) => {
      currentParams.set(key, value);
    });

    navigate(`${pathname}?${currentParams.toString()}`);
  };

  /**
   * Событие получения параметра из адресной строки
   * @param param - Название параметра
   */
  const getParam = (param: string) => {
    const foundParam = currentParams.get(param);

    if (foundParam === null) {
      return;
    }

    return foundParam;
  };

  /**
   * Событие получения всех параметров из адресной строки
   */
  const getAllParams = useCallback(() => {
    let allParams = {};

    currentParams.forEach((value, key) => {
      allParams = {
        ...allParams,
        [key]: value,
      };
    });

    return allParams;
  }, [search]);

  /**
   * Событие удаления параметра из адресной строки
   * @param param - Название параметра
   */
  const deleteParam = (param: string) => {
    currentParams.delete(param);

    navigate(`${pathname}?${currentParams.toString()}`);
  };

  /**
   * Событие удаления параметров из адресной строки
   * @param params - Массив, в котором находятся ключи, которые будут удалены
   */
  const deleteParams = (params: string[]) => {
    params.forEach((key) => {
      currentParams.delete(key);
    });

    navigate(`${pathname}?${currentParams.toString()}`);
  };

  return {
    params: search,
    setParam,
    setParams,
    setSearch,
    getParam,
    getAllParams,
    deleteParam,
    deleteParams,
  };
}
