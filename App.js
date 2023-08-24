import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('mydb.db'); // Cambia el nombre de la base de datos si lo deseas

export default function App() {
  useEffect(() => {
    // Crear la tabla al cargar el componente
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);',
        [],
        () => {
          console.log('Tabla creada exitosamente');
        },
        (_, error) => {
          console.error('Error al crear la tabla:', error);
        }
      );
    });

    // Insertar datos en la tabla
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO items (name) VALUES (?);',
        ['Item 1'],
        () => {
          console.log('Inserción exitosa');
        },
        (_, error) => {
          console.error('Error en la inserción:', error);
        }
      );
    });

    // Consultar y mostrar los datos
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM items;',
        [],
        (_, resultSet) => {
          const rows = resultSet.rows;
          for (let i = 0; i < rows.length; i++) {
            console.log(`ID: ${rows.item(i).id}, Name: ${rows.item(i).name}`);
          }
        },
        (_, error) => {
          console.error('Error en la consulta:', error);
        }
      );
    });
  }, []);

  return (
    <View>
      <Text>Check the console for database operations</Text>
    </View>
  );
}
