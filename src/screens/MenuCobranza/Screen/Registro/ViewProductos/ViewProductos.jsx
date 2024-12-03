

  import axios from "axios";
  import { styles } from "./ViewProductos.Style"; // Importa el archivo de estilos
  import { screen } from "../../../../../utils/screenName";
  import { APIURL } from "../../../../../config/apiconfig";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { CardInventario } from "../../../../../components"; // Importa el nuevo componente Card
  import { Plus, History, Search } from "../../../../../Icons"; // Importa los iconos
  
  export function ViewProductos(props) {
    const { navigation } = props;
    const [data, setData] = useState([]); // Stores the fetched product data
    const [totalRecords, setTotalRecords] = useState(0); // Total number of records
    const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
    const [limit, setLimit] = useState(10); // Records per page
    const [loading, setLoading] = useState(false); // Loading state for initial load
    const [loadingMore, setLoadingMore] = useState(false); // Loading state for additional data
    const [pressedCardIndex, setPressedCardIndex] = useState(null); // State to manage pressed card
    const [filtro, setFiltro] = useState(""); // State for the search filter
  
    // Fetch data from API with retry logic
    const fetchData = async (page = 1, retries = 3) => {
      if (loading || (page > 1 && data.length >= totalRecords)) return; // Prevent multiple requests
  
      setLoading(true);
      try {
        const url = `http://192.168.2.124:3035/cobranza/api/v1/point/Inventario/Productos`; // API URL
        const response = await axios.get(url, {
          params: {
            Bodega: 31,
            Articulo: filtro, // Using filtro for search term
            PaginaNumero: page,
            RegistrosPorPagina: limit,
          },
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
        });
  
        console.log('API Response:', response.data); // Add this to inspect the response
  
        const { data: fetchedData } = response.data;
        setData((prevData) => (page === 1 ? fetchedData : [...prevData, ...fetchedData]));
        setTotalRecords(fetchedData.length); // We are using length here because the total count is not available in the response
        setLoading(false);
        setLoadingMore(false);
      } catch (error) {
        if (retries > 0) {
          console.error(`Retrying fetch data, attempts remaining: ${retries - 1}`);
          setTimeout(() => fetchData(page, retries - 1), 1000);
        } else {
          console.error("Error fetching data:", error);
          setLoading(false);
          setLoadingMore(false);
        }
      }
    };
  
    useEffect(() => {
      fetchData(currentPage); // Fetch data on component mount
    }, [currentPage]);
  
    useEffect(() => {
      setCurrentPage(1); // Reset to page 1 when the filter changes
      setData([]); // Clear existing data
      fetchData(1); // Fetch new data based on the filter
    }, [filtro]);
  
    const handleLoadMore = () => {
      if (!loadingMore && data.length < totalRecords) {
        setLoadingMore(true);
        setCurrentPage((prevPage) => prevPage + 1);
      }
    };
  
    const handleCardPress = (item, index) => {
      // Safe handling of undefined or null values for Credito and ValorCuota
      const credito = isNaN(Number(item.Credito)) ? 0 : Number(item.Credito);
      const valorCuota = isNaN(Number(item.ValorCuota)) ? 0 : Number(item.ValorCuota);
  
      // Logging to verify
      console.log("Credito:", credito.toFixed(2));  // Safely call toFixed
      console.log("ValorCuota:", valorCuota.toFixed(2)); // Safely call toFixed
  
      // Your existing logic for card press
      navigation.navigate(screen.registro.insertCall, { item });
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.inputContainersearch}>
          <Search size={24} color="black" style={styles.iconsearch} />
          <TextInput
            style={styles.inputsearch}
            placeholder="Buscar"
            placeholderTextColor="#aaa"
            value={filtro}
            onChangeText={setFiltro}
          />
        </View>
  
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ paddingBottom: 80 }} // To ensure space for the floating button
        >
          <View style={styles.grid}>
            {data.map((item, index) => (
              <CardInventario
                key={index}
                item={item}
                index={index}
                onPress={handleCardPress}
                onPressIn={() => setPressedCardIndex(index)}
                onPressOut={() => setPressedCardIndex(null)}
                pressedCardIndex={pressedCardIndex}
              />
            ))}
          </View>
          {loading && !loadingMore && <ActivityIndicator size="large" color="#0000ff" />}
          {!loading && !loadingMore && data.length === 0 && (
            <View>
              <History size={80} color="#fffff" style={styles.iconNoData} />
              <Text style={styles.noData}>No se encontró nada</Text>
              <Text style={styles.noData}>Pruebe con una palabra clave distinta.</Text>
            </View>
          )}
          {loadingMore && (
            <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
          )}
        </ScrollView>
        <TouchableOpacity
          style={[styles.floatingButton, { opacity: loadingMore ? 0.5 : 1 }]} // Disable button when loading more
          onPress={handleLoadMore}
          disabled={loadingMore} // Disable button while loading more data
        >
          <Plus size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  }
  