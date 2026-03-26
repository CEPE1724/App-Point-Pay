import { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { Alert } from 'react-native';
import { APIURL } from '../../../../../config/apiconfig';
import { useDb } from '../../../../../database/db';
import { getItemsAsyncUser } from '../../../../../database';
import { useAuth } from '../../../../../navigation/AuthContext';
import { handleError } from '../../../../../utils/errorHandler';
import { bgrToRgb, getContrastText, formatFecha, formatHora } from './helpers';

export function useEstadoIngreso() {
  const { expireToken } = useAuth();
  const [token, setToken] = useState(null);
  const { db } = useDb();

  const [query, setQuery] = useState('');
  const [searchText, setSearchText] = useState('');
  const [selected, setSelected] = useState(null);
  const [showMovementModal, setShowMovementModal] = useState(false);
  const [selectedMovement, setSelectedMovement] = useState(null);
  const [registros, setRegistros] = useState([]);
  const [movimientos, setMovimientos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingDetalle, setLoadingDetalle] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const Item = await getItemsAsyncUser(db);
        setToken(Item[0]?.token);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    if (db) fetchUserInfo();
  }, [db]);

  const fetchData = async (searchQuery) => {
    setLoading(true);
    setSelected(null);
    try {
      const url = APIURL.getReferenciasDtIngreso();
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      const response = await axios.get(url, {
        params: { NumeroIdentificacion: searchQuery },
        headers,
      });
      const payload = response.data;
      const rawList = Array.isArray(payload) ? payload : (payload.data ?? []);

      const mapped = rawList.map((item) => {
        const bgColor = bgrToRgb(item.color);
        return {
          id: String(item.idIngreso),
          estado: item.Estado,
          estadoColor: { bg: bgColor, text: getContrastText(bgColor) },
          origen: item.Origen1 ? `${item.Origen} / ${item.Origen1}` : item.Origen,
          stockCliente: item.Ingreso,
          fecha: formatFecha(item.Fecha),
          ingreso: formatHora(item.Fecha),
          ruc: item.Ruc,
          cliente: item.Nombre,
          tecnico: item.Tecnico,
          codigo: item.Codigo,
          detalle: item.Detalle,
          serial: item.Serial,
          daño: item.Daño,
        };
      });

      setRegistros(mapped);
      setMovimientos([]);
    } catch (error) {
      if (error.response) {
        handleError(error, expireToken);
      } else if (error.request) {
        console.error('Sin respuesta del servidor', error.request);
        Alert.alert('Error', 'No se recibió respuesta del servidor.');
      } else {
        console.error('Error de configuración', error.message);
        Alert.alert('Error', 'Hubo un problema en la configuración de la solicitud.');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchDetalle = async (idIngreso) => {
    setLoadingDetalle(true);
    setMovimientos([]);
    try {
      const url = APIURL.getReferenciasDtIngresoDetalle();
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      const response = await axios.get(url, {
        params: { idIngreso },
        headers,
      });
      const payload = response.data;
      const rawList = Array.isArray(payload) ? payload : (payload.data ?? []);
      const mapped = rawList.map((item) => ({
        fecha: formatFecha(item.Fecha),
        hora: formatHora(item.Fecha),
        bodega: item.Bodega,
        estado: item.Estado,
        responsable: item.Responsable,
        notas: item.Notas,
      }));
      setMovimientos(mapped);
    } catch (error) {
      if (error.response) {
        handleError(error, expireToken);
      } else if (error.request) {
        console.error('Sin respuesta del servidor (detalle)', error.request);
      } else {
        console.error('Error de configuración (detalle)', error.message);
      }
    } finally {
      setLoadingDetalle(false);
    }
  };

  useEffect(() => {
    if (selected) {
      fetchDetalle(selected.id);
    } else {
      setMovimientos([]);
    }
  }, [selected]);

  const filtered = useMemo(() => {
    if (!searchText.trim()) return registros;
    const q = searchText.toLowerCase();
    return registros.filter(
      (r) =>
        r.cliente?.toLowerCase().includes(q) ||
        r.ruc?.includes(q) ||
        r.tecnico?.toLowerCase().includes(q) ||
        r.estado?.toLowerCase().includes(q) ||
        r.stockCliente?.toLowerCase().includes(q)
    );
  }, [searchText, registros]);

  function handleSearch() {
    if (query.trim().length < 7) return;
    setSearchText(query);
    fetchData(query);
  }

  function handleClear() {
    setQuery('');
    setSearchText('');
    setSelected(null);
    setRegistros([]);
    setMovimientos([]);
  }

  return {
    query,
    setQuery,
    searchText,
    selected,
    setSelected,
    showMovementModal,
    setShowMovementModal,
    selectedMovement,
    setSelectedMovement,
    filtered,
    movimientos,
    loading,
    loadingDetalle,
    handleSearch,
    handleClear,
  };
}
