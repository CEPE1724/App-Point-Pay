// Ejemplo de exportación del componente CircleInfoIcon
import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons'; // O el paquete que uses para los iconos
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
export const CircleInfoIcon = (props) => {
  return <FontAwesome5 name="info-circle" size={props.size} color={props.color} />;
};

export const Plus = (props) => {
  return <FontAwesome5 name="plus" size={props.size} color={props.color} />;
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

export const Dashboard = (props) => {
  return <MaterialCommunityIcons name="view-dashboard" size={props.size} color={props.color} />;
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

export const CheckCircle = (props) => {
  return <FontAwesome6 name="check-circle" size={props.size} color={props.color} />
};
export const User = (props) => {
  return <FontAwesome6 name="user" size={props.size} color={props.color} />
};

export const Book = (props) => {
  return <FontAwesome6 name="contact-book" size={props.size} color={props.color} />
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
  return <MaterialIcons name="drivers-license-o" size={props.size} color={props.color} />;
}

export const FileText = (props) => {
  return <MaterialIcons name="file-text-o" size={props.size} color={props.color} />;
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

