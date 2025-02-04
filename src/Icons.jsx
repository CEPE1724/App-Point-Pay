// Ejemplo de exportación del componente CircleInfoIcon
import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons'; // O el paquete que uses para los iconos
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
//https://icons.expo.fyi/Index
import Octicons from '@expo/vector-icons/Octicons';
export const CircleInfoIcon = (props) => {
  return <FontAwesome5 name="info-circle" size={props.size} color={props.color} />;
};

export const Info = (props) => {
  return <Entypo name="info" size={props.size} color={props.color} />;
};

export const Plus = (props) => {
  return <FontAwesome5 name="plus" size={props.size} color={props.color} />;
};

export const Wifi = (props) => {
  return <FontAwesome5 name="wifi" size={props.size} color={props.color} />;
};

export const WifiOff = (props) => {
  return <MaterialIcons name="wifi-off" size={props.size} color={props.color} />;
};

export const Storage = (props) => {
  return <MaterialIcons name="local-shipping" size={props.size} color={props.color} />;
}

export const Location = (props) => {
  return <MaterialIcons name="location-on" size={props.size} color={props.color} />;
}

export const Exit = (props) => {
  return <MaterialCommunityIcons name="exit-run" size={props.size} color={props.color} />;
}

export const Cell = (props) => {
  return <MaterialCommunityIcons name="cellphone-wireless" size={props.size} color={props.color} />;
}

export const GPS = (props) => {
  return <MaterialCommunityIcons name="crosshairs-gps" size={props.size} color={props.color} />;
}

export const Dashboard = (props) => {
  return <MaterialCommunityIcons name="view-dashboard" size={props.size} color={props.color} />;
}

export const AccountCash = (props) => {
  return <MaterialCommunityIcons name="account-cash" size={props.size} color={props.color} />;
}

export const Cash = (props) => {
  return <MaterialCommunityIcons name="cash" size={props.size} color={props.color} />;
}

export const People = (props) => {
  return <MaterialIcons name="people" size={props.size} color={props.color} />
};

export const Upload = (props) => {
  return <FontAwesome6 name="upload" size={props.size} color={props.color} />
};

export const ViewPhoto = (props) => {
  return <FontAwesome6 name="users-viewfinder" size={props.size} color={props.color} />
};

export const CheckCircle = (props) => {
  return <FontAwesome6 name="check-circle" size={props.size} color={props.color} />
};
export const User = (props) => {
  return <FontAwesome6 name="user" size={props.size} color={props.color} />
};

export const UserBlack = (props) => {
  return <FontAwesome name="user" size={props.size} color={props.color} />
};

export const Book = (props) => {
  return <FontAwesome6 name="contact-book" size={props.size} color={props.color} />
};

export const Bank = (props) => {
  return <FontAwesome name="bank" size={props.size} color={props.color} />
};

export const PendingActions = (props) => {
  return <MaterialIcons name="pending-actions" size={props.size} color={props.color} />;
}

export const Done = (props) => {
  return <MaterialIcons name="done" size={props.size} color={props.color} />;
}

export const Refresh = (props) => {
  return <MaterialIcons name="refresh" size={props.size} color={props.color} />;
}

export const Assessment = (props) => {
  return <MaterialIcons name="assessment" size={props.size} color={props.color} />;
}

export const PieChart = (props) => {
  return <MaterialIcons name="pie-chart" size={props.size} color={props.color} />;
}

export const AccountCircle = (props) => {
  return <MaterialIcons name="account-circle" size={props.size} color={props.color} />;
}

export const Home = (props) => {
  return <MaterialIcons name="home" size={props.size} color={props.color} />;
}

export const Terrain = (props) => {
  return <MaterialIcons name="terrain" size={props.size} color={props.color} />;
}

export const CalendarToday = (props) => {
  return <MaterialIcons name="calendar-today" size={props.size} color={props.color} />;
}

export const DriversLicenseO = (props) => {
  return <FontAwesome name="drivers-license-o" size={props.size} color={props.color} />;
}


export const FileText = (props) => {
  return <FontAwesome name="file-text-o" size={props.size} color={props.color} />;
}
export const CreditCard = (props) => {
  return <FontAwesome name="file-text-o" size={props.size} color={props.color} />;
}

export const ShoppingCart = (props) => {
  return <MaterialIcons name="shopping-cart" size={props.size} color={props.color} />;
}

export const Search = (props) => {
  return <MaterialIcons name="search" size={props.size} color={props.color} />;
}

export const History = (props) => {
  return <MaterialIcons name="history" size={props.size} color={props.color} />;
}

export const FileTexto = (props) => {
  return <FontAwesome name="file-text" size={props.size} color={props.color} />;
}

export const Dollar = (props) => {
  return <FontAwesome name="dollar" size={props.size} color={props.color} />;
}

export const CancelarX = (props) => {
  return <FontAwesome name="times" size={props.size} color={props.color} />;
}

export const Trash = (props) => {
  return <FontAwesome name="trash" size={props.size} color={props.color} />;
}

export const XCircle = (props) => {
  return <Octicons name="x-circle" size={props.size} color={props.color}  />
}

export  const shoppingSearch = (props) =>{
  return <MaterialCommunityIcons name="shopping-search" size={props.size} color={props.color} />
}

export  const shoppingSale = (props) =>{
  return <Fontisto name="shopping-sale" size={props.size} color={props.color} />
}

export  const Doorclose = (props) =>{
  return <FontAwesome5 name="door-closed" size={props.size} color={props.color} />
}

export  const Dooropen = (props) =>{
  return <FontAwesome5 name="door-open" size={props.size} color={props.color} />
}

export  const Almuerzo = (props) =>{
  return <MaterialCommunityIcons name="silverware-fork-knife" size={props.size} color={props.color} />
}

export  const ExitAlmuerzo = (props) =>{
  return <MaterialCommunityIcons name="silverware-variant" size={props.size} color={props.color} />
}

export  const Right = (props) =>{
  return <AntDesign name="right" size={props.size} color={props.color} />
}

export  const AddDrive = (props) =>{
  return <MaterialIcons name="add-to-drive" size={props.size} color={props.color} />
}

export  const CloudUp = (props) =>{
  return <FontAwesome5 name="cloud-upload-alt" size={props.size} color={props.color} />
}

export  const DoorEnter = (props) =>{
  return <Ionicons name="enter-outline" size={props.size} color={props.color} />
}

export  const DoorExit = (props) =>{
  return <Ionicons name="enter-sharp" size={props.size} color={props.color} />
}
