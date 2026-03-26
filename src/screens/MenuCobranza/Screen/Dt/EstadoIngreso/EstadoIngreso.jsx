import React from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles, C } from './EstadoIngreso.Style';
import { useEstadoIngreso } from './useEstadoIngreso';
import { MasterTable } from './components/MasterTable';
import { DetailPanel } from './components/DetailPanel';
import { MovementModal } from './components/MovementModal';
import { useNetworkStatus } from "../../../../../utils/NetworkProvider";
export function EstadoIngreso() {
  const isConnected = useNetworkStatus();
  const {
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
  } = useEstadoIngreso();

  const canSearch = isConnected && query.trim().length >= 7;

  return (
    <SafeAreaView style={styles.screen}>
      {/* PAGE HEADER */}
      <View style={styles.pageHeader}>
        <View style={styles.headerIcon}>
          <Icon name="inbox" size={16} color="#FFF" />
        </View>
        <View>
          <Text style={styles.pageHeaderTitle}>Estado de Ingresos</Text>
          <Text style={styles.pageHeaderSubtitle}>Gestión de equipos ingresados</Text>
        </View>
      </View>

      {/* OFFLINE BANNER */}
      {!isConnected && (
        <View style={styles.offlineBanner}>
          <Icon name="wifi" size={14} color="#FFF" style={{ marginRight: 8 }} />
          <Text style={styles.offlineBannerText}>Sin conexión a Internet — las búsquedas no están disponibles</Text>
        </View>
      )}

      {/* SEARCH BAR */}
      <View style={styles.searchBar}>
        <Icon name="search" size={15} color={C.textMuted} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por Numero de Identificación"
          placeholderTextColor={C.textMuted}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={canSearch ? handleSearch : undefined}
          returnKeyType="search"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.clearBtn}>
            <Icon name="times-circle" size={16} color={C.textMuted} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.searchBtn, !canSearch && { opacity: 0.4 }]}
          onPress={handleSearch}
          disabled={!canSearch}
        >
          <Text style={styles.searchBtnText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {/* RECORD COUNT */}
      <View style={styles.countRow}>
        <View style={[styles.countBadge, filtered.length > 0 && styles.countBadgeSuccess]}>
          <Text style={[styles.countText, filtered.length > 0 && styles.countTextSuccess]}>{filtered.length} REGISTROS</Text>
        </View>
        <Text style={styles.countLabel}>
          {searchText ? `resultado para "${searchText}"` : 'en total'}
        </Text>
        {loading && <ActivityIndicator size="small" color={C.accent} style={{ marginLeft: 8 }} />}
      </View>

      {/* SCROLLABLE CONTENT */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <MasterTable
          filtered={filtered}
          selected={selected}
          onSelect={setSelected}
        />
        <DetailPanel
          selected={selected}
          movimientos={movimientos}
          loadingDetalle={loadingDetalle}
          onOpenMovement={(m) => {
            setSelectedMovement(m);
            setShowMovementModal(true);
          }}
        />
      </ScrollView>

      <MovementModal
        visible={showMovementModal}
        movement={selectedMovement}
        selected={selected}
        onClose={() => {
          setShowMovementModal(false);
          setSelectedMovement(null);
        }}
      />
    </SafeAreaView>
  );
}
