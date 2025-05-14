import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Linking, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';  // Usando Material Icons
import { APIURL } from '../../config/apiconfig';
import axios from 'axios';
import { useAuth } from '../../navigation/AuthContext';

// Función para obtener las notificaciones
const fetchNotificationver = async (linkVersion, versions) => {
    return [
        {
            idNotifications: 0,
            NotificationID: 0,
            Title: "Nueva versión disponible",
            Message: `¡La versión ${versions} ya está disponible!`,
            CreatedAt: "2025-02-05",
            Status: "unread",
            URL: linkVersion,
            Type: "update"
        }
    ];
};

// Función para obtener el conteo de notificaciones no leídas
const FetchCountNotification = async (user, token, UserID) => {
    try {
        const response = await axios.get(APIURL.getNotificacionesNoti(), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            params: { UserID: UserID },
        });
        if (!response.data.success || !response.data.data) {
            console.log('No notifications or failed request');
            return 0; // Return 0 if no notifications are found or if the request failed
        }
        const unreadNotifications = response.data.data.filter(notification => notification.Status === 'unread');
        return unreadNotifications.length;
    } catch (error) {
        console.error("Error fetching notification count:", error);
    }
};

// Función para obtener todas las notificaciones
const fetchNotifications = async (user, token, linkVersion, versions, VersionActual, UserID) => {
    try {
        // Fetch notifications from the API
        const response = await axios.get(APIURL.getNotificacionesNoti(), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            params: { UserID: UserID },
        });
        
        // If the response is not successful or there's no data
        if (!response.data.success || !response.data.data) {

            return []; // Return an empty array if no notifications are found or if the request failed
        }

        const notificationsData = response.data.data;
        console.log('Notifications Data:', notificationsData);

        // Obtain notifications for the new version if VersionActual is different from versions
        let notificationsVerData = [];
        console.log('VersionActual:', VersionActual);
        console.log('versions:', versions);

        if (VersionActual !== versions) {
            notificationsVerData = await fetchNotificationver(linkVersion, versions);
            console.log('Fetched notifications for new version:', notificationsVerData);
        }

        // Concatenate notifications if there are any additional version-specific notifications
        const allNotifications = [...notificationsData, ...notificationsVerData];
        console.log('All Notifications:', allNotifications);

        return allNotifications;

    } catch (error) {
        console.error("Error fetching notifications for UserID:", UserID, error);
        return []; // Return an empty array in case of an error
    }
};



export function MenuNotificacion({ route }) {
    
    const { logout, token } = useAuth();
    const { notificationsVer, linkVersion, usuario , version, versionActual, UserID } = route.params;
    console.log('notificationsVer:', UserID);
    const [notifications, setNotifications] = useState([]);
    const [notificationCount, setNotificationCount] = useState(0);
    const [versions, setVersion] = useState(version);
    const [VersionActual, setVersionActual] = useState(versionActual);
    console.log('notificationsVer:', VersionActual);
    useEffect(() => {
        const loadNotifications = async () => {
            const count = await FetchCountNotification(usuario, token, UserID);
            setNotificationCount(count);

            const notificationsData = await fetchNotifications(usuario, token, linkVersion, versions, VersionActual, UserID);
            console.log('Notificationsbbb:', notificationsData);
            setNotifications(notificationsData);
        };

        loadNotifications();
    }, [notificationsVer]);

    const openLink = (url) => {
        Linking.openURL(url).catch(err => console.error("Error opening URL: ", err));
    };

    const markAsRead = (NotificationID) => {
        Alert.alert("Notificación", "Marcada como leída.");
        setNotifications(notifications.map(notification =>
            notification.NotificationID === NotificationID ? { ...notification, Status: 'read' } : notification
        ));
    };

    console.log('notifications edi:', notifications);
    const renderNotification = (notification) => {
        console.log('notification ec:', notification);
        switch (notification.Type) {
            case 'promotion':
                return (
                    <View style={[styles.item, styles.promotion]}>
                        <Icon name="local-offer" size={30} color="#ff5722" style={styles.icon} />
                        <View style={styles.textContainer}>
                            <Text style={styles.itemText}>{notification.Title}</Text>
                            <Text style={styles.itemMessage}>{notification.Message}</Text>
                            <TouchableOpacity onPress={() => openLink(notification.URL)}>
                                <Text style={styles.linkText}>Ver Oferta</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            case 'update':
                return (
                    <View style={[styles.item, styles.update]}>
                        <Icon name="system-update" size={30} color="#2196f3" style={styles.icon} />
                        <View style={styles.textContainer}>
                            <Text style={styles.itemText}>{notification.Title}</Text>
                            <Text style={styles.itemMessage}>{notification.Message}</Text>
                            <TouchableOpacity onPress={() => openLink(notification.URL)}>
                                <Text style={styles.linkText}>Ver Actualización</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            case 'info':
                return (
                    <View style={[styles.item, styles.info]}>
                        <Icon name="info" size={30} color="#0288d1" style={styles.icon} />
                        <View style={styles.textContainer}>
                            <Text style={styles.itemText}>{notification.Title}</Text>
                            <Text style={styles.itemMessage}>{notification.Message}</Text>
                        </View>
                    </View>
                );
            case 'warning':
                return (
                    <View style={[styles.item, styles.warning]}>
                        <Icon name="warning" size={30} color="#ff9800" style={styles.icon} />
                        <View style={styles.textContainer}>
                            <Text style={styles.itemText}>{notification.Title}</Text>
                            <Text style={styles.itemMessage}>{notification.Message}</Text>
                        </View>
                    </View>
                );
            case 'alert':
                return (
                    <View style={[styles.item, styles.alert]}>
                        <Icon name="error" size={30} color="#f44336" style={styles.icon} />
                        <View style={styles.textContainer}>
                            <Text style={styles.itemText}>{notification.Title}</Text>
                            <Text style={styles.itemMessage}>{notification.Message}</Text>
                        </View>
                    </View>
                );
            default:
                return (
                    <View style={[styles.item, styles.default]}>
                        <Icon name="notifications" size={30} color="#9e9e9e" style={styles.icon} />
                        <View style={styles.textContainer}>
                            <Text style={styles.itemText}>{notification.Title}</Text>
                            <Text style={styles.itemMessage}>{notification.Message}</Text>
                        </View>
                    </View>
                );
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.body}>
                {notifications.map((notification) => (
                    <TouchableOpacity
                        key={notification.idNotifications}
                        style={styles.item}
                        onPress={() => {
                            if (notification.URL) {
                                openLink(notification.URL);
                            } else {
                                markAsRead(notification.idNotifications);
                            }
                        }}
                    >
                        {renderNotification(notification)}
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={styles.footer}>
                <Text style={styles.notificationCount}>Notificaciones no leídas: {notificationCount}</Text>
            </View>
        </View>
    );
}

const styles = {
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f4f4f4',
    },
    body: {
        flex: 1,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 10,
    },
    icon: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    promotion: {
        backgroundColor: '#ffeb3b',
    },
    update: {
        backgroundColor: '#cce7ff',
    },
    info: {
        backgroundColor: '#e3f2fd',
    },
    warning: {
        backgroundColor: '#fff3e0',
    },
    alert: {
        backgroundColor: '#f44336',
    },
    default: {
        backgroundColor: '#f4f4f4',
    },
    textContainer: {
        flex: 1,
    },
    itemText: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
    },
    itemMessage: {
        fontSize: 14,
        color: '#666',
    },
    linkText: {
        color: '#1976d2',
        textDecorationLine: 'underline',
    },
    footer: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: 20,
    },
    notificationCount: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
};
