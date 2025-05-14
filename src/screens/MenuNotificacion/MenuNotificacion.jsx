import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Linking, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { APIURL } from '../../config/apiconfig';
import axios from 'axios';
import { useAuth } from '../../navigation/AuthContext';
import { Swipeable } from 'react-native-gesture-handler';

// Notificación por versión nueva
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

// Conteo de notificaciones no leídas
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
            return 0;
        }
        const unreadNotifications = response.data.data.filter(notification => notification.Status === 'unread');
        return unreadNotifications.length;
    } catch (error) {
        console.error("Error fetching notification count:", error);
        return 0;
    }
};

// Obtener todas las notificaciones
const fetchNotifications = async (user, token, linkVersion, versions, VersionActual, UserID) => {
    try {
        const response = await axios.get(APIURL.getNotificacionesNoti(), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            params: { UserID: UserID },
        });

        let notificationsData = response.data.success && response.data.data ? response.data.data : [];
        let notificationsVerData = VersionActual !== versions ? await fetchNotificationver(linkVersion, versions) : [];

        return [...notificationsData, ...notificationsVerData];

    } catch (error) {
        console.error("Error fetching notifications for UserID:", UserID, error);
        return [];
    }
};

export function MenuNotificacion({ route }) {
    const { logout, token } = useAuth();
    const { notificationsVer, linkVersion, usuario, version, versionActual, UserID } = route.params;

    const [notifications, setNotifications] = useState([]);
    const [notificationCount, setNotificationCount] = useState(0);

    useEffect(() => {
        const loadNotifications = async () => {
            const count = await FetchCountNotification(usuario, token, UserID);
            setNotificationCount(count);
    
            const notificationsData = await fetchNotifications(usuario, token, linkVersion, version, versionActual, UserID);
    
            // 🔽 FILTRAR SOLO UNREAD
            const unreadOnly = notificationsData.filter(n => n.Status === 'unread');
    
            setNotifications(unreadOnly);
        };
    
        loadNotifications();
    }, [notificationsVer]);
    

    const openLink = (url) => {
        Linking.openURL(url).catch(err => console.error("Error opening URL: ", err));
    };

    const markAsRead = (idNotifications) => {
        fetchupdatereadnotification(idNotifications);
        setNotificationCount(prev => prev - 1);
    
        // Eliminar del listado por ID
        setNotifications(prev =>
            prev.filter(notification => notification.idNotifications !== idNotifications)
        );
    };
    
    

    const fetchupdatereadnotification = async (idNotifications) => {
        try {
            const response = await axios.patch(APIURL.readNotificacion(), {
                idNotifications: idNotifications
            }, {
                headers: {
                    'Content-Type': 'application/json',
                     
                }
            });
            if (response.data.success) {
                console.log("Notificación actualizada correctamente");
            } else {
                console.error("Error al actualizar la notificación");
            }
        } catch (error) {
            console.error("Error al actualizar la notificación:", error);
        }
    };
  



    const renderRightActions = (notification) => (
        <TouchableOpacity
            style={styles.markAsRead}
            onPress={() => markAsRead(notification.idNotifications)}
        >
            <Icon name="done" size={24} color="#fff" />
            <Text style={styles.markAsReadText}>Leído</Text>
        </TouchableOpacity>
    );

    const renderNotification = (notification) => {
        const containerStyles = [styles.item];
        switch (notification.Type) {
            case 'promotion':
                containerStyles.push(styles.promotion);
                break;
            case 'update':
                containerStyles.push(styles.update);
                break;
            case 'info':
                containerStyles.push(styles.info);
                break;
            case 'warning':
                containerStyles.push(styles.warning);
                break;
            case 'success':
                containerStyles.push(styles.success);
                break;
            case 'event':
                containerStyles.push(styles.event);
                break;
            case 'alert':
                containerStyles.push(styles.alert);
                break;
            default:
                containerStyles.push(styles.default);
        }

        return (
            <View style={containerStyles}>
                <Icon name={getIconName(notification.Type)} size={30} color={getIconColor(notification.Type)} style={styles.icon} />
                <View style={styles.textContainer}>
                    <Text style={styles.itemText}>{notification.Title}</Text>
                    <Text style={styles.itemMessage}>{notification.Message}</Text>
                    {notification.URL && (
                        <TouchableOpacity onPress={() => openLink(notification.URL)}>
                            <Text style={styles.linkText}>Ver más</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );
    };

    const getIconName = (type) => {
        switch (type) {
            case 'promotion': return 'local-offer';
            case 'update': return 'system-update';
            case 'info': return 'info';
            case 'warning': return 'warning';
            case 'success': return 'check-circle';
            case 'event': return 'event';
            case 'alert': return 'error';
            default: return 'notifications';
        }
    };

    const getIconColor = (type) => {
        switch (type) {
            case 'promotion': return '#ff5722';
            case 'update': return '#2196f3';
            case 'info': return '#0288d1';
            case 'warning': return '#ff9800';
            case 'success': return '#4caf50';
            case 'event': return '#673ab7';
            case 'alert': return '#f44336';
            default: return '#9e9e9e';
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.footer}>
                <Text style={styles.notificationCount}>Notificaciones no leídas: {notificationCount}</Text>
            </View>
            <ScrollView style={styles.body}>
                {notifications.map((notification) => (
                    <Swipeable
                        key={notification.idNotifications}
                        renderRightActions={() => renderRightActions(notification)}
                    >
                        <TouchableOpacity
                            style={styles.swipeWrapper}
                            onPress={() => {
                                if (notification.URL) {
                                    openLink(notification.URL);
                                } else {
                                    markAsRead(notification.NotificationID);
                                }
                            }}
                        >
                            {renderNotification(notification)}
                        </TouchableOpacity>
                    </Swipeable>
                ))}
            </ScrollView>
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
    swipeWrapper: {
        marginBottom: 10,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    icon: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    success: {
        backgroundColor: '#e8f5e9',
        borderLeftWidth: 5,
        borderLeftColor: '#4caf50',
    },
    event: {
        backgroundColor: '#ede7f6',
        borderLeftWidth: 5,
        borderLeftColor: '#673ab7',
    },
    promotion: {
        backgroundColor: '#fffde7',
        borderLeftWidth: 5,
        borderLeftColor: '#ff9800',
    },
    update: {
        backgroundColor: '#e3f2fd',
        borderLeftWidth: 5,
        borderLeftColor: '#2196f3',
    },
    info: {
        backgroundColor: '#f0f4c3',
        borderLeftWidth: 5,
        borderLeftColor: '#cddc39',
    },
    warning: {
        backgroundColor: '#fff3e0',
        borderLeftWidth: 5,
        borderLeftColor: '#fb8c00',
    },
    alert: {
        backgroundColor: '#ffebee',
        borderLeftWidth: 5,
        borderLeftColor: '#f44336',
    },
    default: {
        backgroundColor: '#eeeeee',
        borderLeftWidth: 5,
        borderLeftColor: '#9e9e9e',
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
        marginTop: 4,
    },
    footer: {
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        borderRadius: 10,
        marginBottom: 10,
    },
    notificationCount: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    markAsRead: {
        backgroundColor: '#4caf50',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        borderRadius: 10,
        marginBottom: 10,
    },
    markAsReadText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: 2,
    },
};
